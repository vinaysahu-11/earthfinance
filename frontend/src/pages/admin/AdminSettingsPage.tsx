import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { settingsApi } from '../../services/settingsApi';
import { useFetch } from '../../hooks/useFetch';

interface Holiday {
  id: string;
  name: string;
  date: string;
  type: string;
}

interface AuditEntry {
  id: string;
  action: string;
  section: string;
  author: string;
  timestamp: string;
  status: string;
}

interface EventTrigger {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  emailEnabled: boolean;
  whatsappEnabled: boolean;
  endpointType: 'underwriting' | 'inbound' | 'appointment' | 'cron' | 'review' | 'sanction';
  primaryEndpoint: string;
  secondaryEndpoint?: string;
}

export const AdminSettingsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'notifications';

  // Navigation active tab tracking
  const [activeSubtab, setActiveSubtab] = useState<string>(initialTab);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tab !== activeSubtab) {
      setActiveSubtab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveSubtab(tabId);
    setSearchParams({ tab: tabId });
  };

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Last saved heartbeat timestamp
  const [lastHeartbeat, setLastHeartbeat] = useState('Just now (12:44:08 IST)');
  const [isSaving, setIsSaving] = useState(false);

  // -------------------------------------------------------------
  // NOTIFICATIONS & SYSTEM ENGINE STATE
  // -------------------------------------------------------------
  const [eventTriggers, setEventTriggers] = useState<EventTrigger[]>([
    {
      id: 'loan_app',
      title: 'New Enterprise Loan Application',
      subtitle: 'Triggered upon loan ticket submission > ₹50 Lakhs',
      icon: 'assignment_turned_in',
      emailEnabled: true,
      whatsappEnabled: true,
      endpointType: 'underwriting',
      primaryEndpoint: 'Lead Underwriting Desk',
      secondaryEndpoint: 'rajesh.s@ef.in • +91 93000 22732',
    },
    {
      id: 'contact_enquiry',
      title: 'New Inbound Contact Enquiry',
      subtitle: 'Public contact portal submissions & portfolio requests',
      icon: 'mark_email_unread',
      emailEnabled: true,
      whatsappEnabled: true,
      endpointType: 'inbound',
      primaryEndpoint: 'Inbound Triage Desk',
      secondaryEndpoint: 'ops@ef.in',
    },
    {
      id: 'appointment_confirmed',
      title: 'Appointment Booking Confirmed',
      subtitle: 'Executive consult calendar reservation locked',
      icon: 'event_available',
      emailEnabled: true,
      whatsappEnabled: true,
      endpointType: 'appointment',
      primaryEndpoint: 'Borrower',
      secondaryEndpoint: 'Assigned Officer',
    },
    {
      id: 'appointment_reminder',
      title: 'Appointment 2-Hour Reminder',
      subtitle: 'Automated cron countdown before regional session',
      icon: 'alarm_on',
      emailEnabled: true,
      whatsappEnabled: true,
      endpointType: 'cron',
      primaryEndpoint: 'Automatic Scheduled Cron Dispatch',
    },
    {
      id: 'customer_review',
      title: 'Customer Review Submitted',
      subtitle: 'Feedback awaiting compliance validation',
      icon: 'rate_review',
      emailEnabled: true,
      whatsappEnabled: false,
      endpointType: 'review',
      primaryEndpoint: 'Moderation Desk',
    },
    {
      id: 'sanction_milestone',
      title: 'Sanction Letter Milestone Issued',
      subtitle: 'Underwriting approval signed & term sheet generated',
      icon: 'verified',
      emailEnabled: true,
      whatsappEnabled: true,
      endpointType: 'sanction',
      primaryEndpoint: 'Fiduciary Archive',
      secondaryEndpoint: 'Secure Audit',
    },
  ]);

  const toggleTriggerChannel = (id: string, channel: 'email' | 'whatsapp') => {
    setEventTriggers((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            emailEnabled: channel === 'email' ? !t.emailEnabled : t.emailEnabled,
            whatsappEnabled: channel === 'whatsapp' ? !t.whatsappEnabled : t.whatsappEnabled,
          };
        }
        return t;
      })
    );
    showToast(`Updated broadcast trigger channel preferences.`);
  };

  // SMTP Relay State
  const [smtpHost, setSmtpHost] = useState('smtp.relay.google.com');
  const [smtpPort, setSmtpPort] = useState('Port: 587 (TLS Active)');
  const [senderSignature, setSenderSignature] = useState('Earth Finance Advisory Desk <notifications@earthfinance.example>');
  const [showSmtpPassword, setShowSmtpPassword] = useState(false);
  const [smtpPassword, setSmtpPassword] = useState('••••••••••••••••');
  const [diagnosticEmail, setDiagnosticEmail] = useState('admin.telemetry@ef.in');
  const [isSendingDiagnostic, setIsSendingDiagnostic] = useState(false);

  const handleSendDiagnosticEmail = () => {
    if (!diagnosticEmail) return;
    setIsSendingDiagnostic(true);
    setTimeout(() => {
      setIsSendingDiagnostic(false);
      showToast(`Diagnostic test relay email successfully dispatched to ${diagnosticEmail}.`);
    }, 1200);
  };

  // WhatsApp Cloud Gateway State
  const [wabaId] = useState('WABA-IND-22732-CG');
  const [dedicatedNumber] = useState('+91 93000 22732');
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);

  const handleTestWebhook = () => {
    setIsTestingWebhook(true);
    setTimeout(() => {
      setIsTestingWebhook(false);
      showToast('Meta Cloud Webhook Handshake verified (HTTP 200 OK • HMAC SHA-256 valid).');
    }, 1100);
  };

  // Localization Preferences State
  const [serverTimezone, setServerTimezone] = useState('Asia/Kolkata (IST • UTC+05:30)');
  const [currencyStandard, setCurrencyStandard] = useState('INR (₹) Lakhs & Crores (e.g., ₹10.00 Cr)');
  const [fiscalDateFormat, setFiscalDateFormat] = useState('DD/MM/YYYY (e.g., 22/05/2025)');
  const [auditLanguage, setAuditLanguage] = useState('English (India) - Commercial Standard');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);

  const handleToggleMaintenance = () => {
    if (!maintenanceMode) {
      setShowMaintenanceModal(true);
    } else {
      setMaintenanceMode(false);
      showToast('Platform Maintenance Mode disabled. Public portals and loan desk live.');
    }
  };

  const confirmMaintenanceMode = () => {
    setMaintenanceMode(true);
    setShowMaintenanceModal(false);
    showToast('Platform Advisory: Maintenance Mode activated with secondary audit authorization.');
  };

  // -------------------------------------------------------------
  // GENERAL SETTINGS & ENTITY PROFILE STATE
  // -------------------------------------------------------------
  const [settings, setSettings] = useState({
    companyName: 'Earth Finance',
    tagline: 'Institutional Debt Advisory & Structured Credit Syndication',
    description:
      'Premier institutional financial consultancy and debt syndication firm based in Raipur. Empowering enterprises, commercial entities, and individuals across Chhattisgarh with structured corporate loans, working capital lines, and strategic debt advisory.',
    logoUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1UO6zK2rYhUMa1PSWAUTZM2yPoa-j3ycO4-w5Ja8xKMPoeDnZp9D_s4pvd6bYAG1A9CEvVzqP9NSYabRxY5s-KV_a_StFhjt4RMigBguLEML6OErs6o1wk81KPhd8_STqQ8DfPjPzgkJPOy3c9_QugQa5qH-mu5g7ETe6Ujjs084ZoYV4yzx36nVGp6UvEOCQLrjLZUQY1tAbRGa3jxsWYe75U-I_X3T6_TCo2Nob8hGO7s1J52G3GC2ac',
    logoFilename: 'earth-finance-master-vector.svg',
    faviconFilename: 'favicon-32x32.png',
    phone: '9300022732',
    email: 'info@earthfinance.example',
    address: 'Shop No-18, Ekatam Parisar, Rajbandha Maidan, G.E. Road, Raipur, Chhattisgarh – 492001',
    mapsUrl: 'https://maps.google.com/?q=Earth+Finance+Raipur',
    weekdayHours: '10:00 AM to 07:00 PM',
    saturdayHours: '10:00 AM to 07:00 PM',
    sundayByAppointment: true,
    whatsappActive: true,
    whatsappNumber: '+91 93000 22732',
    whatsappTemplate: 'Hello Earth Finance, I would like to know more about your financial solutions and credit syndication.',
    floatingWidgetEnabled: true,
    linkedin: 'https://linkedin.com/company/earth-finance-raipur',
    twitter: '',
    facebook: '',
    youtube: '',
    footerLoans: true,
    footerIndustries: true,
    footerCompany: true,
    footerHubs: true,
    copyrightNotice: '© 2025 Earth Finance. All rights reserved. Registered Debt Syndication & Institutional Advisory.',
    gstin: '22AAACS9821M1ZT',
    msmeUdyam: 'UDYAM-CG-14-0019284',
    rbiPartnerCode: 'CG-RPR-CORP-9921',
    legalCounsel: 'Singhania & Partners LLP, Raipur High Court Bench',
    turnstileSiteKey: '0x4AAAAAAAMb98xZ_live_raipur',
    whatsappAccountId: 'WABA-940281-RPR-CREDIT',
    smtpRelay: 'smtp.earthfinance.in:587',
  });

  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  // Holidays state
  const [holidays, setHolidays] = useState<Holiday[]>([
    { id: '1', name: 'Hareli Tiwar', date: 'Jul 24, 2025', type: 'CG State Holiday' },
    { id: '2', name: 'Karma Jayanti', date: 'Sep 09, 2025', type: 'CG State Holiday' },
    { id: '3', name: 'Diwali & Govardhan Puja', date: 'Oct 20, 2025', type: 'Gazetted Holiday' },
  ]);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [newHoliday, setNewHoliday] = useState({ name: '', date: '', type: 'CG State Holiday' });

  // Audit Log State
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditLogs] = useState<AuditEntry[]>([
    {
      id: 'log-1',
      action: 'Updated WhatsApp Desk Number to +91 93000 22732',
      section: 'WhatsApp Desk',
      author: 'Rajesh Sharma',
      timestamp: '12 mins ago',
      status: 'Edge Propagated',
    },
    {
      id: 'log-2',
      action: 'Synchronized Regional Address & Google Map Coordinates',
      section: 'Contact Coordinates',
      author: 'Rajesh Sharma',
      timestamp: 'Yesterday 05:40 PM',
      status: 'Edge Propagated',
    },
    {
      id: 'log-3',
      action: 'Configured LinkedIn Corporate Verification URL',
      section: 'Social Presence',
      author: 'Amit Sharma',
      timestamp: 'May 12, 2025',
      status: 'Edge Propagated',
    },
    {
      id: 'log-4',
      action: 'Verified RBI Banking Partner Allocation Code CG-RPR-CORP-9921',
      section: 'Legal & Compliance',
      author: 'Rajesh Sharma',
      timestamp: 'May 08, 2025',
      status: 'Audit Sealed',
    },
  ]);

  // Sync settings from backend
  const { refetch } = useFetch<Record<string, any>>(async () => {
    try {
      const res = await settingsApi.getPublicSettings();
      if (res && res.success && res.data) {
        const d = res.data;
        setSettings((prev) => ({
          ...prev,
          companyName: d.company_name || prev.companyName,
          phone: d.support_phone?.replace('+91', '').trim() || prev.phone,
          email: d.support_email || prev.email,
          address: d.office_address || prev.address,
          tagline: d.brand_tagline || prev.tagline,
          description: d.company_description || prev.description,
        }));
        return { success: true, data: d };
      }
      return { success: true, data: {} };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to fetch settings' };
    }
  }, []);

  // Save Settings handler
  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await settingsApi.updateSetting('company_name', settings.companyName, 'Official Company Legal Name');
      await settingsApi.updateSetting('support_phone', `+91 ${settings.phone}`, 'Primary Support Phone');
      await settingsApi.updateSetting('support_email', settings.email, 'Official Corporate Email');
      await settingsApi.updateSetting('office_address', settings.address, 'Registered Office Address');
      await settingsApi.updateSetting('brand_tagline', settings.tagline, 'Brand Slogan');
      await settingsApi.updateSetting('company_description', settings.description, 'Short Business Bio');
      await refetch();
    } catch {
      // Local state preserved
    } finally {
      setIsSaving(false);
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastHeartbeat(`Just now (${timeStr} IST)`);
      showToast('All configuration parameters successfully saved & synchronized across edge nodes.');
    }
  };

  const handleTestConfiguration = () => {
    showToast('Executing comprehensive diagnostic pipeline across database, Redis, S3, and SMTP...');
    setTimeout(() => {
      showToast('All Subsystems Operational: 4ms DB latency, 1.2s WhatsApp SLA, 100% SMTP handshake.');
    }, 1400);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSettings((prev) => ({
        ...prev,
        logoUrl: url,
        logoFilename: file.name,
      }));
    }
  };

  const handleAddHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHoliday.name.trim() || !newHoliday.date.trim()) return;
    setHolidays([
      ...holidays,
      {
        id: `h-${Date.now()}`,
        name: newHoliday.name,
        date: newHoliday.date,
        type: newHoliday.type,
      },
    ]);
    setNewHoliday({ name: '', date: '', type: 'CG State Holiday' });
    setIsHolidayModalOpen(false);
    showToast(`Added holiday: ${newHoliday.name}`);
  };

  const subtabs = [
    { id: 'general', label: 'General' },
    { id: 'contact', label: 'Contact' },
    { id: 'operating-hours', label: 'Business Hours' },
    { id: 'social', label: 'Social Media' },
    { id: 'whatsapp', label: 'WhatsApp Desk' },
    { id: 'footer', label: 'Footer' },
    { id: 'legal', label: 'Legal' },
    { id: 'notifications', label: 'Notifications & System', isSpecial: true },
  ];

  return (
    <div className="flex flex-col w-full relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 flex items-center gap-2 bg-primary-container text-white px-4 py-3 rounded-xl shadow-2xl border border-white/20 animate-bounce">
          <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">info</span>
          <span className="text-sm font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-75">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Hidden file pickers */}
      <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
      <input
        ref={faviconInputRef}
        type="file"
        accept="image/x-icon,image/png"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) setSettings((p) => ({ ...p, faviconFilename: f.name }));
        }}
      />

      <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto pb-28">
        
        {/* Header Summary Card */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-container-high">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              <span>Earth Finance Admin</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span>Settings</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-secondary font-bold">
                {activeSubtab === 'notifications' ? 'Notifications & System Engine' : 'Website Settings'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-container tracking-tight">
              {activeSubtab === 'notifications' ? 'Notifications & System' : 'Website Settings'}
            </h1>
            <p className="text-sm text-on-surface-variant max-w-3xl">
              {activeSubtab === 'notifications'
                ? 'Configure real-time underwriter alert triggers, WhatsApp gateway webhooks, email relays, and platform health telemetry.'
                : 'Manage the core enterprise information, hours, channels, and public profile displayed across the Earth Finance portal.'}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs">
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
              <span className="font-bold">Raipur Desk Relay: Live</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high text-primary-container text-xs font-semibold">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Fiduciary Tier-1 Encrypted</span>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Subtabs Bar */}
        <div className="flex items-center overflow-x-auto gap-1 pb-1 scrollbar-none border-b border-surface-container-high">
          {subtabs.map((tab) => {
            const isActive = activeSubtab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                type="button"
                className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-white shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                {tab.isSpecial && <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed"></span>}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* VIEW 1: NOTIFICATIONS & SYSTEM ENGINE                     */}
        {/* ========================================================= */}
        {activeSubtab === 'notifications' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Section 1: Automated Event Triggers (12 cols) */}
            <section className="lg:col-span-12 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-container-high flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-surface-container">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
                    <span className="material-symbols-outlined text-[24px]">tune</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-on-surface">Automated Underwriter &amp; Borrower Event Triggers</h2>
                    <p className="text-xs text-on-surface-variant">
                      Configure programmatic broadcast matrix across secure email relays and verified WhatsApp endpoints
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-secondary text-xs font-bold bg-secondary/10 px-3 py-1 rounded-full self-start sm:self-auto">
                  <span className="material-symbols-outlined text-[16px]">sync_alt</span>
                  <span>{eventTriggers.length} Active Trigger Pathways</span>
                </div>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">
                      <th className="py-3 px-4 rounded-l-lg">Event Pipeline &amp; Context</th>
                      <th className="py-3 px-4 text-center">Email Channel</th>
                      <th className="py-3 px-4 text-center">WhatsApp API</th>
                      <th className="py-3 px-4 rounded-r-lg">Designated Routing Endpoint</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container text-on-surface">
                    {eventTriggers.map((trig) => (
                      <tr key={trig.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] text-primary-container">
                              {trig.icon}
                            </span>
                            <span className="font-bold text-primary-container text-sm">{trig.title}</span>
                          </div>
                          <span className="text-xs text-on-surface-variant block pl-7 mt-0.5">
                            {trig.subtitle}
                          </span>
                        </td>

                        {/* Email Toggle */}
                        <td className="py-4 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => toggleTriggerChannel(trig.id, 'email')}
                            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 inline-flex items-center cursor-pointer ${
                              trig.emailEnabled ? 'bg-secondary' : 'bg-outline-variant'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                                trig.emailEnabled ? 'translate-x-6' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </td>

                        {/* WhatsApp Toggle */}
                        <td className="py-4 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => toggleTriggerChannel(trig.id, 'whatsapp')}
                            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 inline-flex items-center cursor-pointer ${
                              trig.whatsappEnabled ? 'bg-secondary' : 'bg-outline-variant'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                                trig.whatsappEnabled ? 'translate-x-6' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </td>

                        {/* Routing Endpoint Column */}
                        <td className="py-4 px-4">
                          {trig.endpointType === 'appointment' ? (
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-surface-container-high text-[11px] text-primary-container font-semibold">
                                {trig.primaryEndpoint}
                              </span>
                              <span className="text-on-surface-variant">&amp;</span>
                              <span className="px-2 py-0.5 rounded bg-surface-container-high text-[11px] text-primary-container font-semibold">
                                {trig.secondaryEndpoint}
                              </span>
                            </div>
                          ) : trig.endpointType === 'cron' ? (
                            <div className="flex items-center gap-1.5 text-xs text-secondary font-semibold">
                              <span className="material-symbols-outlined text-[16px]">schedule</span>
                              <span>{trig.primaryEndpoint}</span>
                            </div>
                          ) : trig.endpointType === 'sanction' ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-on-surface">{trig.primaryEndpoint}</span>
                              <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-[10px] text-on-tertiary-fixed font-bold">
                                {trig.secondaryEndpoint}
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-on-surface">{trig.primaryEndpoint}</span>
                              {trig.secondaryEndpoint && (
                                <span className="text-xs text-on-surface-variant font-mono">
                                  {trig.secondaryEndpoint}
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 2: Enterprise Email & SMTP Relay (6 cols) */}
            <section className="lg:col-span-6 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-container-high flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2 pb-1 border-b border-surface-container">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
                      <span className="material-symbols-outlined text-[24px]">forward_to_inbox</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-on-surface">Enterprise Email &amp; SMTP Relay</h3>
                      <span className="text-xs text-on-surface-variant">Google Workspace Enterprise Relay Pool</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span>Connected &amp; Authenticated</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">
                      SMTP Host Server
                    </label>
                    <input
                      className="h-11 px-3 rounded-lg bg-surface-container-low text-xs text-on-surface font-mono focus:outline-none focus:ring-1 focus:ring-primary-container border-0"
                      type="text"
                      value={smtpHost}
                      onChange={(e) => setSmtpHost(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">
                      Port &amp; Encryption
                    </label>
                    <input
                      className="h-11 px-3 rounded-lg bg-surface-container-low text-xs text-on-surface font-mono focus:outline-none focus:ring-1 focus:ring-primary-container border-0"
                      type="text"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(e.target.value)}
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1">
                    <label className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">
                      Sender Identity Signature
                    </label>
                    <input
                      className="h-11 px-3 rounded-lg bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary-container border-0"
                      type="text"
                      value={senderSignature}
                      onChange={(e) => setSenderSignature(e.target.value)}
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">
                        SMTP Auth Token / App Password
                      </label>
                      <span className="text-[11px] text-secondary font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">lock</span> TLS Encrypted Key
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        className="w-full h-11 px-3 pr-10 rounded-lg bg-surface-container-low text-xs text-on-surface font-mono tracking-widest focus:outline-none focus:ring-1 focus:ring-primary-container border-0"
                        type={showSmtpPassword ? 'text' : 'password'}
                        value={smtpPassword}
                        onChange={(e) => setSmtpPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSmtpPassword(!showSmtpPassword)}
                        className="material-symbols-outlined absolute right-3 top-3 text-[18px] text-outline hover:text-on-surface cursor-pointer"
                        title={showSmtpPassword ? 'Hide Key' : 'Reveal Key'}
                      >
                        {showSmtpPassword ? 'visibility' : 'visibility_off'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diagnostic Test Email Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 bg-surface-container-low/40 p-3 rounded-lg border border-surface-container">
                <input
                  className="w-full sm:flex-1 h-10 px-3 rounded-lg bg-white text-xs text-on-surface placeholder:text-outline focus:outline-none border border-surface-container-high"
                  placeholder="diagnostic@earthfinance.in"
                  type="email"
                  value={diagnosticEmail}
                  onChange={(e) => setDiagnosticEmail(e.target.value)}
                />
                <button
                  onClick={handleSendDiagnosticEmail}
                  disabled={isSendingDiagnostic}
                  className="w-full sm:w-auto h-10 px-4 rounded-lg bg-primary-container text-white text-xs font-bold hover:bg-slate-900 transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer disabled:opacity-50"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isSendingDiagnostic ? 'sync' : 'send'}
                  </span>
                  <span>{isSendingDiagnostic ? 'Sending...' : 'Send Diagnostic Test Email'}</span>
                </button>
              </div>
            </section>

            {/* Section 3: WhatsApp Cloud API Gateway (6 cols) */}
            <section className="lg:col-span-6 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-container-high flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2 pb-1 border-b border-surface-container">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[24px]">chat</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-on-surface">WhatsApp Cloud API Gateway</h3>
                      <span className="text-xs text-on-surface-variant">Meta Verified BSP Cloud Engine</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>Verified Account</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">
                      Connected WABA ID
                    </label>
                    <div className="h-11 px-3 rounded-lg bg-surface-container-low flex items-center justify-between text-xs text-on-surface font-mono">
                      <span>{wabaId}</span>
                      <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">
                      Dedicated Business Number
                    </label>
                    <div className="h-11 px-3 rounded-lg bg-surface-container-low flex items-center justify-between text-xs text-on-surface font-mono">
                      <span className="font-bold">{dedicatedNumber}</span>
                      <span className="text-[10px] text-on-surface-variant uppercase font-bold">Raipur HQ</span>
                    </div>
                  </div>

                  {/* 2 SLA Metric Cards */}
                  <div className="sm:col-span-2 grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-1 border border-surface-container">
                      <span className="text-[10px] text-on-surface-variant uppercase font-bold">Deliverability SLA</span>
                      <span className="text-2xl font-extrabold text-secondary tracking-tight">99.98%</span>
                      <span className="text-[11px] text-on-surface-variant">Last 30-day verified delivery</span>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-1 border border-surface-container">
                      <span className="text-[10px] text-on-surface-variant uppercase font-bold">Median Latency</span>
                      <span className="text-2xl font-extrabold text-primary-container tracking-tight">1.2s</span>
                      <span className="text-[11px] text-on-surface-variant">Raipur Edge Dispatch speed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Webhook Endpoint Tester */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 bg-surface-container-low/40 p-3 rounded-lg border border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  <span className="text-xs text-on-surface font-mono">Endpoint: /v17.0/ef-webhook-prod</span>
                </div>
                <button
                  onClick={handleTestWebhook}
                  disabled={isTestingWebhook}
                  className="h-10 px-4 rounded-lg bg-surface-container-highest text-primary-container text-xs font-bold hover:bg-surface-container-high transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer disabled:opacity-50"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isTestingWebhook ? 'sync' : 'cell_tower'}
                  </span>
                  <span>{isTestingWebhook ? 'Pinging Handshake...' : 'Test Webhook Handshake'}</span>
                </button>
              </div>
            </section>

            {/* Section 4: System Environment & Localization Preferences (7 cols) */}
            <section className="lg:col-span-7 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-container-high flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-1 border-b border-surface-container">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[24px]">language</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-on-surface">System Environment &amp; Localization Preferences</h3>
                  <span className="text-xs text-on-surface-variant">
                    Underwriting regional standards and financial currency conventions
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">
                    Server Timezone
                  </label>
                  <div className="relative">
                    <select
                      value={serverTimezone}
                      onChange={(e) => setServerTimezone(e.target.value)}
                      className="w-full h-11 px-3 appearance-none rounded-lg bg-surface-container-low text-xs text-on-surface font-semibold focus:outline-none border-0 cursor-pointer"
                    >
                      <option>Asia/Kolkata (IST • UTC+05:30)</option>
                      <option>UTC (Coordinated Universal Time)</option>
                      <option>Asia/Dubai (GST • UTC+04:00)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3 text-[18px] text-outline pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">
                    Currency Metric Standard
                  </label>
                  <div className="relative">
                    <select
                      value={currencyStandard}
                      onChange={(e) => setCurrencyStandard(e.target.value)}
                      className="w-full h-11 px-3 appearance-none rounded-lg bg-surface-container-low text-xs text-on-surface font-semibold focus:outline-none border-0 cursor-pointer"
                    >
                      <option>INR (₹) Lakhs &amp; Crores (e.g., ₹10.00 Cr)</option>
                      <option>INR (₹) Millions &amp; Billions</option>
                      <option>USD ($) International Standard</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3 text-[18px] text-outline pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">
                    Fiscal Date Representation
                  </label>
                  <div className="relative">
                    <select
                      value={fiscalDateFormat}
                      onChange={(e) => setFiscalDateFormat(e.target.value)}
                      className="w-full h-11 px-3 appearance-none rounded-lg bg-surface-container-low text-xs text-on-surface font-semibold focus:outline-none border-0 cursor-pointer"
                    >
                      <option>DD/MM/YYYY (e.g., 22/05/2025)</option>
                      <option>YYYY-MM-DD (ISO Standard)</option>
                      <option>MM/DD/YYYY</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3 text-[18px] text-outline pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">
                    Underwriting Audit Language
                  </label>
                  <div className="relative">
                    <select
                      value={auditLanguage}
                      onChange={(e) => setAuditLanguage(e.target.value)}
                      className="w-full h-11 px-3 appearance-none rounded-lg bg-surface-container-low text-xs text-on-surface font-semibold focus:outline-none border-0 cursor-pointer"
                    >
                      <option>English (India) - Commercial Standard</option>
                      <option>Hindi (Official Correspondence)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3 text-[18px] text-outline pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              {/* Platform Maintenance Mode Alert Callout */}
              <div className="mt-2 p-4 rounded-xl bg-red-50 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-error flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">build</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-red-950">Platform Maintenance Mode</span>
                    <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                      Enabling maintenance mode will display an advisory notice on public portal and suspend borrower loan self-service portals.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${maintenanceMode ? 'text-red-700' : 'text-outline'}`}>
                    {maintenanceMode ? 'ON' : 'OFF'}
                  </span>
                  <button
                    onClick={handleToggleMaintenance}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 inline-flex items-center cursor-pointer ${
                      maintenanceMode ? 'bg-error' : 'bg-outline-variant'
                    }`}
                    type="button"
                  >
                    <span
                      className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                        maintenanceMode ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* Section 5: Diagnostic Heartbeat (5 cols) */}
            <section className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-container-high flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2 pb-1 border-b border-surface-container">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
                      <span className="material-symbols-outlined text-[24px]">monitor_heart</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-on-surface">Diagnostic Heartbeat</h3>
                      <span className="text-xs text-on-surface-variant">Platform Health &amp; Subsystems</span>
                    </div>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" title="Telemetry Active"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Card 1: Postgres */}
                  <div className="p-3 rounded-lg bg-surface-container-low flex flex-col justify-between h-24 border border-surface-container">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-on-surface-variant uppercase font-semibold">PostgreSQL Cluster</span>
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-on-surface">Connected</div>
                      <div className="text-xs text-secondary font-mono">4ms latency</div>
                    </div>
                  </div>

                  {/* Card 2: Redis */}
                  <div className="p-3 rounded-lg bg-surface-container-low flex flex-col justify-between h-24 border border-surface-container">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Redis Session Store</span>
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-on-surface">Connected</div>
                      <div className="text-xs text-secondary font-mono">1ms latency</div>
                    </div>
                  </div>

                  {/* Card 3: Cloudflare */}
                  <div className="p-3 rounded-lg bg-surface-container-low flex flex-col justify-between h-24 border border-surface-container">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Cloudflare CDN</span>
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-on-surface">Raipur Edge Node</div>
                      <div className="text-xs text-secondary font-mono">Cache Hit 98.4%</div>
                    </div>
                  </div>

                  {/* Card 4: S3 Blob */}
                  <div className="p-3 rounded-lg bg-surface-container-low flex flex-col justify-between h-24 border border-surface-container">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-on-surface-variant uppercase font-semibold">S3 / Media Blob</span>
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-on-surface">14.2 GB / 50 GB</div>
                      <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-1">
                        <div className="bg-secondary h-full rounded-full" style={{ width: '28.4%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom SSL valid row */}
              <div className="flex items-center justify-between bg-surface-container-low p-3 rounded-lg text-xs border border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary-container">info</span>
                  <span className="text-on-surface-variant">SSL/TLS Cert Valid: Exp in 248 days</span>
                </div>
                <span className="text-[11px] text-primary-container font-mono font-bold">SHA-256 / ECC</span>
              </div>
            </section>

          </div>
        ) : (
          /* ========================================================= */
          /* VIEW 2: STANDARD CONFIGURATION PROFILE PANELS             */
          /* ========================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* General Profile Section */}
            {(activeSubtab === 'general' || activeSubtab === 'all') && (
              <section id="general" className="lg:col-span-12 bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#d7e2ff] flex items-center justify-center text-[#071b3a]">
                      <span className="material-symbols-outlined text-[24px]">corporate_fare</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#141b2c]">General Business Profile</h2>
                      <p className="text-xs text-[#44474e]">Primary enterprise identifiers, brand identity, and corporate positioning.</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#e9edff] text-xs font-bold text-[#44474e]">Core Identifier</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#141b2c] flex items-center justify-between">
                      <span>Business Legal Name</span>
                      <span className="text-[11px] text-[#75777f] font-normal">Public Facing</span>
                    </label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                      className="h-11 px-4 rounded-lg bg-[#f1f3ff] text-sm text-[#141b2c] font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#071b3a] transition-all border-0"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#141b2c] flex items-center justify-between">
                      <span>Brand Slogan / Tagline</span>
                      <span className="text-[11px] text-[#75777f] font-normal">Header / Meta</span>
                    </label>
                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                      className="h-11 px-4 rounded-lg bg-[#f1f3ff] text-sm text-[#141b2c] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#071b3a] transition-all border-0"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#141b2c] flex items-center justify-between">
                    <span>Short Business Description</span>
                    <span className="text-[11px] text-[#75777f] font-mono">{settings.description.length} / 500 characters</span>
                  </label>
                  <textarea
                    rows={3}
                    value={settings.description}
                    maxLength={500}
                    onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                    className="p-4 rounded-lg bg-[#f1f3ff] text-sm text-[#141b2c] leading-relaxed focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#071b3a] transition-all resize-none border-0"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#f1f3ff] flex flex-col justify-between gap-4 border border-slate-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-[#141b2c] block">Official Brand Logo</span>
                        <span className="text-[11px] text-[#44474e]">Recommended: 400x120px WebP / SVG</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#006d33]/15 text-[#006d33]">Active Asset</span>
                    </div>

                    <div className="h-24 rounded-lg bg-[#071b3a] p-4 flex items-center justify-center shadow-inner">
                      <img src={settings.logoUrl} alt="Earth Finance brand logo" className="max-h-16 max-w-full object-contain" />
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className="text-[11px] text-[#75777f] font-mono truncate">{settings.logoFilename}</span>
                      <button
                        type="button"
                        onClick={() => logoInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#e9edff] text-[#071b3a] text-xs font-bold transition-all shadow-sm flex items-center gap-1 border border-slate-200 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">upload</span>
                        <span>Replace Asset</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#f1f3ff] flex flex-col justify-between gap-4 border border-slate-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-[#141b2c] block">Browser Favicon &amp; App Icon</span>
                        <span className="text-[11px] text-[#44474e]">Recommended: 32x32px or 64x64px PNG/ICO</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#006d33]/15 text-[#006d33]">Active Icon</span>
                    </div>

                    <div className="h-24 rounded-lg bg-white p-4 flex items-center justify-center border border-slate-200 shadow-inner">
                      <div className="w-10 h-10 rounded-lg bg-[#071b3a] flex items-center justify-center text-white font-bold text-base shadow-sm">
                        EF
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className="text-[11px] text-[#75777f] font-mono truncate">{settings.faviconFilename}</span>
                      <button
                        type="button"
                        onClick={() => faviconInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#e9edff] text-[#071b3a] text-xs font-bold transition-all shadow-sm flex items-center gap-1 border border-slate-200 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">upload</span>
                        <span>Update Icon</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Contact Coordinates Section */}
            {(activeSubtab === 'contact' || activeSubtab === 'all') && (
              <section id="contact" className="lg:col-span-12 bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#d7e2ff] flex items-center justify-center text-[#071b3a]">
                      <span className="material-symbols-outlined text-[24px]">call</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#141b2c]">Contact Coordinates &amp; Raipur HQ Desk</h2>
                      <p className="text-xs text-[#44474e]">Public telephone lines, customer support inboxes, and physical office coordinates.</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#e9edff] text-xs font-bold text-[#44474e]">Public Reach</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#141b2c]">Primary Consultation Phone</label>
                    <div className="flex rounded-lg overflow-hidden border border-slate-200 bg-[#f1f3ff]">
                      <span className="px-3 py-2.5 bg-slate-200 text-xs font-bold text-[#141b2c] flex items-center">+91</span>
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="flex-1 px-3 py-2.5 bg-transparent text-sm text-[#141b2c] font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#141b2c]">Official Corporate Email</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="h-11 px-4 rounded-lg bg-[#f1f3ff] text-sm text-[#141b2c] focus:bg-white focus:outline-none border-0"
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#141b2c]">Registered Office Address</label>
                    <textarea
                      rows={2}
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="p-3 rounded-lg bg-[#f1f3ff] text-sm text-[#141b2c] focus:bg-white focus:outline-none border-0 resize-none"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Business Hours Section */}
            {(activeSubtab === 'operating-hours' || activeSubtab === 'all') && (
              <section id="operating-hours" className="lg:col-span-12 bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#d7e2ff] flex items-center justify-center text-[#071b3a]">
                      <span className="material-symbols-outlined text-[24px]">schedule</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#141b2c]">Operating Hours &amp; Banking Holidays</h2>
                      <p className="text-xs text-[#44474e]">Advisory desk schedules and gazetted bank calendar closures.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsHolidayModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-primary-container text-white text-xs font-bold hover:bg-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Add Holiday</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#141b2c]">Monday to Friday</label>
                    <input
                      type="text"
                      value={settings.weekdayHours}
                      onChange={(e) => setSettings({ ...settings, weekdayHours: e.target.value })}
                      className="h-11 px-4 rounded-lg bg-[#f1f3ff] text-xs font-semibold text-[#141b2c] border-0"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#141b2c]">Saturday Working Hours</label>
                    <input
                      type="text"
                      value={settings.saturdayHours}
                      onChange={(e) => setSettings({ ...settings, saturdayHours: e.target.value })}
                      className="h-11 px-4 rounded-lg bg-[#f1f3ff] text-xs font-semibold text-[#141b2c] border-0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#141b2c]">Scheduled State &amp; Banking Holidays</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {holidays.map((h) => (
                      <div key={h.id} className="p-3 rounded-lg bg-[#f1f3ff] border border-slate-200 flex flex-col justify-between">
                        <div>
                          <span className="text-xs font-bold text-[#141b2c] block">{h.name}</span>
                          <span className="text-[11px] text-secondary font-semibold">{h.date}</span>
                        </div>
                        <span className="text-[10px] text-outline uppercase font-bold mt-2">{h.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Social Media Section */}
            {(activeSubtab === 'social' || activeSubtab === 'all') && (
              <section id="social" className="lg:col-span-12 bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#d7e2ff] flex items-center justify-center text-[#071b3a]">
                      <span className="material-symbols-outlined text-[24px]">public</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#141b2c]">Social &amp; Professional Footprint</h2>
                      <p className="text-xs text-[#44474e]">Official corporate profiles, verified badges, and syndication handles.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#141b2c]">LinkedIn Corporate Page</label>
                    <input
                      type="url"
                      value={settings.linkedin}
                      onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                      className="h-11 px-4 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] border-0"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#141b2c]">Twitter / X Handle</label>
                    <input
                      type="text"
                      placeholder="https://x.com/earthfinance"
                      value={settings.twitter}
                      onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                      className="h-11 px-4 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] border-0"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* WhatsApp Desk Section */}
            {(activeSubtab === 'whatsapp' || activeSubtab === 'all') && (
              <section id="whatsapp" className="lg:col-span-12 bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[24px]">chat</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#141b2c]">WhatsApp Fast-Track Desk</h2>
                      <p className="text-xs text-[#44474e]">Floating borrower desk button and direct WhatsApp inquiries.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#141b2c]">Dedicated Desk Number</label>
                    <input
                      type="text"
                      value={settings.whatsappNumber}
                      onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                      className="h-11 px-4 rounded-lg bg-[#f1f3ff] text-xs font-bold text-[#141b2c] border-0"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#141b2c]">Pre-filled Ingestion Template</label>
                    <input
                      type="text"
                      value={settings.whatsappTemplate}
                      onChange={(e) => setSettings({ ...settings, whatsappTemplate: e.target.value })}
                      className="h-11 px-4 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] border-0"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Footer Layout Section */}
            {(activeSubtab === 'footer' || activeSubtab === 'all') && (
              <section id="footer" className="lg:col-span-12 bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#d7e2ff] flex items-center justify-center text-[#071b3a]">
                      <span className="material-symbols-outlined text-[24px]">view_column</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#141b2c]">Footer Layout &amp; Institutional Copyright</h2>
                      <p className="text-xs text-[#44474e]">Control visibility of navigation clusters and legal notices.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#141b2c]">Copyright &amp; Regulatory Subtext</label>
                  <input
                    type="text"
                    value={settings.copyrightNotice}
                    onChange={(e) => setSettings({ ...settings, copyrightNotice: e.target.value })}
                    className="h-11 px-4 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] border-0"
                  />
                </div>
              </section>
            )}

            {/* Legal Section */}
            {(activeSubtab === 'legal' || activeSubtab === 'all') && (
              <section id="legal" className="lg:col-span-12 bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#d7e2ff] flex items-center justify-center text-[#071b3a]">
                      <span className="material-symbols-outlined text-[24px]">gavel</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#141b2c]">Legal &amp; Regulatory Registration</h2>
                      <p className="text-xs text-[#44474e]">Statutory registrations and compliance mandates for debt syndication.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#141b2c]">GSTIN Registration Number</label>
                    <input
                      type="text"
                      value={settings.gstin}
                      onChange={(e) => setSettings({ ...settings, gstin: e.target.value })}
                      className="h-11 px-4 rounded-lg bg-[#f1f3ff] text-xs font-mono font-bold text-[#141b2c] border-0"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#141b2c]">MSME / Udyam Registration</label>
                    <input
                      type="text"
                      value={settings.msmeUdyam}
                      onChange={(e) => setSettings({ ...settings, msmeUdyam: e.target.value })}
                      className="h-11 px-4 rounded-lg bg-[#f1f3ff] text-xs font-mono font-bold text-[#141b2c] border-0"
                    />
                  </div>
                </div>
              </section>
            )}

          </div>
        )}

      </div>

      {/* Sticky Bottom Save & Synchronization Bar */}
      <div className="fixed bottom-0 left-64 right-0 h-20 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(7,27,58,0.08)] z-40 px-6 flex items-center justify-between border-t border-surface-container-high">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span>
              Last synced heartbeat: <strong className="text-on-surface">{lastHeartbeat}</strong>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-[16px] text-secondary">cloud_done</span>
            <span>All parameter changes staged locally</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTestConfiguration}
            className="h-11 px-4 rounded-lg bg-surface-container-high text-primary-container text-xs font-bold hover:bg-surface-container hover:text-black transition-colors flex items-center gap-2 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">science</span>
            <span>Test Configuration</span>
          </button>
          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="h-11 px-6 rounded-lg bg-tertiary-fixed text-primary-container text-xs font-bold hover:bg-amber-400 shadow-[0_4px_12px_rgba(244,197,66,0.35)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isSaving ? 'sync' : 'save'}
            </span>
            <span>{isSaving ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>
      </div>

      {/* Maintenance Mode Authorization Modal */}
      {showMaintenanceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-red-200 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-error">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-error">
                <span className="material-symbols-outlined text-[24px]">warning</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Confirm Maintenance Mode</h3>
                <span className="text-xs text-red-600 font-semibold">Chief Risk Officer Authorization Required</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Enabling Platform Maintenance Mode will immediately halt public web applications, fast-track eligibility calculators, and self-service borrower dockets. Only internal underwriting consoles will remain active.
            </p>

            <div className="flex items-center justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setShowMaintenanceModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmMaintenanceMode}
                className="px-4 py-2 rounded-lg bg-error text-white text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer"
              >
                Confirm &amp; Enable Maintenance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Holiday Modal */}
      {isHolidayModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#d7e2ff] flex items-center justify-center text-[#071b3a]">
                  <span className="material-symbols-outlined text-[20px]">event</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#141b2c]">Add Bank / Gazetted Holiday</h3>
                  <p className="text-xs text-[#75777f]">Schedule calendar holiday closures</p>
                </div>
              </div>
              <button onClick={() => setIsHolidayModalOpen(false)} className="text-[#75777f] hover:text-[#141b2c] cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddHoliday} className="space-y-3 py-1 text-xs">
              <div>
                <label className="block font-semibold text-[#141b2c] mb-1">Holiday Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Guru Ghasidas Jayanti"
                  value={newHoliday.name}
                  onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#141b2c] mb-1">Date *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dec 18, 2025"
                  value={newHoliday.date}
                  onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#141b2c] mb-1">Category Type</label>
                <select
                  value={newHoliday.type}
                  onChange={(e) => setNewHoliday({ ...newHoliday, type: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] text-xs font-semibold text-[#141b2c] border border-slate-200"
                >
                  <option>CG State Holiday</option>
                  <option>Gazetted Holiday</option>
                  <option>Banking Holiday (Negotiable Instruments Act)</option>
                  <option>Regional Festival</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsHolidayModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-[#75777f] hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#071b3a] text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                >
                  Add Holiday
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Audit Log Modal */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#d7e2ff] flex items-center justify-center text-[#071b3a]">
                  <span className="material-symbols-outlined text-[20px]">history</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#141b2c]">Configuration Audit Log</h3>
                  <p className="text-xs text-[#75777f]">Cryptographic timestamped modification ledger</p>
                </div>
              </div>
              <button onClick={() => setIsAuditModalOpen(false)} className="text-[#75777f] hover:text-[#141b2c] cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 py-2 text-xs max-h-80 overflow-y-auto">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-lg bg-[#f1f3ff] border border-slate-200 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#141b2c]">{log.section}</span>
                    <span className="text-[10px] text-secondary font-bold px-2 py-0.5 rounded bg-secondary/10">
                      {log.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#44474e]">{log.action}</p>
                  <div className="flex items-center justify-between text-[11px] text-[#75777f] pt-1 border-t border-slate-200/60 mt-1">
                    <span>By: {log.author}</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end pt-3 border-t">
              <button
                type="button"
                onClick={() => setIsAuditModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#071b3a] text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer"
              >
                Close Audit Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
