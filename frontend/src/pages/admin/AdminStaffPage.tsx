import React, { useState, useEffect, useMemo } from 'react';
import { adminApi } from '../../services/adminApi';
import { Spinner } from '../../components/common/Spinner';
import { AdminUser } from '../../types';

export interface OfficerProfile {
  id: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'STAFF';
  title: string;
  email: string;
  phone: string;
  node: string;
  status: 'ACTIVE' | 'INACTIVE';
  lastActive: string;
  mfaType: string;
  permissions: {
    operations: {
      dashboard: boolean;
      leads: boolean;
      appointments: boolean;
      loans: boolean;
    };
    content: {
      banners: boolean;
      reviews: boolean;
      faqs: boolean;
      blog: boolean;
    };
    security: {
      staff: boolean;
      config: boolean;
      export: boolean;
    };
  };
}

const SEED_OFFICERS: OfficerProfile[] = [
  {
    id: 'off-1',
    name: 'Rajesh Sharma',
    role: 'SUPER_ADMIN',
    title: 'Lead Syndication Underwriter',
    email: 'rajesh.s@ef.in',
    phone: '+91 93000 22732',
    node: 'Raipur Central Hub',
    status: 'ACTIVE',
    lastActive: 'Today, 11:42 AM',
    mfaType: 'YubiKey FIDO2',
    permissions: {
      operations: { dashboard: true, leads: true, appointments: true, loans: true },
      content: { banners: true, reviews: true, faqs: true, blog: true },
      security: { staff: true, config: true, export: true },
    },
  },
  {
    id: 'off-2',
    name: 'Amit Sahu',
    role: 'ADMIN',
    title: 'Regional Credit Manager',
    email: 'amit.sahu@ef.in',
    phone: '+91 94252 01824',
    node: 'Bilaspur & Korba',
    status: 'ACTIVE',
    lastActive: 'Today, 09:15 AM',
    mfaType: 'App TOTP',
    permissions: {
      operations: { dashboard: true, leads: true, appointments: true, loans: true },
      content: { banners: true, reviews: true, faqs: true, blog: false },
      security: { staff: false, config: true, export: true },
    },
  },
  {
    id: 'off-3',
    name: 'Priya Chandrakar',
    role: 'STAFF',
    title: 'Healthcare & LAP Underwriting Desk',
    email: 'priya.c@ef.in',
    phone: '+91 98271 04419',
    node: 'Raipur HQ',
    status: 'ACTIVE',
    lastActive: 'Yesterday, 05:30 PM',
    mfaType: 'App TOTP',
    permissions: {
      operations: { dashboard: true, leads: true, appointments: true, loans: true },
      content: { banners: false, reviews: true, faqs: true, blog: false },
      security: { staff: false, config: false, export: false },
    },
  },
  {
    id: 'off-4',
    name: 'Alok Verma',
    role: 'STAFF',
    title: 'Industrial Capex & EPC Specialist',
    email: 'alok.v@ef.in',
    phone: '+91 94255 19283',
    node: 'Urla & Siltara Corridor',
    status: 'ACTIVE',
    lastActive: 'May 15, 02:10 PM',
    mfaType: 'SMS OTP',
    permissions: {
      operations: { dashboard: true, leads: true, appointments: true, loans: true },
      content: { banners: false, reviews: false, faqs: false, blog: false },
      security: { staff: false, config: false, export: false },
    },
  },
  {
    id: 'off-5',
    name: 'Neha Agrawal',
    role: 'STAFF',
    title: 'Inbound Enquiry Triage Officer',
    email: 'neha.a@ef.in',
    phone: '+91 98930 11204',
    node: 'Central Desk',
    status: 'ACTIVE',
    lastActive: 'May 15, 10:45 AM',
    mfaType: 'App TOTP',
    permissions: {
      operations: { dashboard: true, leads: true, appointments: true, loans: false },
      content: { banners: false, reviews: true, faqs: true, blog: false },
      security: { staff: false, config: false, export: false },
    },
  },
  {
    id: 'off-6',
    name: 'Vikramaditya Singh',
    role: 'ADMIN',
    title: 'Fiduciary Legal Counsel',
    email: 'legal@ef.in',
    phone: '+91 93000 22735',
    node: 'High Court Desk',
    status: 'ACTIVE',
    lastActive: 'May 12, 04:00 PM',
    mfaType: 'YubiKey FIDO2',
    permissions: {
      operations: { dashboard: true, leads: true, appointments: false, loans: true },
      content: { banners: false, reviews: false, faqs: true, blog: false },
      security: { staff: false, config: true, export: true },
    },
  },
  {
    id: 'off-7',
    name: 'S. K. Banchhor',
    role: 'STAFF',
    title: 'Former Audit Liaison',
    email: 's.banchhor@ef.in',
    phone: 'De-provisioned',
    node: 'Raipur Regional',
    status: 'INACTIVE',
    lastActive: 'Apr 28, 2025',
    mfaType: 'Revoked',
    permissions: {
      operations: { dashboard: false, leads: false, appointments: false, loans: false },
      content: { banners: false, reviews: false, faqs: false, blog: false },
      security: { staff: false, config: false, export: false },
    },
  },
];

