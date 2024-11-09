import { format } from 'date-fns';

interface PrintablePatient {
  name: string;
  mrn: string;
  department?: string;
  doctor_name?: string;
  admission_date?: string;
  diagnosis?: string;
  admissions?: Array<{
    status: string;
    admission_date: string;
    discharge_date?: string | null;
    department: string;
    diagnosis: string;
    visit_number: number;
    safety_type?: string | null;
    users?: {
      name: string;
    };
  }>;
}

export const printPatientProfile = (patient: PrintablePatient) => {
  // Store current scroll position
  const scrollPos = window.scrollY;

  // Create print container
  const printContainer = document.createElement('div');
  printContainer.className = 'print-container';
  
  // Create style element
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      body * {
        visibility: hidden;
      }
      .print-container, .print-container * {
        visibility: visible;
      }
      .print-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
      @page {
        size: A4;
        margin: 2cm;
      }
      .page-break {
        page-break-after: always;
      }
    }
  `;
  
  // Create content
  const content = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1e40af; margin: 0;">IMD-Care</h1>
        <p style="color: #6b7280; margin: 5px 0;">Internal Medicine Department</p>
        <p style="color: #6b7280; margin: 5px 0;">Patient Profile Report</p>
        <p style="color: #6b7280; margin: 5px 0;">${format(new Date(), 'dd, MM, yyyy HH:mm')}</p>
      </div>

      <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #1f2937; margin: 0 0 15px 0;">Patient Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; width: 150px;">Name:</td>
            <td style="padding: 8px 0; color: #1f2937;">${patient.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">MRN:</td>
            <td style="padding: 8px 0; color: #1f2937;">${patient.mrn}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Current Department:</td>
            <td style="padding: 8px 0; color: #1f2937;">${patient.department || 'Not assigned'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Attending Doctor:</td>
            <td style="padding: 8px 0; color: #1f2937;">${patient.doctor_name || 'Not assigned'}</td>
          </tr>
        </table>
      </div>

      ${patient.admissions && patient.admissions.length > 0 ? `
        <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #1f2937; margin: 0 0 15px 0;">Admission History</h2>
          ${patient.admissions.map((admission, index) => `
            <div style="margin-bottom: ${index < patient.admissions!.length - 1 ? '20px' : '0'}; padding-bottom: ${index < patient.admissions!.length - 1 ? '20px' : '0'}; ${index < patient.admissions!.length - 1 ? 'border-bottom: 1px solid #e5e7eb;' : ''}">
              <div style="margin-bottom: 10px;">
                <span style="font-weight: bold; color: #1f2937;">Visit #${admission.visit_number}</span>
                <span style="margin-left: 10px; padding: 2px 8px; border-radius: 9999px; font-size: 12px; ${
                  admission.status === 'active'
                    ? 'background-color: #dcfce7; color: #166534;'
                    : 'background-color: #f3f4f6; color: #1f2937;'
                }">${admission.status}</span>
                ${admission.safety_type ? `
                  <span style="margin-left: 10px; padding: 2px 8px; border-radius: 9999px; font-size: 12px; ${
                    admission.safety_type === 'emergency'
                      ? 'background-color: #fee2e2; color: #991b1b;'
                      : admission.safety_type === 'observation'
                      ? 'background-color: #fef9c3; color: #854d0e;'
                      : 'background-color: #dcfce7; color: #166534;'
                  }">Safety - ${admission.safety_type}</span>
                ` : ''}
              </div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 4px 0; color: #6b7280; width: 150px;">Admission Date:</td>
                  <td style="padding: 4px 0; color: #1f2937;">${format(new Date(admission.admission_date), 'dd, MM, yyyy')}</td>
                </tr>
                ${admission.discharge_date ? `
                  <tr>
                    <td style="padding: 4px 0; color: #6b7280;">Discharge Date:</td>
                    <td style="padding: 4px 0; color: #1f2937;">${format(new Date(admission.discharge_date), 'dd, MM, yyyy')}</td>
                  </tr>
                ` : ''}
                <tr>
                  <td style="padding: 4px 0; color: #6b7280;">Department:</td>
                  <td style="padding: 4px 0; color: #1f2937;">${admission.department}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #6b7280;">Doctor:</td>
                  <td style="padding: 4px 0; color: #1f2937;">${admission.users?.name || 'Not assigned'}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #6b7280;">Diagnosis:</td>
                  <td style="padding: 4px 0; color: #1f2937;">${admission.diagnosis}</td>
                </tr>
              </table>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 12px;">
        <p>Generated by IMD-Care System</p>
        <p>This is a computer-generated document and does not require a signature</p>
      </div>
    </div>
  `;

  printContainer.innerHTML = content;

  // Add elements to document
  document.head.appendChild(style);
  document.body.appendChild(printContainer);

  // Print with a slight delay to ensure styles are applied
  setTimeout(() => {
    window.print();
    
    // Cleanup after print dialog closes
    window.addEventListener('afterprint', () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      if (document.body.contains(printContainer)) {
        document.body.removeChild(printContainer);
      }
      window.scrollTo(0, scrollPos);
    }, { once: true });
  }, 100);
};