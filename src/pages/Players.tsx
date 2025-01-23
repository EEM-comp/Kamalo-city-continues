import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Player, GameResult } from '../types';
import { Trash2, Plus, Save, History } from 'lucide-react';

export default function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState<Partial<Player>>({});
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [newResult, setNewResult] = useState<Partial<GameResult>>({});
  const [deletePassword, setDeletePassword] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState('');

  const ageOptions = [14, 15, 16, 17, 18];
  const ageGroupOptions = ['U15', 'U17', 'U19'];

  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    const { data: playersData, error: playersError } = await supabase
      .from('players')
      .select('*');
    
    if (playersError) {
      console.error('Error fetching players:', playersError);
      return;
    }

    const { data: resultsData, error: resultsError } = await supabase
      .from('game_results')
      .select('*');

    if (resultsError) {
      console.error('Error fetching game results:', resultsError);
      return;
    }

    const playersWithStats = playersData.map((player: Player) => {
      const playerResults = resultsData.filter((result: GameResult) => result.player_id === player.id);
      const totalGames = playerResults.filter(r => r.result !== 'A').length;
      const wins = playerResults.filter(r => r.result === 'W').length;
      const winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0;

      return {
        ...player,
        game_history: playerResults,
        win_rate: Math.round(winRate * 10) / 10
      };
    });

    setPlayers(playersWithStats);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const playerData = {
      ...newPlayer,
      surname: 'Not Provided',
      phone_number: 'Not Required'
    };
    
    const { error } = await supabase
      .from('players')
      .insert([playerData]);

    if (error) {
      console.error('Error adding player:', error);
    } else {
      setShowForm(false);
      setNewPlayer({});
      fetchPlayers();
    }
  }

  async function handleDelete(id: string) {
    if (deletePassword.toLowerCase().replace(/[^a-z0-9]/g, '') === 'pressieschess2025') {
      const { error } = await supabase
        .from('players')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting player:', error);
      } else {
        fetchPlayers();
        setShowDeleteDialog(null);
        setDeletePassword('');
        setDeleteError('');
      }
    } else {
      setDeleteError('Incorrect password');
    }
  }

  async function addGameResult(playerId: string) {
    const { error } = await supabase
      .from('game_results')
      .insert([{ ...newResult, player_id: playerId }]);

    if (error) {
      console.error('Error adding game result:', error);
    } else {
      setNewResult({});
      fetchPlayers();
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

  const handleEloChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Player) => {
    const value = e.target.value;
    if (value === '') {
      setNewPlayer({ ...newPlayer, [field]: undefined });
    } else {
      const numValue = parseInt(value);
      setNewPlayer({ ...newPlayer, [field]: numValue < 100 ? 100 : numValue });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Player Information</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800"
          >
            <Plus size={20} />
            <span>Add Player</span>
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border p-2 rounded"
                value={newPlayer.name || ''}
                onChange={e => setNewPlayer({...newPlayer, name: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Chess.com Username"
                className="border p-2 rounded"
                value={newPlayer.chesscom_username || ''}
                onChange={e => setNewPlayer({...newPlayer, chesscom_username: e.target.value})}
                required
              />
              <input
                type="number"
                placeholder="Rapid ELO"
                className="border p-2 rounded"
                value={newPlayer.rapid_elo || ''}
                onChange={e => handleEloChange(e, 'rapid_elo')}
                required
              />
              <input
                type="number"
                placeholder="Blitz ELO"
                className="border p-2 rounded"
                value={newPlayer.blitz_elo || ''}
                onChange={e => handleEloChange(e, 'blitz_elo')}
                required
              />
              <input
                type="number"
                placeholder="Bullet ELO"
                className="border p-2 rounded"
                value={newPlayer.bullet_elo || ''}
                onChange={e => handleEloChange(e, 'bullet_elo')}
                required
              />
              <select
                className="border p-2 rounded"
                value={newPlayer.age || ''}
                onChange={e => setNewPlayer({...newPlayer, age: parseInt(e.target.value)})}
                required
              >
                <option value="">Select Age</option>
                {ageOptions.map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
              <select
                className="border p-2 rounded"
                value={newPlayer.age_group || ''}
                onChange={e => setNewPlayer({...newPlayer, age_group: e.target.value})}
                required
              >
                <option value="">Select Age Group</option>
                {ageGroupOptions.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              <Save size={20} />
              <span>Save Player</span>
            </button>
          </form>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chess.com</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rapid ELO</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blitz ELO</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bullet ELO</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Win Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game History</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {players.map((player) => (
                <React.Fragment key={player.id}>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">{player.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{player.chesscom_username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{player.rapid_elo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{player.blitz_elo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{player.bullet_elo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{player.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{player.age_group}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{player.win_rate}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedPlayer(selectedPlayer === player.id ? null : player.id)}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                      >
                        <History size={20} />
                        <span>View History</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setShowDeleteDialog(player.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                  {selectedPlayer === player.id && (
                    <tr>
                      <td colSpan={10} className="px-6 py-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-4 mb-4">
                            <select
                              className="border p-2 rounded"
                              value={newResult.result || ''}
                              onChange={e => setNewResult({...newResult, result: e.target.value as GameResult['result']})}
                            >
                              <option value="">Select Result</option>
                              <option value="W">Win</option>
                              <option value="L">Loss</option>
                              <option value="D">Draw</option>
                              <option value="A">Absent</option>
                            </select>
                            <input
                              type="text"
                              placeholder="Opponent"
                              className="border p-2 rounded"
                              value={newResult.opponent || ''}
                              onChange={e => setNewResult({...newResult, opponent: e.target.value})}
                            />
                            <button
                              onClick={() => addGameResult(player.id)}
                              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                              Add Result
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {player.game_history?.map((result, index) => (
                              <div
                                key={index}
                                className={`px-3 py-1 rounded-full ${getResultColor(result.result)}`}
                                title={`${result.opponent || 'Unknown opponent'} - ${new Date(result.date).toLocaleDateString()}`}
                              >
                                {result.result}
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                  {showDeleteDialog === player.id && (
                    <tr>
                      <td colSpan={10} className="px-6 py-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="mb-4">Are you sure you want to delete this entry?</p>
                          <div className="flex items-center space-x-4">
                            <input
                              type="password"
                              placeholder="Enter password"
                              className="border p-2 rounded"
                              value={deletePassword}
                              onChange={e => setDeletePassword(e.target.value)}
                            />
                            <button
                              onClick={() => handleDelete(player.id)}
                              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                              Confirm Delete
                            </button>
                            <button
                              onClick={() => {
                                setShowDeleteDialog(null);
                                setDeletePassword('');
                                setDeleteError('');
                              }}
                              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                          {deleteError && (
                            <p className="text-red-600 mt-2">{deleteError}</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}