import React from 'react';
import { Settings, Bell, Shield, Database } from 'lucide-react';

const SystemSettings = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">System Settings</h2>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Bell className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-600 mb-2">Configure system notifications and alerts</p>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-indigo-600 hover:text-indigo-700">Configure</button>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Shield className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">Security Settings</h3>
              <p className="text-sm text-gray-600 mb-2">Manage security and access controls</p>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-indigo-600 hover:text-indigo-700">Configure</button>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Database className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">Data Management</h3>
              <p className="text-sm text-gray-600 mb-2">Configure data retention and backup settings</p>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-indigo-600 hover:text-indigo-700">Configure</button>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Settings className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">General Settings</h3>
              <p className="text-sm text-gray-600 mb-2">Configure general system preferences</p>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-indigo-600 hover:text-indigo-700">Configure</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;