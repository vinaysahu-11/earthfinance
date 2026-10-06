import {
  Lead,
  LeadNote,
  LeadStatusHistory,
  Appointment,
  DashboardStats,
  LeadStatus,
  AppointmentStatus
} from '../types';

export const SEED_DEMO_LEADS: Lead[] = [
  {
    id: 'demo-lead-101',
    name: 'Rajeshwar Singhania (Mahamaya Sponge Iron Pvt. Ltd.)',
    phone: '+91 98261 44120',
    email: 'r.singhania@mahamayasponge.in',
    loan_type: 'Machinery & Plant Modernization Loan',
    required_amount: '₹4,50,00,000',
    city: 'Raipur, CG',
    business_type: 'Steel & Sponge Iron Manufacturing',
    message: 'Looking for 4.5 Cr capex term facility for 12 MW WHRB captive power turbine upgrade at Urla Industrial Area. Audited 3-year financials and pollution board NOC ready.',
    source: 'Direct Portal Mandate',
    status: 'APPROVED',
    assigned_to: 'staff-1',
    assigned_to_name: 'Vikramaditya Soni',
    created_at: '2025-05-12T10:15:00.000Z',
    updated_at: '2025-05-14T16:30:00.000Z'
  },
  {
    id: 'demo-lead-102',
    name: 'Dr. Ananya Verma (Apex Superspeciality Hospital)',
    phone: '+91 94252 88310',
    email: 'dr.ananya@apexhospitalbhilai.com',
    loan_type: 'Medical Equipment & Hospital Expansion Loan',
    required_amount: '₹2,80,00,000',
    city: 'Bhilai, CG',
    business_type: 'Healthcare & Diagnostics',
    message: 'Financing required for Siemens 3T MRI and Cath Lab installation at Nehru Nagar facility. Existing banking with SBI, seeking competitive equipment finance.',
    source: 'CA Partner Referral',
    status: 'PROCESSING',
    assigned_to: 'staff-2',
    assigned_to_name: 'Meenakshi Iyer',
    created_at: '2025-05-13T11:40:00.000Z',
    updated_at: '2025-05-14T14:20:00.000Z'
  },
  {
    id: 'demo-lead-103',
    name: 'Suresh Kumar Agrawal (Chhattisgarh Rice & Agro Mills)',
    phone: '+91 99268 19045',
    email: 'suresh@cgagromills.co.in',
    loan_type: 'Cash Credit (CC) & Working Capital Limit',
    required_amount: '₹3,20,00,000',
    city: 'Bilaspur, CG',
    business_type: 'Agro Processing & Rice Milling',
    message: 'Need enhancement of Cash Credit limit ahead of Kharif paddy procurement season. Collateral includes 4.2 acre industrial plot and sortex plant in Tifra.',
    source: 'Website EMI Calculator',
    status: 'DOCUMENTS_RECEIVED',
    assigned_to: 'staff-1',
    assigned_to_name: 'Vikramaditya Soni',
    created_at: '2025-05-11T09:25:00.000Z',
    updated_at: '2025-05-14T11:10:00.000Z'
  },
  {
    id: 'demo-lead-104',
    name: 'Prashant Khandelwal (Khandelwal Logistics & Fleet Corp)',
    phone: '+91 97550 72390',
    email: 'prashant@khandelwallogistics.in',
    loan_type: 'Commercial Vehicle & Fleet Financing',
    required_amount: '₹1,95,00,000',
    city: 'Raipur, CG',
    business_type: 'Mining & Bulk Logistics',
    message: 'Acquiring 6 Tata Prima 5530.S tippers for SECL & NMDC coal transportation tender. Letter of Intent from principal contractor available.',
    source: 'WhatsApp Advisory Desk',
    status: 'DISBURSED',
    assigned_to: 'staff-3',
    assigned_to_name: 'Harshvardhan Tiwari',
    created_at: '2025-05-06T14:00:00.000Z',
    updated_at: '2025-05-13T17:45:00.000Z'
  },
  {
    id: 'demo-lead-105',
    name: 'Nitin Deshmukh (Vidarbha Solar & Infra Projects)',
    phone: '+91 98230 56411',
    email: 'nitin@vidarbhasolar.com',
    loan_type: 'Project Finance & Bank Guarantee (BG)',
    required_amount: '₹6,00,00,000',
    city: 'Nagpur, MH',
    business_type: 'Renewable Energy & EPC',
    message: 'Non-fund based Bank Guarantee (BG) of ₹3.5 Cr and Working Capital Term Loan of ₹2.5 Cr for state discom solar feeder tender.',
    source: 'Direct Portal Mandate',
    status: 'NEW',
    assigned_to: 'staff-2',
    assigned_to_name: 'Meenakshi Iyer',
    created_at: '2025-05-15T08:30:00.000Z',
    updated_at: '2025-05-15T08:30:00.000Z'
  },
  {
    id: 'demo-lead-106',
    name: 'Gaurav Baghel (Narmada Cold Chain & Warehousing)',
    phone: '+91 91091 33489',
    email: 'gaurav@narmadacoldchain.in',
    loan_type: 'Warehouse Construction & NABARD Subsidy Loan',
    required_amount: '₹1,60,00,000',
    city: 'Durg, CG',
    business_type: 'Cold Storage & Supply Chain',
    message: 'Setting up 5,000 MT multi-chamber cold storage near Dhamdha highway. Seeking term loan under Agriculture Infrastructure Fund (AIF) 3% interest subvention.',
    source: 'Industry Seminar',
    status: 'CONTACTED',
    assigned_to: 'staff-4',
    assigned_to_name: 'Priyanka Deshmukh',
    created_at: '2025-05-14T15:10:00.000Z',
    updated_at: '2025-05-15T09:15:00.000Z'
  },
  {
    id: 'demo-lead-107',
    name: 'Abhishek Jain (Arihant Jewels & Bullion House)',
    phone: '+91 98271 60922',
    email: 'abhishek@arihantjewelsraipur.com',
    loan_type: 'Loan Against Property (LAP - Commercial)',
    required_amount: '₹2,25,00,000',
    city: 'Raipur, CG',
    business_type: 'Retail & Wholesale Jewellery',
    message: 'Commercial showroom property at Sadar Bazar (clear freehold title, valuation ~₹4.8 Cr) offered as collateral for showroom expansion in Pandri.',
    source: 'CA Partner Referral',
    status: 'DOCUMENTS_REQUESTED',
    assigned_to: 'staff-1',
    assigned_to_name: 'Vikramaditya Soni',
    created_at: '2025-05-12T13:20:00.000Z',
    updated_at: '2025-05-14T12:00:00.000Z'
  },
  {
    id: 'demo-lead-108',
    name: 'Manish Patidar (Satpura Bio-Polymers LLP)',
    phone: '+91 94240 77812',
    email: 'mpatidar@satpurapolymers.in',
    loan_type: 'CGTMSE Collateral-Free MSME Business Loan',
    required_amount: '₹85,00,000',
    city: 'Rajnandgaon, CG',
    business_type: 'Packaging & Polymers',
    message: 'MSME Udyam registered unit manufacturing biodegradable packaging bags. Looking for collateral-free CGTMSE hybrid facility.',
    source: 'Direct Portal Mandate',
    status: 'FOLLOW_UP',
    assigned_to: 'staff-3',
    assigned_to_name: 'Harshvardhan Tiwari',
    created_at: '2025-05-10T16:45:00.000Z',
    updated_at: '2025-05-13T10:30:00.000Z'
  },
  {
    id: 'demo-lead-109',
    name: 'Vikash Bansal (Korba Power Mech & Fabricators)',
    phone: '+91 99815 41209',
    email: 'vbansal@korbapowermech.com',
    loan_type: 'Invoice Discounting & Supply Chain Finance',
    required_amount: '₹1,10,00,000',
    city: 'Korba, CG',
    business_type: 'Heavy Engineering & Fabrication',
    message: 'TReDS and bill discounting facility against NTPC & BALCO approved vendor invoices (90-day payment cycle).',
    source: 'WhatsApp Advisory Desk',
    status: 'APPROVED',
    assigned_to: 'staff-2',
    assigned_to_name: 'Meenakshi Iyer',
    created_at: '2025-05-08T11:00:00.000Z',
    updated_at: '2025-05-14T17:10:00.000Z'
  },
  {
    id: 'demo-lead-110',
    name: 'Kavita Sahu (Shree Krishna Residency & Builders)',
    phone: '+91 93012 95400',
    email: 'kavita@shreekrishnabuilders.in',
    loan_type: 'Commercial Construction & Lease Rental Discounting',
    required_amount: '₹5,40,00,000',
    city: 'Raipur, CG',
    business_type: 'Commercial Real Estate',
    message: 'LRD facility against Grade-A corporate office building at Naya Raipur Sector-24 leased to nationalized banks and IT tenants.',
    source: 'Direct Portal Mandate',
    status: 'NEW',
    assigned_to: 'staff-1',
    assigned_to_name: 'Vikramaditya Soni',
    created_at: '2025-05-15T10:05:00.000Z',
    updated_at: '2025-05-15T10:05:00.000Z'
  }
];

