import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { SchoolFixture, Player, GameResult } from '../types';
import { Plus, Save, Trash2 } from 'lucide-react';

export default function SchoolFixtures() {
  const [fixtures, setFixtures] = useState<SchoolFixture[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newFixture, setNewFixture] = useState<Partial<SchoolFixture>>({});
  const [boardResults, setBoardResults] = useState<{[key: string]: string}>({});
  const divisions = ['U15', 'U17', 'U19'];

  useEffect(() => {
    fetchFixtures();
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching players:', error);
    } else {
      setPlayers(data || []);
    }
  }

  async function fetchFixtures() {
    const { data: fixturesData, error: fixturesError } = await supabase
      .from('school_fixtures')
      .select('*')
      .order('date', { ascending: false });
    
    if (fixturesError) {
      console.error('Error fetching fixtures:', fixturesError);
      return;
    }

    // Fetch all game results for the fixtures
    const { data: resultsData, error: resultsError } = await supabase
      .from('game_results')
      .select('*')
      .in('fixture_id', fixturesData.map(f => f.id));

    if (resultsError) {
      console.error('Error fetching game results:', resultsError);
      return;
    }

    // Combine fixtures with their board results
    const enhancedFixtures = fixturesData.map(fixture => {
      const fixtureResults = resultsData.filter(r => r.fixture_id === fixture.id);
      const boardResults: {[key: string]: {player_name: string, result: GameResult['result']}} = {};
      
      fixtureResults.forEach(result => {
        if (result.board_number) {
          boardResults[`board_${result.board_number}`] = {
            player_name: players.find(p => p.id === result.player_id)?.name || 'Unknown',
            result: result.result
          };
        }
      });

      return {
        ...fixture,
        board_results: boardResults
      };
    });

    setFixtures(enhancedFixtures);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // First create the fixture
    const { data: fixtureData, error: fixtureError } = await supabase
      .from('school_fixtures')
      .insert([{
        ...newFixture,
        date: new Date().toISOString()
      }])
      .select()
      .single();

    if (fixtureError) {
      console.error('Error adding fixture:', fixtureError);
      return;
    }

    // Then create game results for each board
    const gameResults = Object.entries(boardResults).map(([board, result]) => {
      const boardNumber = parseInt(board.replace('board_', ''));
      const playerId = newFixture[`board_${boardNumber}_player_id` as keyof SchoolFixture];
      
      return {
        player_id: playerId,
        result,
        fixture_id: fixtureData.id,
        board_number: boardNumber,
        date: new Date().toISOString()
      };
    });

    const { error: resultsError } = await supabase
      .from('game_results')
      .insert(gameResults);

    if (resultsError) {
      console.error('Error adding game results:', resultsError);
    } else {
      setShowForm(false);
      setNewFixture({});
      setBoardResults({});
      fetchFixtures();
    }
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('school_fixtures')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting fixture:', error);
    } else {
      fetchFixtures();
    }
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-green-100 text-green-800';
      case 'L': return 'bg-red-100 text-red-800';
      case 'D': return 'bg-gray-100 text-gray-800';
      case 'A': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">School Fixtures</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800"
          >
            <Plus size={20} />
            <span>Add Fixture</span>
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="School Name"
                className="border p-2 rounded"
                value={newFixture.school_name || ''}
                onChange={e => setNewFixture({...newFixture, school_name: e.target.value})}
                required
              />
              <select
                className="border p-2 rounded"
                value={newFixture.division || ''}
                onChange={e => setNewFixture({...newFixture, division: e.target.value as SchoolFixture['division']})}
                required
              >
                <option value="">Select Division</option>
                {divisions.map(div => (
                  <option key={div} value={div}>{div}</option>
                ))}
              </select>
              
              {[1, 2, 3, 4, 5, 6].map(boardNum => (
                <div key={boardNum} className="space-y-2">
                  <select
                    className="border p-2 rounded w-full"
                    value={newFixture[`board_${boardNum}_player_id` as keyof SchoolFixture] || ''}
                    onChange={e => setNewFixture({
                      ...newFixture,
                      [`board_${boardNum}_player_id`]: e.target.value
                    })}
                    required
                  >
                    <option value="">Select Player for Board {boardNum}</option>
                    {players.map(player => (
                      <option key={player.id} value={player.id}>
                        {player.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border p-2 rounded w-full"
                    value={boardResults[`board_${boardNum}`] || ''}
                    onChange={e => setBoardResults({
                      ...boardResults,
                      [`board_${boardNum}`]: e.target.value
                    })}
                    required
                  >
                    <option value="">Select Result</option>
                    <option value="W">Win</option>
                    <option value="L">Loss</option>
                    <option value="D">Draw</option>
                    <option value="A">Absent</option>
                  </select>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="mt-4 flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              <Save size={20} />
              <span>Save Fixture</span>
            </button>
          </form>
        )}

        {divisions.map(division => (
          <div key={division} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{division}</h2>
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Board 1</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Board 2</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Board 3</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Board 4</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Board 5</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Board 6</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fixtures
                    .filter(fixture => fixture.division === division)
                    .map((fixture) => (
                      <tr key={fixture.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{fixture.school_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(fixture.date).toLocaleDateString()}
                        </td>
                        {[1, 2, 3, 4, 5, 6].map(boardNum => (
                          <td key={boardNum} className="px-6 py-4 whitespace-nowrap">
                            {fixture.board_results?.[`board_${boardNum}`] && (
                              <div className="flex items-center space-x-2">
                                <span>{fixture.board_results[`board_${boardNum}`].player_name}</span>
                                <span className={`px-2 py-1 rounded-full ${
                                  getResultColor(fixture.board_results[`board_${boardNum}`].result)
                                }`}>
                                  {fixture.board_results[`board_${boardNum}`].result}
                                </span>
                              </div>
                            )}
                          </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDelete(fixture.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}