import React from 'react';
import { User, Mail, Building, Shield, Calendar, Clock } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';

const UserProfile: React.FC = () => {
  const { currentUser } = useUserStore();

  if (!currentUser) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          <User className="h-12 w-12 mx-auto mb-2" />
          <p>No user data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-2xl font-semibold text-indigo-600">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{currentUser.name}</h2>
            <p className="text-sm text-gray-600">{currentUser.medical_code}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Shield className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Role</p>
                <p className="text-sm font-medium text-gray-900 capitalize">{currentUser.role}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Building className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p className="text-sm font-medium text-gray-900">{currentUser.department}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Clock className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  currentUser.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {currentUser.status}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <User className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Medical Code</p>
                <p className="text-sm font-medium text-gray-900">{currentUser.medical_code}</p>
              </div>
            </div>

            {currentUser.created_at && (
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(currentUser.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;