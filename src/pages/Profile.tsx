import React, { useState, useEffect, Suspense } from 'react';
import { Save, User, KeyRound, UserCircle, Edit2, X, Heart, Clock, Film, Star, Shield, Bell, Mail,CheckCircle,AlertCircle } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import Popup from './Popup';
// Lazy load components
const ProfileStats = React.lazy(() => import('../components/ProfileStats'));
const ProfileSettings = React.lazy(() => import('../components/ProfileSettings'));

const avatarOptions = [
    {
        id: 1,
        url: "https://cdn.myanimelist.net/images/characters/14/359847.jpg",
        alt: "Tanjiro Kamado"
    },
    {
        id: 2,
        url: "https://cdn.myanimelist.net/images/characters/9/310307.jpg",
        alt: "Mikasa Ackerman"
    },
    {
        id: 3,
        url: "https://cdn.myanimelist.net/images/characters/10/216895.jpg",
        alt: "Killua Zoldyck"
    },
    {
        id: 4,
        url: "https://cdn.myanimelist.net/images/characters/2/284121.jpg",
        alt: "Saitama"
    },
    {
        id: 8,
        url: "https://cdn.myanimelist.net/images/characters/16/264753.jpg",
        alt: "Ken Kaneki"
    },
    {
        id: 9,
        url: "https://cdn.myanimelist.net/images/characters/11/294388.jpg",
        alt: "Rem"
    },
];

function formatWatchTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''}`;
    }
    return `${minutes} minutes`;
}
function App() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        selectedAvatar: avatarOptions[0].url,
        email: '',
        language: 'Japanese with Subtitles',
        notifications: true,
        autoplay: true,
        defaultQuality: '1080p'
    });

    const [watchTime, setWatchTime] = useState<number>(0);
    const [userStats, setUserStats] = useState({
        memberSince: '',
        watchedAnime: 0,
        watchlistCount: 0,
        favoriteGenres: ['Shonen', 'Slice of Life', 'Action'],
    });
    // Update the state variables

const [showPopup, setShowPopup] = useState(false);
const [popupMessage, setPopupMessage] = useState('');
const [popupType, setPopupType] = useState<'success' | 'error'>('success');


    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) return;

            try {
                const response = await fetch(`https://holymix-login-backend.onrender.com/user/${userId}`);
                if (response.ok) {
                    const userData = await response.json();
                    console.log("Fetched user data:", userData);

                    setFormData(prevData => ({
                        ...prevData,
                        username: userData.username || 'Set username here',
                        firstName: userData.firstName || '',
                        lastName: userData.lastName || '',
                        email: userData.email || '',
                        selectedAvatar: userData.avatar || avatarOptions[0].url,
                    }));

                    setUserStats(prevStats => ({
                        ...prevStats,
                        memberSince: userData.memberSince || 'January 2024',
                        watchedAnime: userData.completedAnime?.length || 0,
                        watchlistCount: userData.watchlist?.length || 0,
                    }));

                    setWatchTime(userData.watchTime || 0);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);
// Add this function to handle popup messages
const handleShowPopup = (message: string, type: 'success' | 'error') => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
};

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleAvatarSelect = (url: string) => {
        setFormData(prev => ({
            ...prev,
            selectedAvatar: url
        }));
    };

    // Add these new state variables in the App component
const [showPasswordModal, setShowPasswordModal] = useState(false);
const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
});


// Add this new function in the App component

