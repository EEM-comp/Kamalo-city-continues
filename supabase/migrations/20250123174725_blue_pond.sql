/*
  # Initial Schema Setup for Chess Association Website

  1. New Tables
    - `players`
      - Player information including name, chess.com details, and contact info
    - `achievements`
      - School chess achievements including tournaments and awards

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage data
*/

-- Create players table
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  surname text NOT NULL,
  chesscom_username text NOT NULL,
  rapid_elo integer NOT NULL,
  blitz_elo integer NOT NULL,
  bullet_elo integer NOT NULL,
  phone_number text NOT NULL,
  age integer NOT NULL,
  age_group text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  image_url text,
  type text NOT NULL CHECK (type IN ('tournament', 'individual', 'team')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Create policies for players table
CREATE POLICY "Allow authenticated users to read players"
  ON players
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert players"
  ON players
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update players"
  ON players
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete players"
  ON players
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for achievements table
CREATE POLICY "Allow authenticated users to read achievements"
  ON achievements
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert achievements"
  ON achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update achievements"
  ON achievements
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete achievements"
  ON achievements
  FOR DELETE
  TO authenticated
  USING (true);