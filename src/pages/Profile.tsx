import React from 'react';
import UserProfile from '../components/Profile/UserProfile';

const Profile: React.FC = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">View your profile information</p>
      </div>
      
      <UserProfile />
    </div>
  );
};

export default Profile;