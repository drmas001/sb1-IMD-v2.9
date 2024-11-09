import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

interface ExportData {
  patients: any[];
  consultations: any[];
  appointments: any[];
  activeTab: string;
  dateFilter: {
    startDate: string;
    endDate: string;
    period: string;
  };
}

export const exportToPDF = ({ patients, consultations, appointments, activeTab, dateFilter }: ExportData) => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    let currentY = 15;

    // Add header
    doc.setFontSize(20);
    doc.text('IMD-Care Report', pageWidth / 2, currentY, { align: 'center' });
    
    currentY += 10;
    doc.setFontSize(12);
    doc.text(`Generated on: ${format(new Date(), 'dd/MM/yyyy HH:mm')}`, pageWidth / 2, currentY, { align: 'center' });
    
    if (dateFilter.startDate && dateFilter.endDate) {
      currentY += 7;
      doc.text(
        `Period: ${format(new Date(dateFilter.startDate), 'dd/MM/yyyy')} to ${format(new Date(dateFilter.endDate), 'dd/MM/yyyy')}`,
        pageWidth / 2,
        currentY,
        { align: 'center' }
      );
    }
    
    currentY += 15;

    // Active Admissions Section
    if (activeTab === 'all' || activeTab === 'admissions') {
      if (patients.length > 0) {
        doc.setFontSize(14);
        doc.text('Active Admissions', 14, currentY);
        currentY += 10;

        const admissionsData = patients.map(patient => [
          patient.name,
          patient.mrn,
          patient.department,
          format(new Date(patient.admission_date), 'dd/MM/yyyy'),
          patient.diagnosis,
          patient.doctor_name || 'Not assigned',
          patient.admissions?.[0]?.safety_type || 'N/A'
        ]);

        autoTable(doc, {
          startY: currentY,
          head: [['Patient Name', 'MRN', 'Department', 'Admission Date', 'Diagnosis', 'Doctor', 'Safety Type']],
          body: admissionsData,
          theme: 'striped',
          headStyles: {
            fillColor: [63, 81, 181],
            fontSize: 10,
            cellPadding: 2
          },
          bodyStyles: {
            fontSize: 9,
            cellPadding: 2
          },
          columnStyles: {
            0: { cellWidth: 30 },
            1: { cellWidth: 25 },
            2: { cellWidth: 30 },
            3: { cellWidth: 25 },
            4: { cellWidth: 35 },
            5: { cellWidth: 25 },
            6: { cellWidth: 20 }
          }
        });

        currentY = (doc as any).lastAutoTable.finalY + 15;
      }
    }

    // Medical Consultations Section
    if (activeTab === 'all' || activeTab === 'consultations') {
      if (consultations.length > 0) {
        if (currentY > doc.internal.pageSize.height - 60) {
          doc.addPage();
          currentY = 15;
        }

        doc.setFontSize(14);
        doc.text('Medical Consultations', 14, currentY);
        currentY += 10;

        const consultationsData = consultations.map(consultation => [
          consultation.patient_name,
          consultation.mrn,
          consultation.consultation_specialty,
          format(new Date(consultation.created_at), 'dd/MM/yyyy'),
          consultation.urgency.toUpperCase(),
          consultation.reason
        ]);

        autoTable(doc, {
          startY: currentY,
          head: [['Patient Name', 'MRN', 'Specialty', 'Date', 'Urgency', 'Reason']],
          body: consultationsData,
          theme: 'striped',
          headStyles: {
            fillColor: [63, 81, 181],
            fontSize: 10,
            cellPadding: 2
          },
          bodyStyles: {
            fontSize: 9,
            cellPadding: 2
          },
          columnStyles: {
            0: { cellWidth: 30 },
            1: { cellWidth: 25 },
            2: { cellWidth: 30 },
            3: { cellWidth: 25 },
            4: { cellWidth: 20 },
            5: { cellWidth: 'auto' }
          }
        });

        currentY = (doc as any).lastAutoTable.finalY + 15;
      }
    }

    // Clinic Appointments Section
    if (activeTab === 'all' || activeTab === 'appointments') {
      if (appointments.length > 0) {
        if (currentY > doc.internal.pageSize.height - 60) {
          doc.addPage();
          currentY = 15;
        }

        doc.setFontSize(14);
        doc.text('Clinic Appointments', 14, currentY);
        currentY += 10;

        const appointmentsData = appointments.map(appointment => [
          appointment.patientName,
          appointment.medicalNumber,
          appointment.specialty,
          format(new Date(appointment.createdAt), 'dd/MM/yyyy'),
          appointment.appointmentType.toUpperCase(),
          appointment.status.toUpperCase(),
          appointment.notes || ''
        ]);

        autoTable(doc, {
          startY: currentY,
          head: [['Patient Name', 'MRN', 'Specialty', 'Date', 'Type', 'Status', 'Notes']],
          body: appointmentsData,
          theme: 'striped',
          headStyles: {
            fillColor: [63, 81, 181],
            fontSize: 10,
            cellPadding: 2
          },
          bodyStyles: {
            fontSize: 9,
            cellPadding: 2
          },
          columnStyles: {
            0: { cellWidth: 30 },
            1: { cellWidth: 25 },
            2: { cellWidth: 30 },
            3: { cellWidth: 25 },
            4: { cellWidth: 20 },
            5: { cellWidth: 20 },
            6: { cellWidth: 'auto' }
          }
        });
      }
    }

    // Add footer with page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }

    // Save the PDF
    doc.save(`imd-care-report-${format(new Date(), 'dd-MM-yyyy-HHmm')}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate report');
  }
};