export const SEED_DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: 'demo-appt-201',
    lead_id: 'demo-lead-101',
    name: 'Rajeshwar Singhania (Mahamaya Sponge Iron)',
    phone: '+91 98261 44120',
    email: 'r.singhania@mahamayasponge.in',
    service: 'Sanction Letter Structuring & Consortium Sign-off',
    appointment_date: '2025-05-16',
    appointment_time: '11:30 AM',
    consultation_type: 'OFFICE',
    meeting_link: null,
    status: 'CONFIRMED',
    notes: 'Board resolution, CMA data FY25-27, and collateral valuation report to be reviewed at Raipur Corporate HQ.',
    assigned_to: 'staff-1',
    assigned_to_name: 'Vikramaditya Soni',
    created_at: '2025-05-13T10:00:00.000Z',
    updated_at: '2025-05-14T12:00:00.000Z'
  },
  {
    id: 'demo-appt-202',
    lead_id: 'demo-lead-102',
    name: 'Dr. Ananya Verma (Apex Superspeciality Hospital)',
    phone: '+91 94252 88310',
    email: 'dr.ananya@apexhospitalbhilai.com',
    service: 'Medical Equipment Proforma & DSCR Assessment',
    appointment_date: '2025-05-16',
    appointment_time: '02:30 PM',
    consultation_type: 'ONLINE',
    meeting_link: 'https://meet.google.com/efn-apex-mri',
    status: 'CONFIRMED',
    notes: 'Siemens Healthcare commercial quote and 5-year cashflow projection walkthrough with HDFC & SIDBI credit managers.',
    assigned_to: 'staff-2',
    assigned_to_name: 'Meenakshi Iyer',
    created_at: '2025-05-14T09:30:00.000Z',
    updated_at: '2025-05-14T15:00:00.000Z'
  },
  {
    id: 'demo-appt-203',
    lead_id: 'demo-lead-105',
    name: 'Nitin Deshmukh (Vidarbha Solar & Infra Projects)',
    phone: '+91 98230 56411',
    email: 'nitin@vidarbhasolar.com',
    service: 'Bank Guarantee Margin & EPC Limit Structuring',
    appointment_date: '2025-05-17',
    appointment_time: '10:30 AM',
    consultation_type: 'ONLINE',
    meeting_link: 'https://meet.google.com/efn-solar-epc',
    status: 'PENDING',
    notes: 'Initial credit discovery call for ₹6 Cr composite BG + WCTL mandate.',
    assigned_to: 'staff-2',
    assigned_to_name: 'Meenakshi Iyer',
    created_at: '2025-05-15T08:45:00.000Z',
    updated_at: '2025-05-15T08:45:00.000Z'
  },
  {
    id: 'demo-appt-204',
    lead_id: 'demo-lead-103',
    name: 'Suresh Kumar Agrawal (Chhattisgarh Rice & Agro Mills)',
    phone: '+91 99268 19045',
    email: 'suresh@cgagromills.co.in',
    service: 'Stock Audit & Cash Credit Enhancement Briefing',
    appointment_date: '2025-05-17',
    appointment_time: '04:00 PM',
    consultation_type: 'OFFICE',
    meeting_link: null,
    status: 'CONFIRMED',
    notes: 'Reviewing GSTR-3B vs Books reconciliation and FCI custom milling agreement.',
    assigned_to: 'staff-1',
    assigned_to_name: 'Vikramaditya Soni',
    created_at: '2025-05-12T16:15:00.000Z',
    updated_at: '2025-05-14T11:20:00.000Z'
  },
  {
    id: 'demo-appt-205',
    lead_id: 'demo-lead-106',
    name: 'Gaurav Baghel (Narmada Cold Chain & Warehousing)',
    phone: '+91 91091 33489',
    email: 'gaurav@narmadacoldchain.in',
    service: 'NABARD & AIF 3% Interest Subvention Eligibility Call',
    appointment_date: '2025-05-18',
    appointment_time: '12:00 PM',
    consultation_type: 'PHONE',
    meeting_link: null,
    status: 'PENDING',
    notes: 'DPR preparation checklist and CLU certificate verification.',
    assigned_to: 'staff-4',
    assigned_to_name: 'Priyanka Deshmukh',
    created_at: '2025-05-14T17:00:00.000Z',
    updated_at: '2025-05-14T17:00:00.000Z'
  },
  {
    id: 'demo-appt-206',
    lead_id: 'demo-lead-107',
    name: 'Abhishek Jain (Arihant Jewels & Bullion House)',
    phone: '+91 98271 60922',
    email: 'abhishek@arihantjewelsraipur.com',
    service: 'Commercial LAP Legal & Technical Valuation Review',
    appointment_date: '2025-05-19',
    appointment_time: '03:00 PM',
    consultation_type: 'OFFICE',
    meeting_link: null,
    status: 'RESCHEDULED',
    notes: 'Client requested reschedule by 1 day to include chain of title deeds from 1998.',
    assigned_to: 'staff-1',
    assigned_to_name: 'Vikramaditya Soni',
    created_at: '2025-05-13T11:10:00.000Z',
    updated_at: '2025-05-15T09:00:00.000Z'
  },
  {
    id: 'demo-appt-207',
    lead_id: 'demo-lead-104',
    name: 'Prashant Khandelwal (Khandelwal Logistics & Fleet Corp)',
    phone: '+91 97550 72390',
    email: 'prashant@khandelwallogistics.in',
    service: 'Post-Disbursement RTO Hypothecation & Escrow Handover',
    appointment_date: '2025-05-13',
    appointment_time: '01:00 PM',
    consultation_type: 'OFFICE',
    meeting_link: null,
    status: 'COMPLETED',
    notes: 'Disbursement of ₹1.95 Cr completed via Sundaram Finance & IndusInd Commercial Vehicle desk.',
    assigned_to: 'staff-3',
    assigned_to_name: 'Harshvardhan Tiwari',
    created_at: '2025-05-09T10:00:00.000Z',
    updated_at: '2025-05-13T16:00:00.000Z'
  },
  {
    id: 'demo-appt-208',
    lead_id: 'demo-lead-110',
    name: 'Kavita Sahu (Shree Krishna Residency & Builders)',
    phone: '+91 93012 95400',
    email: 'kavita@shreekrishnabuilders.in',
    service: 'Lease Rental Discounting (LRD) Cashflow Modeling',
    appointment_date: '2025-05-20',
    appointment_time: '11:00 AM',
    consultation_type: 'ONLINE',
    meeting_link: 'https://meet.google.com/efn-lrd-raipur',
    status: 'PENDING',
    notes: 'Reviewing registered lease deeds and escrow rent waterfall structure.',
    assigned_to: 'staff-1',
    assigned_to_name: 'Vikramaditya Soni',
    created_at: '2025-05-15T10:15:00.000Z',
    updated_at: '2025-05-15T10:15:00.000Z'
  }
];

