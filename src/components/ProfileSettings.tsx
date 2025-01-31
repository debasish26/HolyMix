import React from 'react';
import { User, Mail, Shield } from 'lucide-react';

interface ProfileSettingsProps {
    isEditing: boolean;
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const ProfileSettings = ({ isEditing, formData, handleInputChange, handleSubmit }: ProfileSettingsProps) => {
    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 text-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
            <div className="space-y-6">
                {/* Username */}
                <SettingField
                    icon={<User className="w-4 h-4 text-red-500" />}
                    label="Username"
                    name="username"
                    value={formData.username}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                />

                {/* Email */}
                <SettingField
                    icon={<Mail className="w-4 h-4 text-red-500" />}
                    label="Email"
                    name="email"
                    value={formData.email}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                    type="email"
                />
                {isEditing && (
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={() => document.getElementById('password-modal')?.showModal()}
                        className="px-6 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
                    >
                        Change Password
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            )}
                {/* Streaming Settings */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-red-500" />
                        Streaming Settings
                    </h3>
                    <div className="space-y-4">
                        <StreamingSetting
                            label="Language"
                            name="language"
                            value={formData.language}
                            isEditing={isEditing}
                            onChange={handleInputChange}
                            options={[
                                'Japanese with Subtitles',

                            ]}
                        />
                        <StreamingSetting
                            label="Quality"
                            name="defaultQuality"
                            value={formData.defaultQuality}
                            isEditing={isEditing}
                            onChange={handleInputChange}
                            options={['1080p']}
                        />
                    </div>
                </div>

                {isEditing && (
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
};

const SettingField = ({ icon, label, name, value, isEditing, onChange, type = 'text' }) => (
    <div>
        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            {icon}
            {label}
        </label>
        {isEditing ? (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
        ) : (
            <div className="w-full bg-gray-700 rounded-md px-4 py-2">
                {value}
            </div>
        )}
    </div>
);

const StreamingSetting = ({ label, name, value, isEditing, onChange, options }) => (
    <div>
        <label className="block text-sm font-medium mb-2">
            {label}
        </label>
        {isEditing ? (
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        ) : (
            <div className="w-full bg-gray-700 rounded-md px-4 py-2">
                {value}
            </div>
        )}
    </div>
);

export default ProfileSettings;
