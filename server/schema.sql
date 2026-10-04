-- RAW FIT GYM PostgreSQL Schema
-- Database tables for Franchise Applications, Tour Bookings, Leads & Calculations

CREATE TABLE IF NOT EXISTS franchise_inquiries (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    property_size INT,
    investment_range VARCHAR(100) NOT NULL,
    has_property BOOLEAN DEFAULT FALSE,
    preferred_format VARCHAR(50) NOT NULL, -- 'Prime', 'Luxury', 'Undecided'
    timeline VARCHAR(100),
    message TEXT,
    status VARCHAR(50) DEFAULT 'NEW', -- 'NEW', 'CONTACTED', 'QUALIFIED', 'SITE_VISIT', 'CLOSED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tour_bookings (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    city VARCHAR(100),
    preferred_format VARCHAR(50) DEFAULT 'Luxury',
    preferred_date DATE NOT NULL,
    preferred_time VARCHAR(50) NOT NULL,
    interest_area VARCHAR(100) DEFAULT 'Full Facility Tour',
    status VARCHAR(50) DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS calculator_leads (
    id SERIAL PRIMARY KEY,
    format_type VARCHAR(50) NOT NULL,
    city_tier VARCHAR(50) NOT NULL,
    carpet_area INT NOT NULL,
    projected_members INT NOT NULL,
    pt_conversion_pct INT NOT NULL,
    est_monthly_revenue NUMERIC(15, 2) NOT NULL,
    est_monthly_ebitda NUMERIC(15, 2) NOT NULL,
    est_annual_profit NUMERIC(15, 2) NOT NULL,
    est_payback_months INT NOT NULL,
    est_roi_pct NUMERIC(6, 2) NOT NULL,
    user_name VARCHAR(255),
    user_phone VARCHAR(50),
    user_email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS member_trial_bookings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    class_id VARCHAR(100),
    class_name VARCHAR(150),
    preferred_date VARCHAR(50),
    fitness_goal VARCHAR(100),
    status VARCHAR(50) DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_franchise_inquiries_email ON franchise_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_franchise_inquiries_created_at ON franchise_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tour_bookings_date ON tour_bookings(preferred_date);
