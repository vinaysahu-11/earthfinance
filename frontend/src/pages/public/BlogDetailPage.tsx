import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  Clock,
  Calendar,
  User,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  TrendingUp,
  TrendingDown,
  Building,
  FileText,
  AlertCircle,
  Phone,
  ArrowRight,
  Bookmark,
  ShieldCheck,
  Check as CheckIcon,
  HelpCircle,
  UploadCloud,
  ListOrdered
} from 'lucide-react';
import { SUPPORT_PHONE, OFFICE_ADDRESS } from '../../config/constants';
import { useFetch } from '../../hooks/useFetch';
import { blogApi } from '../../services/blogApi';
import { BlogPost } from '../../types';

interface ArticleData {
  slug: string;
  categorySlug: string;
  categoryLabel: string;
  title: string;
  subtitle: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  publishDate: string;
  readTime: string;
  heroImage: string;
  heroCaption: string;
  statMetrics: {
    label: string;
    value: string;
    sublabel: string;
  }[];
  tableRows: {
    bracket: string;
    classification: string;
    haircut: string;
    action: string;
  }[];
}

const DEFAULT_ARTICLE: ArticleData = {
  slug: 'how-raipur-enterprises-can-optimize-cash-credit-cc-limits',
  categorySlug: 'working-capital',
  categoryLabel: 'WORKING CAPITAL & CASH CREDIT (CC)',
  title: 'How Raipur Enterprises Can Optimize Cash Credit (CC) Limits Ahead of Peak Operational Cycles',
  subtitle: 'A strategic manual on drawing power formulas, inventory valuation haircuts, and consortium restructuring for manufacturing and retail enterprises across Chhattisgarh.',
  authorName: 'Rajesh Sharma',
  authorRole: 'Lead Underwriter • Institutional Desk',
  authorAvatar: 'RS',
  publishDate: 'May 14, 2025',
  readTime: '8 min read',
  heroImage: 'https://lh3.googleusercontent.com/aida/AEtjO1UCS_UiVGB8rV64SNliZ7UN_945abx5AD4plmB6Yx9knzwnWgPkgyF8sh_CMtv8e-O-0wWBvC8MrCIaTwC679x9hAuJ2zKG1VfSFhjd2ZOuOYD2iyy1P3eTUnULDgNS0JFA10fJm0kFEABIxBC0BizFT8mkEZHE0_MFfX4hLYma1hF8s5G1O6a1ggu9b2DjtdvZCxFoivR27OK7_VHMMbyhqroRhJLZQ3jFygtoqz9hBivHG4URXMVD7kI',
  heroCaption: 'Commercial credit negotiation session at Earth Finance Corporate Hub, Civil Lines, Raipur.',
  statMetrics: [
    { label: 'Avg Bank Margin Haircut', value: '25% - 40%', sublabel: 'Standard on Book Debts' },
    { label: 'Max Ineligible Window', value: '> 90 Days', sublabel: 'Excluded from Drawing Power' },
    { label: 'Raipur Lead Syndication', value: '24+ Banks', sublabel: 'Active Consortiums' }
  ],
  tableRows: [
    { bracket: '0 – 60 Days', classification: 'Prime Eligible', haircut: '25% – 30% Margin', action: 'Standard drawing power drawdown allowed.' },
    { bracket: '61 – 90 Days', classification: 'Under Review', haircut: '35% – 40% Margin', action: 'Provide bill proof of delivery (POD) to preserve line.' },
    { bracket: '91 – 120 Days', classification: 'Restricted', haircut: '50% – 100% Haircut', action: 'Shift to Letter of Credit (LC) backing or bill discounting.' },
    { bracket: '> 120 Days', classification: 'Ineligible', haircut: '100% Ineligible', action: 'Carve out into structured bill factoring or legal recovery.' }
  ]
};

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Optional backend API check
  const { data: dbPost } = useFetch<BlogPost>(
    () => blogApi.getBySlug(slug || ''),
    [slug]
  );

  const article = DEFAULT_ARTICLE;

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        setScrollProgress(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="w-full bg-surface">
      {/* Reading Progress Bar (Fixed below main navbar) */}
      <div
        className="fixed top-20 left-0 h-1 bg-[#168B45] z-40 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Breadcrumbs & Category Bar */}
      <section className="w-full bg-surface-container-low py-3.5 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <nav className="flex items-center gap-1.5 text-on-surface-variant font-medium">
              <Link to="/" className="hover:text-primary-container transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-outline" />
              <Link to="/blog" className="hover:text-primary-container transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-4 h-4 text-outline" />
              <span className="text-on-surface-variant">Working Capital &amp; CC</span>
              <ChevronRight className="w-4 h-4 text-outline" />
              <span className="text-primary-container font-semibold truncate max-w-[200px] sm:max-w-none">
                Article Detail
              </span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container/40 text-on-secondary-container rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span>{article.categoryLabel}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Header Section */}
      <header className="w-full bg-surface-container-lowest py-8 sm:py-12 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071B3A] tracking-tight leading-tight">
              {article.title}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-on-surface-variant leading-relaxed">
              {article.subtitle}
            </p>
          </div>

          {/* Metadata & Social Share Cluster */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-base shadow-sm">
                {article.authorAvatar}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm text-on-background font-semibold">
                  <span>By Earth Finance Institutional Desk</span>
                  <span className="text-outline">•</span>
                  <span className="text-secondary font-bold">Lead Underwriter: {article.authorName}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs text-on-surface-variant flex-wrap mt-1">
                  <span>{article.publishDate}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{article.readTime}</span>
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-secondary font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                    <span>Verified Regulatory Compliant</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Social / Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-slate-700 hover:text-primary-container border border-slate-200 shadow-sm hover:shadow transition-all text-xs font-semibold"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <a
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#168B45] text-white hover:bg-[#127439] transition-all text-xs font-bold shadow-sm"
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `Check out this financial guide by Earth Finance: ${window.location.href}`
                )}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>WhatsApp</span>
              </a>

              <a
                className="p-2 rounded-xl bg-white text-slate-700 hover:text-primary-container border border-slate-200 shadow-sm hover:shadow transition-all"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                rel="noopener noreferrer"
                target="_blank"
                title="Share on LinkedIn"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Editorial Main Hero Graphic */}
      <section className="w-full bg-surface-container-lowest pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-surface-container">
            <img
              alt={article.heroCaption}
              className="w-full h-[280px] sm:h-[400px] lg:h-[460px] object-cover object-center"
              src={article.heroImage}
            />
            <div className="bg-surface-container-low px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs text-on-surface-variant">
              <p className="italic">{article.heroCaption}</p>
              <span className="text-[11px] font-bold uppercase tracking-wider text-outline">
                Institutional Desk Raipur
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Editorial Article Layout */}
      <section className="w-full bg-surface py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT 8 COLS: MAIN CONTENT */}
            <article className="lg:col-span-8 space-y-10">
              {/* Key Metrics / Flash summary row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-surface-container-lowest rounded-2xl shadow-sm border border-slate-200">
                {article.statMetrics.map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-surface-container-low border border-slate-200/60">
                    <span className="text-[11px] text-outline uppercase tracking-wider font-semibold block">
                      {stat.label}
                    </span>
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#071B3A] mt-1 mb-0.5">
                      {stat.value}
                    </p>
                    <span className="text-xs text-secondary font-semibold">
                      {stat.sublabel}
                    </span>
                  </div>
                ))}
              </div>

              {/* Section 1 */}
              <div className="space-y-4 scroll-mt-28" id="section-1">
                <div className="flex items-center gap-2 text-xs text-primary-fixed-dim uppercase tracking-wider font-bold">
                  <span>Section 01</span>
                  <span>/</span>
                  <span>Credit Dynamics</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-on-background tracking-tight">
                  The Mechanics of Working Capital Constraints in Regional Hubs
                </h2>

                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  For manufacturing units in Urla, Siltara, and agro-processing clusters across Dhamtari and Raipur, working capital is the vital engine of production. However, a systemic disconnect frequently emerges: an enterprise registers robust audited revenues, yet faces an acute freeze in daily drawing power (DP) at the branch level.
                </p>

                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  This disparity typically stems not from insolvency, but from outdated calculation metrics. Traditional lenders assess working capital based on strict turnover methods or Nayak Committee models without indexing seasonal procurement peaks, Raw Material (RM) lead cycles, and transit inventory for central dispatch.
                </p>

                {/* Highlight Callout Box (Light Blue) */}
                <div className="p-6 rounded-2xl bg-surface-container-low shadow-sm border border-blue-100 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-container"></div>
                  <div className="flex items-start gap-3.5 pl-2">
                    <span className="material-symbols-outlined text-primary-container text-[28px] shrink-0 mt-0.5">
                      info
                    </span>
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold text-primary-container">
                        Key Takeaway for Raipur Promoters
                      </h4>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        Most commercial banks apply a mandatory <strong className="text-on-background">25% margin on paid stock</strong> and <strong className="text-on-background">30% to 40% on debtors under 90 days</strong>. Furthermore, unreconciled GST returns (mismatches between GSTR-1 and GSTR-3B) can prompt credit committees to arbitrarily freeze up to <strong className="text-red-600">20% of eligible sanctioned limits</strong> until full physical stock reconciliation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-4 scroll-mt-28" id="section-2">
                <div className="flex items-center gap-2 text-xs text-primary-fixed-dim uppercase tracking-wider font-bold">
                  <span>Section 02</span>
                  <span>/</span>
                  <span>Inventory Structuring</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-on-background tracking-tight">
                  Step 1: Standardizing Your Stock &amp; Book Debt Statement
                </h2>

                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  The monthly Stock and Book Debt statement submitted to your banker is not merely an administrative formality; it is the definitive legal affidavit driving your daily drawing power. Submitting unformatted ledgers often invites conservative margin haircuts by internal risk desks.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-4 p-5 bg-surface-container-lowest rounded-2xl shadow-sm border border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon className="w-4 h-4 text-emerald-800" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-on-background">
                        Segregate Paid Stock from Creditor-Backed Stock
                      </h4>
                      <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
                        Sundry creditors for raw materials must be explicitly deducted. Always ensure advance payments made to suppliers are presented with bank confirmation letters to retain them within the gross inventory asset pool.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-surface-container-lowest rounded-2xl shadow-sm border border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon className="w-4 h-4 text-emerald-800" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-on-background">
                        Maintain Work-In-Progress (WIP) Certification
                      </h4>
                      <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
                        Heavy industrial fabricators in Bhilai and Urla frequently neglect WIP valuation. An independent Chartered Engineer or CA stock valuation certificate can re-qualify up to 80% of semi-finished stock under active limits.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-surface-container-lowest rounded-2xl shadow-sm border border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon className="w-4 h-4 text-emerald-800" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-on-background">
                        Synchronize GSTR-1 Invoicing Real-Time
                      </h4>
                      <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
                        Bank concurrent auditors perform algorithmic scraping between GST portals and month-end debt lists. Ensuring billing numbers align eliminates DP holdbacks on day one of each calendar month.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-4 scroll-mt-28" id="section-3">
                <div className="flex items-center gap-2 text-xs text-primary-fixed-dim uppercase tracking-wider font-bold">
                  <span>Section 03</span>
                  <span>/</span>
                  <span>Receivables Management</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-on-background tracking-tight">
                  Step 2: Addressing Stale Debtors and Aging Debts
                </h2>

                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  One of the quickest ways working capital contracts is the automatic categorization of book debts exceeding 90 days as "ineligible." In standard institutional underwriting, aging receivables directly reduce the calculated drawing capacity rupee-for-rupee.
                </p>

                {/* Structural Comparison Table */}
                <div className="overflow-x-auto bg-surface-container-lowest rounded-2xl shadow-sm p-4 sm:p-5 border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-surface-container-low text-on-surface-variant font-bold uppercase tracking-wider text-[11px]">
                        <th className="p-3.5 rounded-l-xl">Receivable Bracket</th>
                        <th className="p-3.5">Bank Classification</th>
                        <th className="p-3.5">Standard Haircut</th>
                        <th className="p-3.5 rounded-r-xl">Remedial Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-on-background">
                      {article.tableRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 font-bold">{row.bracket}</td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded bg-secondary-container/50 text-on-secondary-container font-semibold text-xs">
                              {row.classification}
                            </span>
                          </td>
                          <td className="p-3.5 font-medium text-slate-800">{row.haircut}</td>
                          <td className="p-3.5 text-on-surface-variant">{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Inline Visual Data Chart: DP Impact Illustration */}
                <div className="p-6 bg-surface-container-low rounded-2xl border border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-on-background">
                        Drawing Power Erosion vs. Optimized Audits
                      </h4>
                      <p className="text-xs text-on-surface-variant">
                        Sample model for ₹10 Crore gross receivables book
                      </p>
                    </div>
                    <span className="text-xs text-secondary bg-surface-container-lowest px-3 py-1 rounded-full font-bold shadow-sm self-start sm:self-center">
                      +₹1.85 Cr Recovered
                    </span>
                  </div>

                  <div className="h-48 w-full flex items-end gap-6 pt-4">
                    {/* Bar 1: Conventional */}
                    <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-xs text-red-600 font-bold">₹5.2 Cr DP</span>
                      <div className="w-full bg-red-100 rounded-t-xl h-28 relative">
                        <div className="absolute inset-x-0 bottom-0 bg-red-400 rounded-t-xl h-20"></div>
                      </div>
                      <span className="text-[11px] text-outline text-center">
                        Unstructured (35% Haircut + Ineligible)
                      </span>
                    </div>

                    {/* Bar 2: Earth Finance Structured */}
                    <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-xs text-secondary font-bold">₹7.05 Cr DP</span>
                      <div className="w-full bg-emerald-100 rounded-t-xl h-40 relative">
                        <div className="absolute inset-x-0 bottom-0 bg-emerald-600 rounded-t-xl h-32"></div>
                      </div>
                      <span className="text-[11px] text-on-background font-semibold text-center">
                        Earth Finance Structured Portfolio
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="space-y-4 scroll-mt-28" id="section-4">
                <div className="flex items-center gap-2 text-xs text-primary-fixed-dim uppercase tracking-wider font-bold">
                  <span>Section 04</span>
                  <span>/</span>
                  <span>Consortium Architecture</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-on-background tracking-tight">
                  Multi-Lender Syndication vs. Solo Banking
                </h2>

                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  When an enterprise surpasses ₹15–20 Crores in operational turnover, relying entirely on a single branch manager or a single public sector bank (PSB) introduces acute operational vulnerability. Credit committee revisions or localized branch target freezes can stall vital raw material dispatches.
                </p>

                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  Transitioning into a structured Consortium Banking or Multiple Banking Arrangement (MBA) splits the debt burden across a lead public bank (offering low-cost MCLR rates) and an agile private institution (providing swift letter of credit and bank guarantee issuance).
                </p>

                {/* Highlight Box (Light Green) */}
                <div className="p-6 rounded-2xl bg-secondary-container/20 shadow-sm border border-emerald-200 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
                  <div className="flex items-start gap-3.5 pl-2">
                    <span className="material-symbols-outlined text-secondary text-[28px] shrink-0 mt-0.5">
                      verified_user
                    </span>
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold text-on-secondary-container">
                        Advisory Note from Raipur Desk
                      </h4>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        Earth Finance maintains direct channel partnerships with <strong className="text-on-background">24+ nationalized and Tier-1 private financial institutions</strong> across Chhattisgarh. This syndication capability empowers enterprises to benchmark competitive floating spreads, trimming borrowing costs by 75 to 150 basis points.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="space-y-4 scroll-mt-28" id="section-5">
                <div className="flex items-center gap-2 text-xs text-primary-fixed-dim uppercase tracking-wider font-bold">
                  <span>Section 05</span>
                  <span>/</span>
                  <span>Sanction Roadmap</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-on-background tracking-tight">
                  Regulatory Checklist for Cash Credit (CC) Enhancement
                </h2>

                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  Prior to initiating a limit review or filing for an ad-hoc seasonal line, compile this institutional dossier to expedite underwriter appraisal:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm border border-slate-200 flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-[24px] shrink-0 mt-0.5">
                      description
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-on-background">
                        Audited Financials (3 Yrs)
                      </h5>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                        Full balance sheets, profit &amp; loss statements, auditor notes, and CARO reports.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm border border-slate-200 flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-[24px] shrink-0 mt-0.5">
                      query_stats
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-on-background">
                        Detailed CMA Data Projections
                      </h5>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                        Accurate calculation of working capital gap, MPBF (Tandon/Chore committee norms), and benchmark DSCR.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm border border-slate-200 flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-[24px] shrink-0 mt-0.5">
                      fact_check
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-on-background">
                        Sanction Letters &amp; Track Record
                      </h5>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                        Existing facility sanction letters along with 12 months' satisfactory repayment track record certs.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm border border-slate-200 flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-[24px] shrink-0 mt-0.5">
                      receipt_long
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-on-background">
                        Quarterly GST 3B &amp; E-Way Summaries
                      </h5>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                        Reconciliation sheets demonstrating linear shipment matching ledger debtor entries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AUTHOR FOOTER CARD */}
              <div className="mt-12 p-6 sm:p-8 bg-surface-container-low rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-container text-tertiary-fixed flex items-center justify-center shrink-0 text-xl font-bold shadow-md">
                  EF
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h4 className="text-lg font-bold text-on-background">
                      Earth Finance Debt Advisory Board
                    </h4>
                    <span className="inline-block px-2.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-xs font-semibold">
                      Civil Lines &amp; Rajbandha Maidan, Raipur
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Specialized in commercial debt syndication, consortium restructuring, and working capital acceleration for over 12 years. Our underwriting desk works across Raipur, Bilaspur, Durg, and Jagdalpur, unlocking liquidity for over 450+ enterprises.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-bold">
                    <a
                      className="text-primary-container hover:text-secondary flex items-center gap-1.5 transition-colors"
                      href={`tel:${SUPPORT_PHONE}`}
                    >
                      <Phone className="w-3.5 h-3.5 text-primary-container" />
                      <span>Direct Desk: {SUPPORT_PHONE}</span>
                    </a>
                    <Link
                      to="/contact"
                      className="text-secondary hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>Submit Inquiry</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* RIGHT 4 COLS: STICKY SIDEBAR */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 space-y-6">
                {/* Widget 1: Table of Contents */}
                <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-primary-container">
                    <ListOrdered className="w-4 h-4 text-primary-container" />
                    <h3 className="text-xs font-bold uppercase tracking-wider">
                      In This Article
                    </h3>
                  </div>
                  <nav className="space-y-1.5 text-xs sm:text-sm font-medium">
                    <a
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-primary-container transition-colors group"
                      href="#section-1"
                    >
                      <span className="truncate">1. Drawing Power Constraints</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-primary-container transition-colors group"
                      href="#section-2"
                    >
                      <span className="truncate">2. Stock &amp; Debt Statement Rules</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-primary-container transition-colors group"
                      href="#section-3"
                    >
                      <span className="truncate">3. Managing Aging Debts</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-primary-container transition-colors group"
                      href="#section-4"
                    >
                      <span className="truncate">4. Multi-Bank Syndication</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-primary-container transition-colors group"
                      href="#section-5"
                    >
                      <span className="truncate">5. Documentation Checklist</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </nav>
                </div>

                {/* Widget 2: Fast Credit Assessment (Dark Navy Card) */}
                <div className="bg-primary-container text-white p-6 rounded-2xl shadow-xl space-y-4 border border-slate-700">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-tertiary-fixed">
                    <span className="material-symbols-outlined text-[15px]">bolt</span>
                    <span>Fast Evaluation</span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-lg font-bold text-white">
                      Need Quick Credit Assessment?
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Submit your draft balance sheet or current sanction letter for indicative working capital restructuring within 24 hours.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Link
                      to="/apply"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-tertiary-fixed text-[#071B3A] hover:bg-tertiary-fixed-dim text-xs font-bold transition-all shadow-md"
                    >
                      <span>Submit Balance Sheet</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <a
                      href={`tel:${SUPPORT_PHONE}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-tertiary-fixed" />
                      <span>Direct: {SUPPORT_PHONE}</span>
                    </a>
                  </div>
                </div>

                {/* Widget 3: Popular Related Insights */}
                <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                  <h3 className="text-xs font-bold text-on-background uppercase tracking-wider border-b border-slate-100 pb-2">
                    Popular Related Insights
                  </h3>

                  <div className="space-y-4">
                    {/* Snippet 1 */}
                    <Link to="/blog/overcoming-sub-limit-caps" className="flex gap-3 group">
                      <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                        <img
                          alt="Overcoming Sub-Limit Caps in Industrial Term Lending"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTh9v__Zht1fRQN160iMhasPTQo-e9Q9qD1fegffZyGZxBpL0n2wZ076v7WXtbeFGs9f23yDpo7Bo2pEx_7slyFlwIthq9ax8L9a4WdBAi9rpof5cRRvGUdNDcFSGZEodoCefK8s7aQ8FCVzZuund_zeRRVWcYjNVZIX3ZdriiC-D_Dh-Lf3nQ_yswBxAHrN2WtfSqsG1nuThOwlG-6O7Sn2R_4U6FVIS6JBwrIjum405OOYJ4WCIL"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-on-background group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                          Overcoming Sub-Limit Caps in Industrial Term Lending
                        </p>
                        <span className="text-[11px] text-outline flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>3 min read</span>
                        </span>
                      </div>
                    </Link>

                    {/* Snippet 2 */}
                    <Link to="/blog/cgtmse-guarantee-backing" className="flex gap-3 group">
                      <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                        <img
                          alt="How CGTMSE Guarantee Backing Works for Unsecured Expansion"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhaoaPsar5gtVbLlz69HwHucOAe4Tan4iNNGSd9KwXhpRgsfLKsd9LqNAuA_KeUR9ioR_IIsXFDkytwhspsJ5huqCUMOf_C8iNmFNnoteikTkX7fkEq5zEIVHIy2_5_L37iicdKPeEHf5I6T1ZjoHeCXWVyo3MdSna0m2x4w_l5lin5my2gy8FzmyWoWIwHV78pNd0N4-UkCbS0T_FF_52pqt_yDWw2UcEg8gM5R6714nKWybgQSsE"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-on-background group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                          How CGTMSE Guarantee Backing Works for Unsecured Expansion
                        </p>
                        <span className="text-[11px] text-outline flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>4 min read</span>
                        </span>
                      </div>
                    </Link>

                    {/* Snippet 3 */}
                    <Link to="/blog/medical-equipment-financing" className="flex gap-3 group">
                      <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                        <img
                          alt="Medical Equipment Financing: Structuring Moratoriums"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1jQkKPFYQimu0d3IipDVM5w5Yo8yrrbkrmViml0ENhMGU70PoDhkhKpXcyQ35Zt8aJHmjkWhITmvmTgmnnLL-jgU8B_0GJxHkm60UeH8-h9msjiR8JkxFfC8ul-hD1qM3MrgZafq6wScFt5knqQdPLUe9WQ-DWKaLkzciHurlzH8MiEctCryrLBgxpAEKU_zD87fEQAHvySO_StMGXjsmX7H2B9V_wRXkhvEdK54vMtLQeV2LJMFH"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-on-background group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                          Medical Equipment Financing: Structuring Moratoriums for Hospitals
                        </p>
                        <span className="text-[11px] text-outline flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>5 min read</span>
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* RELATED ARTICLES SECTION */}
      <section className="w-full bg-surface-container-low py-12 lg:py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs text-secondary uppercase tracking-widest font-bold">
                Fiduciary Knowledge
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-on-background tracking-tight">
                Related Financial Strategies
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-primary-container font-bold hover:text-secondary transition-colors"
            >
              <span>View All Market Reports</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200/80 flex flex-col justify-between group">
              <div>
                <div className="h-48 w-full bg-surface-container relative overflow-hidden">
                  <img
                    alt="Loan Against Property (LAP) vs. Term Loan"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-q6CzdJTfb4-dz2qG2z09tYFd8PZIMZfHKmV2nNpZgcN7aeLHcHkJPLgOav6H5LdoAJJjM83wjel6VAHsb05A_kxtAm83QMOA0WoWxyy7ik-au2ofbxyoPK33G28j8ZGijuajHqddYR_yaiv8yU2Oinw6iPdRwKzhQ5KNKbVZd2aKlr6ipRbXA-xbV4neWtzOMrjLaHtHY1vwtlweUsDUc2zVKaVMaKQguIBPsO-fGk1ijw5Mnros"
                  />
                  <div className="absolute top-3 left-3 bg-primary-container text-white px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                    Property Loans
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-xs text-outline font-medium">May 08, 2025 • 6 min read</span>
                  <h3 className="text-base sm:text-lg font-bold text-on-background leading-snug group-hover:text-secondary transition-colors">
                    Loan Against Property (LAP) vs. Term Loan: Selecting the Optimal Collateral Route
                  </h3>
                  <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                    Deciding between hypothecating industrial real estate versus machinery assets to achieve longer repayment tenures and tax advantages.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/blog/lap-vs-commercial-loan"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:underline"
                >
                  <span>Read Strategy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>

            {/* Card 2 */}
            <article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200/80 flex flex-col justify-between group">
              <div>
                <div className="h-48 w-full bg-surface-container relative overflow-hidden">
                  <img
                    alt="Project Financing for Industrial Capex"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCs_dO9DUnE4UMUT9bWoYal0S98c0BEvEbkQj668H1oqOQpWN_XPe8j07q3RmHAC1oD1MThVO7bgGGnbU771f2KWNcrXpS-oeburPchIj_-cBj3eFtpTQUTA8Yf0NTu-I1Lrhef1ig_lJCpMZ3bNDy7JzPNs1EKijLysx5Tw9m7FpR-yJStYVzzMBGyx1rEfVJ2FKSI8zs7oWhdPsxzMFmeagDXMAFktiYgc1SNQ_JBeGMeYucl4I0i"
                  />
                  <div className="absolute top-3 left-3 bg-secondary text-white px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                    Project Financing
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-xs text-outline font-medium">April 29, 2025 • 8 min read</span>
                  <h3 className="text-base sm:text-lg font-bold text-on-background leading-snug group-hover:text-secondary transition-colors">
                    Project Financing for Industrial Capex: Structuring Debt-to-Equity Ratios
                  </h3>
                  <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                    Navigating TEV studies, promoter margin equity requirements, and loan drawdowns for expansion facilities in Raipur belt.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/blog/industrial-capex-chhattisgarh"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:underline"
                >
                  <span>Read Strategy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>

            {/* Card 3 */}
            <article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200/80 flex flex-col justify-between group">
              <div>
                <div className="h-48 w-full bg-surface-container relative overflow-hidden">
                  <img
                    alt="Unsecured Business Loan Approval Checklist"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkWX0WBjQ282_forSf5Am6Lx40rUGFlbUTeq5ib4JIPwyc0yT08iBgeQPvVY_xL_0EgqwEQeO-0rpTIiLn80QUvk-4BVXDAENYr_DPbNMomslQSlzm9RVFK3cC4tyny7nGztXiTVqL84mNUq_t6jqlLUSRonWcQaKQDrT-ArGtki8aO8UcDecyw5aFKmSasiWiwA2O-sW2yFIGSoWuni4-FrFCLlWydlkluwZE__nQIE_kPQkiO-Xx"
                  />
                  <div className="absolute top-3 left-3 bg-[#F4C542] text-[#071B3A] px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                    Unsecured Loans
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-xs text-outline font-medium">April 19, 2025 • 4 min read</span>
                  <h3 className="text-base sm:text-lg font-bold text-on-background leading-snug group-hover:text-secondary transition-colors">
                    Unsecured Business Loan Approval Checklist: What Credit Underwriters Scrutinize
                  </h3>
                  <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                    Essential ratios, banking balance consistency, and CIBIL commercial thresholds needed for rapid sub-50 lakh disbursement without collateral.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/blog/ratios-unsecured-business-loan"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:underline"
                >
                  <span>Read Strategy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="w-full bg-primary-container text-surface py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-primary-container via-[#0c264c] to-[#1455A0] p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl border border-slate-700/50">
            <div className="space-y-2.5 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-tertiary-fixed border border-white/10">
                <span className="material-symbols-outlined text-[15px]">support_agent</span>
                <span>Commercial Advisory Desk Raipur</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Have a Specific Financing Question for Your Enterprise?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Our Senior Credit Syndication Officers conduct discrete, comprehensive reviews of working capital statements and bank sanction letters across Chhattisgarh.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                to="/book-consultation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-tertiary-fixed text-[#071B3A] hover:bg-tertiary-fixed-dim transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                <span>Book a Consultation</span>
              </Link>

              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-secondary text-white hover:bg-emerald-800 transition-all shadow-md"
                href="https://api.whatsapp.com/send?phone=919300022732"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>WhatsApp Advisory Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
