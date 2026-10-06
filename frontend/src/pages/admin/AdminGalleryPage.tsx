import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { galleryApi } from '../../services/galleryApi';
import { useFetch } from '../../hooks/useFetch';
import { GalleryItem } from '../../types';

const INITIAL_GALLERY_ASSETS: GalleryItem[] = [
  {
    id: 'asset-1',
    title: 'Urla Rolling Mill CNC Capex Facility',
    filename: 'industrial-mill-urla-capex.webp',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqtNDzSq1M6spkusCix9OD04YIjfQhXhdbhxCyr2BrVS53_m_aFGqsHuKDP2f8b-9CNVaopoWSofA4Mo6h9gLWVJpOHdTdS4CPmtLaKTpQZhwYFdqDXJa0954gq0cMnWxT2Zjlvc1SAG3wZVswE5NptPUWxt-lN63KV3mgAVn10k5CoKiBQtEUMlC7dhQpgwgVOl5tj0faw3lF87DbaYRPeYoTfI1CwDEHPkX1URtiS6PGurj61UWt',
    category: 'Industrial Capex',
    dimensions: '1920x1080',
    file_size: '1.4 MB',
    format: 'Landscape 16:9',
    cms_token: 'EF-ASSET-2025-IND-04',
    alt_text: 'Massive industrial steel rolling mill CNC facility in Siltara industrial zone with glowing forged steel rods, high ceilings, dramatic blue and fiery orange lighting, capturing modern manufacturing scale in Raipur Chhattisgarh.',
    pages_count: 3,
    page_references: ['Solutions Gallery', 'Industrial Capex Offer', 'Urla Case Study'],
    author: 'Rajesh Sharma',
    created_at: '2025-05-10T10:30:00Z',
    is_active: true
  },
  {
    id: 'asset-2',
    title: 'Civil Lines Financial Hub HQ',
    filename: 'civil-lines-cbd-commercial.webp',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh8Fz4HSPv1dczfBifRXu8rfezSE-EvHRDijobG1e-sEl-gSGso_VuwR6SWReQLjiTZ8gq3czDWga20r8z6pdiiHNR13rJFsCPY3z60Bz_4iJjU-WXNH21p7XTlQmT5KvmERptrwgRDHEyzCGSXssDh1lnzUgNQmmzFLMpJuRe5CuKSDbeC-jbxaldooukqtPW9A2Hqe0l7eKlVXTzvSJOrYTsu5XTrqauRgY4hoAkXuSF3Cf6rdy-',
    category: 'Commercial Property & LAP',
    dimensions: '2560x1440',
    file_size: '2.8 MB',
    format: 'Landscape 16:9',
    cms_token: 'EF-ASSET-2025-LAP-12',
    alt_text: 'Modern architectural glass facade of premier corporate commercial headquarters in Civil Lines Raipur during golden hour, reflecting clear blue skies with structured landscaping and banking security access.',
    pages_count: 5,
    page_references: ['Corporate Homepage', 'Loan Against Property', 'Contact Us', 'About Earth Finance', 'Raipur Regional Branch'],
    author: 'Rajesh Sharma',
    created_at: '2025-05-08T14:15:00Z',
    is_active: true
  },
  {
    id: 'asset-3',
    title: 'Sanjeevani Diagnostic Suite Bilaspur',
    filename: 'bilaspur-med-diagnostic.webp',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFygPvR2D6D3EUkXdcWkAz9wAJpYjjadoq6bRLq7qAAEAUvHDOZ-mJP4749LVtopm5w5INjxet63MfV7hJvj_NDrSX35LEXjSMc-R1fgy2QNoL0PPZ6VrUmrb_JB07D15AzCsNXRD5UImjjtNcmivlIi172izLA2IlWVv3R_oN06n0VehY-2X1QBoZrgGSBbvhFXfWF5nAo7V2RE2iCJXvzZsEN6pQx2Kx8zLYDBuMBkkG1FF8dpH6',
    category: 'Healthcare & Medical',
    dimensions: '1920x1080',
    file_size: '1.9 MB',
    format: 'Landscape 16:9',
    cms_token: 'EF-ASSET-2025-MED-07',
    alt_text: 'Hi-tech healthcare diagnostic imaging wing in Bilaspur multi-specialty hospital featuring state-of-the-art MRI and CT scanner suite with clinical blue LED lighting and sterile medical interior.',
    pages_count: 2,
    page_references: ['Healthcare Equipment Lease', 'Bilaspur Branch Desk'],
    author: 'Amit Sharma',
    created_at: '2025-05-06T09:40:00Z',
    is_active: true
  },
  {
    id: 'asset-4',
    title: 'Mahanadi Haulage Fleet Dispatch',
    filename: 'fleet-haulage-tippers-korba.webp',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrN-eb7ydStL9eF6oIp9oQ44eA6IaBQHPCeg9gjlRPDJiycqZ-wC7ddnTnJ3Sb43LiJifTYfZKz1h4zCczDGxo2sscRDOJ2OJQq--MXw0sEwhBQcqs8KgW_jVCOTlRLYToNgQ73Pz_DHvFM42QCpATr_7TS84jmOufImtvVi3UQvLKrrGKgmLthBn49RIHZXHVn92IoplnEOcb7D0vZ5dPTimxdVAMIH7zrFLEVfKxCcFt8S4U0bXT',
    category: 'Fleet & Logistics',
    dimensions: '2048x1152',
    file_size: '2.1 MB',
    format: 'Landscape 16:9',
    cms_token: 'EF-ASSET-2025-FLT-09',
    alt_text: 'Fleet of heavy-duty BharatBenz commercial multi-axle tipper trucks aligned perfectly at a mining logistics dispatch terminal near Korba with sunset lighting and highway backdrop.',
    pages_count: 4,
    page_references: ['Commercial Vehicle Finance', 'Mining & Infra Logistics', 'Korba Fleet Dossier', 'Solutions Gallery'],
    author: 'Priya C.',
    created_at: '2025-05-04T16:20:00Z',
    is_active: true
  },
  {
    id: 'asset-5',
    title: 'Executive Underwriting Consultation',
    filename: 'boardroom-underwriting-session.webp',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBQgGZHlwiMi-9Muk54MX0304rv9ScpVTLDJIn7kMGDKNPyyjZNMg-TPpJ5W585K-wq4oj1ZFK_mM54HAAAQDuiHIj4kZjrxCLn1KubOQRc3S-0OvSF2dVuQmDQbli9-02TyUf0PDARQi11LSSFGw8-RrdEYRPszi_hJYBUEUlNKRoDdpHd_HxOVImzmzN07ZYKvP8FBT6OZe3vIaUWIhz0xZ9MTDEjE_1ESfVFHbizaWJMaN-YIEx',
    category: 'Corporate Advisory',
    dimensions: '1920x1080',
    file_size: '1.6 MB',
    format: 'Landscape 16:9',
    cms_token: 'EF-ASSET-2025-ADV-02',
    alt_text: 'Earth Finance senior advisory team conducting loan underwriting review across large oak board table with digital tablets, balance sheets, and panoramic view of Raipur urban skyline.',
    pages_count: 6,
    page_references: ['Debt Syndication Advisory', 'Leadership & Governance', 'Annual Report 2024-25', 'Institutional Partners', 'About Us', 'Careers'],
    author: 'Rajesh Sharma',
    created_at: '2025-04-28T11:00:00Z',
    is_active: true
  },
  {
    id: 'asset-6',
    title: '₹45 Cr Syndication Accord Signing',
    filename: 'syndication-accord-mou.webp',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM6bMjjBbvxe1Ne9ZgGePJ1suuqoo1u1rgyx_EaLksNAqs-EDUaObf5OTq1qcLyYTWFrpmiZfZct_D-el_kPannImU8ZQ7VzcpM-Nw3ItBFzT5Siv2DIdDJlHzjoYZe6SukMz5wacO_ywGRd_NzQ9ZugKltLTDsudT_m_BlAcbpXNtMbTo11o_UWWs-mzTtzB5miuow-CQgAERvB_j_ARU4j8KPis0Mtdrl4Zjs4dPGzPdeNYBXRuI',
    category: 'Event & Seminars',
    dimensions: '1920x1080',
    file_size: '1.2 MB',
    format: 'Landscape 16:9',
    cms_token: 'EF-ASSET-2025-EVT-05',
    alt_text: 'Formal corporate loan sanction signing event between corporate steel promoter and Earth Finance MD with official leather folios, golden fountain pen, and institutional banners.',
    pages_count: 1,
    page_references: ['Press & Media Announcements'],
    author: 'Rajesh Sharma',
    created_at: '2025-04-22T17:45:00Z',
    is_active: true
  },
  {
    id: 'asset-7',
    title: 'High-Precision Automated Silo & Packaging',
    filename: 'silo-packaging-agro-robotics.webp',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUhVAzNClfO4n61IbTaAP6PJGuKGr66Fp4wP3CqKFqa3PepcU1zuAQ2OQyLWqiKhtVFGC81trSCBJgKSGCAhSE6Xz8MmnvKItyVhSYTQWopseYkR0VmVwrbRlO4lUB7geHLMIhdpITpgpjKA8R8hkSFO1MO-qh40MEsqo_0PB8RS_b3-NnKgwB7YSyxiW2y8gvUb6Yeok1zdPz450tvaeoF18taWrboHb_MrehmTatJiR4zcIbIv2v',
    category: 'Industrial Capex',
    dimensions: '1920x1080',
    file_size: '1.5 MB',
    format: 'Landscape 16:9',
    cms_token: 'EF-ASSET-2025-IND-11',
    alt_text: 'Close up perspective of CNC milling tooling and automated robotics in steel fabrication warehouse in Raipur with rich blue tint and sharp focus.',
    pages_count: 2,
    page_references: ['Agro Industry Solutions', 'Warehouse Finance'],
    author: 'Rajesh Sharma',
    created_at: '2025-04-18T13:10:00Z',
    is_active: true
  },
  {
    id: 'asset-8',
    title: 'Solar Rooftop 500kW Captive Plant',
    filename: 'solar-captive-grid-raipur.webp',
    image_url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    category: 'Industrial Capex',
    dimensions: '1920x1080',
    file_size: '1.8 MB',
    format: 'Landscape 16:9',
    cms_token: 'EF-ASSET-2025-SOL-03',
    alt_text: '500kW rooftop industrial solar array installed on commercial warehouse in Urla Raipur with blue sky and clean energy inverter banks.',
    pages_count: 3,
    page_references: ['Clean Energy Financing', 'Solutions Gallery', 'CREDA Subsidy Portal'],
    author: 'Priya C.',
    created_at: '2025-04-14T08:30:00Z',
    is_active: true
  }
];

