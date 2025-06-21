-- Create manual_orders table for storing manual order submissions
CREATE TABLE IF NOT EXISTS manual_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    shipping_address_street VARCHAR(200) NOT NULL,
    shipping_address_city VARCHAR(100) NOT NULL,
    shipping_address_state VARCHAR(100) NOT NULL,
    shipping_address_zip VARCHAR(20) NOT NULL,
    shipping_address_country VARCHAR(100) NOT NULL,
    order_items JSONB NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'pending_payment',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE,
    shipped_at TIMESTAMP WITH TIME ZONE,
    tracking_number VARCHAR(100),
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'pending',
    admin_notes TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_manual_orders_customer_email ON manual_orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_manual_orders_status ON manual_orders(status);
CREATE INDEX IF NOT EXISTS idx_manual_orders_created_at ON manual_orders(created_at);
CREATE INDEX IF NOT EXISTS idx_manual_orders_order_number ON manual_orders(order_number);

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

-- Add RLS (Row Level Security) policies if needed
ALTER TABLE manual_orders ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to view their own orders
CREATE POLICY "Users can view their own orders" ON manual_orders
    FOR SELECT USING (auth.email() = customer_email);

-- Policy for admins to view all orders
CREATE POLICY "Admins can view all orders" ON manual_orders
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Insert sample statuses for reference
COMMENT ON COLUMN manual_orders.status IS 'Possible values: pending_payment, payment_received, processing, shipped, delivered, cancelled, refunded';
COMMENT ON COLUMN manual_orders.payment_status IS 'Possible values: pending, paid, failed, refunded, partial';