export const SEED_DEMO_LEAD_NOTES: Record<string, LeadNote[]> = {
  'demo-lead-101': [
    {
      id: 'note-1',
      lead_id: 'demo-lead-101',
      author_id: 'staff-1',
      author_name: 'Vikramaditya Soni (Senior Credit Director)',
      note: 'Completed factory inspection at Urla Industrial Area. DSCR stands at 2.14x and TOL/TNW is 1.38. State Bank of India and Bank of Baroda have issued indicative term sheets at 9.15% ROI.',
      created_at: '2025-05-14T15:30:00.000Z'
    },
    {
      id: 'note-2',
      lead_id: 'demo-lead-101',
      author_id: 'staff-2',
      author_name: 'Meenakshi Iyer (Underwriting Lead)',
      note: 'Verified 36 months GSTR-3B, ITR-6, and CIBIL Commercial Rank (CMR-2). Zero DPD across all existing term loans.',
      created_at: '2025-05-13T11:20:00.000Z'
    }
  ],
  'demo-lead-102': [
    {
      id: 'note-3',
      lead_id: 'demo-lead-102',
      author_id: 'staff-2',
      author_name: 'Meenakshi Iyer (Underwriting Lead)',
      note: 'Received Siemens Healthcare proforma invoice (₹2.80 Cr inclusive of turnkey shielding). Processing 85% LTV equipment finance dossier.',
      created_at: '2025-05-14T14:10:00.000Z'
    }
  ]
};

