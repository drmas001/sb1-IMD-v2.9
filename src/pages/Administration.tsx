import React, { useState } from 'react';
import UserManagement from '../components/Administration/UserManagement';
import SystemSettings from '../components/Administration/SystemSettings';
import ReportGenerator from '../components/Administration/ReportGenerator';
import EmployeeManagement from '../components/Administration/EmployeeManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';

const Administration = () => {
  const [activeTab, setActiveTab] = useState('employees');

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
        <p className="text-gray-600">Manage system settings, reports, and user accounts</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white border border-gray-200 rounded-lg p-1">
          <TabsTrigger value="employees" className="px-4 py-2">
            Employees
          </TabsTrigger>
          <TabsTrigger value="reports" className="px-4 py-2">
            Reports
          </TabsTrigger>
          <TabsTrigger value="users" className="px-4 py-2">
            Users
          </TabsTrigger>
          <TabsTrigger value="settings" className="px-4 py-2">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="mt-6">
          <EmployeeManagement />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <ReportGenerator />
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <UserManagement />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <SystemSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Administration;