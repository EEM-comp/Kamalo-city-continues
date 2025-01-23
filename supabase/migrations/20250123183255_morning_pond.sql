/*
  # Add game results and school fixtures tables

  1. New Tables
    - `game_results`
      - `id` (uuid, primary key)
      - `player_id` (uuid, foreign key to players)
      - `result` (text, enum: W/L/D/A)
      - `opponent` (text)
      - `date` (timestamptz)
      - `fixture_id` (uuid, foreign key to school_fixtures)
      - `board_number` (integer)
    
    - `school_fixtures`
      - `id` (uuid, primary key)
      - `school_name` (text)
      - `division` (text)
      - `board_1_player_id` (uuid, foreign key to players)
      - `board_2_player_id` (uuid, foreign key to players)
      - `board_3_player_id` (uuid, foreign key to players)
      - `board_4_player_id` (uuid, foreign key to players)
      - `board_5_player_id` (uuid, foreign key to players)
      - `board_6_player_id` (uuid, foreign key to players)
      - `overall_result` (text)
      - `date` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create game_results table
CREATE TABLE IF NOT EXISTS game_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id) ON DELETE CASCADE,
  result text NOT NULL CHECK (result IN ('W', 'L', 'D', 'A')),
  opponent text,
  date timestamptz DEFAULT now(),
  fixture_id uuid,
  board_number integer CHECK (board_number BETWEEN 1 AND 6),
  created_at timestamptz DEFAULT now()
);

-- Create school_fixtures table
CREATE TABLE IF NOT EXISTS school_fixtures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name text NOT NULL,
  division text NOT NULL CHECK (division IN ('U15', 'U17', 'U19')),
  board_1_player_id uuid REFERENCES players(id),
  board_2_player_id uuid REFERENCES players(id),
  board_3_player_id uuid REFERENCES players(id),
  board_4_player_id uuid REFERENCES players(id),
  board_5_player_id uuid REFERENCES players(id),
  board_6_player_id uuid REFERENCES players(id),
  overall_result text CHECK (overall_result IN ('W', 'L', 'D')),
  date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE game_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_fixtures ENABLE ROW LEVEL SECURITY;

-- Create policies for game_results
CREATE POLICY "Allow authenticated users to read game_results"
  ON game_results FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert game_results"
  ON game_results FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update game_results"
  ON game_results FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete game_results"
  ON game_results FOR DELETE TO authenticated
  USING (true);

-- Create policies for school_fixtures
CREATE POLICY "Allow authenticated users to read school_fixtures"
  ON school_fixtures FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert school_fixtures"
  ON school_fixtures FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update school_fixtures"
  ON school_fixtures FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete school_fixtures"
  ON school_fixtures FOR DELETE TO authenticated
  USING (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS game_results_player_id_idx ON game_results(player_id);
CREATE INDEX IF NOT EXISTS game_results_fixture_id_idx ON game_results(fixture_id);
CREATE INDEX IF NOT EXISTS school_fixtures_date_idx ON school_fixtures(date);