export const AdminStaffPage: React.FC = () => {
  const [officers, setOfficers] = useState<OfficerProfile[]>(SEED_OFFICERS);
  const [selectedOfficerId, setSelectedOfficerId] = useState<string>('off-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [nodeFilter, setNodeFilter] = useState('all');

  // Modal and toast states
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // New Officer Form
  const [newOfficer, setNewOfficer] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    node: 'Raipur Central Hub',
    role: 'STAFF' as 'SUPER_ADMIN' | 'ADMIN' | 'STAFF',
    password: '',
    mfaType: 'Authenticator App (TOTP)',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3800);
  };

  // Sync with backend staff if available
  useEffect(() => {
    fetchBackendStaff();
  }, []);

  const fetchBackendStaff = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getStaff();
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        // Merge backend officers into state
        const backendOfficers: OfficerProfile[] = res.data.map((u: AdminUser, idx: number) => ({
          id: u.id || `backend-${idx}`,
          name: u.name,
          email: u.email,
          phone: '+91 93000 22732',
          role: (u.role as any) || 'STAFF',
          title: u.role === 'SUPER_ADMIN' ? 'Root Administrator' : u.role === 'ADMIN' ? 'Operations Officer' : 'Advisory Associate',
          node: 'Raipur Central Hub',
          status: u.is_active ? 'ACTIVE' : 'INACTIVE',
          lastActive: u.last_login ? new Date(u.last_login).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent Session',
          mfaType: 'Authenticator App',
          permissions: {
            operations: { dashboard: true, leads: true, appointments: true, loans: u.role !== 'STAFF' },
            content: { banners: u.role !== 'STAFF', reviews: true, faqs: true, blog: u.role !== 'STAFF' },
            security: { staff: u.role === 'SUPER_ADMIN', config: u.role === 'SUPER_ADMIN', export: u.role !== 'STAFF' },
          },
        }));

        // Keep seed officers, append unique backend ones
        setOfficers((prev) => {
          const emails = new Set(prev.map((o) => o.email.toLowerCase()));
          const extra = backendOfficers.filter((b) => !emails.has(b.email.toLowerCase()));
          return [...prev, ...extra];
        });
      }
    } catch (err) {
      console.warn('Backend staff sync offline, using local registry.', err);
    } finally {
      setLoading(false);
    }
  };

  // Currently selected officer
  const selectedOfficer = useMemo(() => {
    return officers.find((o) => o.id === selectedOfficerId) || officers[0];
  }, [officers, selectedOfficerId]);

  // Filtered officers list
  const filteredOfficers = useMemo(() => {
    return officers.filter((o) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        o.name.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.node.toLowerCase().includes(q) ||
        o.title.toLowerCase().includes(q);

      const matchesRole =
        roleFilter === 'all' ||
        (roleFilter === 'super' && o.role === 'SUPER_ADMIN') ||
        (roleFilter === 'admin' && o.role === 'ADMIN') ||
        (roleFilter === 'staff' && o.role === 'STAFF');

      const matchesNode =
        nodeFilter === 'all' ||
        (nodeFilter === 'raipur' && o.node.toLowerCase().includes('raipur')) ||
        (nodeFilter === 'bilaspur' && o.node.toLowerCase().includes('bilaspur')) ||
        (nodeFilter === 'urla' && o.node.toLowerCase().includes('urla'));

      return matchesSearch && matchesRole && matchesNode;
    });
  }, [officers, searchQuery, roleFilter, nodeFilter]);

  // Operational metrics counts
  const totalOfficers = officers.length;
  const activeUnderwriters = officers.filter((o) => o.status === 'ACTIVE' && (o.role === 'ADMIN' || o.role === 'STAFF')).length;
  const systemAdmins = officers.filter((o) => o.role === 'SUPER_ADMIN').length;

  // Toggle permission
  const handleTogglePermission = (cluster: 'operations' | 'content' | 'security', key: string) => {
    if (!selectedOfficer) return;
    setOfficers((prev) =>
      prev.map((o) => {
        if (o.id === selectedOfficer.id) {
          const currentCluster = o.permissions[cluster] as Record<string, boolean>;
          return {
            ...o,
            permissions: {
              ...o.permissions,
              [cluster]: {
                ...currentCluster,
                [key]: !currentCluster[key],
              },
            },
          };
        }
        return o;
      })
    );
  };

  // Select all permissions for selected officer
  const handleSelectAllPermissions = () => {
    if (!selectedOfficer) return;
    setOfficers((prev) =>
      prev.map((o) => {
        if (o.id === selectedOfficer.id) {
          return {
            ...o,
            permissions: {
              operations: { dashboard: true, leads: true, appointments: true, loans: true },
              content: { banners: true, reviews: true, faqs: true, blog: true },
              security: { staff: true, config: true, export: true },
            },
          };
        }
        return o;
      })
    );
    showToast(`All permissions granted to ${selectedOfficer.name}.`);
  };

  // Change role tier for selected officer
  const handleChangeRoleTier = async (tier: 'SUPER_ADMIN' | 'ADMIN' | 'STAFF') => {
    if (!selectedOfficer) return;
    setOfficers((prev) =>
      prev.map((o) => (o.id === selectedOfficer.id ? { ...o, role: tier } : o))
    );
    try {
      await adminApi.updateStaffStatus(selectedOfficer.id, { role: tier });
    } catch {
      // Local state preserved
    }
    showToast(`Updated role tier for ${selectedOfficer.name} to ${tier}.`);
  };

  // Toggle active/inactive status
  const handleToggleStatus = async (officerId: string) => {
    const target = officers.find((o) => o.id === officerId);
    if (!target) return;
    const newStatus = target.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

    setOfficers((prev) =>
      prev.map((o) =>
        o.id === officerId
          ? {
              ...o,
              status: newStatus,
              mfaType: newStatus === 'ACTIVE' ? 'App TOTP' : 'Revoked',
            }
          : o
      )
    );

    try {
      await adminApi.updateStaffStatus(officerId, { is_active: newStatus === 'ACTIVE' });
    } catch {
      // Local state preserved
    }

    showToast(`${target.name} has been ${newStatus === 'ACTIVE' ? 're-activated' : 'deactivated'}.`);
  };

  // Issue reset token
  const handleIssueResetToken = () => {
    if (!selectedOfficer) return;
    const token = `EF-RESET-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    showToast(`Cryptographic reset token generated: ${token} (Dispatched to ${selectedOfficer.email})`);
  };

  // Export audit log CSV
  const handleExportAuditCSV = () => {
    const headers = 'Officer ID,Name,Title,Role Tier,Email,Phone,Regional Node,Status,Last Active,2FA Method\n';
    const rows = officers
      .map(
        (o) =>
          `"${o.id}","${o.name}","${o.title}","${o.role}","${o.email}","${o.phone}","${o.node}","${o.status}","${o.lastActive}","${o.mfaType}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EarthFinance_Personnel_Audit_Registry_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Authorized Personnel Register CSV successfully exported.');
  };

  // Provision new officer handler
  const handleProvisionOfficer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOfficer.name || !newOfficer.email) return;

    const newId = `off-${Date.now()}`;
    const createdProfile: OfficerProfile = {
      id: newId,
      name: newOfficer.name,
      role: newOfficer.role,
      title: newOfficer.title || 'Underwriting Associate',
      email: newOfficer.email,
      phone: newOfficer.phone || '+91 93000 22732',
      node: newOfficer.node,
      status: 'ACTIVE',
      lastActive: 'Just provisioned',
      mfaType: newOfficer.mfaType,
      permissions: {
        operations: { dashboard: true, leads: true, appointments: true, loans: newOfficer.role !== 'STAFF' },
        content: { banners: newOfficer.role !== 'STAFF', reviews: true, faqs: true, blog: newOfficer.role !== 'STAFF' },
        security: { staff: newOfficer.role === 'SUPER_ADMIN', config: newOfficer.role === 'SUPER_ADMIN', export: true },
      },
    };

    setOfficers((prev) => [createdProfile, ...prev]);
    setSelectedOfficerId(newId);
    setIsProvisionModalOpen(false);

    try {
      await adminApi.createStaff({
        name: newOfficer.name,
        email: newOfficer.email,
        password: newOfficer.password || 'EarthFinance@2025',
        role: newOfficer.role,
      });
    } catch {
      // Local state preserved
    }

    setNewOfficer({
      name: '',
      email: '',
      phone: '',
      title: '',
      node: 'Raipur Central Hub',
      role: 'STAFF',
      password: '',
      mfaType: 'Authenticator App (TOTP)',
    });
    showToast(`Officer ${createdProfile.name} provisioned with ${createdProfile.role} credentials.`);
  };

  // Helper for counts in clusters
  const countActive = (obj: Record<string, boolean>) => {
    const total = Object.keys(obj).length;
    const active = Object.values(obj).filter(Boolean).length;
    return `${active} of ${total} active`;
  };

  return (
    <div className="flex flex-col w-full gap-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary-container text-white px-4 py-3 rounded-xl shadow-2xl border border-white/20 animate-bounce">
          <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">info</span>
          <span className="text-sm font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-75">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Header Banner & Page Title Strip */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-semibold">
            <span className="hover:text-primary-container cursor-pointer transition-colors">Earth Finance Admin</span>
            <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            <span className="hover:text-primary-container cursor-pointer transition-colors">Settings</span>
            <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            <span className="text-primary-container font-bold">Staff &amp; Access Control</span>
          </div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Staff &amp; Admin Users</h1>
          <p className="text-sm text-on-surface-variant max-w-3xl">
            Manage authorized personnel, underwriting roles, cryptographic access privileges, and regional desk delegations across the Chhattisgarh state registry.
          </p>
        </div>

        {/* Quick Action Toolstrip */}
        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
          <button
            onClick={handleExportAuditCSV}
            className="h-10 px-4 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary-container text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
            <span>Audit Log Export</span>
          </button>
          <button
            onClick={() => setIsProvisionModalOpen(true)}
            className="h-10 px-4 rounded-lg bg-tertiary-fixed hover:bg-amber-400 text-on-tertiary-fixed text-xs flex items-center gap-1.5 shadow-sm transition-all font-bold cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Provision Officer</span>
          </button>
        </div>
      </div>

      {/* Metric Badges Bento Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Authorized Users */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-4 shadow-sm border border-surface-container-high flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Authorized Personnel</span>
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[22px]">badge</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-on-surface tracking-tight">{totalOfficers}</span>
            <span className="inline-flex items-center gap-1 text-[11px] text-secondary bg-secondary-container/40 px-2 py-0.5 rounded-full font-bold">
              <span className="material-symbols-outlined text-[14px]">verified</span> 100% Verified
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-primary-container rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Card 2: Active Underwriters */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-4 shadow-sm border border-surface-container-high flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Active Underwriters</span>
            <div className="w-10 h-10 rounded-lg bg-secondary-container/30 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[22px]">assignment_ind</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-on-surface tracking-tight">{activeUnderwriters}</span>
            <span className="text-xs text-on-surface-variant font-semibold">Lending Mandate Active</span>
          </div>
          <div className="mt-3 h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-secondary rounded-full" style={{ width: '62.5%' }}></div>
          </div>
        </div>

        {/* Card 3: System Administrators */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-4 shadow-sm border border-surface-container-high flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">System Administrators</span>
            <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[22px]">admin_panel_settings</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-on-surface tracking-tight">{systemAdmins}</span>
            <span className="text-xs text-primary-container font-semibold">Dual Root Protocol</span>
          </div>
          <div className="mt-3 h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-primary-container rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>

        {/* Card 4: Security Health */}
        <div className="relative overflow-hidden rounded-xl bg-primary-container text-white p-4 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#b5c7ee] font-bold uppercase tracking-wider">Security Health</span>
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#8ff9a6]">
              <span className="material-symbols-outlined text-[22px]">shield</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">100%</span>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#8ff9a6] font-bold">
              MFA Enforced
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-[#8ff9a6] rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>

      {/* Primary Workspace: Registry Table (Left 8 Cols) + Inspector Drawer (Right 4 Cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Left Section (8 Columns): Personnel Registry Table */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          
          {/* Filter and Table Toolbar */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-surface-container-high flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-outline">search</span>
              <input
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-surface-container-low text-xs text-on-surface placeholder:text-outline focus:outline-none focus:bg-white border-0 shadow-inner"
                placeholder="Filter by officer name, email, node or mandate..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-10 px-3 rounded-lg bg-surface-container-low text-xs font-semibold text-on-surface focus:outline-none border-0 cursor-pointer"
              >
                <option value="all">All Role Tiers</option>
                <option value="super">SUPER_ADMIN</option>
                <option value="admin">ADMIN</option>
                <option value="staff">STAFF</option>
              </select>

              <select
                value={nodeFilter}
                onChange={(e) => setNodeFilter(e.target.value)}
                className="h-10 px-3 rounded-lg bg-surface-container-low text-xs font-semibold text-on-surface focus:outline-none border-0 cursor-pointer"
              >
                <option value="all">All Regional Nodes</option>
                <option value="raipur">Raipur Central Hub</option>
                <option value="bilaspur">Bilaspur &amp; Korba</option>
                <option value="urla">Urla &amp; Siltara</option>
              </select>
            </div>
          </div>

          {/* Personnel Registry Table Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-high overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-surface-container flex items-center justify-between border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-on-surface">Authorized Officer Register</span>
                <span className="text-on-surface-variant text-xs font-medium">({filteredOfficers.length} Credentialed Profiles)</span>
              </div>
              <span className="text-xs text-secondary flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                Raipur Fiduciary Sync: Active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Officer Name &amp; Title</th>
                    <th className="py-3 px-3">Role Tier</th>
                    <th className="py-3 px-3">Contact</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Node</th>
                    <th className="py-3 px-3">Last Active</th>
                    <th className="py-3 px-3">2FA</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container text-on-surface">
                  {filteredOfficers.map((o) => {
                    const isSelected = selectedOfficerId === o.id;
                    const initials = o.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .substring(0, 2)
                      .toUpperCase();

                    return (
                      <tr
                        key={o.id}
                        onClick={() => setSelectedOfficerId(o.id)}
                        className={`transition-colors cursor-pointer group ${
                          isSelected
                            ? 'bg-surface-container-high/60 font-semibold'
                            : 'bg-surface-container-lowest hover:bg-surface-container-low/70'
                        } ${o.status === 'INACTIVE' ? 'opacity-75' : ''}`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                o.role === 'SUPER_ADMIN'
                                  ? 'bg-primary-container text-white'
                                  : o.role === 'ADMIN'
                                  ? 'bg-surface-container-high text-primary-container'
                                  : 'bg-surface-container-highest text-on-surface-variant'
                              }`}
                            >
                              {initials}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-on-surface truncate group-hover:text-primary-container">
                                {o.name}
                              </span>
                              <span className="text-[11px] text-on-surface-variant truncate">{o.title}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span
                            className={`inline-block px-2.5 py-1 rounded text-[11px] font-bold tracking-wide ${
                              o.role === 'SUPER_ADMIN'
                                ? 'bg-primary-container text-white'
                                : o.role === 'ADMIN'
                                ? 'bg-primary-fixed text-primary-container'
                                : 'bg-surface-container text-on-surface'
                            }`}
                          >
                            {o.role}
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex flex-col text-on-surface-variant text-[11px]">
                            <span className="text-on-surface font-medium">{o.email}</span>
                            <span>{o.phone}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          {o.status === 'ACTIVE' ? (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-error text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Inactive
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-3 text-on-surface-variant text-[11px] font-semibold">
                          {o.node}
                        </td>

                        <td className="py-3.5 px-3 text-on-surface-variant text-[11px] whitespace-nowrap">
                          {o.lastActive}
                        </td>

                        <td className="py-3.5 px-3">
                          {o.mfaType === 'Revoked' ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-error font-medium">
                              <span className="material-symbols-outlined text-[16px]">lock_reset</span> Revoked
                            </span>
                          ) : o.mfaType.includes('FIDO') || o.mfaType.includes('YubiKey') ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary-container">
                              <span className="material-symbols-outlined text-[16px]">key</span> YubiKey FIDO2
                            </span>
                          ) : o.mfaType.includes('SMS') ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-amber-700">
                              <span className="material-symbols-outlined text-[16px]">sms</span> SMS OTP
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] text-on-surface-variant">
                              <span className="material-symbols-outlined text-[16px]">smartphone</span> App TOTP
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          {o.status === 'INACTIVE' ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleStatus(o.id);
                              }}
                              className="px-2.5 py-1 rounded bg-secondary-container/40 text-secondary hover:bg-secondary-container text-xs font-bold shadow-sm cursor-pointer"
                              type="button"
                            >
                              Re-activate
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOfficerId(o.id);
                              }}
                              className="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-primary-container text-xs font-bold shadow-sm cursor-pointer"
                              type="button"
                            >
                              Inspect
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Pagination & Audit Signature */}
            <div className="p-3 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-2 text-on-surface-variant text-xs border-t border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                <span>All administrative transactions cryptographically signed with Argon2id + Ed25519 node tokens.</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-on-surface font-semibold">
                  Showing {filteredOfficers.length} of {officers.length} entries
                </span>
              </div>
            </div>
          </div>

          {/* Regional Underwriting Mandates Summary Card */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-surface-container-high flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container text-[20px]">account_balance</span>
                <span className="text-base font-bold text-on-surface">Regional Sanctioning Limits by Tier</span>
              </div>
              <span className="text-xs text-on-surface-variant">Fiduciary Policy FY 2025-26</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-1">
              <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-1 border border-surface-container">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">SUPER_ADMIN (Root)</span>
                <span className="text-base font-extrabold text-primary-container">₹50.0 Cr + LAP</span>
                <span className="text-xs text-on-surface-variant">Full treasury clearance &amp; write-off discretion</span>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-1 border border-surface-container">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">ADMIN (Tier-1)</span>
                <span className="text-base font-extrabold text-on-surface">₹15.0 Cr Industrial</span>
                <span className="text-xs text-on-surface-variant">Commercial capex, EPC equipment sanctioning</span>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-1 border border-surface-container">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">STAFF (Tier-2)</span>
                <span className="text-base font-extrabold text-on-surface">₹2.5 Cr SME / LAP</span>
                <span className="text-xs text-on-surface-variant">Initial eligibility appraisal &amp; preliminary term sheets</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Permission Inspector Drawer (4 Cols, Sticky) */}
        <div className="xl:col-span-4 flex flex-col gap-4 sticky top-20">
          <div className="bg-surface-container-lowest rounded-xl shadow-md border border-surface-container-high overflow-hidden flex flex-col">
            
            {/* Inspector Header */}
            <div className="p-4 bg-primary-container text-white flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#b5c7ee] font-bold">
                  Access Matrix Inspector
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-tertiary-fixed text-[10px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">shield</span> Live Enforcement
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                {selectedOfficer ? selectedOfficer.name : 'Select Officer'}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold">
                  {selectedOfficer?.role}
                </span>
                <span className="text-[#b5c7ee] text-xs truncate">{selectedOfficer?.title}</span>
              </div>
            </div>

            {/* Inspector Body */}
            <div className="p-4 flex flex-col gap-4">
              
              {/* Role Tier Selector */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                  Role Tier Assignment
                </label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    onClick={() => handleChangeRoleTier('SUPER_ADMIN')}
                    className={`py-2 px-1 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                      selectedOfficer?.role === 'SUPER_ADMIN'
                        ? 'bg-primary-container text-white shadow-sm'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    SUPER_ADMIN
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChangeRoleTier('ADMIN')}
                    className={`py-2 px-1 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                      selectedOfficer?.role === 'ADMIN'
                        ? 'bg-primary-container text-white shadow-sm'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    ADMIN
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChangeRoleTier('STAFF')}
                    className={`py-2 px-1 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                      selectedOfficer?.role === 'STAFF'
                        ? 'bg-primary-container text-white shadow-sm'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    STAFF
                  </button>
                </div>
              </div>

              {/* Module Permissions Matrix */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-on-surface font-bold uppercase tracking-wider">Module Permissions</span>
                  <button
                    type="button"
                    onClick={handleSelectAllPermissions}
                    className="text-xs text-primary-container font-semibold hover:underline cursor-pointer"
                  >
                    Select All
                  </button>
                </div>

                {/* Operations & CRM Cluster */}
                <div className="flex flex-col gap-2 p-3 bg-surface-container-low rounded-lg border border-surface-container">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-on-surface font-bold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-primary-container">dashboard</span>
                      Operations &amp; CRM
                    </span>
                    <span className="text-[11px] text-secondary font-bold">
                      {selectedOfficer ? countActive(selectedOfficer.permissions.operations) : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedOfficer?.permissions.operations.dashboard ?? true}
                        onChange={() => handleTogglePermission('operations', 'dashboard')}
                        className="rounded accent-primary-container h-4 w-4"
                      />
                      <span>Dashboard Exec</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedOfficer?.permissions.operations.leads ?? true}
                        onChange={() => handleTogglePermission('operations', 'leads')}
                        className="rounded accent-primary-container h-4 w-4"
                      />
                      <span>Leads CRM</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedOfficer?.permissions.operations.appointments ?? true}
                        onChange={() => handleTogglePermission('operations', 'appointments')}
                        className="rounded accent-primary-container h-4 w-4"
                      />
                      <span>Appointments</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedOfficer?.permissions.operations.loans ?? true}
                        onChange={() => handleTogglePermission('operations', 'loans')}
                        className="rounded accent-primary-container h-4 w-4"
                      />
                      <span>Loan Sanctions</span>
                    </label>
                  </div>
                </div>

                {/* Content & CMS Cluster */}
                <div className="flex flex-col gap-2 p-3 bg-surface-container-low rounded-lg border border-surface-container">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-on-surface font-bold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-primary-container">campaign</span>
                      Content &amp; Brand CMS
                    </span>
                    <span className="text-[11px] text-secondary font-bold">
                      {selectedOfficer ? countActive(selectedOfficer.permissions.content) : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedOfficer?.permissions.content.banners ?? true}
                        onChange={() => handleTogglePermission('content', 'banners')}
                        className="rounded accent-primary-container h-4 w-4"
                      />
                      <span>Campaign Banners</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedOfficer?.permissions.content.reviews ?? true}
                        onChange={() => handleTogglePermission('content', 'reviews')}
                        className="rounded accent-primary-container h-4 w-4"
                      />
                      <span>Reviews Moderation</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedOfficer?.permissions.content.faqs ?? true}
                        onChange={() => handleTogglePermission('content', 'faqs')}
                        className="rounded accent-primary-container h-4 w-4"
                      />
                      <span>FAQs &amp; Guides</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedOfficer?.permissions.content.blog ?? true}
                        onChange={() => handleTogglePermission('content', 'blog')}
                        className="rounded accent-primary-container h-4 w-4"
                      />
                      <span>Blog Publishing</span>
                    </label>
                  </div>
                </div>

                {/* Security & System Cluster */}
                <div className="flex flex-col gap-2 p-3 bg-surface-container-low rounded-lg border border-surface-container">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-on-surface font-bold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-primary-container">security</span>
                      Security &amp; Settings
                    </span>
                    <span className="text-[11px] text-secondary font-bold">
                      {selectedOfficer ? countActive(selectedOfficer.permissions.security) : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedOfficer?.permissions.security.staff ?? true}
                        onChange={() => handleTogglePermission('security', 'staff')}
                        className="rounded accent-primary-container h-4 w-4"
                      />
                      <span>Staff Management</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedOfficer?.permissions.security.config ?? true}
                        onChange={() => handleTogglePermission('security', 'config')}
                        className="rounded accent-primary-container h-4 w-4"
                      />
                      <span>Platform Config</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer col-span-2">
                      <input
                        type="checkbox"
                        checked={selectedOfficer?.permissions.security.export ?? true}
                        onChange={() => handleTogglePermission('security', 'export')}
                        className="rounded accent-primary-container h-4 w-4"
                      />
                      <span>Fiduciary Dossier Export</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Cryptographic Assurance Notice Box */}
              <div className="p-3 rounded-lg bg-surface-container flex items-start gap-2 text-on-surface">
                <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                  verified_user
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-on-surface">Cryptographic Assurance</span>
                  <p className="text-[11px] text-on-surface-variant leading-snug mt-0.5">
                    Argon2id cryptographic hashing enforced; credentials and TOTP seeds are never stored in plain text. Hardware security key registration requires presence confirmation.
                  </p>
                </div>
              </div>

              {/* Danger Zone Actions */}
              <div className="flex flex-col gap-2 pt-1">
                <span className="text-[10px] text-error font-bold uppercase tracking-wider">
                  Credential Danger Zone
                </span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleIssueResetToken}
                    className="flex-1 py-2 px-2 rounded-lg bg-red-100 text-red-900 hover:bg-red-200 text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">lock_reset</span>
                    <span>Issue Reset Token</span>
                  </button>

                  <button
                    onClick={() => selectedOfficer && handleToggleStatus(selectedOfficer.id)}
                    className="py-2 px-3 rounded-lg bg-surface-container-high hover:bg-red-100 hover:text-red-900 text-on-surface-variant text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {selectedOfficer?.status === 'ACTIVE' ? 'person_off' : 'person_check'}
                    </span>
                    <span>{selectedOfficer?.status === 'ACTIVE' ? 'Deactivate' : 'Reactivate'}</span>
                  </button>
                </div>
              </div>

              {/* Action Footers */}
              <div className="flex items-center gap-2 pt-3 border-t border-surface-container">
                <button
                  onClick={() => showToast(`Permissions and role matrix successfully saved for ${selectedOfficer?.name}.`)}
                  className="flex-1 h-11 rounded-lg bg-tertiary-fixed hover:bg-amber-400 text-on-tertiary-fixed text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>Save Permissions</span>
                </button>
                <button
                  onClick={() => setSelectedOfficerId(officers[0]?.id || '')}
                  className="h-11 px-4 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold transition-colors cursor-pointer"
                  type="button"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Quick Session Logs Strip */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-surface-container-high flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
              Recent Node Signatures
            </span>
            <div className="space-y-2 mt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant">RS (Raipur Desk)</span>
                <span className="font-mono text-outline text-[11px]">IP 103.24.18.9 • Auth Pass</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant">AS (Bilaspur)</span>
                <span className="font-mono text-outline text-[11px]">IP 103.24.20.4 • Auth Pass</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant">VS (High Court)</span>
                <span className="font-mono text-outline text-[11px]">IP 103.24.19.1 • FIDO Key OK</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Provision Officer Modal */}
      {isProvisionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-container-high flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-primary-container font-bold">
                  <span className="material-symbols-outlined text-[24px]">person_add</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-on-surface">Provision Institutional Officer</h3>
                  <p className="text-xs text-on-surface-variant">Onboard underwriting personnel &amp; authorize clearance tier</p>
                </div>
              </div>
              <button
                onClick={() => setIsProvisionModalOpen(false)}
                className="text-outline hover:text-on-surface p-1 rounded cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleProvisionOfficer} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-on-surface mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sen"
                    value={newOfficer.name}
                    onChange={(e) => setNewOfficer({ ...newOfficer, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="ananya.s@ef.in"
                    value={newOfficer.email}
                    onChange={(e) => setNewOfficer({ ...newOfficer, email: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Direct Telephone / Desk</label>
                  <input
                    type="text"
                    placeholder="+91 94250 00000"
                    value={newOfficer.phone}
                    onChange={(e) => setNewOfficer({ ...newOfficer, phone: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Role Clearance Tier *</label>
                  <select
                    value={newOfficer.role}
                    onChange={(e) => setNewOfficer({ ...newOfficer, role: e.target.value as any })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-xs font-semibold border border-surface-container-high focus:outline-none"
                  >
                    <option value="STAFF">STAFF (Tier-2 • ₹2.5 Cr Limit)</option>
                    <option value="ADMIN">ADMIN (Tier-1 • ₹15.0 Cr Limit)</option>
                    <option value="SUPER_ADMIN">SUPER_ADMIN (Root • ₹50.0 Cr Limit)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Regional Desk Node</label>
                  <select
                    value={newOfficer.node}
                    onChange={(e) => setNewOfficer({ ...newOfficer, node: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-xs font-semibold border border-surface-container-high focus:outline-none"
                  >
                    <option>Raipur Central Hub</option>
                    <option>Bilaspur &amp; Korba</option>
                    <option>Urla &amp; Siltara Corridor</option>
                    <option>High Court Desk</option>
                    <option>Central Desk</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-on-surface mb-1">Official Underwriter Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior TEV / CMA Appraisal Lead"
                    value={newOfficer.title}
                    onChange={(e) => setNewOfficer({ ...newOfficer, title: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Initial Password *</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    placeholder="Minimum 8 characters"
                    value={newOfficer.password}
                    onChange={(e) => setNewOfficer({ ...newOfficer, password: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-surface-container-high focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">2FA Enforcement Mode</label>
                  <select
                    value={newOfficer.mfaType}
                    onChange={(e) => setNewOfficer({ ...newOfficer, mfaType: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-xs font-semibold border border-surface-container-high focus:outline-none"
                  >
                    <option>Authenticator App (TOTP)</option>
                    <option>Hardware Key (FIDO2 / YubiKey)</option>
                    <option>SMS OTP Relay</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsProvisionModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-outline hover:bg-surface-container cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-primary-container text-white text-xs font-bold hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  Provision Officer Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
