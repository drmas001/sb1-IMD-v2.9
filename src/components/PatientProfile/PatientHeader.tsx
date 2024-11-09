import React, { useState } from 'react';
import { ArrowLeft, Printer, Share2, Copy, Check } from 'lucide-react';
import { useNavigate } from '../../hooks/useNavigate';
import { usePatientStore } from '../../stores/usePatientStore';
import { printPatientProfile } from '../../utils/printService';

const PatientHeader = () => {
  const { selectedPatient } = usePatientStore();
  const { goBack } = useNavigate();
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    if (!selectedPatient || isPrinting) return;
    
    setIsPrinting(true);
    try {
      printPatientProfile(selectedPatient);
    } catch (error) {
      console.error('Print error:', error);
    } finally {
      setIsPrinting(false);
    }
  };

  const formatPatientInfo = () => {
    if (!selectedPatient) return '';
    
    return [
      `Patient Information`,
      `----------------`,
      `Name: ${selectedPatient.name}`,
      `MRN: ${selectedPatient.mrn}`,
      `Department: ${selectedPatient.department || 'Not assigned'}`,
      `Admission Date: ${selectedPatient.admission_date ? new Date(selectedPatient.admission_date).toLocaleDateString() : 'Not available'}`,
      `Doctor: ${selectedPatient.doctor_name || 'Not assigned'}`
    ].join('\n');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formatPatientInfo());
      setCopied(true);
      setShareError(null);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setShareError('Unable to copy to clipboard. Please try again.');
      setTimeout(() => setShareError(null), 3000);
    }
  };

  const handleShare = async () => {
    if (!selectedPatient) return;
    setShareError(null);

    const shareData = {
      title: `Patient: ${selectedPatient.name}`,
      text: formatPatientInfo()
    };

    try {
      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await copyToClipboard();
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          // User cancelled sharing - no need to show error
          return;
        }
        // Fallback to clipboard if sharing fails
        await copyToClipboard();
      }
    }
  };

  const handleDischarge = () => {
    if (!selectedPatient) return;
    const event = new CustomEvent('navigate', { detail: 'discharge' });
    window.dispatchEvent(event);
  };

  if (!selectedPatient) {
    return null;
  }

  const isActive = selectedPatient.admissions?.[0]?.status === 'active';
  const canShare = navigator.canShare && navigator.canShare({
    title: 'Test',
    text: 'Test'
  });

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={goBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h1>
            <p className="text-gray-600">MRN: {selectedPatient.mrn}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={canShare ? handleShare : copyToClipboard}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
            aria-label={canShare ? "Share patient information" : "Copy patient information"}
          >
            {copied ? (
              <Check className="h-5 w-5 text-green-600" />
            ) : (
              <>
                {canShare ? (
                  <Share2 className="h-5 w-5 text-gray-600" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-600" />
                )}
              </>
            )}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {canShare ? "Share" : copied ? "Copied!" : "Copy to clipboard"}
            </span>
          </button>
          
          <button
            onClick={handlePrint}
            disabled={isPrinting}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Print patient information"
          >
            <Printer className={`h-5 w-5 ${isPrinting ? 'text-indigo-600 animate-pulse' : 'text-gray-600'}`} />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {isPrinting ? 'Preparing...' : 'Print'}
            </span>
          </button>
          
          {isActive && (
            <button
              onClick={handleDischarge}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-colors"
            >
              Discharge
            </button>
          )}
        </div>
      </div>

      {shareError && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">
          {shareError}
        </div>
      )}
    </div>
  );
};

export default PatientHeader;