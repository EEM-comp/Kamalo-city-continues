/*
  # Create reviews table

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `rating` (integer)
      - `comment` (text)
      - `created_at` (timestamp)
      - `is_approved` (boolean)

  2. Security
    - Enable RLS on `reviews` table
    - Add policies for:
      - Anyone can read approved reviews
      - Authenticated users can create reviews
      - Only admin can approve/delete reviews
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  created_at timestamptz DEFAULT now(),
  is_approved boolean DEFAULT false
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read approved reviews
CREATE POLICY "Anyone can read approved reviews"
  ON reviews
  FOR SELECT
  USING (is_approved = true);

-- Allow authenticated users to create reviews
CREATE POLICY "Authenticated users can create reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow admin to manage all reviews
CREATE POLICY "Admin can manage reviews"
  ON reviews
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'admin@kamalocity.co.za'
  ))
  WITH CHECK (auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'admin@kamalocity.co.za'
  ));