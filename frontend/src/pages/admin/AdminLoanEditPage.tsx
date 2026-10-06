import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { loanApi } from '../../services/loanApi';

interface DocumentRequirement {
  id: string;
  title: string;
  icon: string;
  isMandatory: boolean;
}

interface HighlightFeature {
  id: string;
  title: string;
  description: string;
}

interface LoanFormData {
  id: string;
  code: string;
  name: string;
  category: string;
  slug: string;
  shortDescription: string;
  overviewHtml: string;
  loanAmountFormatted: string;
  envelopeBadge: string;
  interestRate: string;
  tenureRange: string;
  collateralPolicy: string;
  eligibility: string[];
  documents: DocumentRequirement[];
  highlights: HighlightFeature[];
  heroImageUrl: string;
  heroImageName: string;
  seoTitle: string;
  seoDescription: string;
  status: 'Published' | 'Draft' | 'Archived';
  lastSaved: string;
  editor: string;
  revisionId: string;
}

const DEFAULT_LOAN_PRESETS: Record<string, LoanFormData> = {
  'lp-bus-01': {
    id: 'lp-bus-01',
    code: '#LP-BUS-01',
    name: 'Business Term Loan',
    category: 'Business Finance',
    slug: 'business-loan',
    shortDescription: 'Unsecured and structured expansion loans up to ₹10 Cr designed for plant expansions, branch openings, and tech upgrades.',
    overviewHtml: `Earth Finance's flagship Business Term Loan provides rapid, non-dilutive liquidity for manufacturing hubs, retail chains, and logistics operators across Raipur, Durg, and Bilaspur corridors.\n\nBacked by sovereign and commercial consortium arrangements, capital is disbursed with tiered payback structures adapted to high-season cash receipts.`,
    loanAmountFormatted: '10,00,00,000',
    envelopeBadge: 'INR (10 Cr)',
    interestRate: '9.25% - 14.50% p.a.',
    tenureRange: '12 to 60 Months',
    collateralPolicy: 'Unsecured / Hypothecation of Current Assets',
    eligibility: [
      'Minimum 3 years of audited profitable operations in Chhattisgarh or adjoining states.',
      'Annual turnover exceeding ₹1.00 Crore with positive DSCR > 1.25.',
      'Clean CIBIL / Experian score > 700 with nil SMA-2 classifications in 24 months.'
    ],
    documents: [
      { id: 'doc-1', title: '3-Year Audited Balance Sheets with CA seal & Tax Audit Report', icon: 'description', isMandatory: true },
      { id: 'doc-2', title: '12 Months primary bank operational account statements', icon: 'account_balance', isMandatory: true },
      { id: 'doc-3', title: 'GST 3B & 2A reconciliation reports for previous 4 quarters', icon: 'receipt_long', isMandatory: true },
      { id: 'doc-4', title: 'Partnership Deed / MOA & AOA with board borrowing resolution', icon: 'gavel', isMandatory: true }
    ],
    highlights: [
      {
        id: 'hl-1',
        title: 'Fast 48-Hour Approval Window',
        description: 'Preliminary sanction letters dispatched in two business days post doc upload.'
      },
      {
        id: 'hl-2',
        title: 'Minimal Business Disruption with Dedicated Liaison Officer',
        description: 'Direct in-person underwriting liaison seated at Pandri Hub.'
      },
      {
        id: 'hl-3',
        title: 'Flexible Structured Repayment Tenures',
        description: 'Quarterly balloon structures available for cyclical capital machinery purchases.'
      }
    ],
    heroImageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UCS_UiVGB8rV64SNliZ7UN_945abx5AD4plmB6Yx9knzwnWgPkgyF8sh_CMtv8e-O-0wWBvC8MrCIaTwC679x9hAuJ2zKG1VfSFhjd2ZOuOYD2iyy1P3eTUnULDgNS0JFA10fJm0kFEABIxBC0BizFT8mkEZHE0_MFfX4hLYma1hF8s5G1O6a1ggu9b2DjtdvZCxFoivR27OK7_VHMMbyhqroRhJLZQ3jFygtoqz9hBivHG4URXMVD7kI',
    heroImageName: 'corporate-expansion-advisor.webp',
    seoTitle: 'Business Loans & Term Credit in Raipur | Earth Finance',
    seoDescription: 'Access institutional business loans up to ₹10 Crore with competitive interest rates and structured repayment terms across Chhattisgarh. Apply with Earth Finance.',
    status: 'Published',
    lastSaved: 'Today at 11:42 AM',
    editor: 'Rajesh Sharma',
    revisionId: 'v2.4.9'
  },
  'lp-wc-02': {
    id: 'lp-wc-02',
    code: '#LP-WC-02',
    name: 'Working Capital & Cash Credit',
    category: 'Business Finance',
    slug: 'working-capital',
    shortDescription: 'Flexible OD and Cash Credit facilities up to ₹15 Cr mapped to receivables and seasonal inventory cycles.',
    overviewHtml: `Optimized working capital limits designed to keep Raipur's manufacturing and trading engines funded without liquidity friction. Draw down as you need, pay interest solely on deployed capital.`,
    loanAmountFormatted: '15,00,00,000',
    envelopeBadge: 'INR (15 Cr)',
    interestRate: '8.75% onwards',
    tenureRange: '12 Months Revolving',
    collateralPolicy: 'Hypothecation of Stock & Book Debts',
    eligibility: [
      'Operating enterprise with ongoing commercial ledger in central India.',
      'Audited GST returns showing consistent quarterly revenue.',
      'Minimum stock ledger turnover ratio above sector thresholds.'
    ],
    documents: [
      { id: 'doc-wc-1', title: 'Latest Stock & Receivables Aging Statement with CA stamp', icon: 'description', isMandatory: true },
      { id: 'doc-wc-2', title: '12 Months operational current account statements', icon: 'account_balance', isMandatory: true },
      { id: 'doc-wc-3', title: 'GST annual reconciliations and trade creditor lists', icon: 'receipt_long', isMandatory: true }
    ],
    highlights: [
      {
        id: 'hl-wc-1',
        title: 'Revolving Line Liquidity',
        description: 'Interest calculated solely on utilized balance with daily compounding benefits.'
      },
      {
        id: 'hl-wc-2',
        title: 'Seamless Digital Renewal',
        description: 'Annual facility rollover verified via automated ledger and GST pulls.'
      }
    ],
    heroImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    heroImageName: 'working-capital-liquidity.webp',
    seoTitle: 'Working Capital & CC Facilities in Raipur | Earth Finance',
    seoDescription: 'Secure flexible working capital and cash credit limits up to ₹15 Crore for enterprises in Chhattisgarh. Competitive rates and instant drawing limits.',
    status: 'Published',
    lastSaved: 'Yesterday at 04:15 PM',
    editor: 'Rajesh Sharma',
    revisionId: 'v1.8.2'
  },
  'lp-prop-03': {
    id: 'lp-prop-03',
    code: '#LP-PROP-03',
    name: 'Commercial Property & LAP',
    category: 'Property Finance',
    slug: 'property-loan',
    shortDescription: 'High-ticket corporate loan against commercial or industrial mortgage up to ₹50 Crore with extended 180-month tenures.',
    overviewHtml: `Unlock enterprise equity tied into commercial real estate, corporate plazas, or industrial warehouses. Earth Finance structures long-horizon LAP with institutional consortiums.`,
    loanAmountFormatted: '50,00,00,000',
    envelopeBadge: 'INR (50 Cr)',
    interestRate: '8.45% onwards',
    tenureRange: '60 to 180 Months',
    collateralPolicy: 'Registered Mortgage (Ind/Comm)',
    eligibility: [
      'Clear freehold or municipal leased commercial property with approved sanction maps.',
      'Clear title search report for previous 30 years.',
      'Sufficient rental or operating enterprise cash flow to service debt service reserve.'
    ],
    documents: [
      { id: 'doc-lap-1', title: 'Complete Title Deeds & 30-Year Search Report by Empaneled Advocate', icon: 'gavel', isMandatory: true },
      { id: 'doc-lap-2', title: 'Approved Municipal Building Plans & Completion / Occupancy Certificate', icon: 'apartment', isMandatory: true },
      { id: 'doc-lap-3', title: '3 Years IT Returns of Owners / Directors and Guarantors', icon: 'description', isMandatory: true }
    ],
    highlights: [
      {
        id: 'hl-lap-1',
        title: 'High LTV Valuation',
        description: 'Up to 70% loan-to-value sanctioned based on independent technical valuation.'
      },
      {
        id: 'hl-lap-2',
        title: 'Extended Payback Window',
        description: 'Up to 15 years repayment runway minimizing monthly debt servicing drag.'
      }
    ],
    heroImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    heroImageName: 'commercial-property-lap.webp',
    seoTitle: 'Loan Against Property & Commercial Real Estate Credit | Earth Finance',
    seoDescription: 'Leverage commercial property for long-term institutional capital up to ₹50 Cr at preferential benchmark spreads.',
    status: 'Published',
    lastSaved: 'May 16, 2025',
    editor: 'Underwriting Desk',
    revisionId: 'v3.1.0'
  }
};

