/*
  # Create pending registrations table for email verification

  1. New Tables
    - `pending_registrations`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `event_name` (text, not null)
      - `event_category` (text, not null, check constraint)
      - `verification_token` (text, unique, not null)
      - `created_at` (timestamp, default now)
      - `expires_at` (timestamp, default now + 24 hours)

  2. Security
    - Enable RLS on `pending_registrations` table
    - Add policy for public access (needed for registration flow)
    - Add index on verification_token for fast lookups
    - Add cleanup for expired tokens

  3. Changes
    - Tokens expire after 24 hours
    - Unique constraint on verification_token
    - Same event_category check as participants table
*/

CREATE TABLE IF NOT EXISTS pending_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  event_name text NOT NULL,
  event_category text NOT NULL CHECK (event_category IN ('Workshop', 'Hackathon', 'Webinar')),
  verification_token text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '24 hours')
);

-- Create index for fast token lookups
CREATE INDEX IF NOT EXISTS idx_pending_registrations_token ON pending_registrations(verification_token);
CREATE INDEX IF NOT EXISTS idx_pending_registrations_expires ON pending_registrations(expires_at);

-- Enable Row Level Security
ALTER TABLE pending_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public access for registration flow
CREATE POLICY "Allow public access to pending registrations" 
  ON pending_registrations 
  FOR ALL 
  USING (true);

-- Function to clean up expired tokens (optional, can be called periodically)
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS void AS $$
BEGIN
  DELETE FROM pending_registrations WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql;