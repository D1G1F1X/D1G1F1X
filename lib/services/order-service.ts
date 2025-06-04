import { getServerClient } from "@/lib/supabase-server"
import { getClientSide } from "@/lib/supabase"

export type Order = {
  id: string
  user_id: string | null
  status: string
  total: number
  payment_intent_id: string | null
  shipping_address: Record<string, any> | null
  created_at: string
  updated_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}

export type OrderWithItems = Order & {
  items: OrderItem[]
}

export type OrderCreate = Omit<Order, "id" | "created_at" | "updated_at"> & {
  items: Omit<OrderItem, "id" | "order_id" | "created_at">[]
}

export type OrderUpdate = Partial<Omit<Order, "id" | "user_id" | "created_at" | "updated_at">>

// Server-side order operations
export const orderService = {
  // Get an order by ID
  async getOrderById(orderId: string): Promise<OrderWithItems | null> {
    const supabase = getServerClient()

    // Get the order
    const { data: order, error: orderError } = await supabase.from("orders").select("*").eq("id", orderId).single()

    if (orderError) {
      console.error("Error fetching order:", orderError)
      return null
    }

    // Get the order items
    const { data: items, error: itemsError } = await supabase.from("order_items").select("*").eq("order_id", orderId)

    if (itemsError) {
      console.error("Error fetching order items:", itemsError)
      return null
    }

    return {
      ...order,
      items: items,
    } as OrderWithItems
  },

  // Get orders by user ID
  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const supabase = getServerClient()

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching user orders:", error)
      return []
    }

    return data as Order[]
  },

  // Get all orders (admin only)
  async getAllOrders(): Promise<Order[]> {
    const supabase = getServerClient()

    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching all orders:", error)
      return []
    }

    return data as Order[]
  },

  // Update order status (admin only)
  async updateOrderStatus(orderId: string, status: string): Promise<Order | null> {
    const supabase = getServerClient()

    const { data, error } = await supabase.from("orders").update({ status }).eq("id", orderId).select().single()

    if (error) {
      console.error("Error updating order status:", error)
      return null
    }

    return data as Order
  },

  // Create a new order with items
  async createOrder(order: OrderCreate): Promise<OrderWithItems | null> {
    const supabase = getServerClient()

    // Start a transaction
    const { data: newOrder, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: order.user_id,
        status: order.status,
        total: order.total,
        payment_intent_id: order.payment_intent_id,
        shipping_address: order.shipping_address,
      })
      .select()
      .single()

    if (orderError) {
      console.error("Error creating order:", orderError)
      return null
    }

    // Insert order items
    const orderItems = order.items.map((item) => ({
      order_id: newOrder.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }))

    const { data: items, error: itemsError } = await supabase.from("order_items").insert(orderItems).select()

    if (itemsError) {
      console.error("Error creating order items:", itemsError)
      // Attempt to rollback by deleting the order
      await supabase.from("orders").delete().eq("id", newOrder.id)
      return null
    }

    return {
      ...newOrder,
      items,
    } as OrderWithItems
  },
}

// Client-side order operations
export const useOrders = () => {
  const supabase = getClientSide()

  return {
    // Get current user's orders
    async getCurrentUserOrders(): Promise<Order[]> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return []
      }

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching current user orders:", error)
        return []
      }

      return data as Order[]
    },

    // Get an order by ID (only if it belongs to the current user)
    async getOrderById(orderId: string): Promise<OrderWithItems | null> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return null
      }

      // Get the order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .eq("user_id", session.user.id)
        .single()

      if (orderError) {
        console.error("Error fetching order:", orderError)
        return null
      }

      // Get the order items
      const { data: items, error: itemsError } = await supabase.from("order_items").select("*").eq("order_id", orderId)

      if (itemsError) {
        console.error("Error fetching order items:", itemsError)
        return null
      }

      return {
        ...order,
        items,
      } as OrderWithItems
    },

    // Create a new order
    async createOrder(order: Omit<OrderCreate, "user_id">): Promise<OrderWithItems | null> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return null
      }

      // Add user_id to the order
      const orderWithUserId = {
        ...order,
        user_id: session.user.id,
      }

      // Create the order
      const { data: newOrder, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: orderWithUserId.user_id,
          status: orderWithUserId.status,
          total: orderWithUserId.total,
          payment_intent_id: orderWithUserId.payment_intent_id,
          shipping_address: orderWithUserId.shipping_address,
        })
        .select()
        .single()

      if (orderError) {
        console.error("Error creating order:", orderError)
        return null
      }

      // Insert order items
      const orderItems = orderWithUserId.items.map((item) => ({
        order_id: newOrder.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }))

      const { data: items, error: itemsError } = await supabase.from("order_items").insert(orderItems).select()

      if (itemsError) {
        console.error("Error creating order items:", itemsError)
        return null
      }

      return {
        ...newOrder,
        items,
      } as OrderWithItems
    },
  }
}
