import React from 'react';
import { Search, Bell, ChevronDown, LogOut, User, Menu } from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
import Logo from './Logo';

interface DashboardHeaderProps {
  notifications: number;
  onNotificationClick: () => void;
  isUserMenuOpen: boolean;
  onUserMenuClick: () => void;
  onLogout: () => void;
  onProfileClick: () => void;
  onMobileMenuClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  notifications,
  onNotificationClick,
  isUserMenuOpen,
  onUserMenuClick,
  onLogout,
  onProfileClick,
  onMobileMenuClick
}) => {
  const { currentUser } = useUserStore();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMobileMenuClick}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-3">
            <Logo size="small" variant="medical" className="hidden md:block" />
            <div className="relative flex-1 max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients by MRN or name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <button 
            onClick={onNotificationClick}
            className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
          >
            <Bell className="h-6 w-6" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          
          <div className="relative">
            <button
              onClick={onUserMenuClick}
              className="flex items-center space-x-2 md:space-x-3 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                {currentUser ? getInitials(currentUser.name) : 'U'}
              </div>
              <span className="hidden md:inline text-sm font-medium text-gray-700">
                {currentUser?.name || 'User'}
              </span>
              <ChevronDown className="hidden md:block h-4 w-4 text-gray-500" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                  <p className="text-xs text-gray-500">{currentUser?.medical_code}</p>
                </div>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={onProfileClick}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </button>
                <hr className="my-1" />
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={onLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mt-4 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;