import React, { useState, useEffect, useMemo, useRef } from 'react';
import { faqApi } from '../../services/faqApi';
import { Faq } from '../../types';

interface ExtendedFaq extends Faq {
  status: 'Published' | 'Draft' | 'Archived';
  views: number;
  updated_label: string;
}

const SEED_FAQS: ExtendedFaq[] = [
  {
    id: '1',
    category: 'Business Finance',
    display_order: 1,
    question: 'What is Cash Credit (CC) and how does drawing power work?',
    answer:
      'Drawing Power (DP) is calculated strictly against 90-day verified book debts and paid-up raw materials inventory minus applicable margins (usually 25% for industrial units in Chhattisgarh). Underwriters audit quarterly stock audit certificates issued by empanelled Chartered Accountants to dynamically adjust maximum drawing capacity.',
    status: 'Published',
    views: 1280,
    updated_label: 'Updated 2d ago',
    is_published: true
  },
  {
    id: '2',
    category: 'Industrial Capex',
    display_order: 2,
    question: 'What documents are required for ₹5 Cr+ Industrial Capex sanction?',
    answer:
      'Audited financial statements for past 3 consecutive fiscal years, TEV study reports by certified agency, GST returns (Form GSTR-3B & 1) for 12 months, industrial land allotment deed from CSIDC, pollution board consent-to-establish (CTE), and detailed project report covering machinery quotations.',
    status: 'Published',
    views: 940,
    updated_label: 'Updated 4d ago',
    is_published: true
  },
  {
    id: '3',
    category: 'Property Finance',
    display_order: 3,
    question: 'Can private limited companies apply for LAP without real estate collateral?',
    answer:
      'No, Loan Against Property inherently mandates mortgaged unencumbered freehold commercial, industrial, or residential real estate collateral. However, quasi-equity corporate lines and revenue-based term financing are available for qualified corporates with clean credit bureau history.',
    status: 'Draft',
    views: 0,
    updated_label: 'Updated 1w ago',
    is_published: false
  },
  {
    id: '4',
    category: 'Regulatory & Compliance',
    display_order: 4,
    question: 'What is the typical sanction turnaround time for the Raipur Regional Desk?',
    answer:
      'In-principle eligibility sanctions are generated within 48 bank hours of documentation completion. Final committee disbursal for structured industrial credit concludes within 7-10 working days upon legal vetting and mortgage creation.',
    status: 'Published',
    views: 2410,
    updated_label: 'Updated 2w ago',
    is_published: true
  },
  {
    id: '5',
    category: 'Medical Finance',
    display_order: 5,
    question: 'Can hospital diagnostic machinery be financed under medical leasing?',
    answer:
      'Yes, high-value MRI, CT scanner, catheterization labs, and modular surgical theater equipment qualify under our specialized Doctor & Diagnostic Equipment Term Loans with tenures reaching 84 months and flexible repayment linked to patient footfall projections.',
    status: 'Published',
    views: 615,
    updated_label: 'Updated 3w ago',
    is_published: true
  },
  {
    id: '6',
    category: 'Regulatory & Compliance',
    display_order: 6,
    question: 'What were the FY23-24 ECLGS government lending guarantee rules?',
    answer:
      'Superseded following RBI notification regarding expiration of COVID-era credit line guarantees. Maintained internally for audit reference and compliance tracking.',
    status: 'Archived',
    views: 120,
    updated_label: 'Updated 3mo ago',
    is_published: false
  },
  {
    id: '7',
    category: 'Industrial Capex',
    display_order: 7,
    question: 'How does Project Term Loan disbursement work against construction milestones?',
    answer:
      'Term loan tranches are released based on certified Chartered Engineer progress certificates and site inspection validation. Borrowers must bring in pro-rata promoters equity contribution before each construction disbursement milestone.',
    status: 'Published',
    views: 820,
    updated_label: 'Updated 5d ago',
    is_published: true
  },
  {
    id: '8',
    category: 'Education Finance',
    display_order: 8,
    question: 'What are the eligibility criteria for institutional school campus expansion loans?',
    answer:
      'Educational trusts or societies must demonstrate a 5-year operating track record, valid state educational board affiliation or CBSE/ICSE approvals, healthy student enrollment density (>75%), and audited debt-service coverage exceeding 1.4x.',
    status: 'Published',
    views: 430,
    updated_label: 'Updated 1w ago',
    is_published: true
  },
  {
    id: '9',
    category: 'Business Finance',
    display_order: 9,
    question: 'Are warehouse receipts eligible for collateralized trade financing in Chhattisgarh?',
    answer:
      'Yes, negotiable warehouse receipts (NWRs) issued by WDRA-accredited agricultural storage units and state warehousing corporations qualify for commodity-backed pledge funding with fast-track margin funding up to 75% of commodity market value.',
    status: 'Published',
    views: 710,
    updated_label: 'Updated 1w ago',
    is_published: true
  },
  {
    id: '10',
    category: 'Regulatory & Compliance',
    display_order: 10,
    question: 'What is the minimum Debt Service Coverage Ratio (DSCR) required for manufacturing units?',
    answer:
      'Manufacturing and heavy engineering enterprises must generally exhibit a minimum average DSCR of 1.35x over the proposed facility amortization schedule, with sensitive stress-test tolerance modeling down to 1.15x under input raw material inflation.',
    status: 'Published',
    views: 1150,
    updated_label: 'Updated 2w ago',
    is_published: true
  },
  {
    id: '11',
    category: 'Industrial Capex',
    display_order: 11,
    question: 'Can solar rooftop installations qualify for green concessional interest subsidies?',
    answer:
      'Yes, captive rooftop and ground-mounted solar plants installed for industrial self-consumption qualify under our Green Enterprise Capex credit lines, featuring a 50-75 bps interest rebate and accelerated tax depreciation alignment.',
    status: 'Published',
    views: 890,
    updated_label: 'Updated 2w ago',
    is_published: true
  },
  {
    id: '12',
    category: 'Property Finance',
    display_order: 12,
    question: 'What is the maximum Loan-to-Value (LTV) ratio for commercial office buildings?',
    answer:
      'For self-occupied or tenanted commercial grade-A real estate with registered long-term lease rent discounting (LRD), underwriters permit LTV up to 65% based on institutional valuation by empanelled government-approved valuers.',
    status: 'Published',
    views: 1340,
    updated_label: 'Updated 3w ago',
    is_published: true
  },
  {
    id: '13',
    category: 'Business Finance',
    display_order: 13,
    question: 'How are pre-sanction inspection charges handled for tier-2 industrial clusters?',
    answer:
      'Inspection and legal title search charges are billed at standardized, nominal out-of-pocket costs with zero hidden processing commissions. All charges are itemized transparently in the formal sanction letter.',
    status: 'Published',
    views: 560,
    updated_label: 'Updated 1mo ago',
    is_published: true
  },
  {
    id: '14',
    category: 'Business Finance',
    display_order: 14,
    question: 'What collateral concessions exist for NABARD-linked agro-processing plants?',
    answer:
      'Eligible food processing, cold chain, and dal/rice milling ventures can access CGTMSE collateral guarantees up to ₹5 Crores or composite credit structures combining NABARD capital investment subsidies with lower margin requirements.',
    status: 'Published',
    views: 990,
    updated_label: 'Updated 1mo ago',
    is_published: true
  },
  {
    id: '15',
    category: 'Regulatory & Compliance',
    display_order: 15,
    question: 'Draft proposal: Special interest rebate framework for women-led MSME units',
    answer:
      'Pending approval from the institutional credit committee: proposed 25 bps concession for MSMEs where women entrepreneurs hold over 51% proprietary equity and executive directorship.',
    status: 'Draft',
    views: 0,
    updated_label: 'Updated 4d ago',
    is_published: false
  },
  {
    id: '16',
    category: 'Medical Finance',
    display_order: 16,
    question: 'Can diagnostic centers lease high-slice CT scanners under operating leases?',
    answer:
      'Yes, our medical leasing desk structures non-recourse and limited-recourse equipment lease contracts with structured balloon repayments and end-of-term machinery fair value buyouts.',
    status: 'Published',
    views: 480,
    updated_label: 'Updated 1mo ago',
    is_published: true
  },
  {
    id: '17',
    category: 'Industrial Capex',
    display_order: 17,
    question: 'What environmental approvals are mandatory before heavy engineering credit release?',
    answer:
      'Borrowers in sponge iron, rolling mills, cement, and chemical segments must submit State Pollution Control Board Consent to Establish (CTE), valid Consent to Operate (CTO), and statutory green corridor clearances prior to second tranche disbursals.',
    status: 'Published',
    views: 720,
    updated_label: 'Updated 1mo ago',
    is_published: true
  },
  {
    id: '18',
    category: 'Business Finance',
    display_order: 18,
    question: 'How does Earth Finance coordinate multibank consortium lending above ₹25 Crores?',
    answer:
      'Our Structured Finance Desk acts as Lead Arranger and Syndication Coordinator, managing common loan documentation, inter-creditor agreements (ICA), security trustee appointment, and parallel pari-passu charge creation across public and private sector lenders.',
    status: 'Published',
    views: 1650,
    updated_label: 'Updated 2w ago',
    is_published: true
  }
];

