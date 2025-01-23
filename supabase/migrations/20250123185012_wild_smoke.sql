/*
  # Fix RLS policies for public access

  1. Changes
    - Update RLS policies to allow public access for all tables
    - Remove authentication requirement from existing policies
    - Add new policies for public access

  2. Security
    - Enable RLS on all tables
    - Add policies for public read/write access
    
  Note: This is for demo purposes only. In a production environment, 
  proper authentication should be implemented.
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to read players" ON players;
DROP POLICY IF EXISTS "Allow authenticated users to insert players" ON players;
DROP POLICY IF EXISTS "Allow authenticated users to update players" ON players;
DROP POLICY IF EXISTS "Allow authenticated users to delete players" ON players;

DROP POLICY IF EXISTS "Allow authenticated users to read achievements" ON achievements;
DROP POLICY IF EXISTS "Allow authenticated users to insert achievements" ON achievements;
DROP POLICY IF EXISTS "Allow authenticated users to update achievements" ON achievements;
DROP POLICY IF EXISTS "Allow authenticated users to delete achievements" ON achievements;

DROP POLICY IF EXISTS "Allow authenticated users to read game_results" ON game_results;
DROP POLICY IF EXISTS "Allow authenticated users to insert game_results" ON game_results;
DROP POLICY IF EXISTS "Allow authenticated users to update game_results" ON game_results;
DROP POLICY IF EXISTS "Allow authenticated users to delete game_results" ON game_results;

DROP POLICY IF EXISTS "Allow authenticated users to read school_fixtures" ON school_fixtures;
DROP POLICY IF EXISTS "Allow authenticated users to insert school_fixtures" ON school_fixtures;
DROP POLICY IF EXISTS "Allow authenticated users to update school_fixtures" ON school_fixtures;
DROP POLICY IF EXISTS "Allow authenticated users to delete school_fixtures" ON school_fixtures;

-- Create new public access policies for players table
CREATE POLICY "Allow public read access to players"
  ON players FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert to players"
  ON players FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update to players"
  ON players FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from players"
  ON players FOR DELETE
  TO public
  USING (true);

-- Create new public access policies for achievements table
CREATE POLICY "Allow public read access to achievements"
  ON achievements FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert to achievements"
  ON achievements FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update to achievements"
  ON achievements FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from achievements"
  ON achievements FOR DELETE
  TO public
  USING (true);

-- Create new public access policies for game_results table
CREATE POLICY "Allow public read access to game_results"
  ON game_results FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert to game_results"
  ON game_results FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update to game_results"
  ON game_results FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from game_results"
  ON game_results FOR DELETE
  TO public
  USING (true);

-- Create new public access policies for school_fixtures table
CREATE POLICY "Allow public read access to school_fixtures"
  ON school_fixtures FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert to school_fixtures"
  ON school_fixtures FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update to school_fixtures"
  ON school_fixtures FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from school_fixtures"
  ON school_fixtures FOR DELETE
  TO public
  USING (true);