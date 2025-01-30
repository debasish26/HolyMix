import React, { useState } from 'react';
import { Save, User, KeyRound, UserCircle, Edit2, X, Heart, Clock, Film, Star, Shield, Bell } from 'lucide-react';

const avatarOptions = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=100&h=100&fit=crop",
    alt: "Anime Avatar 1"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=100&h=100&fit=crop",
    alt: "Anime Avatar 2"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?w=100&h=100&fit=crop",
    alt: "Anime Avatar 3"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1628784230353-5bee16e2f005?w=100&h=100&fit=crop",
    alt: "Anime Avatar 4"
  }
];

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: 'AnimeUser123',
    firstName: 'John',
    lastName: 'Doe',
    password: '',
    selectedAvatar: avatarOptions[0].url,
    email: 'john.doe@email.com',
    language: 'Japanese with Subtitles',
    notifications: true,
    autoplay: true,
    defaultQuality: '1080p'
  });

  const [userStats] = useState({
    memberSince: 'January 2024',
    watchedAnime: 142,
    watchlistCount: 25,
    favoriteGenres: ['Shonen', 'Slice of Life', 'Action'],
    watchTime: '385 hours'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleAvatarSelect = (avatarUrl: string) => {
    setFormData({
      ...formData,
      selectedAvatar: avatarUrl
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen py-20 bg-[#111827] text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <UserCircle className="text-red-500" />
              Profile Settings (Not completed yet)
            </h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>

          {/* User Stats Card */}
          <div className="bg-gray-800/50 rounded-lg p-6 shadow-xl backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Star className="text-yellow-500" /> Your Anime Journey
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <Clock className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="text-sm text-gray-400">Watch Time</div>
                <div className="font-bold">{userStats.watchTime}</div>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <Film className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="text-sm text-gray-400">Anime Watched</div>
                <div className="font-bold">{userStats.watchedAnime}</div>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="text-sm text-gray-400">Watchlist</div>
                <div className="font-bold">{userStats.watchlistCount}</div>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <Shield className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="text-sm text-gray-400">Member Since</div>
                <div className="font-bold">{userStats.memberSince}</div>
              </div>
            </div>
          </div>

          {/* Main Profile Form */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Left Column - Profile Information */}
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-red-500" />
                      Username
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    ) : (
                      <div className="w-full bg-gray-900 rounded-md px-4 py-2">
                        {formData.username}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      ) : (
                        <div className="w-full bg-gray-900 rounded-md px-4 py-2">
                          {formData.firstName}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      ) : (
                        <div className="w-full bg-gray-900 rounded-md px-4 py-2">
                          {formData.lastName}
                        </div>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-red-500" />
                        New Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Leave blank to keep current password"
                        className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  )}

                  {/* Streaming Preferences */}
                  <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-lg font-semibold mb-4">Streaming Preferences</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Default Language
                        </label>
                        {isEditing ? (
                          <select
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            <option>Japanese with Subtitles</option>
                            <option>English Dub</option>
                            <option>Japanese (No Subtitles)</option>
                          </select>
                        ) : (
                          <div className="w-full bg-gray-900 rounded-md px-4 py-2">
                            {formData.language}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Default Quality
                        </label>
                        {isEditing ? (
                          <select
                            name="defaultQuality"
                            value={formData.defaultQuality}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            <option>1080p</option>
                            <option>720p</option>
                            <option>480p</option>
                            <option>Auto</option>
                          </select>
                        ) : (
                          <div className="w-full bg-gray-900 rounded-md px-4 py-2">
                            {formData.defaultQuality}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Avatar and Notifications */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-4">Avatar</label>
                    <div className="relative">
                      <img
                        src={formData.selectedAvatar}
                        alt="Selected Avatar"
                        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-red-500"
                      />
                    </div>
                    {isEditing && (
                      <div className="grid grid-cols-2 gap-4">
                        {avatarOptions.map((avatar) => (
                          <button
                            key={avatar.id}
                            type="button"
                            onClick={() => handleAvatarSelect(avatar.url)}
                            className={`relative rounded-lg overflow-hidden transition-transform hover:scale-105 ${
                              formData.selectedAvatar === avatar.url
                                ? 'ring-2 ring-red-500'
                                : ''
                            }`}
                          >
                            <img
                              src={avatar.url}
                              alt={avatar.alt}
                              className="w-full h-24 object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Notification Settings */}
                  <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-red-500" />
                      Notification Settings
                    </h3>
                    <div className="space-y-4">
                      {isEditing ? (
                        <>
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              name="notifications"
                              checked={formData.notifications}
                              onChange={handleInputChange}
                              className="form-checkbox h-5 w-5 text-red-500 rounded focus:ring-red-500"
                            />
                            <span>New Episode Notifications</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              name="autoplay"
                              checked={formData.autoplay}
                              onChange={handleInputChange}
                              className="form-checkbox h-5 w-5 text-red-500 rounded focus:ring-red-500"
                            />
                            <span>Autoplay Next Episode</span>
                          </label>
                        </>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${formData.notifications ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span>New Episode Notifications: {formData.notifications ? 'Enabled' : 'Disabled'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${formData.autoplay ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span>Autoplay Next Episode: {formData.autoplay ? 'Enabled' : 'Disabled'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Favorite Genres */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Favorite Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {userStats.favoriteGenres.map((genre) => (
                    <span key={genre} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {isEditing && (
                <div className="mt-8 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-md bg-red-500 hover:bg-red-600 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
