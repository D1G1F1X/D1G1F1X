-- Create enhanced manual_orders table with all required fields
CREATE TABLE IF NOT EXISTS manual_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- Customer Information
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    
    -- Shipping Address (stored as JSONB for flexibility)
    shipping_address JSONB NOT NULL,
    
    -- Order Items (stored as JSONB array)
    order_items JSONB NOT NULL,
    
    -- Financial Information
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    shipping_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    
    -- Payment Information
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
    payment_reference VARCHAR(255),
    
    -- Order Status
    order_status VARCHAR(50) NOT NULL DEFAULT 'pending_payment',
    
    -- Additional Information
    notes TEXT,
    terms_accepted BOOLEAN NOT NULL DEFAULT false,
    privacy_accepted BOOLEAN NOT NULL DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Indexes for performance
    CONSTRAINT valid_payment_method CHECK (payment_method IN ('credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery')),
    CONSTRAINT valid_payment_status CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
    CONSTRAINT valid_order_status CHECK (order_status IN ('pending_payment', 'processing', 'shipped', 'delivered', 'cancelled'))
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_manual_orders_customer_email ON manual_orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_manual_orders_order_number ON manual_orders(order_number);
CREATE INDEX IF NOT EXISTS idx_manual_orders_created_at ON manual_orders(created_at);
CREATE INDEX IF NOT EXISTS idx_manual_orders_order_status ON manual_orders(order_status);
CREATE INDEX IF NOT EXISTS idx_manual_orders_payment_status ON manual_orders(payment_status);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_manual_orders_updated_at 
    BEFORE UPDATE ON manual_orders 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
