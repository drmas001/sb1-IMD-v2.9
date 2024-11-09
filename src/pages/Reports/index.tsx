import React from 'react';
import { useUserStore } from '../../stores/useUserStore';
import AdminReports from './AdminReports';
import UserReports from './UserReports';

const Reports: React.FC = () => {
  const { currentUser } = useUserStore();

  if (!currentUser) {
    return (
      <div className="flex-1 p-6">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          Please log in to view reports.
        </div>
      </div>
    );
  }

  return currentUser.role === 'administrator' ? <AdminReports /> : <UserReports />;
};

export default Reports;