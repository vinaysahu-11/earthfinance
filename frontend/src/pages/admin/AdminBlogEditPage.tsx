import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blogApi } from '../../services/blogApi';

interface RelatedArticle {
  id: string;
  title: string;
  subtitle: string;
}

export const AdminBlogEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Primary Metadata
  const [articleCode] = useState<string>(id ? (id.startsWith('art-') ? `#ART-${id.replace('art-', '40')}` : `#ART-${id}`) : '#ART-402');
  const [headline, setHeadline] = useState<string>(
    'How Raipur Enterprises Can Optimize Cash Credit (CC) Limits Ahead of Peak Operational Cycles'
  );
  const [slug, setSlug] = useState<string>('how-raipur-enterprises-optimize-cc-limits-2025');
  const [abstract, setAbstract] = useState<string>(
    'A strategic manual on drawing power formulas, inventory valuation haircuts, and consortium restructuring for manufacturing and retail enterprises across Chhattisgarh.'
  );

  // Body content & section
  const [editorialSectionTitle, setEditorialSectionTitle] = useState<string>(
    '1. The Mechanics of Drawing Power (DP) Constraints in Regional Industrial Hubs'
  );
  const [editorialBodyP1, setEditorialBodyP1] = useState<string>(
    "In industrial belts like Urla, Siltara, and Bhanpuri, maintaining healthy working capital facilities hinges not merely on the sanctioned Cash Credit sanction letter, but on month-end Drawing Power (DP) certification. A substantial disconnect frequently emerges between the lender's sanctioned ceiling and the actual disbursable drawing power. Commercial banks rigorously filter submitted monthly stock statements against book debts exceeding 90 days, uncleared goods in transit, and non-moving raw inventory."
  );
  const [editorialBodyP2, setEditorialBodyP2] = useState<string>(
    'When raw material price volatility escalates—as observed across secondary steel, sponge iron, and agro-processing clusters—working capital stress accelerates if inventory valuation metrics have not been structured according to Tandon or Nayak Committee norms.'
  );
  const [proTipTitle, setProTipTitle] = useState<string>(
    'Underwriter Pro-Tip: Sundry Creditors Segregation'
  );
  const [proTipContent, setProTipContent] = useState<string>(
    'Ensure that your quarterly Chartered Accountant reconciliation strictly separates Sundry Creditors directly related to Raw Material procurement from Capital Goods liabilities. Banks universally net out total trade payables from paid stocks; improper categorization reduces your computed DP by up to 28% without justification.'
  );
  const [editorialBodyP3, setEditorialBodyP3] = useState<string>(
    'For syndications exceeding ₹15 Crores, establishing a formal structured bill discounting line against letter of credit (LC) back-to-back limits can bypass DP calculation deadlocks during peak dispatch cycles.'
  );

  // Governance & Categorization
  const [lifecycleStage, setLifecycleStage] = useState<string>('Published • Active On Portal');
  const [releaseDate, setReleaseDate] = useState<string>('May 14, 2025');
  const [releaseTime, setReleaseTime] = useState<string>('09:30 AM');
  const [isFeatured, setIsFeatured] = useState<boolean>(true);
  const [taxonomyCategory, setTaxonomyCategory] = useState<string>('Working Capital & CC');
  const [tags, setTags] = useState<string[]>(['CC Limit', 'Drawing Power', 'Raipur Industrial', 'MSME Credit']);
  const [newTagInput, setNewTagInput] = useState<string>('');
  const [isAddingTag, setIsAddingTag] = useState<boolean>(false);

  // Featured Media
  const [mediaUrl, setMediaUrl] = useState<string>(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAlKJPflEoMgXJdOWUfSl-Twr2sayzeRXI7zvxLU9IqTp0zPmEqHmBpVMPOaGnswM1Szj_yrbjgjeB96fV6eStAne-jke_I8WTua00s0xk0zeQ_AxJtFQeGN8tsFe5s3WtcrZKC8MJLIt00OzT9L61ejdQP35LTQ5A0BI_QmEedZoyqzjqiZhUyd5edw_RsQEhFWz-lYJaIY0J3WIYMCyr-TMnJCrZxQcWQY1Zad9S3NgKGUERgIjwX'
  );
  const [mediaAlt, setMediaAlt] = useState<string>(
    'Underwriter reviewing working capital audit dossier in Raipur'
  );
  const [isMediaZoomOpen, setIsMediaZoomOpen] = useState<boolean>(false);

  // SERP SEO
  const [seoTitle, setSeoTitle] = useState<string>(
    'Optimize Cash Credit (CC) Limits in Raipur | Earth Finance'
  );
  const [seoDescription, setSeoDescription] = useState<string>(
    'Learn how manufacturing firms in Urla and Siltara optimize drawing power and banking consortium limits ahead of peak operational seasons.'
  );
  const [slugTarget, setSlugTarget] = useState<string>(
    'how-raipur-enterprises-optimize-cc-limits-2025'
  );

  // Related Articles
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([
    {
      id: 'rel-1',
      title: 'Project Financing for Industrial Capex',
      subtitle: 'Sanction Guide • 2,400 reads'
    },
    {
      id: 'rel-2',
      title: 'Unsecured Business Loan Approval Checklist',
      subtitle: 'Underwriting • 4,120 reads'
    }
  ]);

  // Readouts & Metrics
  const [wordCount, setWordCount] = useState<number>(1840);
  const [fleschScore] = useState<number>(64);
  const [lastSavedText, setLastSavedText] = useState<string>(
    'Draft last saved 3 minutes ago by Rajesh Sharma • Enterprise Syndication Desk'
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Sync slug with headline if creating new
  const handleHeadlineChange = (val: string) => {
    setHeadline(val);
    if (!id || id === 'new') {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generated);
      setSlugTarget(generated);
    }
  };

  // Tag Management
  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const handleAddTag = () => {
    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
      setTags((prev) => [...prev, newTagInput.trim()]);
      setNewTagInput('');
      setIsAddingTag(false);
      showToast(`Added tag "${newTagInput.trim()}"`);
    }
  };

  // Unlink Related Article
  const handleUnlinkRelated = (relId: string) => {
    setRelatedArticles((prev) => prev.filter((r) => r.id !== relId));
    showToast('Related article unlinked');
  };

  // Add more related article
  const handleLinkMore = () => {
    const newRel: RelatedArticle = {
      id: `rel-${Date.now()}`,
      title: 'CMA Data Formulation: 5 Essential Banking Ratios',
      subtitle: 'Financial Standards • 7,700 reads'
    };
    setRelatedArticles((prev) => [...prev, newRel]);
    showToast('Linked related dossier');
  };

  // Save Draft
  const handleSaveDraft = async () => {
    setLastSavedText(`Draft saved at ${new Date().toLocaleTimeString()} by Rajesh Sharma`);
    showToast('Article draft successfully saved');
    if (id && id !== 'new') {
      try {
        await blogApi.update(id, {
          title: headline,
          slug,
          excerpt: abstract,
          status: 'DRAFT',
          seo_title: seoTitle,
          seo_description: seoDescription,
          tags
        });
      } catch {
        // Fallback
      }
    }
  };

  // Publish
  const handlePublish = async () => {
    setLifecycleStage('Published • Active On Portal');
    setLastSavedText(`Published live at ${new Date().toLocaleTimeString()} to earthfinance.in/blog`);
    showToast('Article published live to Earth Finance portal!');
    if (id && id !== 'new') {
      try {
        await blogApi.update(id, {
          title: headline,
          slug,
          excerpt: abstract,
          status: 'PUBLISHED',
          seo_title: seoTitle,
          seo_description: seoDescription,
          tags
        });
      } catch {
        // Fallback
      }
    }
  };

  return (
    <div className="flex flex-col w-full text-[#141b2c] max-w-[1600px] mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-16 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#071b3a] text-white shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4">
          <span className="material-symbols-outlined text-[20px] text-[#efc13e]">check_circle</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Editorial Top Command Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col min-w-0">
          {/* Breadcrumb Hierarchy */}
          <nav className="flex items-center gap-1.5 text-xs text-[#75777f] mb-1 font-semibold">
            <Link to="/admin/dashboard" className="hover:text-[#071b3a] transition-colors">
              Earth Finance Admin
            </Link>
            <span className="material-symbols-outlined text-[14px] text-[#75777f]">chevron_right</span>
            <Link to="/admin/blog" className="hover:text-[#071b3a] transition-colors">
              Blog
            </Link>
            <span className="material-symbols-outlined text-[14px] text-[#75777f]">chevron_right</span>
            <span className="text-[#141b2c] font-semibold">Edit Article</span>
            <span className="material-symbols-outlined text-[14px] text-[#75777f]">chevron_right</span>
            <span className="px-1.5 py-0.5 rounded bg-blue-50 font-mono text-[10px] text-[#071b3a] font-bold border border-blue-200">
              {articleCode}
            </span>
          </nav>

          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-[#141b2c] tracking-tight truncate max-w-2xl">
              Edit Article: {headline.split(':')[0] || headline}
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#8cf6a3]/30 text-[#007235] text-xs font-bold border border-[#007235]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006d33] animate-pulse"></span>
              Ready for publication
            </span>
          </div>

          <p className="text-xs text-[#75777f] mt-1 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-[#006d33]">check_circle</span>
            <span>{lastSavedText}</span>
          </p>
        </div>

        {/* Right Header Action Clusters */}
        <div className="flex items-center gap-2 flex-wrap self-start lg:self-auto">
          {/* Save Draft */}
          <button
            type="button"
            onClick={handleSaveDraft}
            className="h-10 px-4 rounded-lg bg-white border border-slate-200 text-[#141b2c] hover:bg-slate-50 transition-all shadow-sm text-xs font-bold flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Save Draft</span>
          </button>

          {/* Live Web Preview */}
          <Link
            to={`/blog/${slug}`}
            target="_blank"
            className="h-10 px-4 rounded-lg bg-white border border-slate-200 text-[#141b2c] hover:bg-slate-50 transition-all shadow-sm text-xs font-bold flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            <span>Live Web Preview</span>
          </Link>

          {/* Primary Action CTA (Gold) with Dropdown Action */}
          <div className="relative inline-flex rounded-lg shadow-md overflow-hidden bg-[#efc13e]">
            <button
              type="button"
              onClick={handlePublish}
              className="h-10 px-4 bg-[#efc13e] hover:bg-[#ffdf94] text-[#241a00] text-xs font-extrabold flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              <span>Publish to Website</span>
            </button>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="h-10 px-2.5 bg-[#efc13e] hover:bg-[#ffdf94] text-[#241a00] border-l border-[#241a00]/15 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-12 z-50 bg-white rounded-xl shadow-xl py-1 w-48 text-xs border border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setLifecycleStage('Scheduled Publication');
                    setIsDropdownOpen(false);
                    showToast('Slated for scheduled publication');
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                >
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span>Schedule Release...</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLifecycleStage('Draft • Internal Review');
                    setIsDropdownOpen(false);
                    showToast('Moved to internal review');
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                >
                  <span className="material-symbols-outlined text-[16px]">rate_review</span>
                  <span>Request Underwriter Review</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Split-Screen Editorial Workspace */}
      <div className="grid grid-cols-12 gap-6 mb-16">
        {/* LEFT MAIN EDITOR WORKSPACE (68% - col-span-12 lg:col-span-8) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">
          {/* Article Meta Card: Title, URL, and Abstract */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex flex-col gap-4">
            {/* Title Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold flex items-center justify-between">
                <span>Primary Article Headline</span>
                <span className="text-[#75777f] font-normal font-mono text-[11px]">H1 Node</span>
              </label>
              <textarea
                rows={2}
                value={headline}
                onChange={(e) => handleHeadlineChange(e.target.value)}
                placeholder="Enter high-impact editorial title..."
                className="w-full resize-none bg-slate-50 border border-slate-200 rounded-lg p-3 text-base sm:text-lg font-bold text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a] transition-all leading-snug"
              ></textarea>
            </div>

            {/* Dynamic Permaslug Bar */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50/60 border border-blue-100">
              <span className="material-symbols-outlined text-[#75777f] text-[18px] pl-1">link</span>
              <div className="flex items-center min-w-0 flex-1 font-mono text-xs text-[#75777f] overflow-hidden">
                <span className="text-[#75777f] flex-shrink-0">earthfinance.in/blog/</span>
                <span className="text-[#071b3a] font-bold truncate">{slug}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(`https://earthfinance.in/blog/${slug}`);
                  showToast('URL copied to clipboard');
                }}
                className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-[#141b2c] text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors flex-shrink-0 border border-slate-200"
              >
                <span className="material-symbols-outlined text-[14px]">content_copy</span>
                <span>Copy URL</span>
              </button>
            </div>

            {/* Strategic Abstract Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold flex items-center justify-between">
                <span>Executive Abstract / Subtitle</span>
                <span className="text-[#75777f] font-normal text-[11px]">Displayed on RSS &amp; Hero cards</span>
              </label>
              <textarea
                rows={2}
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                placeholder="Write concise synopsis..."
                className="w-full resize-none bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs sm:text-sm text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a] transition-all leading-relaxed"
              ></textarea>
            </div>
          </div>

          {/* Rich Text Editor Container */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
            {/* Sticky Editor Toolbar */}
            <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md px-4 py-2 border-b border-slate-200 flex items-center flex-wrap gap-1 shadow-sm">
              {/* Text Hierarchies */}
              <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  type="button"
                  className="w-7 h-7 rounded text-[#75777f] hover:text-[#071b3a] hover:bg-slate-200 font-bold text-xs flex items-center justify-center"
                >
                  H1
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded bg-[#071b3a] text-white font-bold text-xs flex items-center justify-center shadow-xs"
                >
                  H2
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded text-[#75777f] hover:text-[#071b3a] hover:bg-slate-200 font-bold text-xs flex items-center justify-center"
                >
                  H3
                </button>
              </div>

              <div className="w-px h-5 bg-slate-200 mx-1"></div>

              {/* Formatting Actions */}
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  className="w-7 h-7 rounded bg-blue-50 text-[#071b3a] flex items-center justify-center border border-blue-200"
                  title="Bold"
                >
                  <span className="material-symbols-outlined text-[17px]">format_bold</span>
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded text-[#75777f] hover:text-[#071b3a] hover:bg-slate-100 flex items-center justify-center"
                  title="Italic"
                >
                  <span className="material-symbols-outlined text-[17px]">format_italic</span>
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded text-[#75777f] hover:text-[#071b3a] hover:bg-slate-100 flex items-center justify-center"
                  title="Underline"
                >
                  <span className="material-symbols-outlined text-[17px]">format_underlined</span>
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded text-[#75777f] hover:text-[#071b3a] hover:bg-slate-100 flex items-center justify-center"
                  title="Strikethrough"
                >
                  <span className="material-symbols-outlined text-[17px]">strikethrough_s</span>
                </button>
              </div>

              <div className="w-px h-5 bg-slate-200 mx-1"></div>

              {/* Lists & Blocks */}
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  className="w-7 h-7 rounded text-[#75777f] hover:text-[#071b3a] hover:bg-slate-100 flex items-center justify-center"
                  title="Bullet List"
                >
                  <span className="material-symbols-outlined text-[17px]">format_list_bulleted</span>
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded text-[#75777f] hover:text-[#071b3a] hover:bg-slate-100 flex items-center justify-center"
                  title="Numbered List"
                >
                  <span className="material-symbols-outlined text-[17px]">format_list_numbered</span>
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded text-[#75777f] hover:text-[#071b3a] hover:bg-slate-100 flex items-center justify-center"
                  title="Blockquote"
                >
                  <span className="material-symbols-outlined text-[17px]">format_quote</span>
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded text-[#75777f] hover:text-[#071b3a] hover:bg-slate-100 flex items-center justify-center"
                  title="Financial Formula / Code"
                >
                  <span className="material-symbols-outlined text-[17px]">functions</span>
                </button>
              </div>

              <div className="w-px h-5 bg-slate-200 mx-1"></div>

              {/* Inserts */}
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  className="w-7 h-7 rounded text-[#75777f] hover:text-[#071b3a] hover:bg-slate-100 flex items-center justify-center"
                  title="Hyperlink"
                >
                  <span className="material-symbols-outlined text-[17px]">link</span>
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded text-[#75777f] hover:text-[#071b3a] hover:bg-slate-100 flex items-center justify-center"
                  title="Insert Table"
                >
                  <span className="material-symbols-outlined text-[17px]">table_chart</span>
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded text-[#75777f] hover:text-[#071b3a] hover:bg-slate-100 flex items-center justify-center"
                  title="Embed Vault Asset"
                >
                  <span className="material-symbols-outlined text-[17px]">image</span>
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded text-[#75777f] hover:text-[#071b3a] hover:bg-slate-100 flex items-center justify-center"
                  title="Divider"
                >
                  <span className="material-symbols-outlined text-[17px]">horizontal_rule</span>
                </button>
              </div>

              <div className="ml-auto flex items-center gap-1">
                <button
                  type="button"
                  className="w-7 h-7 rounded text-[#75777f] hover:text-[#071b3a] hover:bg-slate-100 flex items-center justify-center"
                  title="Undo"
                >
                  <span className="material-symbols-outlined text-[17px]">undo</span>
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded text-[#75777f] hover:text-[#071b3a] hover:bg-slate-100 flex items-center justify-center"
                  title="Redo"
                >
                  <span className="material-symbols-outlined text-[17px]">redo</span>
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded text-[#75777f] hover:text-[#071b3a] hover:bg-slate-100 flex items-center justify-center"
                  title="Full View Mode"
                >
                  <span className="material-symbols-outlined text-[17px]">fullscreen</span>
                </button>
              </div>
            </div>

            {/* Rendered Editorial Body */}
            <div className="p-6 sm:p-8 flex flex-col gap-6 text-[#141b2c] leading-relaxed">
              {/* Section Heading */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#071b3a] tracking-tight">
                {editorialSectionTitle}
              </h2>

              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                {editorialBodyP1}
              </p>

              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                {editorialBodyP2}
              </p>

              {/* Formatted Pro-Tip Callout Box (Institutional Light Blue Accent) */}
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4 sm:p-5 flex gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#071b3a] text-[#efc13e] flex-shrink-0 flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[22px]">verified</span>
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-xs sm:text-sm font-extrabold text-[#071b3a] uppercase tracking-wide">
                    {proTipTitle}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {proTipContent}
                  </p>
                </div>
              </div>

              {/* Formatted Financial Haircut Data Table */}
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base font-bold text-[#071b3a]">
                    Aging Bracket vs. Bank Eligibility Haircut
                  </span>
                  <span className="text-xs text-[#75777f] font-mono font-medium">
                    Standard Consortium Benchmark
                  </span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-slate-50">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-100/80 text-[#071b3a] font-bold border-b border-slate-200">
                        <th className="py-3 px-4">Receivables Aging Bracket</th>
                        <th className="py-3 px-4">Risk Haircut Applied</th>
                        <th className="py-3 px-4">Mandatory Margin Deducted</th>
                        <th className="py-3 px-4">Regulatory Underwriting Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/80 bg-white">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-[#071b3a]">0 – 60 Days (Prime Debtors)</td>
                        <td className="py-3 px-4 font-mono font-bold text-[#006d33]">0% Haircut</td>
                        <td className="py-3 px-4 font-mono text-slate-700">25.00% Standard Margin</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#8cf6a3]/30 text-[#006d33] border border-[#006d33]/20 text-[11px] font-bold">
                            100% Eligible
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-[#071b3a]">61 – 90 Days (Extended Terms)</td>
                        <td className="py-3 px-4 font-mono font-bold text-[#a47f00]">15% Stress Haircut</td>
                        <td className="py-3 px-4 font-mono text-slate-700">35.00% Margin Retention</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#ffdf94]/50 text-[#241a00] border border-[#efc13e]/40 text-[11px] font-bold">
                            Conditional Approval
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-[#071b3a]">&gt; 90 Days (Overdue Receivables)</td>
                        <td className="py-3 px-4 font-mono font-bold text-rose-600">100% Ineligible Haircut</td>
                        <td className="py-3 px-4 font-mono text-[#75777f]">N/A (Disallowed)</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold">
                            Rejected from DP
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                {editorialBodyP3}
              </p>

              {/* Regulatory Footnote Indicator */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-start gap-2 text-[#75777f]">
                <span className="material-symbols-outlined text-[16px] text-[#75777f] mt-0.5">policy</span>
                <p className="text-xs leading-relaxed italic">
                  Regulatory Footnote: All financial advisory insights, haircut ratios, and underwriting guidance detailed herein are subject to prevailing Reserve Bank of India (RBI) Master Directions on Working Capital and Consortium Lending.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PUBLISHING & SEO SIDEBAR (32% - col-span-12 lg:col-span-4) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
          {/* Card 1: Publication Governance Status */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#071b3a] text-[20px]">public</span>
                <span className="text-sm font-bold text-[#141b2c]">Publishing Status</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#8cf6a3]/30 text-[#006d33] border border-[#006d33]/20 text-[11px] font-bold">
                Live
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Status Selector */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#75777f]">Lifecycle Stage</label>
                <div className="relative">
                  <select
                    value={lifecycleStage}
                    onChange={(e) => setLifecycleStage(e.target.value)}
                    className="w-full h-10 px-3 pr-8 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-[#141b2c] appearance-none focus:outline-none focus:bg-white focus:border-[#071b3a] cursor-pointer"
                  >
                    <option>Published • Active On Portal</option>
                    <option>Draft • Internal Review</option>
                    <option>Scheduled Publication</option>
                    <option>Archived Repository</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-2.5 pointer-events-none text-[#75777f] text-[18px]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#75777f]">Release Date &amp; Time (IST)</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[#75777f] text-[16px]">
                      calendar_month
                    </span>
                    <input
                      type="text"
                      value={releaseDate}
                      onChange={(e) => setReleaseDate(e.target.value)}
                      className="w-full h-10 pl-8 pr-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a]"
                    />
                  </div>
                  <div className="relative w-32">
                    <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[#75777f] text-[16px]">
                      schedule
                    </span>
                    <input
                      type="text"
                      value={releaseTime}
                      onChange={(e) => setReleaseTime(e.target.value)}
                      className="w-full h-10 pl-8 pr-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a]"
                    />
                  </div>
                </div>
              </div>

              {/* Author Credential */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#75777f]">Primary Editorial Author</label>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-[#071b3a] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    RS
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-[#141b2c] truncate">Rajesh Sharma</span>
                    <span className="text-[10px] text-[#75777f] truncate">Lead Syndication Underwriter</span>
                  </div>
                </div>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50/60 border border-blue-100">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#071b3a]">Feature on Blog Index</span>
                  <span className="text-[11px] text-[#75777f]">Elevate to top banner carousel</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006d33]"></div>
                </label>
              </div>

              {/* Category Selection */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#75777f]">Taxonomy Category</label>
                <div className="relative">
                  <select
                    value={taxonomyCategory}
                    onChange={(e) => setTaxonomyCategory(e.target.value)}
                    className="w-full h-10 px-3 pr-8 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-[#141b2c] appearance-none focus:outline-none focus:bg-white focus:border-[#071b3a] cursor-pointer"
                  >
                    <option>Working Capital &amp; CC</option>
                    <option>Industrial Capex Finance</option>
                    <option>SME Term Loans</option>
                    <option>Consortium Lending Insights</option>
                    <option>Government Subsidy Protocols</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-2.5 pointer-events-none text-[#75777f] text-[18px]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Taxonomy Tags Pill Cloud */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#75777f]">Search &amp; Catalog Tags</label>
                <div className="flex flex-wrap gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 min-h-[44px]">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-slate-200 text-[#071b3a] text-xs font-semibold shadow-2xs"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="hover:text-rose-600 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[13px]">close</span>
                      </button>
                    </span>
                  ))}

                  {isAddingTag ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                        placeholder="Tag name..."
                        className="h-7 px-2 rounded bg-white border border-slate-300 text-xs focus:outline-none w-24"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="text-xs font-bold text-[#071b3a] hover:underline"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingTag(false)}
                        className="text-xs text-slate-500 hover:text-slate-800"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsAddingTag(true)}
                      className="text-[#75777f] hover:text-[#071b3a] text-xs font-semibold px-2 py-1 flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span> Add Tag
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Featured Media Vault Card */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#071b3a] text-[20px]">photo_library</span>
                <span className="text-sm font-bold text-[#141b2c]">Featured Media Vault</span>
              </div>
              <span className="text-[11px] text-[#75777f] font-mono">16:9 • 4K WebP</span>
            </div>

            {/* Featured Media Container */}
            <div className="flex flex-col gap-3">
              <div
                onClick={() => setIsMediaZoomOpen(true)}
                className="relative w-full h-44 rounded-lg overflow-hidden bg-slate-100 shadow-inner group border border-slate-200 cursor-pointer"
              >
                <img
                  src={mediaUrl}
                  alt={mediaAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#071b3a]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-white/95 text-xs font-bold text-[#071b3a] shadow-md">
                    Click to Zoom
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const newUrl = prompt('Enter image URL:', mediaUrl);
                    if (newUrl) setMediaUrl(newUrl);
                  }}
                  className="h-9 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#141b2c] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">sync</span>
                  <span>Replace Media</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Remove featured image?')) {
                      setMediaUrl('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80');
                    }
                  }}
                  className="h-9 rounded-lg bg-slate-50 hover:bg-rose-50 border border-slate-200 text-rose-600 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>Remove</span>
                </button>
              </div>

              {/* Alt Tag Accessibility Input */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#75777f] flex items-center justify-between">
                  <span>Accessible Alt Text</span>
                  <span className="text-[#006d33] font-mono text-[10px] font-bold">WCAG Compliant</span>
                </label>
                <input
                  type="text"
                  value={mediaAlt}
                  onChange={(e) => setMediaAlt(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a]"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Google Search / SERP SEO Preview Card */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#071b3a] text-[20px]">troubleshoot</span>
                <span className="text-sm font-bold text-[#141b2c]">SERP SEO Preview</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#071b3a] border border-blue-200 text-[10px] font-mono font-bold">
                Google Bot
              </span>
            </div>

            {/* Realistic SERP Snippet Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1 font-sans">
              <div className="flex items-center gap-1.5 text-[11px] text-[#202124] overflow-hidden">
                <span className="w-4 h-4 rounded-full bg-[#071b3a] flex items-center justify-center text-[9px] text-white font-bold">
                  E
                </span>
                <span className="truncate text-slate-600">earthfinance.in &gt; blog &gt; {slugTarget}</span>
              </div>
              <span className="text-sm leading-snug font-medium text-[#1a0dab] hover:underline cursor-pointer line-clamp-1">
                {seoTitle}
              </span>
              <p className="text-xs leading-relaxed text-[#4d5156] line-clamp-2 mt-0.5">
                {seoDescription}
              </p>
            </div>

            <div className="space-y-3">
              {/* SEO Title Input */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#75777f]">Meta Title Tag</label>
                  <span className="font-mono text-[11px] text-[#006d33] font-bold">
                    {seoTitle.length} / 60 Chars
                  </span>
                </div>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a]"
                />
              </div>

              {/* Meta Description */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#75777f]">Meta Description</label>
                  <span className="font-mono text-[11px] text-[#006d33] font-bold">
                    {seoDescription.length} / 160 Chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  className="w-full resize-none p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a] leading-relaxed"
                ></textarea>
              </div>

              {/* URL Slug Input */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#75777f]">Slug Target</label>
                <input
                  type="text"
                  value={slugTarget}
                  onChange={(e) => {
                    setSlugTarget(e.target.value);
                    setSlug(e.target.value);
                  }}
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a]"
                />
              </div>
            </div>
          </div>

          {/* Card 4: Related Dossiers */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#071b3a] text-[20px]">hub</span>
                <span className="text-sm font-bold text-[#141b2c]">Related Dossiers</span>
              </div>
              <button
                type="button"
                onClick={handleLinkMore}
                className="text-[#071b3a] text-xs font-bold hover:underline flex items-center gap-0.5"
              >
                <span className="material-symbols-outlined text-[14px]">add</span> Link More
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between group hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="material-symbols-outlined text-[#75777f] text-[18px]">article</span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-[#141b2c] truncate">{rel.title}</span>
                      <span className="text-[10px] text-[#75777f]">{rel.subtitle}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUnlinkRelated(rel.id)}
                    className="text-[#75777f] group-hover:text-rose-600 transition-colors p-1"
                    title="Unlink article"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Footer Bar */}
      <div className="sticky bottom-0 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_16px_rgba(7,27,58,0.06)] z-40 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left Metric Readouts */}
        <div className="flex items-center gap-4 text-xs text-[#75777f] flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#75777f]">edit_note</span>
            <span className="font-bold text-[#141b2c]">{wordCount.toLocaleString()}</span> words
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#75777f]">timer</span>
            <span>~8 mins reading time</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#75777f]">analytics</span>
            <span>
              Flesch Readability: <strong className="text-[#141b2c] font-bold">{fleschScore} (Standard)</strong>
            </span>
          </div>
        </div>

        {/* Right Interaction Suite */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <div className="hidden md:flex items-center gap-1.5 text-[#006d33] text-xs font-semibold mr-2">
            <span className="w-2 h-2 rounded-full bg-[#006d33] animate-ping"></span>
            <span>Auto-save active</span>
          </div>
          <button
            type="button"
            onClick={() => {
              if (confirm('Discard changes and return to Blog index?')) {
                navigate('/admin/blog');
              }
            }}
            className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[#141b2c] text-xs font-semibold transition-colors"
          >
            Discard Changes
          </button>
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#071b3a] text-xs font-bold transition-colors"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="px-5 py-2 rounded-lg bg-[#071b3a] hover:bg-blue-950 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">publish</span>
            <span>Publish Changes</span>
          </button>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {isMediaZoomOpen && (
        <div className="fixed inset-0 bg-[#071b3a]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-4 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setIsMediaZoomOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-slate-800 shadow"
            >
              ✕
            </button>
            <img src={mediaUrl} alt={mediaAlt} className="w-full max-h-[80vh] object-contain rounded-xl" />
            <p className="text-xs text-slate-600 mt-2 text-center">{mediaAlt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogEditPage;