// Update the handlePasswordChange function
const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
        handleShowPopup('New passwords do not match!', 'error');
        return;
    }



    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
        const response = await fetch(`https://holymix-login-backend.onrender.com/change-password/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            handleShowPopup('Password updated successfully!', 'success');
            document.getElementById('password-modal')?.close();
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } else {
            handleShowPopup(data.error || 'Failed to update password', 'error');
        }
    } catch (error) {
        console.error('Error updating password:', error);
        handleShowPopup('Error updating password. Please try again.', 'error');
    }
};

// Add this JSX near the end of your return statement, before the closing div
<Popup
    isOpen={showPopup}
    onClose={() => setShowPopup(false)}
    title={popupType === 'success' ? 'Success' : 'Error'}
    content={
        <div className={`flex items-center gap-2 ${
            popupType === 'success' ? 'text-green-500' : 'text-red-500'
        }`}>
            {popupType === 'success' ? (
                <CheckCircle className="w-5 h-5" />
            ) : (
                <AlertCircle className="w-5 h-5" />
            )}
            <span>{popupMessage}</span>
        </div>
    }
/>
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        try {
            const response = await fetch(`https://holymix-login-backend.onrender.com/update-user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    password: formData.password || undefined,
                    avatar: formData.selectedAvatar,
                    email: formData.email,
                    language: formData.language,
                    notifications: formData.notifications,
                    autoplay: formData.autoplay,
                    defaultQuality: formData.defaultQuality,
                }),
            });

            if (response.ok) {
                const updatedData = await response.json();
                console.log('Profile updated successfully:', updatedData);
                setIsEditing(false);
                alert('Profile updated successfully! Check your email for confirmation.');
            } else {
                const error = await response.json();
                console.error('Failed to update profile:', error);
                alert('Failed to update profile. Please try again.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please try again.');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };
    return (
        <div className="min-h-screen bg-gray-900 text-white pt-20 pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                            <img
                                src={formData.selectedAvatar || avatarOptions[0].url}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-red-500"
                            />
                            {isEditing && (
                                <button
                                    className="absolute bottom-0 right-0 bg-red-500 p-2 rounded-full"
                                    onClick={() => document.getElementById('avatar-modal')?.showModal()}
                                >
                                    <Edit2 className="w-4 h-4 text-white" />
                                </button>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-2xl font-bold text-white">
                                    {formData.username || 'Set username here'}
                                </h1>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 transition-colors"
                                >
                                    {isEditing ? (
                                        <>
                                            <X className="w-4 h-4" />
                                            Cancel
                                        </>
                                    ) : (
                                        <>
                                            <Edit2 className="w-4 h-4" />
                                            Edit Profile
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="text-gray-400">
                                Member since {userStats.memberSince}
                            </div>
                        </div>
                    </div>
                </div>
                <dialog id="password-modal" className="modal bg-gray-800 rounded-lg p-6 max-w-md w-full">
    <h3 className="text-xl font-bold mb-4 text-white">Change Password</h3>
    <form onSubmit={handlePasswordChange} className="space-y-4 text-white">
        <div>
            <label className="block text-sm font-medium mb-2">Current Password</label>
            <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required

            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2">New Password</label>
            <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required

            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2">Confirm New Password</label>
            <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required

            />
        </div>
        <div className="flex justify-end gap-4 mt-6">
            <button
                type="button"
                onClick={() => {
                    document.getElementById('password-modal')?.close();
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }}
                className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600"
            >
                Update Password
            </button>
        </div>
    </form>
</dialog>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Stats Section */}
                    <Suspense fallback={<LoadingCard />}>
                        <ProfileStats
                            watchTime={watchTime}
                            stats={userStats}
                        />
                    </Suspense>

                    {/* Settings Section */}
                    <div className="md:col-span-2">
                        <Suspense fallback={<LoadingCard />}>
                            <ProfileSettings
                                isEditing={isEditing}
                                formData={formData}
                                handleInputChange={handleInputChange}
                                handleSubmit={handleSubmit}
                            />
                        </Suspense>
                    </div>
                </div>

                {/* Avatar Selection Modal */}
                <dialog id="avatar-modal" className="modal bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Choose Avatar</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {avatarOptions.map((avatar) => (
                            <button
                                key={avatar.id}
                                onClick={() => {
                                    handleAvatarSelect(avatar.url);
                                    document.getElementById('avatar-modal')?.close();
                                }}
                                className={`relative rounded-lg overflow-hidden transition-transform hover:scale-105 ${
                                    formData.selectedAvatar === avatar.url ? 'ring-2 ring-red-500' : ''
                                }`}
                            >
                                <img
                                    src={avatar.url}
                                    alt={avatar.alt}
                                    className="w-full h-32 object-cover"
                                />
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => document.getElementById('avatar-modal')?.close()}
                        className="mt-4 px-4 py-2 bg-gray-700 rounded-md"
                    >
                        Close
                    </button>
                </dialog>
            </div>
        </div>
    );
}

const LoadingCard = () => (
    <div className="bg-gray-800 rounded-lg p-6 animate-pulse">
        <div className="flex items-center justify-center h-32">
            <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        </div>
    </div>
);

export default App;