export const SEED_DEMO_LEAD_HISTORY: Record<string, LeadStatusHistory[]> = {
  'demo-lead-101': [
    {
      id: 'hist-1',
      lead_id: 'demo-lead-101',
      old_status: 'PROCESSING',
      new_status: 'APPROVED',
      changed_by_name: 'Vikramaditya Soni',
      remarks: 'Credit committee sanction approved for ₹4.50 Cr @ 9.15% p.a. (7-year door-to-door tenor).',
      created_at: '2025-05-14T16:30:00.000Z'
    },
    {
      id: 'hist-2',
      lead_id: 'demo-lead-101',
      old_status: 'DOCUMENTS_RECEIVED',
      new_status: 'PROCESSING',
      changed_by_name: 'Meenakshi Iyer',
      remarks: 'CMA data and collateral legal opinion uploaded to underwriting desk.',
      created_at: '2025-05-13T14:00:00.000Z'
    },
    {
      id: 'hist-3',
      lead_id: 'demo-lead-101',
      old_status: null,
      new_status: 'NEW',
      changed_by_name: 'System Portal',
      remarks: 'Enterprise credit application submitted via Earth Finance Corporate Portal.',
      created_at: '2025-05-12T10:15:00.000Z'
    }
  ]
};

const LEADS_STORAGE_KEY = 'ef_admin_demo_leads_v1';
const APPT_STORAGE_KEY = 'ef_admin_demo_appts_v1';
const NOTES_STORAGE_KEY = 'ef_admin_demo_notes_v1';
const HIST_STORAGE_KEY = 'ef_admin_demo_hist_v1';

