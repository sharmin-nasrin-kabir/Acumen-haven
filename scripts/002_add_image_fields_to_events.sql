-- Add banner image and gallery images support to events table
ALTER TABLE events 
ADD COLUMN banner_image TEXT,
ADD COLUMN gallery_images TEXT[];

-- Update existing events to use banner_image instead of image_url
UPDATE events SET banner_image = image_url WHERE image_url IS NOT NULL;

-- Remove the old image_url column
ALTER TABLE events DROP COLUMN image_url;
