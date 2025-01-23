export interface Player {
  id: string;
  name: string;
  surname: string;
  chesscom_username: string;
  rapid_elo: number;
  blitz_elo: number;
  bullet_elo: number;
  phone_number: string;
  age: number;
  age_group: string;
  win_rate?: number;
  game_history?: GameResult[];
}

export interface GameResult {
  id: string;
  player_id: string;
  result: 'W' | 'L' | 'D' | 'A';
  opponent?: string;
  date: string;
  fixture_id?: string;
  board_number?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url?: string;
  type: 'tournament' | 'individual' | 'team';
  year: number;
}

export interface SchoolFixture {
  id: string;
  school_name: string;
  division: 'U15' | 'U17' | 'U19';
  board_1_player_id?: string;
  board_2_player_id?: string;
  board_3_player_id?: string;
  board_4_player_id?: string;
  board_5_player_id?: string;
  board_6_player_id?: string;
  date: string;
  board_results?: {
    [key: string]: {
      player_name: string;
      result: 'W' | 'L' | 'D' | 'A';
    };
  };
}