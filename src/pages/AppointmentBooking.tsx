import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import ClinicAppointmentForm from '../components/Appointments/ClinicAppointmentForm';
import AppointmentList from '../components/Appointments/AppointmentList';
import { useAppointmentStore } from '../stores/useAppointmentStore';

const AppointmentBooking: React.FC = () => {
  const [activeTab, setActiveTab] = useState('list');
  const { fetchAppointments } = useAppointmentStore();

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleBookingSuccess = () => {
    fetchAppointments();
    setActiveTab('list');
  };

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Clinic Appointments</h1>
        <p className="text-gray-600">Manage and schedule clinic appointments</p>
      </div>

      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger value="list">Appointments</TabsTrigger>
            <TabsTrigger value="book">Book New</TabsTrigger>
          </TabsList>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-4">
            <TabsContent value="list">
              <AppointmentList onBookNew={() => setActiveTab('book')} />
            </TabsContent>
            <TabsContent value="book">
              <div className="p-6">
                <ClinicAppointmentForm onSuccess={handleBookingSuccess} />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AppointmentBooking;