export function getStoredDemoLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore storage errors
  }
  return SEED_DEMO_LEADS;
}

export function saveStoredDemoLeads(leads: Lead[]): void {
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
  } catch {
    // ignore
  }
}

export function getStoredDemoAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(APPT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return SEED_DEMO_APPOINTMENTS;
}

export function saveStoredDemoAppointments(appts: Appointment[]): void {
  try {
    localStorage.setItem(APPT_STORAGE_KEY, JSON.stringify(appts));
  } catch {
    // ignore
  }
}

export function getDemoLeadDetails(id: string) {
  const leads = getStoredDemoLeads();
  const lead = leads.find((l) => l.id === id) || leads[0];

  let notesMap = SEED_DEMO_LEAD_NOTES;
  let histMap = SEED_DEMO_LEAD_HISTORY;
  try {
    const rawNotes = localStorage.getItem(NOTES_STORAGE_KEY);
    if (rawNotes) notesMap = { ...SEED_DEMO_LEAD_NOTES, ...JSON.parse(rawNotes) };
    const rawHist = localStorage.getItem(HIST_STORAGE_KEY);
    if (rawHist) histMap = { ...SEED_DEMO_LEAD_HISTORY, ...JSON.parse(rawHist) };
  } catch {
    // ignore
  }

  const notes = notesMap[lead.id] || [
    {
      id: `note-default-${lead.id}`,
      lead_id: lead.id,
      author_name: lead.assigned_to_name || 'Vikramaditya Soni (Credit Desk)',
      note: `Preliminary credit screening completed for ${lead.name} (${lead.required_amount}). GST turnover and CIBIL CMR profile verified.`,
      created_at: lead.updated_at
    }
  ];

  const statusHistory = histMap[lead.id] || [
    {
      id: `hist-curr-${lead.id}`,
      lead_id: lead.id,
      old_status: 'NEW',
      new_status: lead.status,
      changed_by_name: lead.assigned_to_name || 'Vikramaditya Soni',
      remarks: `Application progressed to ${lead.status} stage following advisor review.`,
      created_at: lead.updated_at
    },
    {
      id: `hist-init-${lead.id}`,
      lead_id: lead.id,
      old_status: null,
      new_status: 'NEW' as LeadStatus,
      changed_by_name: 'Earth Finance Portal',
      remarks: `Received mandate inquiry via ${lead.source}.`,
      created_at: lead.created_at
    }
  ];

  const appointments = getStoredDemoAppointments().filter(
    (a) => a.lead_id === lead.id || a.email === lead.email
  );

  return { lead, notes, statusHistory, appointments };
}

