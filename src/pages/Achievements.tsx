import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Achievement } from '../types';
import { Trophy, Medal, Users, Plus } from 'lucide-react';

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Partial<Achievement>>({});
  const years = [2024, 2025];

  useEffect(() => {
    fetchAchievements();
  }, []);

  async function fetchAchievements() {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching achievements:', error);
    } else {
      setAchievements(data || []);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase
      .from('achievements')
      .insert([newAchievement]);

    if (error) {
      console.error('Error adding achievement:', error);
    } else {
      setShowForm(false);
      setNewAchievement({});
      fetchAchievements();
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'tournament':
        return <Trophy className="text-yellow-500" size={24} />;
      case 'individual':
        return <Medal className="text-blue-500" size={24} />;
      case 'team':
        return <Users className="text-green-500" size={24} />;
      default:
        return <Trophy className="text-yellow-500" size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Achievements</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800"
          >
            <Plus size={20} />
            <span>Add Achievement</span>
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title"
                className="border p-2 rounded"
                value={newAchievement.title || ''}
                onChange={e => setNewAchievement({...newAchievement, title: e.target.value})}
                required
              />
              <select
                className="border p-2 rounded"
                value={newAchievement.year || 2024}
                onChange={e => setNewAchievement({...newAchievement, year: parseInt(e.target.value)})}
                required
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <input
                type="date"
                className="border p-2 rounded"
                value={newAchievement.date || ''}
                onChange={e => setNewAchievement({...newAchievement, date: e.target.value})}
                required
              />
              <select
                className="border p-2 rounded"
                value={newAchievement.type || 'tournament'}
                onChange={e => setNewAchievement({...newAchievement, type: e.target.value as Achievement['type']})}
                required
              >
                <option value="tournament">Tournament</option>
                <option value="individual">Individual</option>
                <option value="team">Team</option>
              </select>
              <textarea
                placeholder="Description"
                className="border p-2 rounded md:col-span-2"
                value={newAchievement.description || ''}
                onChange={e => setNewAchievement({...newAchievement, description: e.target.value})}
                required
              />
              <input
                type="url"
                placeholder="Image URL (optional)"
                className="border p-2 rounded md:col-span-2"
                value={newAchievement.image_url || ''}
                onChange={e => setNewAchievement({...newAchievement, image_url: e.target.value})}
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Achievement
            </button>
          </form>
        )}

        {years.map(year => (
          <div key={year} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{year}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements
                .filter(achievement => new Date(achievement.date).getFullYear() === year)
                .map((achievement) => (
                  <div key={achievement.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {achievement.image_url && (
                      <img
                        src={achievement.image_url}
                        alt={achievement.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        {getIcon(achievement.type)}
                        <span className="text-sm text-gray-500 capitalize">{achievement.type}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                      <p className="text-gray-600 mb-4">{achievement.description}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}