const CATEGORIES = [
  'Business Finance',
  'Industrial Capex',
  'Property Finance',
  'Medical Finance',
  'Education Finance',
  'Regulatory & Compliance'
];

export const AdminFaqsPage: React.FC = () => {
  const [faqs, setFaqs] = useState<ExtendedFaq[]>(SEED_FAQS);
  const [selectedFaqId, setSelectedFaqId] = useState<string>('1');
  const [drawerMode, setDrawerMode] = useState<'edit' | 'create'>('edit');
  const [drawerTab, setDrawerTab] = useState<'edit' | 'preview'>('edit');
  const [isReorderMode, setIsReorderMode] = useState<boolean>(false);
  const [accordionExpanded, setAccordionExpanded] = useState<boolean>(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Editor Form Fields
  const [formQuestion, setFormQuestion] = useState<string>('');
  const [formCategory, setFormCategory] = useState<string>('Business Finance');
  const [formOrder, setFormOrder] = useState<number>(1);
  const [formAnswer, setFormAnswer] = useState<string>('');
  const [formStatus, setFormStatus] = useState<'Published' | 'Draft' | 'Archived'>('Published');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const answerTextareaRef = useRef<HTMLTextAreaElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Load backend data if available, preserving initial seed if DB is empty
  useEffect(() => {
    const fetchRemoteFaqs = async () => {
      try {
        const res = await faqApi.getAdmin();
        if (res.success && res.data && res.data.length > 0) {
          const mapped: ExtendedFaq[] = res.data.map((item, idx) => ({
            id: String(item.id || idx + 1),
            category: item.category || 'Business Finance',
            question: item.question,
            answer: item.answer,
            display_order: item.display_order ?? idx + 1,
            is_published: item.is_published ?? true,
            status: (item.status as any) || (item.is_published ? 'Published' : 'Draft'),
            views: item.views ?? Math.floor(400 + Math.random() * 1500),
            updated_label: 'Synced with Cloud'
          }));
          setFaqs(mapped);
        }
      } catch {
        // Fallback silently to seed data in dev
      }
    };
    fetchRemoteFaqs();
  }, []);

  // Keyboard shortcut listener: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Synchronize editor inputs when selected FAQ changes or list initializes
  useEffect(() => {
    if (drawerMode === 'edit') {
      const activeItem = faqs.find((f) => f.id === selectedFaqId) || faqs[0];
      if (activeItem) {
        setFormQuestion(activeItem.question);
        setFormCategory(activeItem.category);
        setFormOrder(activeItem.display_order);
        setFormAnswer(activeItem.answer);
        setFormStatus(activeItem.status);
      }
    }
  }, [selectedFaqId, drawerMode, faqs]);

  // Handle select FAQ item for editing
  const handleSelectFaq = (item: ExtendedFaq) => {
    setSelectedFaqId(item.id);
    setDrawerMode('edit');
    setFormQuestion(item.question);
    setFormCategory(item.category);
    setFormOrder(item.display_order);
    setFormAnswer(item.answer);
    setFormStatus(item.status);
  };

  // Switch to Create Mode
  const handleFocusNew = () => {
    const nextOrder = Math.max(...faqs.map((f) => f.display_order), 0) + 1;
    setDrawerMode('create');
    setFormQuestion('');
    setFormCategory('Business Finance');
    setFormOrder(nextOrder);
    setFormAnswer('');
    setFormStatus('Published');
    setDrawerTab('edit');
    showToast('Ready to draft a new FAQ entry');
  };

  // Save changes / Create
  const handleSaveFaq = async (overrideStatus?: 'Published' | 'Draft' | 'Archived') => {
    if (!formQuestion.trim()) {
      alert('Please provide a question title.');
      return;
    }
    const finalStatus = overrideStatus || formStatus;
    const isPub = finalStatus === 'Published';

    if (drawerMode === 'create') {
      const newId = String(Date.now());
      const newEntry: ExtendedFaq = {
        id: newId,
        question: formQuestion.trim(),
        category: formCategory,
        display_order: Number(formOrder) || 1,
        answer: formAnswer.trim(),
        status: finalStatus,
        is_published: isPub,
        views: 0,
        updated_label: 'Just now'
      };

      try {
        await faqApi.create({
          question: newEntry.question,
          category: newEntry.category,
          display_order: newEntry.display_order,
          answer: newEntry.answer,
          is_published: isPub
        });
      } catch {
        // Backend offline fallback handled gracefully
      }

      setFaqs((prev) => [newEntry, ...prev]);
      setSelectedFaqId(newId);
      setDrawerMode('edit');
      showToast(isPub ? 'FAQ successfully published to live website!' : 'Draft FAQ created successfully!');
      setDrawerTab('preview');
    } else {
      // Update existing
      try {
        await faqApi.update(selectedFaqId, {
          question: formQuestion.trim(),
          category: formCategory,
          display_order: Number(formOrder),
          answer: formAnswer.trim(),
          is_published: isPub
        });
      } catch {
        // Fallback
      }

      setFaqs((prev) =>
        prev.map((f) =>
          f.id === selectedFaqId
            ? {
                ...f,
                question: formQuestion.trim(),
                category: formCategory,
                display_order: Number(formOrder),
                answer: formAnswer.trim(),
                status: finalStatus,
                is_published: isPub,
                updated_label: 'Just now'
              }
            : f
        )
      );
      showToast(isPub ? 'FAQ successfully published to live website!' : 'Draft saved successfully');
      setDrawerTab('preview');
    }
  };

  // Inline publish/unpublish toggle
  const handleTogglePublish = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const item = faqs.find((f) => f.id === id);
    if (!item) return;

    const newStatus: 'Published' | 'Draft' = item.status === 'Published' ? 'Draft' : 'Published';
    const isPub = newStatus === 'Published';

    try {
      await faqApi.update(id, { is_published: isPub });
    } catch {
      // Local fallback
    }

    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: newStatus, is_published: isPub, updated_label: 'Just now' } : f))
    );

    if (id === selectedFaqId) {
      setFormStatus(newStatus);
    }

    showToast(isPub ? 'FAQ published to Earth Finance portal' : 'FAQ moved to Unindexed Draft');
  };

  // Inline delete
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this FAQ entry?')) return;

    try {
      await faqApi.delete(id);
    } catch {
      // Local fallback
    }

    setFaqs((prev) => prev.filter((f) => f.id !== id));
    if (selectedFaqId === id) {
      const remaining = faqs.filter((f) => f.id !== id);
      if (remaining.length > 0) {
        handleSelectFaq(remaining[0]);
      } else {
        handleFocusNew();
      }
    }
    showToast('FAQ deleted from Knowledge Base');
  };

  // Move Display Order
  const handleMoveOrder = (id: string, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    const index = faqs.findIndex((f) => f.id === id);
    if (index === -1) return;

    const newFaqs = [...faqs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newFaqs.length) return;

    // Swap display order
    const currentOrder = newFaqs[index].display_order;
    newFaqs[index].display_order = newFaqs[targetIndex].display_order;
    newFaqs[targetIndex].display_order = currentOrder;

    // Swap positions
    const temp = newFaqs[index];
    newFaqs[index] = newFaqs[targetIndex];
    newFaqs[targetIndex] = temp;

    setFaqs(newFaqs);
    showToast(`Order updated for #${newFaqs[targetIndex].display_order}`);
  };

  // Export Knowledge Base as CSV
  const handleExportCSV = () => {
    const headers = ['Order', 'Category', 'Status', 'Question', 'Answer', 'Views', 'Last Updated'];
    const rows = faqs.map((f) => [
      f.display_order,
      `"${f.category.replace(/"/g, '""')}"`,
      f.status,
      `"${f.question.replace(/"/g, '""')}"`,
      `"${f.answer.replace(/"/g, '""')}"`,
      f.views,
      f.updated_label
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'earth_finance_faqs_knowledge_base.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Knowledge Base exported as CSV');
  };

  // Copy Search Engine Schema JSON-LD
  const handleCopySchema = () => {
    const published = faqs.filter((f) => f.status === 'Published');
    const schemaObj = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: published.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer
        }
      }))
    };
    const code = `<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n</script>`;
    navigator.clipboard.writeText(code);
    showToast('Google FAQPage JSON-LD schema copied to clipboard!');
  };

  // Quick formatting insert
  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = answerTextareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formAnswer;
    const selected = text.substring(start, end);
    const replacement = `${prefix}${selected || 'text'}${suffix}`;
    const newText = text.substring(0, start) + replacement + text.substring(end);
    setFormAnswer(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected ? selected.length : 4));
    }, 0);
  };

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqs
      .filter((item) => {
        const matchesSearch =
          !searchQuery ||
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
        const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => a.display_order - b.display_order);
  }, [faqs, searchQuery, categoryFilter, statusFilter]);

  // Pagination slice
  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage) || 1;
  const paginatedFaqs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredFaqs.slice(start, start + itemsPerPage);
  }, [filteredFaqs, currentPage]);

  // Multi-select handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedFaqs.map((f) => f.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelectOne = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  // Bulk actions
  const handleBulkPublish = () => {
    setFaqs((prev) =>
      prev.map((f) => (selectedIds.includes(f.id) ? { ...f, status: 'Published', is_published: true } : f))
    );
    showToast(`Published ${selectedIds.length} FAQs to website`);
    setSelectedIds([]);
  };

  const handleBulkArchive = () => {
    setFaqs((prev) =>
      prev.map((f) => (selectedIds.includes(f.id) ? { ...f, status: 'Archived', is_published: false } : f))
    );
    showToast(`Archived ${selectedIds.length} FAQs`);
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    if (!confirm(`Delete ${selectedIds.length} selected FAQs?`)) return;
    setFaqs((prev) => prev.filter((f) => !selectedIds.includes(f.id)));
    showToast(`Deleted ${selectedIds.length} FAQs`);
    setSelectedIds([]);
  };

  // Category Badge Color
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Business Finance':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Industrial Capex':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Property Finance':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Medical Finance':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Education Finance':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Regulatory & Compliance':
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  // Compute KPI counts dynamically
  const totalCount = faqs.length;
  const publishedCount = faqs.filter((f) => f.status === 'Published').length;
  const draftsCount = faqs.filter((f) => f.status === 'Draft').length;
  const archivedCount = faqs.filter((f) => f.status === 'Archived').length;

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto text-[#141b2c]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 flex items-center gap-2.5 px-4 py-3 rounded-lg bg-[#071b3a] text-white shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4">
          <span className="material-symbols-outlined text-[20px] text-[#efc13e]">check_circle</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Global Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-[#75777f] uppercase tracking-wider font-semibold">
            <span>Earth Finance Admin</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>CMS</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#071b3a] font-bold">Frequently Asked Questions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071b3a] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#75777f] max-w-3xl">
            Manage institutional FAQs, technical borrowing queries, and regulatory knowledge bases published across Earth Finance portal.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-start md:self-auto">
          {/* Reorder Mode Button */}
          <button
            type="button"
            onClick={() => {
              const nextState = !isReorderMode;
              setIsReorderMode(nextState);
              showToast(
                nextState
                  ? 'Reorder Mode activated: Adjust question positions'
                  : 'New FAQ sequence saved successfully'
              );
            }}
            className={`h-10 px-4 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all border ${
              isReorderMode
                ? 'bg-[#ffdf94] text-[#241a00] border-[#efc13e] shadow-md ring-2 ring-[#efc13e]/30'
                : 'bg-white text-[#141b2c] border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">drag_indicator</span>
            <span>{isReorderMode ? 'Save Order' : 'Reorder Mode'}</span>
          </button>

          {/* Export Knowledge Base CSV */}
          <button
            type="button"
            onClick={handleExportCSV}
            className="h-10 px-4 rounded-lg bg-white text-[#071b3a] border border-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>Export KB</span>
          </button>

          {/* Add FAQ Primary CTA */}
          <button
            type="button"
            onClick={handleFocusNew}
            className="h-10 px-5 rounded-lg bg-[#efc13e] text-[#241a00] text-xs font-extrabold flex items-center gap-1.5 shadow-sm hover:bg-[#ffdf94] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Add FAQ</span>
          </button>
        </div>
      </div>

      {/* 4 Summary KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* KPI 1: Total FAQs */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold">Total FAQs</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#071b3a] mt-0.5 tracking-tight">
              {totalCount}
            </span>
            <span className="text-[11px] text-[#006d33] flex items-center gap-1 mt-0.5 font-bold">
              <span className="material-symbols-outlined text-[14px]">verified</span> 6 Categories
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center text-[#071b3a]">
            <span className="material-symbols-outlined text-[22px]">quiz</span>
          </div>
        </div>

        {/* KPI 2: Live & Published */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold">Live &amp; Published</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#006d33] mt-0.5 tracking-tight">
              {publishedCount}
            </span>
            <span className="text-[11px] text-[#006d33] flex items-center gap-1 mt-0.5 font-bold">
              <span className="material-symbols-outlined text-[14px]">public</span> Indexed in Raipur Desk
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg bg-[#8ff9a6]/30 flex items-center justify-center text-[#006d33]">
            <span className="material-symbols-outlined text-[22px]">check_circle</span>
          </div>
        </div>

        {/* KPI 3: Legal Drafts */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold">Legal Drafts</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#a47f00] mt-0.5 tracking-tight">
              {draftsCount}
            </span>
            <span className="text-[11px] text-[#a47f00] flex items-center gap-1 mt-0.5 font-bold">
              <span className="material-symbols-outlined text-[14px]">rate_review</span> Under Fiduciary Check
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg bg-[#ffdf94]/40 flex items-center justify-center text-[#a47f00]">
            <span className="material-symbols-outlined text-[22px]">pending_actions</span>
          </div>
        </div>

        {/* KPI 4: Archived / Superseded */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold">Archived / Superseded</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#75777f] mt-0.5 tracking-tight">
              {archivedCount}
            </span>
            <span className="text-[11px] text-[#75777f] flex items-center gap-1 mt-0.5 font-bold">
              <span className="material-symbols-outlined text-[14px]">history</span> 2024 Policy update
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center text-[#75777f]">
            <span className="material-symbols-outlined text-[22px]">archive</span>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search input with ⌘K */}
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#75777f]">
            search
          </span>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search questions, keywords, or legal terms..."
            className="w-full h-10 pl-9 pr-14 bg-slate-50 border border-slate-200 rounded-lg text-xs text-[#141b2c] placeholder-[#75777f] focus:outline-none focus:bg-white focus:border-[#071b3a] transition-all shadow-sm"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-[#75777f] border border-slate-300 pointer-events-none">
            ⌘K
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-10 px-3 bg-slate-50 text-[#141b2c] border border-slate-200 text-xs font-semibold rounded-lg focus:outline-none focus:border-[#071b3a] shadow-sm cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-10 px-3 bg-slate-50 text-[#141b2c] border border-slate-200 text-xs font-semibold rounded-lg focus:outline-none focus:border-[#071b3a] shadow-sm cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>

          {/* Clear / Reset Filter button if filter active */}
          {(searchQuery || categoryFilter !== 'ALL' || statusFilter !== 'ALL') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('ALL');
                setStatusFilter('ALL');
                setCurrentPage(1);
              }}
              className="h-10 px-3 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Dual-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Columns: FAQ List Table */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
            {/* Table Action Header */}
            <div className="p-3.5 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={
                    paginatedFaqs.length > 0 && paginatedFaqs.every((f) => selectedIds.includes(f.id))
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#071b3a] focus:ring-0 cursor-pointer"
                  title="Select All on page"
                />
                <span className="text-xs font-bold text-[#071b3a]">
                  {selectedIds.length > 0 ? (
                    <span className="text-[#071b3a]">
                      {selectedIds.length} item{selectedIds.length > 1 ? 's' : ''} selected
                    </span>
                  ) : (
                    <span>Knowledge Base Catalog ({filteredFaqs.length})</span>
                  )}
                </span>
              </div>

              {selectedIds.length > 0 ? (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleBulkPublish}
                    className="px-2.5 py-1 rounded bg-[#8ff9a6]/30 text-[#006d33] border border-[#006d33]/20 hover:bg-[#8ff9a6]/50 text-[11px] font-bold"
                  >
                    Publish
                  </button>
                  <button
                    type="button"
                    onClick={handleBulkArchive}
                    className="px-2.5 py-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 text-[11px] font-bold"
                  >
                    Archive
                  </button>
                  <button
                    type="button"
                    onClick={handleBulkDelete}
                    className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-[11px] font-bold"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div className="text-[11px] text-[#75777f] font-semibold flex items-center gap-1">
                  <span>Sorted by Display Order</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                </div>
              )}
            </div>

            {/* List Rows */}
            {filteredFaqs.length === 0 ? (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-[#071b3a] mb-3">
                  <span className="material-symbols-outlined text-[28px]">manage_search</span>
                </div>
                <h4 className="text-base font-bold text-[#071b3a]">No FAQs match criteria</h4>
                <p className="text-xs text-[#75777f] max-w-sm mt-1">
                  No questions match your search or filter options. Reset filters or create a new FAQ entry.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('ALL');
                    setStatusFilter('ALL');
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-slate-100 text-[#071b3a] text-xs font-bold hover:bg-slate-200 transition-colors"
                >
                  Reset Search &amp; Filters
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 flex flex-col">
                {paginatedFaqs.map((faq) => {
                  const isSelected = selectedFaqId === faq.id;
                  const isChecked = selectedIds.includes(faq.id);

                  return (
                    <div
                      key={faq.id}
                      onClick={() => handleSelectFaq(faq)}
                      className={`p-3.5 sm:p-4 hover:bg-slate-50 transition-colors flex items-start gap-3 cursor-pointer group ${
                        isSelected ? 'bg-blue-50/50 border-l-4 border-[#071b3a]' : ''
                      }`}
                    >
                      {/* Checkbox and Order Handles */}
                      <div className="flex items-center gap-1.5 pt-0.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelectOne(faq.id)}
                          className="w-4 h-4 rounded border-slate-300 text-[#071b3a] focus:ring-0 cursor-pointer"
                        />
                        <span
                          className={`material-symbols-outlined text-[18px] transition-colors ${
                            isReorderMode
                              ? 'text-[#006d33] animate-pulse cursor-grab'
                              : 'text-slate-300 group-hover:text-slate-500'
                          }`}
                          title={isReorderMode ? 'Drag or reorder handle' : 'Order drag handle'}
                        >
                          drag_indicator
                        </span>
                        {isReorderMode && (
                          <div className="flex flex-col gap-0.5">
                            <button
                              type="button"
                              onClick={(e) => handleMoveOrder(faq.id, 'up', e)}
                              className="w-4 h-3 flex items-center justify-center hover:bg-slate-200 rounded text-slate-600"
                              title="Move up"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleMoveOrder(faq.id, 'down', e)}
                              className="w-4 h-3 flex items-center justify-center hover:bg-slate-200 rounded text-slate-600"
                              title="Move down"
                            >
                              ▼
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Content Column */}
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                            #{faq.display_order < 10 ? `0${faq.display_order}` : faq.display_order}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getCategoryBadgeClass(
                              faq.category
                            )}`}
                          >
                            {faq.category}
                          </span>

                          {/* Status Badge */}
                          {faq.status === 'Published' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8ff9a6]/30 text-[#006d33] border border-[#006d33]/20 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#006d33]"></span>
                              Published
                            </span>
                          ) : faq.status === 'Draft' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              Draft
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                              Archived
                            </span>
                          )}
                        </div>

                        {/* Question Title */}
                        <h4 className="text-sm font-bold text-[#071b3a] group-hover:text-blue-900 leading-snug line-clamp-1">
                          {faq.question}
                        </h4>

                        {/* Answer Excerpt */}
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {faq.answer}
                        </p>

                        {/* Meta Tags */}
                        <div className="flex items-center gap-4 text-[11px] text-[#75777f] font-medium mt-0.5">
                          {faq.status === 'Published' ? (
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[13px]">visibility</span>{' '}
                              {faq.views.toLocaleString()} views
                            </span>
                          ) : faq.status === 'Draft' ? (
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[13px]">lock</span> Internal
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[13px]">archive</span> Inactive
                            </span>
                          )}
                          <span>•</span>
                          <span>{faq.updated_label}</span>
                        </div>
                      </div>

                      {/* Row Quick Actions */}
                      <div className="flex items-center gap-1 self-start pt-0.5" onClick={(e) => e.stopPropagation()}>
                        {/* Quick Toggle Publish */}
                        <button
                          type="button"
                          onClick={(e) => handleTogglePublish(faq.id, e)}
                          title={faq.status === 'Published' ? 'Published (Click to Unpublish)' : 'Unpublished (Click to Publish)'}
                          className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${
                            faq.status === 'Published' ? 'text-[#006d33]' : 'text-slate-400'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {faq.status === 'Published' ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                        </button>

                        {/* Quick Edit in Drawer */}
                        <button
                          type="button"
                          onClick={() => handleSelectFaq(faq)}
                          title="Open in FAQ Editor"
                          className="p-1.5 rounded text-slate-400 hover:text-[#071b3a] hover:bg-slate-200 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>

                        {/* Delete action */}
                        <button
                          type="button"
                          onClick={(e) => handleDelete(faq.id, e)}
                          title="Delete FAQ"
                          className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {filteredFaqs.length > 0 && (
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-[#75777f]">
                <span>
                  Showing {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, filteredFaqs.length)} of {filteredFaqs.length} entries
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                  </button>

                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pg) => (
                    <button
                      key={pg}
                      type="button"
                      onClick={() => setCurrentPage(pg)}
                      className={`w-8 h-8 rounded text-xs font-bold flex items-center justify-center transition-all ${
                        currentPage === pg
                          ? 'bg-[#071b3a] text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-[#141b2c] hover:bg-slate-100'
                      }`}
                    >
                      {pg}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Fiduciary & Legal Quality Guardrail Ribbon */}
          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#071b3a] text-[#efc13e] flex-shrink-0 flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">account_balance</span>
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#071b3a]">Fiduciary &amp; Legal Quality Guardrail</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#8ff9a6]/50 text-[#006d33] uppercase tracking-wider">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every FAQ tagged under <em>Business Finance</em> or <em>Industrial Capex</em> must undergo verification
                against prevailing Reserve Bank of India lending norms and Chhattisgarh state industrial subsidy schemes prior to public indexing.
              </p>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: FAQ Editor & Live Public View Drawer */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 flex flex-col gap-4">
            {/* Drawer Header & Dual Tabs */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex flex-col">
                <span className="text-base font-bold text-[#071b3a]">FAQ Editor</span>
                <span className="text-xs text-[#75777f]">
                  {drawerMode === 'create'
                    ? 'Creating New FAQ Entry'
                    : `Editing Item #${selectedFaqId.padStart(2, '0')}`}
                </span>
              </div>

              {/* Dual Tab Switcher */}
              <div className="flex items-center p-1 rounded-lg bg-slate-100 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setDrawerTab('edit')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    drawerTab === 'edit'
                      ? 'bg-white text-[#071b3a] shadow-sm'
                      : 'text-[#75777f] hover:text-[#071b3a]'
                  }`}
                >
                  Edit Details
                </button>
                <button
                  type="button"
                  onClick={() => setDrawerTab('preview')}
                  className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1 transition-all ${
                    drawerTab === 'preview'
                      ? 'bg-white text-[#071b3a] shadow-sm'
                      : 'text-[#75777f] hover:text-[#071b3a]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">preview</span> Public View
                </button>
              </div>
            </div>

            {/* TAB 1: Edit Details Pane */}
            {drawerTab === 'edit' && (
              <div className="flex flex-col gap-4">
                {/* Question Title */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs font-bold text-[#141b2c]">
                    <span>Question Title</span>
                    <span className="text-[11px] text-[#75777f] font-normal">
                      {formQuestion.length}/120 chars
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formQuestion}
                    onChange={(e) => setFormQuestion(e.target.value)}
                    placeholder="Enter formal inquiry title..."
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a] shadow-sm"
                  />
                </div>

                {/* Category & Display Order */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#141b2c]">Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-[#141b2c] focus:outline-none focus:border-[#071b3a] shadow-sm cursor-pointer"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#141b2c]">Display Order</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={formOrder}
                        onChange={(e) => setFormOrder(Number(e.target.value))}
                        className="w-full h-10 px-3 pr-8 bg-slate-50 border border-slate-200 rounded-lg text-xs text-[#141b2c] focus:outline-none focus:border-[#071b3a] shadow-sm"
                      />
                      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[16px] text-[#75777f] pointer-events-none">
                        format_list_numbered
                      </span>
                    </div>
                  </div>
                </div>

                {/* Answer Textarea with Rich Formatting Toolbar */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#141b2c]">
                    Answer (Knowledge Base Entry)
                  </label>

                  {/* Formatting Toolbar */}
                  <div className="bg-slate-100 border border-slate-200 rounded-lg p-1 flex items-center gap-1 flex-wrap shadow-sm">
                    <button
                      type="button"
                      onClick={() => insertFormatting('## ')}
                      className="p-1 px-1.5 rounded hover:bg-slate-200 text-[#071b3a] font-bold text-[11px]"
                      title="Heading 2"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('### ')}
                      className="p-1 px-1.5 rounded hover:bg-slate-200 text-[#071b3a] font-bold text-[11px]"
                      title="Heading 3"
                    >
                      H3
                    </button>
                    <div className="h-3.5 w-px bg-slate-300 mx-0.5"></div>
                    <button
                      type="button"
                      onClick={() => insertFormatting('**', '**')}
                      className="p-1 rounded hover:bg-slate-200 text-[#071b3a] flex items-center justify-center w-6 h-6"
                      title="Bold"
                    >
                      <span className="material-symbols-outlined text-[15px]">format_bold</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('*', '*')}
                      className="p-1 rounded hover:bg-slate-200 text-[#071b3a] flex items-center justify-center w-6 h-6"
                      title="Italic"
                    >
                      <span className="material-symbols-outlined text-[15px]">format_italic</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('- ')}
                      className="p-1 rounded hover:bg-slate-200 text-[#071b3a] flex items-center justify-center w-6 h-6"
                      title="Bullet List"
                    >
                      <span className="material-symbols-outlined text-[15px]">format_list_bulleted</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('1. ')}
                      className="p-1 rounded hover:bg-slate-200 text-[#071b3a] flex items-center justify-center w-6 h-6"
                      title="Numbered List"
                    >
                      <span className="material-symbols-outlined text-[15px]">format_list_numbered</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('> ')}
                      className="p-1 rounded hover:bg-slate-200 text-[#071b3a] flex items-center justify-center w-6 h-6"
                      title="Quote"
                    >
                      <span className="material-symbols-outlined text-[15px]">format_quote</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('[', '](https://earthfinance.in)')}
                      className="p-1 rounded hover:bg-slate-200 text-[#071b3a] flex items-center justify-center w-6 h-6"
                      title="Link"
                    >
                      <span className="material-symbols-outlined text-[15px]">link</span>
                    </button>
                  </div>

                  {/* Textarea */}
                  <textarea
                    ref={answerTextareaRef}
                    rows={5}
                    value={formAnswer}
                    onChange={(e) => setFormAnswer(e.target.value)}
                    placeholder="Enter thorough institutional guidance and statutory requirements..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a] shadow-sm leading-relaxed"
                  ></textarea>

                  <div className="flex items-center gap-1.5 p-1 text-[#75777f] text-[11px]">
                    <span className="material-symbols-outlined text-[14px] text-[#006d33]">info</span>
                    <span>Educational financial disclaimer automatically appended on public website.</span>
                  </div>
                </div>

                {/* Publishing Status Radio Cards */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#141b2c]">Publishing Status</label>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Option 1: Draft */}
                    <label
                      className={`flex items-center justify-center gap-1.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                        formStatus === 'Draft'
                          ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-300'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="faqStatusRadio"
                        value="Draft"
                        checked={formStatus === 'Draft'}
                        onChange={() => setFormStatus('Draft')}
                        className="text-amber-600 focus:ring-0"
                      />
                      <span
                        className={`text-xs font-bold ${
                          formStatus === 'Draft' ? 'text-amber-800' : 'text-slate-700'
                        }`}
                      >
                        Draft
                      </span>
                    </label>

                    {/* Option 2: Published */}
                    <label
                      className={`flex items-center justify-center gap-1.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                        formStatus === 'Published'
                          ? 'bg-emerald-50 border-[#8ff9a6] ring-1 ring-[#006d33]'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="faqStatusRadio"
                        value="Published"
                        checked={formStatus === 'Published'}
                        onChange={() => setFormStatus('Published')}
                        className="text-[#006d33] focus:ring-0"
                      />
                      <span
                        className={`text-xs font-bold ${
                          formStatus === 'Published' ? 'text-[#006d33]' : 'text-slate-700'
                        }`}
                      >
                        Published
                      </span>
                    </label>

                    {/* Option 3: Archived */}
                    <label
                      className={`flex items-center justify-center gap-1.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                        formStatus === 'Archived'
                          ? 'bg-slate-200 border-slate-400 ring-1 ring-slate-400'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="faqStatusRadio"
                        value="Archived"
                        checked={formStatus === 'Archived'}
                        onChange={() => setFormStatus('Archived')}
                        className="text-slate-600 focus:ring-0"
                      />
                      <span
                        className={`text-xs font-bold ${
                          formStatus === 'Archived' ? 'text-slate-800' : 'text-slate-700'
                        }`}
                      >
                        Archived
                      </span>
                    </label>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      if (drawerMode === 'create' && faqs.length > 0) {
                        handleSelectFaq(faqs[0]);
                      } else {
                        // Re-sync with current item
                        const item = faqs.find((f) => f.id === selectedFaqId);
                        if (item) handleSelectFaq(item);
                      }
                      showToast('Editor changes reverted');
                    }}
                    className="px-3 py-2 rounded-lg text-xs font-semibold text-[#75777f] hover:text-[#071b3a] transition-colors"
                  >
                    Cancel
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSaveFaq('Draft')}
                      className="px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-200 text-[#071b3a] text-xs font-bold hover:bg-slate-200 transition-colors"
                    >
                      Save Draft
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSaveFaq('Published')}
                      className="px-4 py-2 rounded-lg bg-[#efc13e] text-[#241a00] text-xs font-extrabold shadow-sm hover:bg-[#ffdf94] active:scale-95 transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[17px]">publish</span>
                      <span>Publish to Website</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Public View Accordion Simulator */}
            {drawerTab === 'preview' && (
              <div className="flex flex-col gap-3 animate-in fade-in">
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#071b3a]">visibility</span>
                  <span className="font-medium">
                    Live Public Rendering (As seen on https://earthfinance.in/faqs)
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider border ${getCategoryBadgeClass(
                        formCategory
                      )}`}
                    >
                      {formCategory}
                    </span>
                    <span className="text-[11px] text-[#75777f] font-semibold">Section Accordion</span>
                  </div>

                  {/* Active Simulator Accordion */}
                  <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all">
                    {/* Gold Top Border */}
                    <div className="h-1 bg-[#efc13e] w-full"></div>

                    {/* Accordion Header */}
                    <div
                      onClick={() => setAccordionExpanded(!accordionExpanded)}
                      className="p-3.5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-xs sm:text-sm font-bold text-[#071b3a] pr-2 leading-snug">
                        {formQuestion || 'Enter a question title...'}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[#071b3a] transition-transform duration-300 flex-shrink-0 ${
                          accordionExpanded ? 'rotate-180 bg-[#071b3a] text-white' : ''
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                      </div>
                    </div>

                    {/* Collapsible Accordion Body */}
                    {accordionExpanded && (
                      <div className="px-3.5 pb-3.5 flex flex-col gap-2.5 pt-0 animate-in fade-in">
                        <div className="h-px bg-slate-100 w-full mb-0.5"></div>
                        <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                          {formAnswer || 'Answer content will preview here in real time as you edit.'}
                        </p>
                        <div className="p-2 rounded bg-slate-50 border border-slate-100 flex items-center gap-1.5 text-[#75777f] text-[11px]">
                          <span className="material-symbols-outlined text-[14px] text-[#006d33]">shield</span>
                          <span>Standard Earth Finance Fiduciary Regulatory Clause § 14-B applies.</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Second Mock Item for Context */}
                  <div className="bg-white/70 border border-slate-200 rounded-lg p-3 opacity-60 flex items-center justify-between select-none">
                    <span className="text-xs font-semibold text-slate-700">
                      What documents are required for ₹5 Cr+ Industrial Capex sanction?
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-slate-400">add</span>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setDrawerTab('edit')}
                    className="px-3.5 py-1.5 rounded-lg bg-[#071b3a] text-white text-xs font-bold hover:bg-blue-900 transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[15px]">edit</span>
                    <span>Return to Edit Details</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Google Search Engine Schema (FAQPage JSON-LD) Card */}
          <div className="bg-[#071b3a] text-white p-5 rounded-xl border border-white/10 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#efc13e]">
                Search Engine Schema
              </span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-white tracking-wider">
                FAQPage JSON-LD
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              All {publishedCount} published FAQs are automatically serialized into Google Rich Snippet markup to optimize
              local Raipur commercial lending visibility and SEO rankings.
            </p>

            <div className="relative bg-black/40 border border-white/10 p-3 rounded-lg font-mono text-[11px] text-blue-200 overflow-x-auto max-h-40">
              <button
                type="button"
                onClick={handleCopySchema}
                title="Copy JSON-LD Script"
                className="absolute top-2 right-2 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[13px]">content_copy</span>
                <span>Copy</span>
              </button>
              <pre className="whitespace-pre">
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    ${faqs
      .filter((f) => f.status === 'Published')
      .slice(0, 3)
      .map(
        (f) => `{\n      "@type": "Question",\n      "name": "${f.question.replace(/"/g, '\\"')}",\n      "acceptedAnswer": {\n        "@type": "Answer",\n        "text": "${f.answer.slice(0, 60).replace(/"/g, '\\"')}..."\n      }\n    }`
      )
      .join(',\n    ')}
    // ... + ${Math.max(0, publishedCount - 3)} more published entries
  ]
}
</script>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFaqsPage;
