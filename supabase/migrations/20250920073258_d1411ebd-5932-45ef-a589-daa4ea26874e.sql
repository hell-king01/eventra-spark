-- Create participants table for event registrations
CREATE TABLE public.participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_category TEXT NOT NULL CHECK (event_category IN ('Workshop', 'Hackathon', 'Webinar')),
  registration_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint to prevent duplicate registrations for same event
ALTER TABLE public.participants ADD CONSTRAINT unique_email_event UNIQUE (email, event_name);

-- Create index for better query performance
CREATE INDEX idx_participants_category ON public.participants(event_category);
CREATE INDEX idx_participants_date ON public.participants(registration_date DESC);

-- Enable Row Level Security (optional - for future user-specific access)
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public access for now (since we're using admin auth)
CREATE POLICY "Allow public access to participants" ON public.participants FOR ALL USING (true);