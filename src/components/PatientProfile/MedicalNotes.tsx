import React, { useState, useEffect } from 'react';
import { Plus, FileText, AlertCircle } from 'lucide-react';
import { useMedicalNotesStore } from '../../stores/useMedicalNotesStore';
import { usePatientStore } from '../../stores/usePatientStore';
import { useUserStore } from '../../stores/useUserStore';
import { formatDate, formatTime } from '../../utils/dateFormat';

type NoteType = 'Progress Note' | 'Follow-up Note' | 'Consultation Note' | 'Discharge Note' | 'Discharge Summary';

const MedicalNotes = () => {
  const { selectedPatient } = usePatientStore();
  const { currentUser } = useUserStore();
  const { notes, loading, error, fetchNotes, addNote } = useMedicalNotesStore();
  const [showNewNote, setShowNewNote] = useState(false);
  const [formData, setFormData] = useState({
    note_type: 'Progress Note' as NoteType,
    content: ''
  });

  useEffect(() => {
    if (selectedPatient?.id) {
      fetchNotes(selectedPatient.id);
    }
  }, [selectedPatient?.id, fetchNotes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient?.id || !currentUser?.id) return;

    try {
      await addNote({
        patient_id: selectedPatient.id,
        doctor_id: currentUser.id,
        note_type: formData.note_type,
        content: formData.content
      });
      setShowNewNote(false);
      setFormData({ note_type: 'Progress Note', content: '' });
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  if (!selectedPatient) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-2" />
          <p>Select a patient to view medical notes</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Medical Notes</h2>
        <button
          onClick={() => setShowNewNote(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          <Plus className="h-4 w-4" />
          <span>Add Note</span>
        </button>
      </div>

      {showNewNote && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note Type
              </label>
              <select
                value={formData.note_type}
                onChange={(e) => setFormData(prev => ({ ...prev, note_type: e.target.value as NoteType }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              >
                <option value="Progress Note">Progress Note</option>
                <option value="Follow-up Note">Follow-up Note</option>
                <option value="Consultation Note">Consultation Note</option>
                <option value="Discharge Note">Discharge Note</option>
                <option value="Discharge Summary">Discharge Summary</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Enter your medical note here..."
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowNewNote(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Note
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {notes.length === 0 ? (
          <p className="text-center text-gray-500">No medical notes available</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {note.doctor_name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(note.created_at)} at {formatTime(note.created_at)}
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-2">
                    {note.note_type}
                  </span>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{note.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MedicalNotes;