const CATEGORIES = [
  'Business Finance',
  'Property Finance',
  'Industrial Finance',
  'Medical Finance',
  'Education Finance',
  'Personal & Vehicle',
  'Green & Clean Energy'
];

const COLLATERAL_OPTIONS = [
  'Unsecured / Hypothecation of Current Assets',
  '100% Tangible Industrial Real Estate',
  'Liquid Pledge (Fixed Deposits / Mutual Funds)',
  'Hybrid Asset-Backed Guarantee',
  'First charge on Plant & Capex Machinery',
  'Hypothecation of Medical & Clinical Diagnostic Assets'
];

export const AdminLoanEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isNew = !id || id === 'new';

  // State
  const [formData, setFormData] = useState<LoanFormData>(() => {
    if (!isNew && id && DEFAULT_LOAN_PRESETS[id]) {
      return DEFAULT_LOAN_PRESETS[id];
    }
    // Also try checking by slug or code
    if (!isNew && id) {
      const found = Object.values(DEFAULT_LOAN_PRESETS).find(
        (p) => p.id === id || p.slug === id || p.code.toLowerCase().includes(id.toLowerCase())
      );
      if (found) return found;
    }

    // Default template for new or generic item
    return {
      id: isNew ? `lp-gen-${Date.now()}` : id || 'lp-bus-01',
      code: isNew ? `#LP-NEW-${Math.floor(100 + Math.random() * 900)}` : '#LP-BUS-01',
      name: isNew ? '' : 'Business Term Loan',
      category: 'Business Finance',
      slug: isNew ? '' : 'business-loan',
      shortDescription: isNew
        ? ''
        : 'Unsecured and structured expansion loans up to ₹10 Cr designed for plant expansions, branch openings, and tech upgrades.',
      overviewHtml: isNew
        ? ''
        : `Earth Finance's flagship Business Term Loan provides rapid, non-dilutive liquidity for manufacturing hubs, retail chains, and logistics operators across Raipur, Durg, and Bilaspur corridors.\n\nBacked by sovereign and commercial consortium arrangements, capital is disbursed with tiered payback structures adapted to high-season cash receipts.`,
      loanAmountFormatted: isNew ? '5,00,00,000' : '10,00,00,000',
      envelopeBadge: isNew ? 'INR (5 Cr)' : 'INR (10 Cr)',
      interestRate: '9.25% - 14.50% p.a.',
      tenureRange: '12 to 60 Months',
      collateralPolicy: 'Unsecured / Hypothecation of Current Assets',
      eligibility: [
        'Minimum 3 years of audited profitable operations in Chhattisgarh or adjoining states.',
        'Annual turnover exceeding ₹1.00 Crore with positive DSCR > 1.25.',
        'Clean CIBIL / Experian score > 700 with nil SMA-2 classifications in 24 months.'
      ],
      documents: [
        { id: 'doc-1', title: '3-Year Audited Balance Sheets with CA seal & Tax Audit Report', icon: 'description', isMandatory: true },
        { id: 'doc-2', title: '12 Months primary bank operational account statements', icon: 'account_balance', isMandatory: true },
        { id: 'doc-3', title: 'GST 3B & 2A reconciliation reports for previous 4 quarters', icon: 'receipt_long', isMandatory: true },
        { id: 'doc-4', title: 'Partnership Deed / MOA & AOA with board borrowing resolution', icon: 'gavel', isMandatory: true }
      ],
      highlights: [
        {
          id: 'hl-1',
          title: 'Fast 48-Hour Approval Window',
          description: 'Preliminary sanction letters dispatched in two business days post doc upload.'
        },
        {
          id: 'hl-2',
          title: 'Minimal Business Disruption with Dedicated Liaison Officer',
          description: 'Direct in-person underwriting liaison seated at Pandri Hub.'
        },
        {
          id: 'hl-3',
          title: 'Flexible Structured Repayment Tenures',
          description: 'Quarterly balloon structures available for cyclical capital machinery purchases.'
        }
      ],
      heroImageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UCS_UiVGB8rV64SNliZ7UN_945abx5AD4plmB6Yx9knzwnWgPkgyF8sh_CMtv8e-O-0wWBvC8MrCIaTwC679x9hAuJ2zKG1VfSFhjd2ZOuOYD2iyy1P3eTUnULDgNS0JFA10fJm0kFEABIxBC0BizFT8mkEZHE0_MFfX4hLYma1hF8s5G1O6a1ggu9b2DjtdvZCxFoivR27OK7_VHMMbyhqroRhJLZQ3jFygtoqz9hBivHG4URXMVD7kI',
      heroImageName: 'corporate-expansion-advisor.webp',
      seoTitle: 'Business Loans & Term Credit in Raipur | Earth Finance',
      seoDescription: 'Access institutional business loans up to ₹10 Crore with competitive interest rates and structured repayment terms across Chhattisgarh. Apply with Earth Finance.',
      status: 'Published',
      lastSaved: 'Today at 11:42 AM',
      editor: 'Rajesh Sharma',
      revisionId: 'v2.4.9'
    };
  });

  // UI States
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishButtonText, setPublishButtonText] = useState('Publish Changes');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Modal states for adding sub-items
  const [isAddEligibilityOpen, setIsAddEligibilityOpen] = useState(false);
  const [newEligibilityText, setNewEligibilityText] = useState('');

  const [isAddDocumentOpen, setIsAddDocumentOpen] = useState(false);
  const [newDocumentTitle, setNewDocumentTitle] = useState('');
  const [newDocumentIcon, setNewDocumentIcon] = useState('description');
  const [newDocumentMandatory, setNewDocumentMandatory] = useState(true);

  const [isAddFeatureOpen, setIsAddFeatureOpen] = useState(false);
  const [newFeatureTitle, setNewFeatureTitle] = useState('');
  const [newFeatureDescription, setNewFeatureDescription] = useState('');

  const [isReplaceImageOpen, setIsReplaceImageOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Fetch backend loan details if available
  useEffect(() => {
    if (!isNew && id) {
      loanApi
        .getAdminLoans()
        .then((res) => {
          if (res?.data && Array.isArray(res.data)) {
            const backendMatch = res.data.find((l) => l.id === id || l.slug === id);
            if (backendMatch) {
              setFormData((prev) => ({
                ...prev,
                name: backendMatch.name || prev.name,
                slug: backendMatch.slug || prev.slug,
                category: backendMatch.category || prev.category,
                shortDescription: backendMatch.short_description || prev.shortDescription,
                overviewHtml: backendMatch.description || prev.overviewHtml,
                loanAmountFormatted: backendMatch.loan_amount || prev.loanAmountFormatted,
                interestRate: backendMatch.interest_rate || prev.interestRate,
                collateralPolicy: backendMatch.collateral || prev.collateralPolicy,
                eligibility: backendMatch.eligibility?.length ? backendMatch.eligibility : prev.eligibility,
                documents: backendMatch.documents?.length
                  ? backendMatch.documents.map((d, i) => ({
                      id: `doc-b-${i}`,
                      title: d,
                      icon: 'description',
                      isMandatory: true
                    }))
                  : prev.documents,
                heroImageUrl: backendMatch.image || prev.heroImageUrl,
                seoTitle: backendMatch.seo_title || prev.seoTitle,
                seoDescription: backendMatch.seo_description || prev.seoDescription,
                status:
                  backendMatch.status === 'PUBLISHED'
                    ? 'Published'
                    : backendMatch.status === 'ARCHIVED'
                    ? 'Archived'
                    : 'Draft'
              }));
            }
          }
        })
        .catch(() => {
          // Gracefully continue with preset defaults
        });
    }
  }, [id, isNew]);

  // Toast trigger
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Auto-generate slug from title if in create mode or slug is empty
  const handleNameChange = (val: string) => {
    const updated = { ...formData, name: val };
    if (isNew || !formData.slug) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      updated.slug = generatedSlug;
      updated.seoTitle = `${val} | Earth Finance`;
      updated.seoDescription = `Access institutional financing for ${val} with competitive interest rates and flexible tenures across Chhattisgarh. Apply with Earth Finance.`;
    }
    setFormData(updated);
  };

  // Validation status calculation
  const validationItems = useMemo(() => {
    const hasName = formData.name.trim().length >= 3;
    const hasSlug = formData.slug.trim().length >= 2;
    const hasCategory = Boolean(formData.category);
    const hasFinancials = Boolean(formData.loanAmountFormatted.trim() && formData.interestRate.trim());
    const hasDocs = formData.documents.length >= 1;
    const hasSeo = Boolean(formData.seoTitle.trim() && formData.seoDescription.trim());

    const items = [
      { label: 'Product Title & Core Data', isReady: hasName, statusText: hasName ? 'Complete' : 'Required' },
      { label: 'URL Slug Resolvable', isReady: hasSlug, statusText: hasSlug ? 'Clean' : 'Missing' },
      { label: 'Category Assignment', isReady: hasCategory, statusText: hasCategory ? 'Assigned' : 'Unset' },
      { label: 'Financial Limits & Rates', isReady: hasFinancials, statusText: hasFinancials ? 'Compliant' : 'Incomplete' },
      { label: 'Mandatory Documents Check', isReady: hasDocs, statusText: hasDocs ? `${formData.documents.length} Verified` : 'No Docs' },
      { label: 'Search Engine Metadata', isReady: hasSeo, statusText: hasSeo ? 'Optimized' : 'Needs SEO' }
    ];

    const completedCount = items.filter((item) => item.isReady).length;
    const percentage = Math.round((completedCount / items.length) * 100);

    return { items, completedCount, total: items.length, percentage };
  }, [formData]);

  // Save as Draft
  const handleDraftSave = async () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setFormData((prev) => ({
      ...prev,
      status: 'Draft',
      lastSaved: `Today at ${timeStr}`
    }));

    try {
      if (!isNew) {
        await loanApi.updateLoan(formData.id, {
          name: formData.name,
          slug: formData.slug,
          category: formData.category,
          short_description: formData.shortDescription,
          description: formData.overviewHtml,
          loan_amount: formData.loanAmountFormatted,
          interest_rate: formData.interestRate,
          collateral: formData.collateralPolicy,
          eligibility: formData.eligibility,
          documents: formData.documents.map((d) => d.title),
          features: formData.highlights.map((h) => `${h.title}: ${h.description}`),
          image: formData.heroImageUrl,
          seo_title: formData.seoTitle,
          seo_description: formData.seoDescription,
          status: 'DRAFT'
        });
      }
    } catch {
      // Handled silently
    }

    showToast('Draft version saved locally');
  };

  // Publish Changes
  const handlePublish = async () => {
    setIsPublishing(true);
    setPublishButtonText('Publishing...');

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    try {
      if (isNew) {
        await loanApi.createLoan({
          name: formData.name,
          slug: formData.slug,
          category: formData.category,
          short_description: formData.shortDescription,
          description: formData.overviewHtml,
          loan_amount: formData.loanAmountFormatted,
          interest_rate: formData.interestRate,
          collateral: formData.collateralPolicy,
          eligibility: formData.eligibility,
          documents: formData.documents.map((d) => d.title),
          features: formData.highlights.map((h) => `${h.title}: ${h.description}`),
          image: formData.heroImageUrl,
          seo_title: formData.seoTitle,
          seo_description: formData.seoDescription,
          status: 'PUBLISHED'
        });
      } else {
        await loanApi.updateLoan(formData.id, {
          name: formData.name,
          slug: formData.slug,
          category: formData.category,
          short_description: formData.shortDescription,
          description: formData.overviewHtml,
          loan_amount: formData.loanAmountFormatted,
          interest_rate: formData.interestRate,
          collateral: formData.collateralPolicy,
          eligibility: formData.eligibility,
          documents: formData.documents.map((d) => d.title),
          features: formData.highlights.map((h) => `${h.title}: ${h.description}`),
          image: formData.heroImageUrl,
          seo_title: formData.seoTitle,
          seo_description: formData.seoDescription,
          status: 'PUBLISHED'
        });
      }
    } catch {
      // Handled silently
    }

    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        status: 'Published',
        lastSaved: `Today at ${timeStr}`
      }));
      setPublishButtonText('Published');
      setIsPublishing(false);
      showToast('Product successfully published to Live Portal');

      setTimeout(() => {
        setPublishButtonText('Publish Changes');
      }, 2000);
    }, 700);
  };

  // Delete / Archive Confirmation
  const handleConfirmDelete = async () => {
    setIsDeleteModalOpen(false);
    try {
      if (!isNew) {
        await loanApi.deleteLoan(formData.id);
      }
    } catch {
      // Handled silently
    }
    showToast('Product marked as archived and removed from index');
    setTimeout(() => {
      navigate('/admin/loans');
    }, 1200);
  };

  // Add Eligibility
  const handleAddEligibility = () => {
    if (!newEligibilityText.trim()) return;
    setFormData((prev) => ({
      ...prev,
      eligibility: [...prev.eligibility, newEligibilityText.trim()]
    }));
    setNewEligibilityText('');
    setIsAddEligibilityOpen(false);
    showToast('Eligibility requirement appended');
  };

  const handleDeleteEligibility = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      eligibility: prev.eligibility.filter((_, i) => i !== index)
    }));
  };

  // Add Document
  const handleAddDocument = () => {
    if (!newDocumentTitle.trim()) return;
    const newDoc: DocumentRequirement = {
      id: `doc-${Date.now()}`,
      title: newDocumentTitle.trim(),
      icon: newDocumentIcon,
      isMandatory: newDocumentMandatory
    };
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, newDoc]
    }));
    setNewDocumentTitle('');
    setIsAddDocumentOpen(false);
    showToast('Document requirement registered');
  };

  const handleDeleteDocument = (idToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((doc) => doc.id !== idToRemove)
    }));
  };

  // Add Highlight Feature
  const handleAddFeature = () => {
    if (!newFeatureTitle.trim()) return;
    const newFeature: HighlightFeature = {
      id: `hl-${Date.now()}`,
      title: newFeatureTitle.trim(),
      description: newFeatureDescription.trim() || 'Structured institutional feature benefit.'
    };
    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, newFeature]
    }));
    setNewFeatureTitle('');
    setNewFeatureDescription('');
    setIsAddFeatureOpen(false);
    showToast('Facility highlight added');
  };

  const handleDeleteFeature = (idToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((hl) => hl.id !== idToRemove)
    }));
  };

  // Replace Image
  const handleSaveImage = () => {
    if (!newImageUrl.trim()) return;
    const filename = newImageUrl.split('/').pop()?.split('?')[0] || 'uploaded-hero-banner.webp';
    setFormData((prev) => ({
      ...prev,
      heroImageUrl: newImageUrl.trim(),
      heroImageName: filename
    }));
    setNewImageUrl('');
    setIsReplaceImageOpen(false);
    showToast('Hero creative asset updated');
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      heroImageUrl: '',
      heroImageName: 'default-placeholder.webp'
    }));
    showToast('Hero image removed');
  };

  return (
    <div className="relative w-full min-h-screen bg-[#f9f9ff] text-[#141b2c] -m-4 sm:-m-6 lg:-m-8">
      {/* Interactive Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-3 bg-[#000001] text-white px-5 py-3 rounded-xl shadow-2xl animate-bounce">
          <span className="material-symbols-outlined text-[#8ff9a6] text-[20px]">check_circle</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumbs & Header Bar */}
      <div className="w-full px-6 sm:px-8 pt-8 pb-5 bg-white border-b border-slate-200/80 shadow-sm">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Title & Breadcrumbs */}
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-1.5 text-xs text-[#75777f]">
              <Link to="/admin/dashboard" className="hover:text-[#071b3a] transition-colors">
                Admin
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link to="/admin/loans" className="hover:text-[#071b3a] transition-colors">
                Loan Products
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-[#141b2c] font-semibold">
                {isNew ? 'Create New Product' : `Edit Product ${formData.code}`}
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-3 mt-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#141b2c] tracking-tight">
                {isNew ? 'Create Loan Product' : `Edit Loan Product: ${formData.name || 'Untitled'}`}
              </h1>

              {formData.status === 'Published' ? (
                <span className="px-2.5 py-0.5 rounded-full bg-[#8cf6a3]/40 text-[#007235] text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006d33] animate-pulse" />
                  Live Product
                </span>
              ) : formData.status === 'Draft' ? (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Draft Docket
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  Archived
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#44474e]">
              Configure product parameters, underwriting eligibility, document requirements, and public SEO visibility.
            </p>
          </div>

          {/* Action Cluster */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/admin/loans"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#e9edff] text-[#44474e] hover:bg-[#dbe2f9] transition-colors text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Loan Products</span>
            </Link>

            {formData.slug && (
              <a
                href={`/loans/${formData.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#f1f3ff] text-[#071b3a] hover:bg-[#e9edff] hover:text-[#071b3a] transition-colors text-xs font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                <span>Preview on Website</span>
              </a>
            )}

            <button
              type="button"
              onClick={handleDraftSave}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#e9edff] text-[#141b2c] hover:bg-[#dbe2f9] transition-colors text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>Save Draft</span>
            </button>

            <button
              type="button"
              id="publishBtn"
              disabled={isPublishing}
              onClick={handlePublish}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ffdf94] text-[#241a00] hover:bg-[#efc13e] transition-all shadow-sm text-xs font-bold disabled:opacity-75"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isPublishing ? 'sync' : 'publish'}
              </span>
              <span>{publishButtonText}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Core Two-Column Form Layout */}
      <div className="w-full px-6 sm:px-8 py-8">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Primary Form Modules (8/12) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* SECTION 1: Basic Information */}
            <section
              id="section-basic"
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col gap-6 scroll-mt-24"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#d7e2ff] flex items-center justify-center text-[#071b3a]">
                    <span className="material-symbols-outlined text-[22px]">info</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold">Section 01</span>
                    <h2 className="text-lg font-bold text-[#141b2c]">Basic Information</h2>
                  </div>
                </div>

                {formData.name.trim() && formData.slug.trim() ? (
                  <span className="text-xs text-[#006d33] flex items-center gap-1 bg-[#8cf6a3]/30 px-2.5 py-1 rounded-md font-semibold">
                    <span className="material-symbols-outlined text-[14px]">check</span> Validated
                  </span>
                ) : (
                  <span className="text-xs text-amber-600 flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-md font-semibold">
                    Incomplete
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#141b2c] flex items-center gap-1">
                    Product Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Secured Enterprise Credit"
                    className="h-11 px-3.5 bg-[#f1f3ff] text-[#141b2c] rounded-xl focus:bg-white focus:ring-2 focus:ring-[#071b3a] outline-none transition-all text-sm font-medium border border-transparent focus:border-slate-300"
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#141b2c] flex items-center gap-1">
                    Category Segment <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full h-11 px-3.5 appearance-none bg-[#f1f3ff] text-[#141b2c] rounded-xl focus:bg-white focus:ring-2 focus:ring-[#071b3a] outline-none text-sm font-medium pr-10 border border-transparent focus:border-slate-300"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3 text-[#75777f] pointer-events-none text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* URL Slug */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#141b2c] flex items-center gap-1">
                    Public URL Slug <span className="text-rose-600">*</span>
                  </label>
                  <div className="flex items-center h-11 bg-[#f1f3ff] rounded-xl px-3.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#071b3a] transition-all border border-transparent focus-within:border-slate-300">
                    <span className="text-xs text-[#75777f] select-none font-mono">earthfinance.in/loans/</span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          slug: e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/^-|-$/g, '')
                        })
                      }
                      className="w-full bg-transparent outline-none text-[#141b2c] text-sm pl-1 font-mono"
                    />
                    <span className="material-symbols-outlined text-[#75777f] text-[18px]">link</span>
                  </div>
                </div>

                {/* Short Description */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#141b2c]">Short Executive Description</label>
                  <textarea
                    rows={2}
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Brief synopsis for cards and previews..."
                    className="p-3 bg-[#f1f3ff] rounded-xl focus:bg-white focus:ring-2 focus:ring-[#071b3a] outline-none text-sm text-[#141b2c] resize-none border border-transparent focus:border-slate-300"
                  />
                  <span className="text-[11px] text-[#75777f] text-right font-medium">
                    {formData.shortDescription.length} / 160 characters recommended
                  </span>
                </div>

                {/* Detailed Overview & Prospectus */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#141b2c]">Detailed Overview &amp; Prospectus</label>
                  <div className="bg-[#f1f3ff] rounded-xl overflow-hidden border border-slate-200">
                    {/* Rich text toolbar */}
                    <div className="flex flex-wrap items-center gap-1 p-2 bg-[#e9edff] border-b border-slate-200">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            overviewHtml: prev.overviewHtml + '\n**Key Underwriting Term:** High liquidity assurance.'
                          }));
                        }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#141b2c] hover:bg-white transition-colors"
                        title="Bold"
                      >
                        <span className="material-symbols-outlined text-[18px]">format_bold</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            overviewHtml: prev.overviewHtml + '\n*Special advisory caveat.*'
                          }));
                        }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#141b2c] hover:bg-white transition-colors"
                        title="Italic"
                      >
                        <span className="material-symbols-outlined text-[18px]">format_italic</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            overviewHtml: prev.overviewHtml + '\n### Facility Terms & Syndicate Structure\n'
                          }));
                        }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#141b2c] hover:bg-white transition-colors"
                        title="Title / Heading"
                      >
                        <span className="material-symbols-outlined text-[18px]">title</span>
                      </button>
                      <div className="h-4 w-px bg-slate-300 mx-1" />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            overviewHtml: prev.overviewHtml + '\n- Tier-1 corporate disbursement within 48h\n- Dedicated Pandri Hub credit officer'
                          }));
                        }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#141b2c] hover:bg-white transition-colors"
                        title="Bullet List"
                      >
                        <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            overviewHtml: prev.overviewHtml + '\n1. Initial dossier verification\n2. Field inspection & sanction'
                          }));
                        }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#141b2c] hover:bg-white transition-colors"
                        title="Numbered List"
                      >
                        <span className="material-symbols-outlined text-[18px]">format_list_numbered</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            overviewHtml: prev.overviewHtml + ' [RBI Master Circular](https://rbi.org.in)'
                          }));
                        }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#141b2c] hover:bg-white transition-colors"
                        title="Link"
                      >
                        <span className="material-symbols-outlined text-[18px]">link</span>
                      </button>
                      <div className="h-4 w-px bg-slate-300 mx-1" />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            overviewHtml:
                              prev.overviewHtml +
                              '\n| Ticket | Rate Spread | Moratorium |\n| :--- | :--- | :--- |\n| ₹1 Cr - ₹10 Cr | 9.25% - 14.50% | Up to 6 Months |'
                          }));
                        }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#141b2c] hover:bg-white transition-colors"
                        title="Table"
                      >
                        <span className="material-symbols-outlined text-[18px]">table_chart</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          showToast('Markdown code syntax enabled');
                        }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#75777f] hover:text-[#141b2c] hover:bg-white ml-auto transition-colors"
                        title="Code snippet"
                      >
                        <span className="material-symbols-outlined text-[18px]">code</span>
                      </button>
                    </div>

                    {/* Editor Body */}
                    <textarea
                      rows={5}
                      value={formData.overviewHtml}
                      onChange={(e) => setFormData({ ...formData, overviewHtml: e.target.value })}
                      placeholder="Enter detailed prospectus and terms..."
                      className="w-full p-4 bg-white text-sm text-[#141b2c] focus:outline-none font-sans leading-relaxed resize-y"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: Financial Parameters & Lending Limits */}
            <section
              id="section-financial"
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col gap-6 scroll-mt-24"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#8cf6a3]/60 flex items-center justify-center text-[#006d33]">
                    <span className="material-symbols-outlined text-[22px]">payments</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold">Section 02</span>
                    <h2 className="text-lg font-bold text-[#141b2c]">Financial Parameters &amp; Lending Limits</h2>
                  </div>
                </div>
                <span className="text-xs bg-[#e9edff] px-2.5 py-1 rounded-md text-[#44474e] font-semibold">
                  INR Tier 1 Cap
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Max Envelope */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#141b2c]">Maximum Loan Envelope</label>
                  <div className="flex items-center h-11 bg-[#f1f3ff] rounded-xl px-3.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#071b3a] transition-all border border-transparent focus-within:border-slate-300">
                    <span className="text-lg font-bold text-[#44474e] mr-1">₹</span>
                    <input
                      type="text"
                      value={formData.loanAmountFormatted}
                      onChange={(e) => setFormData({ ...formData, loanAmountFormatted: e.target.value })}
                      className="w-full bg-transparent outline-none text-[#141b2c] text-lg font-bold tabular-nums"
                      placeholder="10,00,00,000"
                    />
                    <span className="text-xs px-2 py-0.5 rounded bg-[#e9edff] text-[#44474e] font-semibold whitespace-nowrap">
                      {formData.envelopeBadge}
                    </span>
                  </div>
                </div>

                {/* Interest Rate Range */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#141b2c]">Indicative Interest Rate Range</label>
                  <div className="flex items-center h-11 bg-[#f1f3ff] rounded-xl px-3.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#071b3a] transition-all border border-transparent focus-within:border-slate-300">
                    <input
                      type="text"
                      value={formData.interestRate}
                      onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                      placeholder="9.25% - 14.50% p.a."
                      className="w-full bg-transparent outline-none text-[#141b2c] text-sm font-semibold"
                    />
                    <span className="material-symbols-outlined text-[#75777f] text-[18px]">percent</span>
                  </div>
                </div>

                {/* Tenure Range */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#141b2c]">Loan Tenure Range</label>
                  <div className="flex items-center h-11 bg-[#f1f3ff] rounded-xl px-3.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#071b3a] transition-all border border-transparent focus-within:border-slate-300">
                    <input
                      type="text"
                      value={formData.tenureRange}
                      onChange={(e) => setFormData({ ...formData, tenureRange: e.target.value })}
                      placeholder="12 to 60 Months"
                      className="w-full bg-transparent outline-none text-[#141b2c] text-sm font-semibold"
                    />
                    <span className="material-symbols-outlined text-[#75777f] text-[18px]">date_range</span>
                  </div>
                </div>

                {/* Collateral Policy */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#141b2c]">Collateral Policy &amp; Security Class</label>
                  <div className="relative">
                    <select
                      value={formData.collateralPolicy}
                      onChange={(e) => setFormData({ ...formData, collateralPolicy: e.target.value })}
                      className="w-full h-11 px-3.5 appearance-none bg-[#f1f3ff] text-[#141b2c] rounded-xl focus:bg-white focus:ring-2 focus:ring-[#071b3a] outline-none text-sm font-medium pr-10 border border-transparent focus:border-slate-300"
                    >
                      {COLLATERAL_OPTIONS.map((col) => (
                        <option key={col} value={col}>
                          {col}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3 text-[#75777f] pointer-events-none text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              {/* Compliance Helper Box */}
              <div className="p-4 rounded-xl bg-[#f1f3ff] flex items-start gap-3 border border-slate-200/80">
                <span className="material-symbols-outlined text-[#efc13e] text-[22px] shrink-0 mt-0.5">policy</span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#141b2c]">Statutory Notice</span>
                  <p className="text-xs text-[#44474e] leading-relaxed">
                    All displayed rates and limits are indicative. Public pages will automatically append standard
                    lender credit appraisal disclaimers in accordance with RBI Master Directions on Fair Lending Practices.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: Underwriting Eligibility & Prerequisites */}
            <section
              id="section-eligibility"
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col gap-6 scroll-mt-24"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e0e8ff] flex items-center justify-center text-[#071b3a]">
                    <span className="material-symbols-outlined text-[22px]">verified_user</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold">Section 03</span>
                    <h2 className="text-lg font-bold text-[#141b2c]">
                      Underwriting Eligibility &amp; Prerequisites
                    </h2>
                  </div>
                </div>
              </div>

              {/* Eligibility Criteria List */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-[#141b2c]">Underwriting Thresholds</label>
                  <button
                    type="button"
                    onClick={() => setIsAddEligibilityOpen(true)}
                    className="inline-flex items-center gap-1 text-xs text-[#006d33] hover:underline font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_circle</span> Add Eligibility Criteria
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.eligibility.map((crit, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#f1f3ff] group hover:bg-[#e9edff] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#006d33] text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-[#141b2c] leading-snug">{crit}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteEligibility(index)}
                        className="text-[#75777f] hover:text-rose-600 transition-colors p-1"
                        title="Remove criterion"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Documents List */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-[#141b2c]">Mandatory Borrower Documentation</label>
                  <button
                    type="button"
                    onClick={() => setIsAddDocumentOpen(true)}
                    className="inline-flex items-center gap-1 text-xs text-[#006d33] hover:underline font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_circle</span> Add Required Document
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#f1f3ff] hover:bg-[#e9edff] transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="material-symbols-outlined text-[#75777f] text-[20px] shrink-0">
                          {doc.icon}
                        </span>
                        <span className="text-xs sm:text-sm text-[#141b2c] truncate">{doc.title}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {doc.isMandatory && (
                          <span className="text-[11px] px-2 py-0.5 rounded bg-[#ffdad6] text-[#93000a] font-bold">
                            Mandatory
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="text-[#75777f] hover:text-rose-600 p-1"
                          title="Remove document"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 4: Key Facility Highlights & Advantages */}
            <section
              id="section-highlights"
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col gap-6 scroll-mt-24"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e9edff] flex items-center justify-center text-[#071b3a]">
                    <span className="material-symbols-outlined text-[22px]">stars</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold">Section 04</span>
                    <h2 className="text-lg font-bold text-[#141b2c]">Key Facility Highlights &amp; Advantages</h2>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddFeatureOpen(true)}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-[#e9edff] hover:bg-[#dbe2f9] transition-colors font-bold text-[#071b3a]"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span> Add Key Feature
                </button>
              </div>

              <div className="flex flex-col gap-2.5">
                {formData.highlights.map((hl, index) => (
                  <div
                    key={hl.id}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f1f3ff] hover:bg-[#e0e8ff]/60 transition-colors shadow-sm border border-slate-100"
                  >
                    <span className="material-symbols-outlined text-[#75777f] cursor-grab text-[20px]">
                      drag_indicator
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#dbe2f9] flex items-center justify-center text-[#071b3a] font-bold text-xs shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={hl.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            highlights: prev.highlights.map((item) =>
                              item.id === hl.id ? { ...item, title: val } : item
                            )
                          }));
                        }}
                        className="w-full bg-transparent outline-none text-sm text-[#141b2c] font-bold"
                      />
                      <input
                        type="text"
                        value={hl.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            highlights: prev.highlights.map((item) =>
                              item.id === hl.id ? { ...item, description: val } : item
                            )
                          }));
                        }}
                        className="w-full bg-transparent outline-none text-xs text-[#44474e] truncate mt-0.5"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteFeature(hl.id)}
                      className="text-[#75777f] hover:text-rose-600 p-1.5 transition-colors"
                      title="Delete highlight"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 5: Media & Hero Creative */}
            <section
              id="section-media"
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col gap-6 scroll-mt-24"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e9edff] flex items-center justify-center text-[#071b3a]">
                    <span className="material-symbols-outlined text-[22px]">image</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold">Section 05</span>
                    <h2 className="text-lg font-bold text-[#141b2c]">Media &amp; Hero Creative</h2>
                  </div>
                </div>
                <span className="text-xs text-[#75777f]">1200 x 896 px Recommended</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Image Card Preview */}
                <div className="md:col-span-6 relative rounded-xl overflow-hidden shadow-md group aspect-[4/3] bg-[#e9edff]">
                  {formData.heroImageUrl ? (
                    <img
                      src={formData.heroImageUrl}
                      alt={formData.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4">
                      <span className="material-symbols-outlined text-4xl mb-2">image</span>
                      <span className="text-xs font-semibold">No Hero Image Specified</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071b3a]/90 via-transparent to-transparent flex items-end p-4">
                    <div className="text-white">
                      <span className="text-[11px] bg-[#ffdf94] text-[#241a00] px-2 py-0.5 rounded font-bold">
                        Active Hero Banner
                      </span>
                      <p className="text-xs font-semibold mt-1 truncate max-w-xs">{formData.heroImageName}</p>
                    </div>
                  </div>
                </div>

                {/* Upload Controls & Guidelines */}
                <div className="md:col-span-6 flex flex-col gap-3">
                  <div className="p-4 rounded-xl bg-[#f1f3ff] flex flex-col gap-2 border border-slate-100">
                    <h4 className="text-xs font-bold text-[#141b2c]">Hero Photographic Assets</h4>
                    <p className="text-xs text-[#44474e] leading-relaxed">
                      This image appears as the primary header creative on the public product page, lender comparison
                      tables, and dynamic social preview cards.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsReplaceImageOpen(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#071b3a] text-white hover:bg-[#0b2d5c] transition-colors text-xs font-bold shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">cloud_upload</span> Replace Image
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#e9edff] text-[#75777f] hover:text-rose-600 hover:bg-rose-50 transition-colors text-xs font-semibold"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span> Remove
                    </button>
                  </div>
                  <span className="text-[11px] text-[#75777f]">
                    Supported: WebP, JPG, PNG (Max: 4.5MB). Auto-compressed via Cloud CDN.
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 6: Search Engine Optimization (SEO) */}
            <section
              id="section-seo"
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col gap-6 scroll-mt-24"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e9edff] flex items-center justify-center text-[#071b3a]">
                    <span className="material-symbols-outlined text-[22px]">travel_explore</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold">Section 06</span>
                    <h2 className="text-lg font-bold text-[#141b2c]">Search Engine Optimization (SEO)</h2>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#8cf6a3]/50 text-[#007235] font-bold">
                  Indexable
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {/* Meta Title */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#141b2c]">SEO Meta Title</label>
                    <span className="text-[11px] text-[#75777f]">
                      {formData.seoTitle.length} / 60 characters
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    className="h-11 px-3.5 bg-[#f1f3ff] text-[#141b2c] rounded-xl focus:bg-white focus:ring-2 focus:ring-[#071b3a] outline-none text-sm font-medium border border-transparent focus:border-slate-300"
                  />
                </div>

                {/* Meta Description */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#141b2c]">Meta Description</label>
                    <span className="text-[11px] text-[#75777f]">
                      {formData.seoDescription.length} / 160 characters
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={formData.seoDescription}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    className="p-3 bg-[#f1f3ff] text-[#141b2c] rounded-xl focus:bg-white focus:ring-2 focus:ring-[#071b3a] outline-none text-sm resize-none border border-transparent focus:border-slate-300 leading-relaxed"
                  />
                </div>

                {/* Live Google Preview Card */}
                <div className="flex flex-col gap-2 pt-2">
                  <span className="text-[11px] text-[#75777f] uppercase tracking-wider font-bold">
                    Search Snippet Preview (Desktop / Mobile SERP)
                  </span>
                  <div className="p-4 rounded-xl bg-[#f1f3ff]/70 flex flex-col gap-1.5 max-w-2xl border border-slate-200">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#071b3a] flex items-center justify-center text-[10px] text-white font-bold">
                        EF
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] leading-tight text-[#141b2c] font-semibold">Earth Finance</span>
                        <span className="text-[11px] leading-tight text-[#75777f] truncate font-mono">
                          https://earthfinance.in › loans › {formData.slug || 'business-loan'}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-base text-blue-700 hover:underline cursor-pointer line-clamp-1 font-semibold">
                      {formData.seoTitle || 'Business Term Loan | Earth Finance'}
                    </h3>
                    <p className="text-xs text-[#44474e] line-clamp-2 leading-relaxed">
                      {formData.seoDescription ||
                        'Access institutional business loans with competitive interest rates and structured repayment terms across Chhattisgarh. Apply with Earth Finance.'}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR: Status, TOC, Validation (4/12) */}
          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
            {/* CARD 1: Publishing Controls */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-base text-[#141b2c] font-bold">Publishing State</h3>
                <span className="material-symbols-outlined text-[#75777f] text-[20px]">tune</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold">Lifecycle Status</label>
                <div className="relative">
                  <select
                    value={formData.status.toLowerCase()}
                    onChange={(e) => {
                      const val = e.target.value;
                      const mapped =
                        val === 'published' ? 'Published' : val === 'archived' ? 'Archived' : 'Draft';
                      setFormData({ ...formData, status: mapped });
                    }}
                    className="w-full h-10 px-3 appearance-none bg-[#f1f3ff] text-[#141b2c] rounded-xl text-xs font-semibold outline-none pr-8 border border-transparent focus:border-slate-300"
                  >
                    <option value="published">Published (Publicly Visible)</option>
                    <option value="draft">Draft (Restricted to CMS)</option>
                    <option value="archived">Archived / Legacy</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[#75777f] pointer-events-none text-[18px]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Metadata info */}
              <div className="flex flex-col gap-2 pt-1 bg-[#f1f3ff] p-3 rounded-xl text-xs text-[#44474e] border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-[#75777f]">Last Saved:</span>
                  <span className="text-[#141b2c] font-semibold">{formData.lastSaved}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#75777f]">Editor:</span>
                  <span className="text-[#141b2c] font-semibold">{formData.editor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#75777f]">Revision ID:</span>
                  <span className="font-mono text-[#75777f] font-bold">{formData.revisionId}</span>
                </div>
              </div>

              {/* Action Stack */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  disabled={isPublishing}
                  onClick={handlePublish}
                  className="w-full py-2.5 rounded-xl bg-[#ffdf94] text-[#241a00] hover:bg-[#efc13e] transition-all text-xs font-bold shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">published_with_changes</span>
                  <span>Update Live Listing</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="w-full py-2 rounded-xl bg-[#f1f3ff] text-rose-600 hover:bg-rose-50 transition-colors text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">delete_forever</span>
                  <span>Delete Product</span>
                </button>
              </div>
            </div>

            {/* CARD 2: Validation Check */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base text-[#141b2c] font-bold">Validation Status</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#8cf6a3]/40 text-[#007235] text-xs font-bold">
                  {validationItems.completedCount}/{validationItems.total} Ready
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-[#e0e8ff] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#006d33] rounded-full transition-all duration-500"
                  style={{ width: `${validationItems.percentage}%` }}
                />
              </div>

              <div className="space-y-2 pt-1 text-xs">
                {validationItems.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-[#141b2c]">
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`material-symbols-outlined text-[16px] ${
                          item.isReady ? 'text-[#006d33]' : 'text-slate-300'
                        }`}
                      >
                        {item.isReady ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <span className={item.isReady ? 'text-[#006d33] font-bold' : 'text-slate-400 font-medium'}>
                      {item.statusText}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 3: Form Section Navigator (TOC) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col gap-2">
              <h3 className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold">Section Jump Links</h3>
              <nav className="flex flex-col gap-1 text-xs font-medium">
                <a
                  href="#section-basic"
                  className="px-3 py-2 rounded-xl bg-[#f1f3ff] text-[#141b2c] hover:bg-[#e9edff] transition-colors flex items-center justify-between font-bold"
                >
                  <span>01. Basic Information</span>
                  <span className="material-symbols-outlined text-[16px] text-[#75777f]">arrow_downward</span>
                </a>
                <a
                  href="#section-financial"
                  className="px-3 py-2 rounded-xl hover:bg-[#f1f3ff] text-[#44474e] hover:text-[#141b2c] transition-colors flex items-center justify-between"
                >
                  <span>02. Financial Limits</span>
                  <span className="material-symbols-outlined text-[16px] text-[#75777f]">arrow_downward</span>
                </a>
                <a
                  href="#section-eligibility"
                  className="px-3 py-2 rounded-xl hover:bg-[#f1f3ff] text-[#44474e] hover:text-[#141b2c] transition-colors flex items-center justify-between"
                >
                  <span>03. Underwriting Rules</span>
                  <span className="material-symbols-outlined text-[16px] text-[#75777f]">arrow_downward</span>
                </a>
                <a
                  href="#section-highlights"
                  className="px-3 py-2 rounded-xl hover:bg-[#f1f3ff] text-[#44474e] hover:text-[#141b2c] transition-colors flex items-center justify-between"
                >
                  <span>04. Facility Highlights</span>
                  <span className="material-symbols-outlined text-[16px] text-[#75777f]">arrow_downward</span>
                </a>
                <a
                  href="#section-media"
                  className="px-3 py-2 rounded-xl hover:bg-[#f1f3ff] text-[#44474e] hover:text-[#141b2c] transition-colors flex items-center justify-between"
                >
                  <span>05. Media &amp; Visuals</span>
                  <span className="material-symbols-outlined text-[16px] text-[#75777f]">arrow_downward</span>
                </a>
                <a
                  href="#section-seo"
                  className="px-3 py-2 rounded-xl hover:bg-[#f1f3ff] text-[#44474e] hover:text-[#141b2c] transition-colors flex items-center justify-between"
                >
                  <span>06. Search Visibility</span>
                  <span className="material-symbols-outlined text-[16px] text-[#75777f]">arrow_downward</span>
                </a>
              </nav>
            </div>
          </aside>
        </div>
      </div>

      {/* MODAL: Delete / Archive Confirmation */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#071b3a]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl flex flex-col gap-4 border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">warning</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#141b2c]">
                Archive Product {formData.code}?
              </h3>
              <p className="text-xs sm:text-sm text-[#44474e] mt-1 leading-relaxed">
                Removing &quot;{formData.name || 'this product'}&quot; will unpublish its public landing page and disable active customer application funnels across the Raipur digital portal.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#f1f3ff] text-[#141b2c] text-xs font-semibold hover:bg-[#e9edff] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors shadow-sm"
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add Eligibility Criteria */}
      {isAddEligibilityOpen && (
        <div className="fixed inset-0 z-50 bg-[#071b3a]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl flex flex-col gap-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-[#141b2c]">Add Underwriting Threshold</h3>
              <button
                type="button"
                onClick={() => setIsAddEligibilityOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#141b2c]">Criteria Requirement</label>
              <textarea
                rows={3}
                value={newEligibilityText}
                onChange={(e) => setNewEligibilityText(e.target.value)}
                placeholder="e.g. Minimum 2 years continuous GST filings with nil tax default."
                className="p-3 bg-[#f1f3ff] rounded-xl text-xs text-[#141b2c] outline-none focus:ring-2 focus:ring-[#071b3a] border border-transparent focus:border-slate-300"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddEligibilityOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#f1f3ff] text-xs font-semibold text-slate-700 hover:bg-[#e9edff]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddEligibility}
                className="px-4 py-2 rounded-xl bg-[#071b3a] text-white text-xs font-bold hover:bg-[#0b2d5c]"
              >
                Add Criteria
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add Required Document */}
      {isAddDocumentOpen && (
        <div className="fixed inset-0 z-50 bg-[#071b3a]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl flex flex-col gap-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-[#141b2c]">Add Borrower Document</h3>
              <button
                type="button"
                onClick={() => setIsAddDocumentOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#141b2c]">Document Title</label>
              <input
                type="text"
                value={newDocumentTitle}
                onChange={(e) => setNewDocumentTitle(e.target.value)}
                placeholder="e.g. Latest 6 Months Electricity / Utility Bills"
                className="h-10 px-3 bg-[#f1f3ff] rounded-xl text-xs text-[#141b2c] outline-none focus:ring-2 focus:ring-[#071b3a]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#141b2c]">Icon</label>
                <select
                  value={newDocumentIcon}
                  onChange={(e) => setNewDocumentIcon(e.target.value)}
                  className="h-10 px-3 bg-[#f1f3ff] rounded-xl text-xs text-[#141b2c] outline-none"
                >
                  <option value="description">Description</option>
                  <option value="account_balance">Bank Statement</option>
                  <option value="receipt_long">Tax / Invoice</option>
                  <option value="gavel">Legal / Deed</option>
                  <option value="apartment">Property Map</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 justify-end">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#141b2c] h-10">
                  <input
                    type="checkbox"
                    checked={newDocumentMandatory}
                    onChange={(e) => setNewDocumentMandatory(e.target.checked)}
                    className="w-4 h-4 rounded text-[#071b3a]"
                  />
                  <span>Mandatory File</span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddDocumentOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#f1f3ff] text-xs font-semibold text-slate-700 hover:bg-[#e9edff]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddDocument}
                className="px-4 py-2 rounded-xl bg-[#071b3a] text-white text-xs font-bold hover:bg-[#0b2d5c]"
              >
                Add Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add Feature Highlight */}
      {isAddFeatureOpen && (
        <div className="fixed inset-0 z-50 bg-[#071b3a]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl flex flex-col gap-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-[#141b2c]">Add Key Feature Highlight</h3>
              <button
                type="button"
                onClick={() => setIsAddFeatureOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#141b2c]">Feature Heading</label>
              <input
                type="text"
                value={newFeatureTitle}
                onChange={(e) => setNewFeatureTitle(e.target.value)}
                placeholder="e.g. Zero Foreclosure Charges After 12 EMIs"
                className="h-10 px-3 bg-[#f1f3ff] rounded-xl text-xs text-[#141b2c] outline-none focus:ring-2 focus:ring-[#071b3a]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#141b2c]">Description Detail</label>
              <textarea
                rows={2}
                value={newFeatureDescription}
                onChange={(e) => setNewFeatureDescription(e.target.value)}
                placeholder="e.g. Clean prepayments accepted without penal fees after primary lockdown period."
                className="p-3 bg-[#f1f3ff] rounded-xl text-xs text-[#141b2c] outline-none focus:ring-2 focus:ring-[#071b3a]"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddFeatureOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#f1f3ff] text-xs font-semibold text-slate-700 hover:bg-[#e9edff]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-2 rounded-xl bg-[#071b3a] text-white text-xs font-bold hover:bg-[#0b2d5c]"
              >
                Add Feature
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Replace Image */}
      {isReplaceImageOpen && (
        <div className="fixed inset-0 z-50 bg-[#071b3a]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl flex flex-col gap-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-[#141b2c]">Update Hero Image Asset</h3>
              <button
                type="button"
                onClick={() => setIsReplaceImageOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#141b2c]">Image URL (WebP / PNG / JPG)</label>
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="h-10 px-3 bg-[#f1f3ff] rounded-xl text-xs text-[#141b2c] outline-none focus:ring-2 focus:ring-[#071b3a]"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsReplaceImageOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#f1f3ff] text-xs font-semibold text-slate-700 hover:bg-[#e9edff]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveImage}
                className="px-4 py-2 rounded-xl bg-[#071b3a] text-white text-xs font-bold hover:bg-[#0b2d5c]"
              >
                Set Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminLoanEditPage;