export const AdminGalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  // Asset list and selection state
  const [assets, setAssets] = useState<GalleryItem[]>(INITIAL_GALLERY_ASSETS);
  const [selectedAssetId, setSelectedAssetId] = useState<string>(INITIAL_GALLERY_ASSETS[0].id);
  const [checkedIds, setCheckedIds] = useState<string[]>([INITIAL_GALLERY_ASSETS[0].id]);

  // View Mode & Filters
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Media');
  const [formatFilter, setFormatFilter] = useState('All Formats');
  const [sortFilter, setSortFilter] = useState('Newest First');

  // Inspector Tabs: 'selected' | 'upload'
  const [inspectorTab, setInspectorTab] = useState<'selected' | 'upload'>('selected');

  // Modals
  const [previewAsset, setPreviewAsset] = useState<GalleryItem | null>(null);
  const [isBulkMenuOpen, setIsBulkMenuOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState<GalleryItem | null>(null);

  // Editable Inspector Form state (synced with selected asset)
  const selectedAsset = useMemo(() => {
    return assets.find((a) => a.id === selectedAssetId) || assets[0];
  }, [assets, selectedAssetId]);

  const [editTitle, setEditTitle] = useState(selectedAsset?.title || '');
  const [editCategory, setEditCategory] = useState(selectedAsset?.category || 'Industrial Capex');
  const [editAltText, setEditAltText] = useState(selectedAsset?.alt_text || '');

  // Keep form fields synced when selected asset changes
  React.useEffect(() => {
    if (selectedAsset) {
      setEditTitle(selectedAsset.title);
      setEditCategory(selectedAsset.category || 'Industrial Capex');
      setEditAltText(selectedAsset.alt_text || '');
    }
  }, [selectedAssetId, selectedAsset]);

  // Upload Form State (for both inspector tab and modal)
  const [newAsset, setNewAsset] = useState({
    title: '',
    category: 'Industrial Capex',
    alt_text: '',
    image_url: '',
    format: 'Landscape 16:9',
    author: 'Rajesh Sharma'
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync with backend API
  const { refetch } = useFetch<GalleryItem[]>(
    async () => {
      try {
        const res = await galleryApi.getAdminAll();
        if (res && res.success && res.data && res.data.length > 0) {
          setAssets((prev) => {
            const apiItems: GalleryItem[] = res.data!.map((item, idx) => ({
              ...item,
              filename: item.filename || `asset-${item.id.slice(0, 6)}.webp`,
              dimensions: item.dimensions || '1920x1080',
              file_size: item.file_size || '1.8 MB',
              format: item.format || 'Landscape 16:9',
              cms_token: item.cms_token || `EF-ASSET-2025-VAULT-${idx + 10}`,
              pages_count: item.pages_count ?? 2,
              page_references: item.page_references || ['Solutions Gallery', 'Public Portal'],
              author: item.author || 'Rajesh Sharma'
            }));
            const existingIds = new Set(apiItems.map((m) => m.id));
            const retained = prev.filter((s) => !existingIds.has(s.id));
            return [...apiItems, ...retained];
          });
          return { success: true, data: res.data };
        }
        return { success: true, data: [] };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Failed to fetch gallery' };
      }
    },
    []
  );

  // Filtered Assets
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      // Category filter
      if (categoryFilter !== 'All Media') {
        const cleanCat = categoryFilter.split('(')[0].trim().toLowerCase();
        if (!asset.category?.toLowerCase().includes(cleanCat)) {
          return false;
        }
      }

      // Format filter
      if (formatFilter !== 'All Formats') {
        if (asset.format !== formatFilter) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = asset.title.toLowerCase().includes(q);
        const matchCategory = asset.category?.toLowerCase().includes(q);
        const matchAlt = asset.alt_text?.toLowerCase().includes(q);
        const matchFilename = asset.filename?.toLowerCase().includes(q);
        const matchToken = asset.cms_token?.toLowerCase().includes(q);
        if (!matchTitle && !matchCategory && !matchAlt && !matchFilename && !matchToken) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortFilter === 'Newest First') {
        return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
      }
      if (sortFilter === 'Alphabetical (A-Z)') {
        return a.title.localeCompare(b.title);
      }
      if (sortFilter === 'Most Referenced') {
        return (b.pages_count || 0) - (a.pages_count || 0);
      }
      if (sortFilter === 'File Size (Desc)') {
        const sizeA = parseFloat(a.file_size || '0');
        const sizeB = parseFloat(b.file_size || '0');
        return sizeB - sizeA;
      }
      return 0;
    });
  }, [assets, categoryFilter, formatFilter, searchQuery, sortFilter]);

  // Checkbox Selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setCheckedIds(filteredAssets.map((a) => a.id));
    } else {
      setCheckedIds([]);
    }
  };

  const handleToggleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // Copy Tag Token
  const handleCopyTag = (token: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(token);
    showToast(`CMS Tag Token "${token}" copied to clipboard!`, 'success');
  };

  // Save Metadata
  const handleSaveMetadata = async () => {
    if (!selectedAsset) return;

    const updated = {
      ...selectedAsset,
      title: editTitle,
      category: editCategory,
      alt_text: editAltText
    };

    setAssets((prev) => prev.map((a) => (a.id === selectedAsset.id ? updated : a)));

    try {
      await galleryApi.update(selectedAsset.id, {
        title: editTitle,
        category: editCategory,
        caption: editAltText
      });
    } catch {
      // Local state preserved
    }

    showToast(`Metadata updated for "${editTitle}". Live synced!`, 'success');
  };

  // Delete Asset
  const confirmDelete = async () => {
    if (!assetToDelete) return;
    const id = assetToDelete.id;
    setAssets((prev) => prev.filter((a) => a.id !== id));
    setCheckedIds((prev) => prev.filter((x) => x !== id));
    if (selectedAssetId === id) {
      const remaining = assets.filter((a) => a.id !== id);
      if (remaining.length > 0) setSelectedAssetId(remaining[0].id);
    }
    setAssetToDelete(null);

    try {
      await galleryApi.delete(id);
    } catch {
      // Local state updated
    }
    showToast(`Asset deleted from media vault.`, 'warning');
  };

  // Direct Upload handler
  const handleDirectUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.title.trim()) {
      showToast('Please provide an asset title.', 'warning');
      return;
    }

    const defaultImg =
      newAsset.image_url.trim() ||
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';

    const created: GalleryItem = {
      id: `asset-${Date.now()}`,
      title: newAsset.title,
      category: newAsset.category,
      alt_text: newAsset.alt_text || newAsset.title,
      image_url: defaultImg,
      filename: `${newAsset.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.webp`,
      dimensions: '1920x1080',
      file_size: '1.7 MB',
      format: newAsset.format,
      cms_token: `EF-ASSET-2025-${newAsset.category.slice(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`,
      pages_count: 1,
      page_references: ['Solutions Gallery'],
      author: newAsset.author,
      created_at: new Date().toISOString(),
      is_active: true
    };

    setAssets((prev) => [created, ...prev]);
    setSelectedAssetId(created.id);
    setInspectorTab('selected');
    setIsUploadModalOpen(false);
    setNewAsset({
      title: '',
      category: 'Industrial Capex',
      alt_text: '',
      image_url: '',
      format: 'Landscape 16:9',
      author: 'Rajesh Sharma'
    });

    try {
      await galleryApi.create({
        title: created.title,
        category: created.category,
        caption: created.alt_text,
        image_url: created.image_url
      });
    } catch {
      // Local state preserved
    }

    showToast(`New media asset "${created.title}" successfully ingested into vault!`, 'success');
  };

  // Replace file simulator
  const handleFileReplaced = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedAsset) {
      const newUrl = URL.createObjectURL(file);
      setAssets((prev) =>
        prev.map((a) =>
          a.id === selectedAsset.id
            ? {
                ...a,
                image_url: newUrl,
                filename: file.name,
                file_size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
              }
            : a
        )
      );
      showToast(`Asset file replaced with "${file.name}".`, 'info');
    }
  };

  // Quick Ingest Dropzone file drop
  const handleDropzoneFile = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const newUrl = URL.createObjectURL(file);
    const created: GalleryItem = {
      id: `asset-${Date.now()}`,
      title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      category: 'Industrial Capex',
      alt_text: file.name,
      image_url: newUrl,
      filename: file.name,
      dimensions: '1920x1080',
      file_size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      format: 'Landscape 16:9',
      cms_token: `EF-ASSET-2025-ING-${Math.floor(10 + Math.random() * 90)}`,
      pages_count: 1,
      page_references: ['Solutions Gallery'],
      author: 'Rajesh Sharma',
      created_at: new Date().toISOString(),
      is_active: true
    };
    setAssets((prev) => [created, ...prev]);
    setSelectedAssetId(created.id);
    showToast(`Quick Ingest: "${file.name}" ingested into vault!`, 'success');
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: 48,
      industrial: 16,
      commercial: 12,
      corporate: 8,
      healthcare: 5,
      fleet: 4,
      events: 3
    };
  }, []);

  return (
    <div className="flex flex-col w-full gap-6 pb-12 font-sans">
      {/* Toast Banner */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 transition-all animate-bounce text-sm font-semibold text-white ${
            toastMessage.type === 'success'
              ? 'bg-[#006d33] border border-[#8cf6a3]/40'
              : toastMessage.type === 'warning'
              ? 'bg-[#ba1a1a] border border-[#ffdad6]/40'
              : 'bg-[#071b3a] border border-[#b5c7ee]/30'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {toastMessage.type === 'success' ? 'check_circle' : toastMessage.type === 'warning' ? 'warning' : 'info'}
          </span>
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-75">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Hidden file inputs */}
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileReplaced}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleDropzoneFile(e.target.files)}
      />

      {/* PAGE HEADER & TOP UTILITIES */}
      <section className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <nav className="flex items-center gap-1.5 text-[11px] font-bold text-[#75777f] uppercase tracking-wider">
            <span
              onClick={() => navigate('/admin/dashboard')}
              className="hover:text-[#071b3a] cursor-pointer transition-colors"
            >
              Earth Finance Admin
            </span>
            <span className="material-symbols-outlined text-[14px] text-[#75777f]">chevron_right</span>
            <span>CMS</span>
            <span className="material-symbols-outlined text-[14px] text-[#75777f]">chevron_right</span>
            <span className="text-[#071b3a] font-bold">Media Asset Management</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#071b3a] tracking-tight">
            Media &amp; Campaign Gallery
          </h1>
          <p className="text-sm text-[#44474e] max-w-3xl">
            Upload, categorize, and manage high-resolution photography, facility case study banners, and brand creatives across Central India corporate portfolios.
          </p>
        </div>

        {/* Top Right Actions & Storage Progress */}
        <div className="flex flex-wrap items-center gap-4 self-start xl:self-auto">
          {/* Storage Health Card */}
          <div className="flex items-center gap-4 px-4 py-2.5 rounded-lg bg-white shadow-sm border border-slate-100">
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-4 text-xs mb-1">
                <span className="text-[#44474e] font-medium">Vault Storage</span>
                <span className="text-[#071b3a] font-bold">14.2 GB / 50 GB</span>
              </div>
              <div className="w-32 h-1.5 rounded-full bg-[#e9edff] overflow-hidden">
                <div className="h-full bg-[#006d33] rounded-full" style={{ width: '28.4%' }}></div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#006d33]/10 flex items-center justify-center text-[#006d33]">
              <span className="material-symbols-outlined text-[18px]">cloud_done</span>
            </div>
          </div>

          {/* Bulk Actions dropdown */}
          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsBulkMenuOpen(!isBulkMenuOpen)}
              className="inline-flex items-center gap-1.5 px-4 h-12 rounded-lg bg-white text-[#071b3a] text-sm font-semibold shadow-sm hover:bg-[#e9edff] transition-all border border-slate-200"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] text-[#75777f]">tune</span>
              <span>Bulk Actions</span>
              {checkedIds.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#071b3a] text-white text-[11px] font-bold">
                  {checkedIds.length}
                </span>
              )}
              <span className="material-symbols-outlined text-[18px] text-[#75777f]">expand_more</span>
            </button>

            {isBulkMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-2xl border border-slate-100 py-1.5 z-40 animate-in fade-in">
                <button
                  onClick={() => {
                    handleSelectAll(true);
                    setIsBulkMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-[#141b2c] hover:bg-[#f1f3ff] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#071b3a]">select_all</span>
                  Select All Visible ({filteredAssets.length})
                </button>
                <button
                  onClick={() => {
                    handleSelectAll(false);
                    setIsBulkMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-[#141b2c] hover:bg-[#f1f3ff] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#75777f]">deselect</span>
                  Deselect All
                </button>
                <button
                  onClick={() => {
                    setIsBulkMenuOpen(false);
                    showToast(`Downloading manifest for ${checkedIds.length || filteredAssets.length} assets...`, 'info');
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-[#141b2c] hover:bg-[#f1f3ff] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#006d33]">download</span>
                  Download Manifest (CSV)
                </button>
                <div className="border-t my-1"></div>
                <button
                  onClick={() => {
                    setIsBulkMenuOpen(false);
                    if (checkedIds.length === 0) {
                      showToast('Please select assets first.', 'warning');
                      return;
                    }
                    setAssets((prev) => prev.filter((a) => !checkedIds.includes(a.id)));
                    setCheckedIds([]);
                    showToast(`Deleted ${checkedIds.length} assets from vault.`, 'warning');
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/40 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                  Delete Selected ({checkedIds.length})
                </button>
              </div>
            )}
          </div>

          {/* Upload Primary CTA */}
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 h-12 rounded-lg bg-[#ffdf94] text-[#071b3a] text-sm font-bold shadow-md hover:bg-[#efc13e] transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
            <span>+ Upload Media</span>
          </button>
        </div>
      </section>

      {/* SEARCH, FILTER PILLS & VIEW CONTROLS */}
      <section className="flex flex-col gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full lg:max-w-xl">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75777f] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets by title, category, alt text, or filename..."
              className="w-full h-11 pl-11 pr-12 rounded-lg bg-[#f1f3ff] text-sm text-[#141b2c] placeholder:text-[#75777f] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#071b3a] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#75777f] hover:text-[#141b2c]"
              >
                <span className="material-symbols-outlined text-[16px]">clear</span>
              </button>
            )}
          </div>

          {/* Format Filter, Sort & View Mode Switcher */}
          <div className="flex items-center flex-wrap gap-2 w-full lg:w-auto justify-end">
            {/* Orientation / Aspect Filter */}
            <div className="relative">
              <select
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value)}
                className="h-10 pl-3 pr-8 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] font-semibold appearance-none cursor-pointer focus:outline-none border border-transparent focus:border-[#071b3a]"
              >
                <option>All Formats</option>
                <option>Landscape 16:9</option>
                <option>Standard 4:3</option>
                <option>Square 1:1</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[18px] pointer-events-none text-[#75777f]">
                arrow_drop_down
              </span>
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <select
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value)}
                className="h-10 pl-3 pr-8 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] font-semibold appearance-none cursor-pointer focus:outline-none border border-transparent focus:border-[#071b3a]"
              >
                <option>Newest First</option>
                <option>File Size (Desc)</option>
                <option>Alphabetical (A-Z)</option>
                <option>Most Referenced</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[18px] pointer-events-none text-[#75777f]">
                sort
              </span>
            </div>

            {/* Grid/List Switcher */}
            <div className="flex items-center bg-[#f1f3ff] p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded text-xs flex items-center justify-center transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#071b3a] shadow-sm font-bold'
                    : 'text-[#75777f] hover:text-[#141b2c]'
                }`}
                title="Grid View"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-2.5 py-1 rounded text-xs flex items-center justify-center transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-[#071b3a] shadow-sm font-bold'
                    : 'text-[#75777f] hover:text-[#141b2c]'
                }`}
                title="List View"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">view_list</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-nowrap scrollbar-none">
          <button
            onClick={() => setCategoryFilter('All Media')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
              categoryFilter === 'All Media'
                ? 'bg-[#071b3a] text-white'
                : 'bg-[#e9edff] text-[#44474e] hover:bg-[#e0e8ff]'
            }`}
          >
            All Media ({categoryCounts.all})
          </button>
          <button
            onClick={() => setCategoryFilter('Industrial Capex')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              categoryFilter.includes('Industrial')
                ? 'bg-[#071b3a] text-white'
                : 'bg-[#e9edff] text-[#44474e] hover:bg-[#e0e8ff]'
            }`}
          >
            Industrial Capex ({categoryCounts.industrial})
          </button>
          <button
            onClick={() => setCategoryFilter('Commercial Property & LAP')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              categoryFilter.includes('Commercial')
                ? 'bg-[#071b3a] text-white'
                : 'bg-[#e9edff] text-[#44474e] hover:bg-[#e0e8ff]'
            }`}
          >
            Commercial Property &amp; LAP ({categoryCounts.commercial})
          </button>
          <button
            onClick={() => setCategoryFilter('Corporate Advisory')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              categoryFilter.includes('Corporate')
                ? 'bg-[#071b3a] text-white'
                : 'bg-[#e9edff] text-[#44474e] hover:bg-[#e0e8ff]'
            }`}
          >
            Corporate Advisory ({categoryCounts.corporate})
          </button>
          <button
            onClick={() => setCategoryFilter('Healthcare & Medical')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              categoryFilter.includes('Healthcare')
                ? 'bg-[#071b3a] text-white'
                : 'bg-[#e9edff] text-[#44474e] hover:bg-[#e0e8ff]'
            }`}
          >
            Healthcare &amp; Medical ({categoryCounts.healthcare})
          </button>
          <button
            onClick={() => setCategoryFilter('Fleet & Logistics')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              categoryFilter.includes('Fleet')
                ? 'bg-[#071b3a] text-white'
                : 'bg-[#e9edff] text-[#44474e] hover:bg-[#e0e8ff]'
            }`}
          >
            Fleet &amp; Logistics ({categoryCounts.fleet})
          </button>
          <button
            onClick={() => setCategoryFilter('Event & Seminars')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              categoryFilter.includes('Event')
                ? 'bg-[#071b3a] text-white'
                : 'bg-[#e9edff] text-[#44474e] hover:bg-[#e0e8ff]'
            }`}
          >
            Event &amp; Seminars ({categoryCounts.events})
          </button>
        </div>
      </section>

      {/* SPLIT WORKSPACE: 68% MEDIA GRID | 32% INSPECTOR / UPLOADER */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT MAIN ASSET GRID (8 Cols ≈ 67%) */}
        <div className="xl:col-span-8 flex flex-col space-y-4">
          {/* Grid Summary & Selection Indicator */}
          <div className="flex items-center justify-between text-[#44474e] px-1 text-xs">
            <div className="flex items-center gap-2">
              <input
                id="select-all"
                type="checkbox"
                checked={checkedIds.length > 0 && checkedIds.length === filteredAssets.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="w-4 h-4 rounded text-[#071b3a] accent-[#071b3a] cursor-pointer"
              />
              <label htmlFor="select-all" className="cursor-pointer font-semibold text-[#141b2c]">
                Select {filteredAssets.length} visible assets
              </label>
            </div>
            <span>Showing {filteredAssets.length} of {categoryCounts.all} assets • Page 1 of 6</span>
          </div>

          {/* MAIN VIEW: GRID OR LIST */}
          {filteredAssets.length === 0 ? (
            <div className="p-16 text-center rounded-xl bg-white border border-slate-100 text-[#75777f] flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[40px] text-slate-300">image_not_supported</span>
              <p className="font-semibold text-sm">No media assets found matching the selected filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('All Media');
                  setFormatFilter('All Formats');
                }}
                className="mt-2 text-xs font-bold text-[#071b3a] underline"
              >
                Clear all filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* Masonry-like Balanced Asset Grid (3 Cols) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAssets.map((asset) => {
                const isSelected = selectedAssetId === asset.id;
                const isChecked = checkedIds.includes(asset.id);

                return (
                  <div
                    key={asset.id}
                    onClick={() => {
                      setSelectedAssetId(asset.id);
                      setInspectorTab('selected');
                    }}
                    className={`group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'ring-2 ring-[#071b3a] border-transparent'
                        : 'border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {/* Thumbnail Stage */}
                    <div className="relative aspect-video w-full overflow-hidden bg-[#071b3a]">
                      <img
                        src={asset.image_url}
                        alt={asset.alt_text || asset.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onClick={(e) => handleToggleCheck(asset.id, e)}
                          onChange={() => {}}
                          className="w-4 h-4 rounded bg-white text-[#071b3a] accent-[#071b3a] cursor-pointer"
                        />
                        <span className="px-2 py-0.5 rounded-full bg-[#071b3a] text-white text-[10px] font-bold">
                          {asset.category || 'General'}
                        </span>
                      </div>

                      {/* Active Inspector Badge */}
                      {isSelected && (
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-white/95 backdrop-blur-sm text-[#071b3a] text-[10px] font-bold shadow-sm z-10">
                          Active Inspector
                        </div>
                      )}

                      {/* Hover Quick Action Overlay */}
                      <div className="absolute inset-0 bg-[#071b3a]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2 z-20">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewAsset(asset);
                          }}
                          className="p-2 rounded-full bg-white text-[#071b3a] hover:bg-[#ffdf94] transition-colors"
                          title="Quick Preview"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAssetId(asset.id);
                            setInspectorTab('selected');
                          }}
                          className="p-2 rounded-full bg-white text-[#071b3a] hover:bg-[#ffdf94] transition-colors"
                          title="Edit Metadata"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit_note</span>
                        </button>
                        <button
                          onClick={(e) => handleCopyTag(asset.cms_token || `EF-ASSET-${asset.id}`, e)}
                          className="p-2 rounded-full bg-white text-[#071b3a] hover:bg-[#ffdf94] transition-colors"
                          title="Copy Asset Tag"
                        >
                          <span className="material-symbols-outlined text-[18px]">content_copy</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setAssetToDelete(asset);
                          }}
                          className="p-2 rounded-full bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white transition-colors"
                          title="Delete Asset"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-3.5 flex flex-col justify-between flex-1">
                      <div>
                        <h3
                          className="text-[13px] font-bold text-[#071b3a] truncate"
                          title={asset.title}
                        >
                          {asset.title}
                        </h3>
                        <p className="text-xs text-[#44474e] truncate mt-0.5">
                          {asset.filename || `${asset.title.toLowerCase().replace(/\s+/g, '-')}.webp`}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#75777f]">
                        <span>{asset.dimensions || '1920x1080'} • {asset.file_size || '1.5 MB'}</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#8ff9a6]/50 text-[#00210b] font-bold">
                          {asset.pages_count || 3} Pages
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View Alternative */
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f1f3ff] text-[#071b3a] font-bold uppercase tracking-wider text-[11px] border-b">
                  <tr>
                    <th className="py-3 px-4 w-10">
                      <input
                        type="checkbox"
                        checked={checkedIds.length > 0 && checkedIds.length === filteredAssets.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="w-3.5 h-3.5 rounded text-[#071b3a] accent-[#071b3a]"
                      />
                    </th>
                    <th className="py-3 px-4">Asset Preview</th>
                    <th className="py-3 px-4">Title &amp; Filename</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Dimensions</th>
                    <th className="py-3 px-4">Usage</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAssets.map((asset) => {
                    const isSelected = selectedAssetId === asset.id;
                    return (
                      <tr
                        key={asset.id}
                        onClick={() => setSelectedAssetId(asset.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#071b3a]/5' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={checkedIds.includes(asset.id)}
                            onClick={(e) => handleToggleCheck(asset.id, e)}
                            onChange={() => {}}
                            className="w-3.5 h-3.5 rounded text-[#071b3a] accent-[#071b3a]"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <img
                            src={asset.image_url}
                            alt={asset.title}
                            className="w-16 h-10 object-cover rounded shadow-sm"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#071b3a] block truncate max-w-xs">{asset.title}</span>
                          <span className="text-[11px] text-[#75777f] font-mono">{asset.filename}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-[#e9edff] text-[#071b3a] text-[10px] font-bold">
                            {asset.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#75777f]">
                          {asset.dimensions} • {asset.file_size}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-1.5 py-0.5 rounded bg-[#8ff9a6]/50 text-[#00210b] font-bold">
                            {asset.pages_count} Pages
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setPreviewAsset(asset)}
                              className="p-1 text-[#75777f] hover:text-[#071b3a]"
                              title="Preview"
                            >
                              <span className="material-symbols-outlined text-[18px]">visibility</span>
                            </button>
                            <button
                              onClick={() => handleCopyTag(asset.cms_token || `EF-ASSET-${asset.id}`)}
                              className="p-1 text-[#75777f] hover:text-[#071b3a]"
                              title="Copy Tag"
                            >
                              <span className="material-symbols-outlined text-[18px]">content_copy</span>
                            </button>
                            <button
                              onClick={() => setAssetToDelete(asset)}
                              className="p-1 text-[#75777f] hover:text-[#ba1a1a]"
                              title="Delete"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Footer */}
          <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-100">
            <span className="text-xs text-[#44474e]">Page 1 of 6 (8 assets per page)</span>
            <div className="flex items-center gap-1">
              <button
                className="w-8 h-8 rounded bg-[#f1f3ff] text-[#75777f] flex items-center justify-center cursor-not-allowed opacity-50"
                disabled
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded bg-[#071b3a] text-white text-xs font-bold flex items-center justify-center">
                1
              </button>
              <button className="w-8 h-8 rounded bg-[#f1f3ff] hover:bg-[#e9edff] text-[#141b2c] text-xs font-bold flex items-center justify-center transition-colors">
                2
              </button>
              <button className="w-8 h-8 rounded bg-[#f1f3ff] hover:bg-[#e9edff] text-[#141b2c] text-xs font-bold flex items-center justify-center transition-colors">
                3
              </button>
              <span className="px-1 text-[#75777f]">...</span>
              <button className="w-8 h-8 rounded bg-[#f1f3ff] hover:bg-[#e9edff] text-[#141b2c] text-xs font-bold flex items-center justify-center transition-colors">
                6
              </button>
              <button className="w-8 h-8 rounded bg-[#f1f3ff] hover:bg-[#e9edff] text-[#141b2c] flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT ASSET INSPECTION & UPLOAD DRAWER (4 Cols ≈ 33%) */}
        <div className="xl:col-span-4 flex flex-col space-y-4 sticky top-20">
          {/* INSPECTOR PANEL */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Panel Header & Tabs */}
            <div className="p-4 bg-[#f1f3ff]">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-[#071b3a]">Asset Inspector</h2>
                <span className="px-2 py-0.5 rounded-full bg-[#8ff9a6] text-[#00210b] text-[11px] font-bold">
                  Live Synced
                </span>
              </div>

              {/* Segmented Tab Switcher */}
              <div className="flex items-center p-1 bg-[#e9edff] rounded-lg">
                <button
                  type="button"
                  onClick={() => setInspectorTab('selected')}
                  className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                    inspectorTab === 'selected'
                      ? 'bg-white text-[#071b3a] shadow-sm'
                      : 'text-[#44474e] hover:text-[#141b2c]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  <span>Selected Asset</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInspectorTab('upload')}
                  className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                    inspectorTab === 'upload'
                      ? 'bg-white text-[#071b3a] shadow-sm'
                      : 'text-[#44474e] hover:text-[#141b2c]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
                  <span>Direct Upload</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Selected Asset Inspector */}
            {inspectorTab === 'selected' && selectedAsset && (
              <div className="p-4 space-y-4">
                {/* Selected Image Stage */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#071b3a] shadow-inner group">
                  <img
                    src={selectedAsset.image_url}
                    alt={selectedAsset.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-white text-[10px] font-mono">
                    {selectedAsset.dimensions || '1920 × 1080'} PX • WEBP
                  </div>
                  <button
                    onClick={() => setPreviewAsset(selectedAsset)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-[#ffdf94] hover:text-[#071b3a] transition-colors"
                    title="Fullscreen Preview"
                  >
                    <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                  </button>
                </div>

                {/* Reference Key Tag */}
                <div className="p-2.5 rounded-lg bg-[#f1f3ff] flex items-center justify-between gap-2 border border-slate-100">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-[#75777f] uppercase font-bold tracking-wider">CMS Tag Token</span>
                    <code className="font-mono text-xs font-bold text-[#071b3a] truncate">
                      {selectedAsset.cms_token || `EF-ASSET-2025-${selectedAsset.id}`}
                    </code>
                  </div>
                  <button
                    onClick={() => handleCopyTag(selectedAsset.cms_token || `EF-ASSET-2025-${selectedAsset.id}`)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-white hover:bg-[#e9edff] text-[#071b3a] text-xs font-bold shadow-sm transition-all flex-shrink-0 border border-slate-200"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[15px]">content_copy</span>
                    <span>Copy</span>
                  </button>
                </div>

                {/* Audit Metadata */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-[#e9edff]/40 p-2.5 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-[#75777f] block text-[11px]">File Name:</span>
                    <span className="font-semibold text-[#141b2c] truncate block">{selectedAsset.filename}</span>
                  </div>
                  <div>
                    <span className="text-[#75777f] block text-[11px]">File Size:</span>
                    <span className="font-semibold text-[#141b2c] block">{selectedAsset.file_size} (Lossless)</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-[#75777f] block text-[11px]">Uploaded:</span>
                    <span className="font-semibold text-[#141b2c] block">
                      {new Date(selectedAsset.created_at || '').toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="text-[#75777f] block text-[11px]">Author:</span>
                    <span className="font-semibold text-[#141b2c] block">{selectedAsset.author || 'Rajesh Sharma'}</span>
                  </div>
                </div>

                {/* Editable Fields Form */}
                <form
                  className="space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveMetadata();
                  }}
                >
                  <div>
                    <label className="block text-xs font-semibold text-[#141b2c] mb-1">Asset Title</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] focus:outline-none focus:bg-white border border-transparent focus:border-[#071b3a] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#141b2c] mb-1">Category Designation</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] font-semibold focus:outline-none focus:bg-white border border-transparent focus:border-[#071b3a] transition-all"
                    >
                      <option>Industrial Capex</option>
                      <option>Commercial Property &amp; LAP</option>
                      <option>Corporate Advisory</option>
                      <option>Healthcare &amp; Medical</option>
                      <option>Fleet &amp; Logistics</option>
                      <option>Event &amp; Seminars</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#141b2c] mb-1">Alt Text (SEO &amp; Accessibility)</label>
                    <textarea
                      rows={2}
                      value={editAltText}
                      onChange={(e) => setEditAltText(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] focus:outline-none focus:bg-white border border-transparent focus:border-[#071b3a] resize-none transition-all"
                    />
                  </div>

                  {/* Published Placements */}
                  <div>
                    <label className="block text-xs font-semibold text-[#141b2c] mb-1.5">
                      Active Page References ({selectedAsset.page_references?.length || selectedAsset.pages_count || 1})
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedAsset.page_references?.map((page, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#e9edff] text-[#141b2c] text-[11px] font-medium"
                        >
                          <span className="material-symbols-outlined text-[14px] text-[#006d33]">link</span>
                          {page}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Form Action CTAs */}
                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="submit"
                      className="w-full h-11 rounded-lg bg-[#071b3a] text-white text-xs font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">save</span>
                      <span>Save Metadata Changes</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => replaceInputRef.current?.click()}
                        className="h-10 rounded-lg bg-[#e9edff] hover:bg-[#e0e8ff] text-[#141b2c] text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[18px]">sync_alt</span>
                        <span>Replace File</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAssetToDelete(selectedAsset)}
                        className="h-10 rounded-lg bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete_forever</span>
                        <span>Delete Asset</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Tab 2: Direct Upload Workspace */}
            {inspectorTab === 'upload' && (
              <form onSubmit={handleDirectUpload} className="p-4 space-y-3">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#75777f]/30 hover:border-[#071b3a] rounded-xl p-6 text-center cursor-pointer transition-colors bg-[#f1f3ff]/50 hover:bg-[#f1f3ff]"
                >
                  <span className="material-symbols-outlined text-[32px] text-[#071b3a]">add_photo_alternate</span>
                  <p className="text-xs font-bold text-[#141b2c] mt-1">Select file to ingest</p>
                  <p className="text-[11px] text-[#75777f]">Click to browse or drop an image</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141b2c] mb-1">Asset Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Siltara Steel Complex Expansion"
                    value={newAsset.title}
                    onChange={(e) => setNewAsset({ ...newAsset, title: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] focus:outline-none focus:bg-white border border-transparent focus:border-[#071b3a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141b2c] mb-1">Image URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newAsset.image_url}
                    onChange={(e) => setNewAsset({ ...newAsset, image_url: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] focus:outline-none focus:bg-white border border-transparent focus:border-[#071b3a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141b2c] mb-1">Category</label>
                  <select
                    value={newAsset.category}
                    onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] font-semibold focus:outline-none focus:bg-white border border-transparent focus:border-[#071b3a]"
                  >
                    <option>Industrial Capex</option>
                    <option>Commercial Property &amp; LAP</option>
                    <option>Corporate Advisory</option>
                    <option>Healthcare &amp; Medical</option>
                    <option>Fleet &amp; Logistics</option>
                    <option>Event &amp; Seminars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141b2c] mb-1">Alt Text</label>
                  <textarea
                    rows={2}
                    placeholder="Describe image context for SEO..."
                    value={newAsset.alt_text}
                    onChange={(e) => setNewAsset({ ...newAsset, alt_text: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] focus:outline-none focus:bg-white border border-transparent focus:border-[#071b3a] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 rounded-lg bg-[#ffdf94] text-[#071b3a] text-xs font-bold hover:bg-[#efc13e] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                  <span>Upload Asset to Vault</span>
                </button>
              </form>
            )}
          </div>

          {/* QUICK DROPZONE WIDGET */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleDropzoneFile(e.dataTransfer.files);
            }}
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center cursor-pointer group"
          >
            <div className="w-full p-6 rounded-xl bg-[#f1f3ff]/70 flex flex-col items-center justify-center transition-all group-hover:bg-[#e9edff] border-2 border-dashed border-transparent group-hover:border-[#071b3a]/30">
              <div className="w-12 h-12 rounded-full bg-[#d7e2ff] flex items-center justify-center text-[#071b3a] mb-2 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-[26px]">upload_file</span>
              </div>
              <h4 className="text-base font-bold text-[#071b3a]">Quick Ingest Dropzone</h4>
              <p className="text-xs text-[#44474e] max-w-xs mt-1">
                Drag &amp; drop high-res image files here, or{' '}
                <span className="text-[#006d33] font-bold underline">Browse local disk</span>
              </p>
              <div className="mt-3 flex items-center gap-2 text-[#75777f] text-[10px] font-bold uppercase tracking-wider">
                <span>PNG, WEBP, JPG</span>
                <span>•</span>
                <span>Max 25 MB/file</span>
                <span>•</span>
                <span>Auto WebP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX PREVIEW MODAL */}
      {previewAsset && (
        <div
          onClick={() => setPreviewAsset(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#071b3a] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/10"
          >
            {/* Header */}
            <div className="p-4 bg-black/40 flex items-center justify-between text-white border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdf94] text-[#071b3a] text-xs font-bold">
                  {previewAsset.category}
                </span>
                <span className="text-sm font-bold truncate max-w-md">{previewAsset.title}</span>
              </div>
              <button
                onClick={() => setPreviewAsset(null)}
                className="p-1 rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {/* Large Preview Image */}
            <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={previewAsset.image_url}
                alt={previewAsset.alt_text || previewAsset.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            {/* Footer Details */}
            <div className="p-4 bg-black/40 flex flex-wrap items-center justify-between gap-3 text-white text-xs border-t border-white/10">
              <div className="flex items-center gap-4 text-[#d2daf0]">
                <span>{previewAsset.filename}</span>
                <span>•</span>
                <span>{previewAsset.dimensions || '1920x1080'}</span>
                <span>•</span>
                <span>{previewAsset.file_size}</span>
                <span>•</span>
                <code className="font-mono text-[#ffdf94]">{previewAsset.cms_token}</code>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyTag(previewAsset.cms_token || '')}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                  <span>Copy Token</span>
                </button>
                <a
                  href={previewAsset.image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#ffdf94] text-[#071b3a] font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  <span>Open Full Asset</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOP UPLOAD MEDIA MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#e0e8ff] flex items-center justify-center text-[#071b3a]">
                  <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#141b2c]">Upload New Media Asset</h3>
                  <p className="text-xs text-[#75777f]">Ingest brand and facility imagery to Raipur Vault</p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-[#75777f] hover:text-[#141b2c]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleDirectUpload} className="space-y-3 py-1">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#75777f]/30 hover:border-[#071b3a] rounded-xl p-5 text-center cursor-pointer transition-colors bg-[#f1f3ff]/40"
              >
                <span className="material-symbols-outlined text-[28px] text-[#071b3a]">add_photo_alternate</span>
                <p className="text-xs font-bold text-[#141b2c] mt-0.5">Click to choose image file</p>
                <p className="text-[10px] text-[#75777f]">PNG, WEBP, JPG up to 25 MB</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#141b2c] mb-1">Asset Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Raipur Agro Processing Silo Facility"
                  value={newAsset.title}
                  onChange={(e) => setNewAsset({ ...newAsset, title: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] focus:outline-none focus:bg-white border border-transparent focus:border-[#071b3a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#141b2c] mb-1">Direct Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newAsset.image_url}
                  onChange={(e) => setNewAsset({ ...newAsset, image_url: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] focus:outline-none focus:bg-white border border-transparent focus:border-[#071b3a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#141b2c] mb-1">Category</label>
                  <select
                    value={newAsset.category}
                    onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] font-semibold focus:outline-none focus:bg-white border border-transparent focus:border-[#071b3a]"
                  >
                    <option>Industrial Capex</option>
                    <option>Commercial Property &amp; LAP</option>
                    <option>Corporate Advisory</option>
                    <option>Healthcare &amp; Medical</option>
                    <option>Fleet &amp; Logistics</option>
                    <option>Event &amp; Seminars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#141b2c] mb-1">Format Aspect</label>
                  <select
                    value={newAsset.format}
                    onChange={(e) => setNewAsset({ ...newAsset, format: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] font-semibold focus:outline-none focus:bg-white border border-transparent focus:border-[#071b3a]"
                  >
                    <option>Landscape 16:9</option>
                    <option>Standard 4:3</option>
                    <option>Square 1:1</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#141b2c] mb-1">Alt Text (SEO)</label>
                <textarea
                  rows={2}
                  placeholder="Describe the image content..."
                  value={newAsset.alt_text}
                  onChange={(e) => setNewAsset({ ...newAsset, alt_text: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] focus:outline-none focus:bg-white border border-transparent focus:border-[#071b3a] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-[#75777f] hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#071b3a] text-white text-xs font-bold hover:bg-black transition-colors"
                >
                  Upload Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {assetToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-3 animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">delete_forever</span>
            </div>
            <h3 className="text-base font-bold text-[#141b2c]">Delete Media Asset?</h3>
            <p className="text-xs text-[#44474e]">
              Are you sure you want to permanently delete <strong>"{assetToDelete.title}"</strong>?
              {assetToDelete.pages_count ? (
                <span className="block mt-1 text-[#ba1a1a] font-semibold">
                  Warning: Currently referenced on {assetToDelete.pages_count} live pages.
                </span>
              ) : null}
            </p>
            <div className="flex items-center justify-end gap-2 pt-3 border-t">
              <button
                onClick={() => setAssetToDelete(null)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-[#75777f] hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-[#ba1a1a] text-white text-xs font-bold hover:bg-[#93000a] transition-colors"
              >
                Delete Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