export function updateDemoLeadStatus(id: string, newStatus: LeadStatus, remarks?: string) {
  const leads = getStoredDemoLeads();
  const target = leads.find((l) => l.id === id);
  const oldStatus = target?.status || 'NEW';
  const now = new Date().toISOString();

  const updated = leads.map((l) =>
    l.id === id ? { ...l, status: newStatus, updated_at: now } : l
  );
  saveStoredDemoLeads(updated);

  try {
    const rawHist = localStorage.getItem(HIST_STORAGE_KEY);
    const histMap = rawHist ? JSON.parse(rawHist) : { ...SEED_DEMO_LEAD_HISTORY };
    const existing = histMap[id] || [];
    histMap[id] = [
      {
        id: `hist-${Date.now()}`,
        lead_id: id,
        old_status: oldStatus,
        new_status: newStatus,
        changed_by_name: 'Admin Officer',
        remarks: remarks || `Status updated to ${newStatus}`,
        created_at: now
      },
      ...existing
    ];
    localStorage.setItem(HIST_STORAGE_KEY, JSON.stringify(histMap));
  } catch {
    // ignore
  }
}

export function addDemoLeadNote(id: string, noteText: string) {
  const now = new Date().toISOString();
  try {
    const rawNotes = localStorage.getItem(NOTES_STORAGE_KEY);
    const notesMap = rawNotes ? JSON.parse(rawNotes) : { ...SEED_DEMO_LEAD_NOTES };
    const existing = notesMap[id] || [];
    notesMap[id] = [
      {
        id: `note-${Date.now()}`,
        lead_id: id,
        author_name: 'Admin Officer (Credit Desk)',
        note: noteText,
        created_at: now
      },
      ...existing
    ];
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notesMap));
  } catch {
    // ignore
  }
}

export function updateDemoAppointmentStatus(
  id: string,
  status: AppointmentStatus,
  notes?: string,
  meetingLink?: string
) {
  const appts = getStoredDemoAppointments();
  const now = new Date().toISOString();
  const updated = appts.map((a) =>
    a.id === id
      ? {
          ...a,
          status,
          notes: notes !== undefined && notes !== '' ? notes : a.notes,
          meeting_link: meetingLink !== undefined && meetingLink !== '' ? meetingLink : a.meeting_link,
          updated_at: now
        }
      : a
  );
  saveStoredDemoAppointments(updated);
}

export function buildDemoDashboardStats(): DashboardStats {
  const leads = getStoredDemoLeads();
  const appts = getStoredDemoAppointments();

  return {
    hasData: true,
    metrics: {
      totalLeads: 148 + (leads.length - SEED_DEMO_LEADS.length),
      newLeads: 24 + leads.filter((l) => l.status === 'NEW').length - 2,
      pendingAppointments: appts.filter((a) => a.status === 'PENDING').length + 6,
      todayAppointments: 4,
      applications: 86,
      approvedLeads: 38 + leads.filter((l) => l.status === 'APPROVED').length - 2,
      disbursedLeads: 29 + leads.filter((l) => l.status === 'DISBURSED').length - 1,
      pendingReviews: 6
    },
    statusDistribution: [
      { status: 'NEW', count: 24 },
      { status: 'CONTACTED', count: 19 },
      { status: 'DOCUMENTS_RECEIVED', count: 18 },
      { status: 'PROCESSING', count: 20 },
      { status: 'APPROVED', count: 38 },
      { status: 'DISBURSED', count: 29 }
    ],
    categoryDistribution: [
      { name: 'MSME & Machinery Term Loan', count: 42 },
      { name: 'Cash Credit (CC) & Working Capital', count: 34 },
      { name: 'Project Finance & Bank Guarantee', count: 26 },
      { name: 'Loan Against Property (Commercial LAP)', count: 22 },
      { name: 'Medical & Fleet Equipment Finance', count: 16 },
      { name: 'NABARD & Agro Subsidy Facilities', count: 8 }
    ],
    recentLeads: leads.slice(0, 6),
    upcomingAppointments: appts.slice(0, 6)
  };
}
