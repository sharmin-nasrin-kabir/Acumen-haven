-- Create events table for dynamic content management
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  time VARCHAR(50),
  location VARCHAR(255),
  chapter VARCHAR(50) NOT NULL CHECK (chapter IN ('US', 'Bangladesh')),
  category VARCHAR(100),
  image_url TEXT,
  registration_link TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_events_chapter ON events(chapter);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(is_featured);
CREATE INDEX IF NOT EXISTS idx_events_published ON events(is_published);

-- Insert sample events data
INSERT INTO events (title, description, date, time, location, chapter, category, image_url, is_featured) VALUES
('Youth Leadership Summit 2024', 'Empowering the next generation of leaders through workshops and networking.', '2024-03-15 10:00:00+00', '10:00 AM - 4:00 PM', 'Community Center, Dhaka', 'Bangladesh', 'Leadership', 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg', true),
('Transportation Innovation Forum', 'Discussing sustainable transportation solutions for urban areas.', '2024-03-20 14:00:00+00', '2:00 PM - 6:00 PM', 'Tech Hub, San Francisco', 'US', 'Innovation', 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg', true),
('Education Access Workshop', 'Strategies for improving educational opportunities in underserved communities.', '2024-03-25 09:00:00+00', '9:00 AM - 12:00 PM', 'University Campus, Chittagong', 'Bangladesh', 'Education', 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg', false);
