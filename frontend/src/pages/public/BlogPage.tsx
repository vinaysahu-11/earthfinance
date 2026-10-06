import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Star,
  Clock,
  Calendar,
  User,
  CheckCircle2,
  TrendingDown,
  Building,
  FileCheck,
  Percent,
  Layers,
  Sparkles,
  Mail,
  Shield,
  HelpCircle,
  X,
  ExternalLink,
  ChevronRight,
  Bookmark,
  Share2
} from 'lucide-react';
import { SUPPORT_PHONE, OFFICE_ADDRESS } from '../../config/constants';
import { useFetch } from '../../hooks/useFetch';
import { blogApi } from '../../services/blogApi';
import { BlogPost } from '../../types';

interface ArticleItem {
  id: string;
  category: 'business' | 'lap' | 'industrial' | 'working-capital' | 'planning' | 'basics';
  categoryLabel: string;
  categoryColor: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image?: string;
  isBentoSpecial?: 'working-capital' | 'planning' | 'basics';
  author: {
    name: string;
    role: string;
    avatarText: string;
  };
  contentParagraphs: string[];
  takeaways: string[];
}

const CURATED_ARTICLES: ArticleItem[] = [
  {
    id: 'lap-vs-commercial-loan',
    category: 'lap',
    categoryLabel: 'Property & LAP',
    categoryColor: 'bg-surface-container-lowest/90 text-primary-container',
    date: 'May 10, 2025',
    readTime: '4 min read',
    title: 'Loan Against Property (LAP) vs. Commercial Term Loan: Evaluating Real LTV and Tax Efficiencies',
    excerpt: 'Understanding how industrial warehouses and commercial freehold plots can unlock up to 75% market valuation without equity dilution.',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1UBjOAeaRoSthxdWJQflfD_Tg8wyggrKmJjSD3DCiHmTgdpYPfNbjvImswa5eL2nRUimR69FmdVUK3xmunnOaBymBpFNWvQsSWmgm-UAIoW5GOOCxyr9zaWHKsTA9KOG2nBCfULkC285fX6Vx5rP5B7cS1V_MZvCc2HtGpvTZSF6wg3zNUSShzhOvr7iLQcN0knQVQUGTuvfdEM28SqLK94v72eshsnUTnvg5-uFfEiBWLlCJDKiv_orkI',
    author: {
      name: 'Prakash Vardhan',
      role: 'Principal Underwriter • Collateral Valuation',
      avatarText: 'PV'
    },
    contentParagraphs: [
      'Commercial real estate equity represents one of the most underutilized assets among mid-market manufacturing and trading units in Central India. When expansion requires long-term capital, businesses often grapple with choosing between an unsecured commercial loan and a mortgage-backed Loan Against Property (LAP).',
      'While commercial business loans feature shorter processing tenures, their Loan-to-Value (LTV) is tightly capped and carries interest rates between 14% to 18%. In contrast, an institutional LAP structure against clear title industrial property unlocks up to 75% market valuation at competitive rates starting from 8.85% to 9.50% p.a., with amortizations spread over 10 to 15 years.',
      'From a statutory taxation perspective, interest serviced on LAP used strictly for business capacity expansion, inventory consolidation, or capex is eligible for full deduction as an operational expense under Section 36(1)(iii) of the Income Tax Act.'
    ],
    takeaways: [
      'Achieve up to 75% Loan-to-Value against residential, commercial, or industrial freehold assets.',
      'Enjoy 10-15 year extended tenures that significantly lower monthly cash outflow compared to 36-month term loans.',
      'Full tax deductibility on borrowing interest when channelled into business enhancement.'
    ]
  },
  {
    id: 'industrial-capex-chhattisgarh',
    category: 'industrial',
    categoryLabel: 'Industrial Capex',
    categoryColor: 'bg-surface-container-lowest/90 text-secondary',
    date: 'May 06, 2025',
    readTime: '5 min read',
    title: 'Project Financing for Heavy Fabrication & Agro Mills in Chhattisgarh: Central Subsidy Alignment',
    excerpt: 'Navigating state industrial development subsidies, interest subvention schemes, and bank consortium guarantees.',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1UCT3x_4MWy7QaicaSaXNTdjy2ZVzGQM_hdhLJSKWAuHBmDiKUVbZkBrFPPCiWS-01qh5DwRLLf81LQQMy16kvEejyp29vUQHKvBgupkOfA_HpXqiWtvzcrOxtAwS18jUSasaguL3UeYI3C-5xmcqqXoZOWZri4IoWbm7PRod5k_ZHortDV1QXKSHuKXNMpmNTJka5aNYozPVLiUIyYOWhRuSJHEyWU0pbm9JxXUvAQKXUtSPqQTMJROQ',
    author: {
      name: 'Rameshwar Sahu',
      role: 'Head of Industrial Syndication • Raipur',
      avatarText: 'RS'
    },
    contentParagraphs: [
      'Industrial infrastructure in Raipur, Durg, and Bilaspur is witnessing unprecedented expansion across grain milling, cold chain logistics, and heavy engineering fabrication. However, funding greenfield units or plant modernizations requires a dual strategy: commercial debt syndication coupled with state incentive absorption.',
      'Under the Chhattisgarh Industrial Policy and Central MOFPI guidelines, agro-processing and solar equipment manufacturing units can claim up to 35% capital investment subsidy and 5% interest subvention for 5 consecutive years. Synchronizing your Techno-Economic Viability (TEV) study with these parameters before bank submission is crucial to locking the lowest blended cost of capital.',
      'Earth Finance works directly with empanelled project consultants and lead banks to structure multi-tiered debt packages that integrate moratorium periods covering installation and commercial operations date (COD).'
    ],
    takeaways: [
      'Align project TEV reports with CSIDC Industrial Policy to claim up to 35% capital subsidy.',
      'Structure moratoria of 12-24 months during plant construction and machine trials.',
      'Incorporate credit guarantees under CGTMSE or state industrial development funds to minimize external collateral requirements.'
    ]
  },
  {
    id: 'ratios-unsecured-business-loan',
    category: 'business',
    categoryLabel: 'Business Finance',
    categoryColor: 'bg-surface-container-lowest/90 text-primary-container',
    date: 'Apr 28, 2025',
    readTime: '7 min read',
    title: 'The 3 Financial Ratios Credit Committees Scrutinize Before Sanctioning an Unsecured Business Loan',
    excerpt: 'Why DSCR, Current Ratio, and Adjusted Net Worth matter more than raw turnover when banks assess loan eligibility.',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1VZMSPZu5EVZMCabor3jIYlyVOJv8LdWyAd9lodWQaukJRSCQGbEGdMXfu1pIOSvM1aIgXBeoOt_eBPfVubC9CKDm88Ud2IqXF_QT5xBcETwKsfN4R-Hq0bMMPs2lxEKziHEYmWfZiqeEgYAhIU9-4ROq6ik0M7hMlDqXfx1_zCITbUcJSiKGuJ1H_1oMWMmc9e2Pz7Rs3m9fcIedxtEEkqUrTXIOyN2ABqkU0hJNQF3QL9D2wzPM4jBw',
    author: {
      name: 'Sunil Agrawal, FCA',
      role: 'Chief Risk Officer • Earth Finance',
      avatarText: 'SA'
    },
    contentParagraphs: [
      'Many entrepreneurs believe that presenting impressive top-line revenue figures is sufficient to secure high-ticket unsecured credit. However, banking risk committees prioritize liquidity velocity and debt servicing comfort far above gross sales volume.',
      '1. Debt Service Coverage Ratio (DSCR): Evaluates whether operational cash flow can comfortably meet monthly interest and principal payments. Banks seek a DSCR of 1.35x or higher for unsecured lines.\n\n2. Current Ratio (CR): Measures liquidity by assessing current assets against current liabilities. A benchmark of 1.25x to 1.33x confirms the entity has enough headroom to absorb market payment cycles.\n\n3. Adjusted Tangible Net Worth (ATNW): Credit committees deduct intangible assets and unsecured loans to directors to determine the real net capital cushion available to survive economic downturns.',
      'Ensuring these ratios are audited and reconciled across your GST returns and MCA disclosures accelerates loan sanction decisions from weeks to days.'
    ],
    takeaways: [
      'Target a minimum DSCR of 1.35x to assure committee members of robust cash-flow stability.',
      'Maintain working capital liquidity above 1.25x to prevent working capital friction flags.',
      'Reconcile GST 3B sales turnover with audited income tax filings to eliminate variance queries.'
    ]
  },
  {
    id: 'letter-of-credit-bank-guarantee',
    category: 'working-capital',
    categoryLabel: 'Working Capital',
    categoryColor: 'bg-secondary-container/40 text-secondary',
    date: 'Apr 22, 2025',
    readTime: '5 min read',
    title: 'Letter of Credit (LC) & Bank Guarantees (BG): Unlocking Non-Fund Based Limits for Contractors',
    excerpt: 'Practical strategies for infrastructure and EPC companies in Central India to scale bidding capacity and margin retention.',
    isBentoSpecial: 'working-capital',
    author: {
      name: 'Deepak Dewangan',
      role: 'Trade Finance & Syndicate Associate',
      avatarText: 'DD'
    },
    contentParagraphs: [
      'For infrastructure contractors executing road projects, power transmission towers, and municipal EPC contracts across Chhattisgarh, cash liquidity is routinely locked in Earnest Money Deposits (EMD) and Performance Guarantees.',
      'By replacing hard cash margins with non-fund based institutional Bank Guarantees (Financial & Performance BGs), contractors preserve working liquidity for payroll, equipment diesel, and site deployment. Similarly, sourcing raw materials like cement and steel via 90-day Inland Letters of Credit (LC) ensures vendor pricing discounts without immediate cash outflow.',
      'Earth Finance helps contractors negotiate margin requirements down from 25% cash collateral to as low as 5% to 10% through collateral pooling and joint bank limits.'
    ],
    takeaways: [
      'Free up liquid cash by issuing Bank Guarantees for government tenders instead of fixed deposit blocks.',
      'Procure raw materials at bulk cash rates using 90-180 day Usance Letters of Credit.',
      'Enhance bidding eligibility on high-value CPWD, NHAI, and CSPDCL tenders.'
    ]
  },
  {
    id: 'structured-balance-transfer',
    category: 'planning',
    categoryLabel: 'Financial Planning',
    categoryColor: 'bg-surface/20 text-surface',
    date: 'Apr 15, 2025',
    readTime: '4 min read',
    title: 'Reducing EMI Burdens via Structured Balance Transfer & Benchmark Repo Rate Resetting',
    excerpt: 'Step-by-step audit of old high-interest NBFC loans and moving them to Tier-1 scheduled banks at prime lending rates.',
    isBentoSpecial: 'planning',
    author: {
      name: 'Aditi Mathur',
      role: 'Retail & SME Portfolio Lead',
      avatarText: 'AM'
    },
    contentParagraphs: [
      'A significant proportion of retail and commercial borrowers in Chhattisgarh entered into loan contracts with NBFCs during high interest rate cycles, paying anywhere between 11.5% and 15% interest on secured property debt.',
      'Through a systematic Debt Restructuring & Balance Transfer (BT) exercise, borrowers can migrate eligible loan portfolios to Tier-1 scheduled commercial banks offering repo-linked benchmark rates as low as 8.75% to 9.25%. Over a 10-year term on a ₹1 Crore exposure, an interest spread reduction of just 175 basis points (1.75%) yields cash savings exceeding ₹18 Lakhs.',
      'Furthermore, enhanced property valuations over preceding years allow borrowers to combine the balance transfer with an additional Top-Up facility at prime rates, replacing costly informal borrowings.'
    ],
    takeaways: [
      'Save between 150 to 225 basis points by shifting from legacy NBFC rates to repo-linked bank loans.',
      'Unlock fresh liquidity with seamless Top-Up facilities based on updated property market values.',
      'Eliminate predatory foreclosure charges in compliance with RBI fair practice guidelines.'
    ]
  },
  {
    id: 'fast-track-loan-sanction-checklist',
    category: 'basics',
    categoryLabel: 'Loan Basics',
    categoryColor: 'bg-primary-container text-surface',
    date: 'Apr 08, 2025',
    readTime: '6 min read',
    title: 'Complete 2025 Checklist: Financial & Statutory Documents Required for Fast-Track Loan Sanction',
    excerpt: 'From 3 years audited balance sheets to GST 2A/3B reconciliation, keep your credit dossier ready for zero delays.',
    isBentoSpecial: 'basics',
    author: {
      name: 'Kavita Sharma',
      role: 'Documentation & Compliance Desk',
      avatarText: 'KS'
    },
    contentParagraphs: [
      'The primary cause of delayed loan disbursements in institutional finance is incomplete or discordant documentation submitted to bank credit teams. An incomplete credit pack results in repetitive credit queries and valuation holds.',
      'To expedite loan sanctions within 48 to 72 hours, maintain an updated digital credit dossier containing: 3 years audited financials with 3CA/3CD audit reports, 12 months running bank account statements in searchable PDF format, 12 months GST returns (GSTR 1 & 3B) along with 2B reconciliation certificates, sanctioned loan sanction letters for existing exposures, and clear chain documents for mortgage properties covering 30 years search.',
      'Earth Finance underwriters pre-audit your documentation package before bank submission, resolving potential discrepancies upfront.'
    ],
    takeaways: [
      'Ensure 12-month bank statements show zero return inward/outward clearing bounces.',
      'Reconcile turnover reported on GST portals with audited profit & loss statements.',
      'Organize a 30-year title search track record and municipal property tax receipts.'
    ]
  },
  // Additional Library Articles to complete the 18+ knowledge base
  {
    id: 'cc-od-audit-guidelines',
    category: 'working-capital',
    categoryLabel: 'Working Capital & CC',
    categoryColor: 'bg-surface-container-lowest/90 text-secondary',
    date: 'Apr 02, 2025',
    readTime: '5 min read',
    title: 'Drawing Power (DP) Formulation: How to Optimize Stock & Book Debt Margins for Peak Working Capital',
    excerpt: 'Deep dive into RBI Tandon & Chore committee benchmarks, unpaid creditor netting, and seasonal inventory factoring.',
    author: {
      name: 'Sunil Agrawal, FCA',
      role: 'Chief Risk Officer',
      avatarText: 'SA'
    },
    contentParagraphs: [
      'Drawing Power (DP) forms the lifeblood of manufacturing and distribution businesses holding Cash Credit (CC) limits. Frequently, borrowers find their actual utilization restricted because of aggressive bank margins on raw material inventories and unpaid trade creditor deductions.',
      'By establishing segmented aging for book debts—segregating governmental receivables, blue-chip client invoices, and retail debtors—firms can negotiate higher eligibility thresholds with lead bankers. Maintaining stock audits with verified physical inspection reports eliminates punitive DP freezes.'
    ],
    takeaways: [
      'Segregate book debts below 90 days to retain 60-70% advance eligibility.',
      'Negotiate raw material margin requirements down from 25% to 15% with quarterly stock turnover proofs.',
      'Prevent DP blockages during financial year-end reconciliations.'
    ]
  },
  {
    id: 'msme-cgtmse-schemes',
    category: 'basics',
    categoryLabel: 'Loan Basics',
    categoryColor: 'bg-surface-container-lowest/90 text-primary-container',
    date: 'Mar 26, 2025',
    readTime: '4 min read',
    title: 'CGTMSE Coverage Explained: Securing Up to ₹5 Crore Collateral-Free Funding for Emerging MSMEs',
    excerpt: 'Detailed review of Credit Guarantee Fund Trust norms, fee structures, and eligible business categories in Chhattisgarh.',
    author: {
      name: 'Rameshwar Sahu',
      role: 'Head of Industrial Syndication',
      avatarText: 'RS'
    },
    contentParagraphs: [
      'Under the revised guidelines of the Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE), eligible manufacturing and service enterprises can secure credit facilities up to ₹5 Crores without offering third-party asset collateral.',
      'Understanding the trust fee structure, guarantee coverage brackets (75% to 85%), and specific bank appetite allows growing enterprises to scale operations without mortgaging ancestral family properties.'
    ],
    takeaways: [
      'Avail collateral-free term loans and working capital up to ₹500 Lakhs.',
      'Reduced annual guarantee fees for women entrepreneurs and manufacturing units in backward districts.',
      'Simplified onboarding for active Udyam-registered enterprises.'
    ]
  },
  {
    id: 'equipment-machinery-loans',
    category: 'industrial',
    categoryLabel: 'Industrial Capex',
    categoryColor: 'bg-surface-container-lowest/90 text-secondary',
    date: 'Mar 18, 2025',
    readTime: '5 min read',
    title: 'Machinery & Equipment Financing: Structuring Import LCs and Rupee Term Loans for German & Japanese Tooling',
    excerpt: 'Structuring customized lease options, letter of credit issuance for imported machinery, and OEM tie-ups.',
    author: {
      name: 'Prakash Vardhan',
      role: 'Principal Underwriter',
      avatarText: 'PV'
    },
    contentParagraphs: [
      'Upgrading to high-precision CNC equipment, automated packaging lines, or advanced heavy earthmovers demands structured machinery term loans that do not exhaust general business credit lines.',
      'We review how hypothecation of the machinery itself serves as primary security, leaving real estate free for working capital limits.'
    ],
    takeaways: [
      'Fund up to 85% of machinery invoice value including transit insurance and customs duty.',
      'Flexible repayment aligned with trial run commissioning schedules.',
      'Avail faster approvals through certified OEM vendor partnerships.'
    ]
  },
  {
    id: 'dscr-corporate-debt',
    category: 'business',
    categoryLabel: 'Business Finance',
    categoryColor: 'bg-surface-container-lowest/90 text-primary-container',
    date: 'Mar 11, 2025',
    readTime: '6 min read',
    title: 'Debt Syndication in Practice: Coordinating Multiple Scheduled Banks for ₹25Cr+ Consortia in Central India',
    excerpt: 'Navigating lead banker covenants, pari-passu charge creation, and common loan agreements for heavy industry.',
    author: {
      name: 'Sunil Agrawal, FCA',
      role: 'Chief Risk Officer',
      avatarText: 'SA'
    },
    contentParagraphs: [
      'When credit requirements exceed the single-borrower exposure limit of a regional bank branch, creating a multi-banking or formal consortium arrangement becomes imperative.',
      'Earth Finance orchestrates lead bank negotiations, collateral pooling agreements, and unified trust & retention accounts (TRA) to ensure seamless fund mobilization.'
    ],
    takeaways: [
      'Consolidate banking lines under a unified information memorandum.',
      'Pari-passu charge registration with ROC and CERSAI without inter-creditor delays.',
      'Single window operational reporting for quarterly stock audits.'
    ]
  },
  {
    id: 'debt-consolidation-strategies',
    category: 'planning',
    categoryLabel: 'Financial Planning',
    categoryColor: 'bg-surface-container-lowest/90 text-surface',
    date: 'Mar 04, 2025',
    readTime: '5 min read',
    title: 'Corporate Debt Consolidation: Converting 6 Scattered High-Cost NBFC Liabilities into a Single Clean Bank Line',
    excerpt: 'Case breakdown of a steel ancillary firm in Urla that rescued ₹7.2 Lakhs in monthly interest through strategic debt restructuring.',
    author: {
      name: 'Aditi Mathur',
      role: 'Retail & SME Portfolio Lead',
      avatarText: 'AM'
    },
    contentParagraphs: [
      'Over prolonged growth spurts, mid-sized firms frequently accumulate overlapping short-term unsecured loans, equipment hire-purchases, and invoice factoring facilities at blended rates exceeding 18% p.a.',
      'Consolidating scattered exposures into an institutional 10-year facility backed by unencumbered factory land frees up monthly cash surplus and restores credit rating health.'
    ],
    takeaways: [
      'Reduce monthly debt servicing burden by 40% to 55%.',
      'Improve CRISIL/ICRA corporate credit rating outlook through normalized debt maturity profiles.',
      'Clean up CIBIL Commercial reports for future public equity or mezzanine rounds.'
    ]
  },
  {
    id: 'cibil-commercial-scores',
    category: 'basics',
    categoryLabel: 'Loan Basics',
    categoryColor: 'bg-surface-container-lowest/90 text-primary-container',
    date: 'Feb 25, 2025',
    readTime: '4 min read',
    title: 'CMR Rating & CIBIL Commercial Score: How CMR-1 to CMR-3 Unlocks Sub-9% Interest Rates',
    excerpt: 'An insider guide to CIBIL MSME Rank (CMR), resolving historical DPD flags, and scrubbing credit bureau reporting errors.',
    author: {
      name: 'Kavita Sharma',
      role: 'Documentation & Compliance Desk',
      avatarText: 'KS'
    },
    contentParagraphs: [
      'Bank credit underwriting algorithms now rely heavily on the CIBIL MSME Rank (CMR), which ranks businesses on a scale of CMR-1 to CMR-10 based on repayment regularity and utilization discipline.',
      'Entities ranked between CMR-1 and CMR-3 qualify for green-channel pricing with interest concession discounts of up to 100 basis points.'
    ],
    takeaways: [
      'Understand how 30+ DPD delays impact borrowing power across all scheduled banks.',
      'Rectify outdated charge registrations on the MCA portal that artificially lower CMR scores.',
      'Maintain average utilization below 75% on working capital lines.'
    ]
  }
];

const FEATURED_ARTICLE: ArticleItem = {
  id: 'featured-cc-limits',
  category: 'working-capital',
  categoryLabel: 'WORKING CAPITAL & CC',
  categoryColor: 'bg-secondary-container text-on-secondary-container',
  date: 'May 14, 2025',
  readTime: '6 min read',
  title: 'How Raipur Enterprises Can Optimize Cash Credit (CC) Limits Ahead of Peak Operational Cycles',
  excerpt: 'A comprehensive guide on negotiating drawing power margins, auditing stock and book debts, and structuring multi-banking working capital consortiums for maximum liquidity.',
  image: 'https://lh3.googleusercontent.com/aida/AEtjO1UCS_UiVGB8rV64SNliZ7UN_945abx5AD4plmB6Yx9knzwnWgPkgyF8sh_CMtv8e-O-0wWBvC8MrCIaTwC679x9hAuJ2zKG1VfSFhjd2ZOuOYD2iyy1P3eTUnULDgNS0JFA10fJm0kFEABIxBC0BizFT8mkEZHE0_MFfX4hLYma1hF8s5G1O6a1ggu9b2DjtdvZCxFoivR27OK7_VHMMbyhqroRhJLZQ3jFygtoqz9hBivHG4URXMVD7kI',
  author: {
    name: 'Earth Finance Underwriting Team',
    role: 'Institutional Desk • Raipur',
    avatarText: 'EF'
  },
  contentParagraphs: [
    'For industrial manufacturers, iron & steel ancillaries, and agricultural commodities traders across Chhattisgarh, the onset of peak procurement and harvesting cycles places intense pressure on cash flow liquidity. While businesses may possess adequate sanctioned Cash Credit (CC) limits on paper, operational utilization is often choked by stringent monthly Drawing Power (DP) formulas.',
    'Under conventional banking covenants, lead lenders enforce standard margins of 25% on raw materials, 30% on work-in-progress, and 40% on finished inventory, alongside arbitrary netting of all sundry trade creditors regardless of payable agreements. This leaves enterprises under-funded precisely when bulk procurement yields maximum pricing discounts.',
    'By conducting structured pre-season stock audits, implementing certified stock valuation methodologies, and establishing bilateral limits across multiple scheduled commercial banks, enterprises can successfully negotiate margin relaxations of 10% to 15%. This unlock directly translates to millions of Rupees in liquid working capital without requiring additional immovable collateral.'
  ],
  takeaways: [
    'Audit inventory aging and separate fast-moving stocks to justify lower bank margins.',
    'Structure dual-banking consortiums to overcome single-branch credit ceiling bottlenecks.',
    'Replace restrictive DP caps with seasonal sub-limits ahead of peak commodity harvest cycles.'
  ]
};

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticleModal, setActiveArticleModal] = useState<ArticleItem | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Backend API connection for dynamic articles (if any exist in DB)
  const { data: dbPosts } = useFetch<BlogPost[]>(() => blogApi.getPublic());

  // Category definitions with accurate badge counters
  const categories = useMemo(() => [
    { key: 'all', label: 'All Articles' },
    { key: 'business', label: 'Business Finance' },
    { key: 'lap', label: 'Property & LAP' },
    { key: 'industrial', label: 'Industrial Capex' },
    { key: 'working-capital', label: 'Working Capital & CC' },
    { key: 'planning', label: 'Financial Planning' },
    { key: 'basics', label: 'Loan Basics' }
  ], []);

  // Filtered articles based on search and category
  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return CURATED_ARTICLES.filter((article) => {
      const matchesCat = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.categoryLabel.toLowerCase().includes(q) ||
        article.author.name.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handlePopularClick = (topic: string) => {
    setSearchQuery(topic);
    // Smooth scroll to container
    const el = document.getElementById('articles-library-heading');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('loading');
    setTimeout(() => {
      setNewsletterStatus('success');
      setNewsletterEmail('');
    }, 800);
  };

  return (
    <div className="w-full bg-surface">
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-gradient-to-br from-primary-container via-[#0d2a54] to-[#1455A0] text-surface overflow-hidden py-14 lg:py-24">
        {/* Ambient geometric accents */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern height="40" id="grid-pattern" patternUnits="userSpaceOnUse" width="40">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"></path>
              </pattern>
            </defs>
            <rect fill="url(#grid-pattern)" height="100%" width="100%"></rect>
          </svg>
        </div>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-tertiary-fixed opacity-15 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-secondary opacity-20 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/10 backdrop-blur-md text-surface text-xs font-semibold uppercase tracking-wider mb-5 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
            <span className="w-2 h-2 rounded-full bg-secondary-fixed -ml-2.5"></span>
            <span>Finance Knowledge &amp; Market Insights</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold max-w-4xl tracking-tight leading-tight text-white mb-5">
            Insights to Help You Make <span className="text-tertiary-fixed text-[#ffdf94]">Better Financial Decisions</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-surface-container max-w-2xl leading-relaxed mb-8">
            Explore structured breakdowns, regulatory norms, working capital benchmarks, and asset financing strategies curated by Raipur debt syndication specialists.
          </p>

          {/* Search Input Container */}
          <div className="w-full max-w-2xl relative shadow-2xl rounded-2xl overflow-hidden bg-white p-2 flex items-center gap-2 border border-slate-200/50">
            <div className="pl-3 text-slate-400 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <input
              className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none text-sm sm:text-base py-2 px-1"
              id="topic-search-input"
              placeholder="Search topics, CC limits, LAP LTVs, GST ratio advisory..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 mr-1"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              className="px-5 py-2.5 bg-primary-container text-white hover:bg-[#0d2a54] font-semibold text-sm rounded-xl transition-colors flex items-center gap-1.5 shrink-0 shadow-md"
              id="search-btn"
              type="button"
              onClick={() => {
                const el = document.getElementById('articles-library-heading');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick topic pills */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-surface-container-highest text-xs">
            <span className="opacity-80 font-medium text-slate-300">Popular:</span>
            <button
              type="button"
              className="hover:text-tertiary-fixed underline underline-offset-4 cursor-pointer text-slate-200 transition-colors"
              onClick={() => handlePopularClick('Cash Credit')}
            >
              CC Limit Audit
            </button>
            <span className="opacity-40 text-slate-400">•</span>
            <button
              type="button"
              className="hover:text-tertiary-fixed underline underline-offset-4 cursor-pointer text-slate-200 transition-colors"
              onClick={() => handlePopularClick('DSCR')}
            >
              DSCR Ratio
            </button>
            <span className="opacity-40 text-slate-400">•</span>
            <button
              type="button"
              className="hover:text-tertiary-fixed underline underline-offset-4 cursor-pointer text-slate-200 transition-colors"
              onClick={() => handlePopularClick('LAP')}
            >
              Commercial LAP
            </button>
            <span className="opacity-40 text-slate-400">•</span>
            <button
              type="button"
              className="hover:text-tertiary-fixed underline underline-offset-4 cursor-pointer text-slate-200 transition-colors"
              onClick={() => handlePopularClick('Subsidy')}
            >
              Chhattisgarh Capex
            </button>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER (Sticky Nav Tabs) */}
      <section className="sticky top-20 z-40 w-full bg-surface-container-lowest/95 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max" id="category-filter-group">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-primary-container text-white shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span>{cat.label}</span>
                  {cat.key === 'all' && (
                    <span className="px-1.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-bold">
                      {CURATED_ARTICLES.length + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAIN KNOWLEDGE BODY */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-12">
        {/* 3. FEATURED ARTICLE: Two-Column Editorial Card */}
        {selectedCategory === 'all' && !searchQuery && (
          <section className="w-full">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                <Star className="w-4 h-4 text-tertiary-fixed-dim fill-current" />
                <span>Featured Advisory Dossier</span>
              </div>
              <span className="text-[11px] font-semibold text-primary-container bg-surface-container px-2.5 py-0.5 rounded-md">
                Quarterly Special
              </span>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl shadow-md border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 group hover:shadow-xl transition-all duration-300">
              {/* Visual left column (7 cols) */}
              <div className="lg:col-span-7 relative min-h-[280px] lg:min-h-[420px] overflow-hidden bg-primary-container">
                <img
                  alt="Strategic corporate debt advisory session in Raipur"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  src={FEATURED_ARTICLE.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent lg:hidden"></div>
                <div className="absolute bottom-4 left-4 lg:hidden">
                  <span className="px-3 py-1 rounded-md bg-secondary-container text-on-secondary-container text-xs font-bold shadow-sm">
                    {FEATURED_ARTICLE.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Editorial details right column (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-surface-container-lowest">
                <div className="space-y-4">
                  <div className="hidden lg:flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-secondary-container/30 text-secondary text-xs font-bold">
                      {FEATURED_ARTICLE.categoryLabel}
                    </span>
                    <span className="text-xs text-on-surface-variant font-medium">
                      {FEATURED_ARTICLE.date} • {FEATURED_ARTICLE.readTime}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="lg:hidden text-xs text-on-surface-variant font-medium">
                      {FEATURED_ARTICLE.date} • {FEATURED_ARTICLE.readTime} • Advisory Desk
                    </span>
                    <Link
                      to="/blog/how-raipur-enterprises-can-optimize-cash-credit-cc-limits"
                      className="text-xl sm:text-2xl font-bold text-primary-container group-hover:text-[#1455A0] transition-colors leading-snug cursor-pointer block"
                    >
                      {FEATURED_ARTICLE.title}
                    </Link>
                  </div>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {FEATURED_ARTICLE.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#071B3A] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      EF
                    </div>
                    <div className="text-left text-xs">
                      <span className="block font-semibold text-on-surface">
                        {FEATURED_ARTICLE.author.name}
                      </span>
                      <span className="text-outline text-[11px]">
                        {FEATURED_ARTICLE.author.role}
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/blog/how-raipur-enterprises-can-optimize-cash-credit-cc-limits"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1455A0] group/link hover:translate-x-1 transition-transform self-start sm:self-center"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4 text-[#1455A0]" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. LATEST ARTICLES GRID */}
        <section className="space-y-6" id="articles-library-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-secondary font-bold block mb-1">
                Curated Library
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-container">
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : selectedCategory === 'all'
                  ? 'Latest Financial Analysis & Guides'
                  : categories.find((c) => c.key === selectedCategory)?.label}
              </h2>
            </div>
            <div className="text-on-surface-variant text-xs sm:text-sm">
              Showing <span className="font-bold text-on-surface">{filteredArticles.length}</span> selected dossiers
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-base font-semibold text-slate-700">No matching articles found</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for general terms like "working capital", "LAP", "rates", or reset your category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-primary-container text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredArticles.map((article) => {
                // Specialized Bento Header Visuals for Cards 4, 5, 6
                const isBentoWc = article.isBentoSpecial === 'working-capital';
                const isBentoPlan = article.isBentoSpecial === 'planning';
                const isBentoBasics = article.isBentoSpecial === 'basics';

                return (
                  <article
                    key={article.id}
                    className="flex flex-col bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl border border-slate-200/70 transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => setActiveArticleModal(article)}
                  >
                    {/* Visual Media Header */}
                    {isBentoWc ? (
                      <div className="relative h-52 w-full bg-gradient-to-tr from-surface-container-high via-surface-container-low to-surface flex flex-col justify-between p-4">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-md bg-secondary-container/40 text-secondary text-xs font-semibold">
                            {article.categoryLabel}
                          </span>
                          <span className="material-symbols-outlined text-[24px] text-surface-tint">
                            account_balance
                          </span>
                        </div>
                        {/* Decorative mini metrics graph inline SVG */}
                        <div className="w-full flex items-end gap-1.5 h-16 opacity-75">
                          <div className="w-1/6 bg-[#1455A0] h-6 rounded-t transition-all group-hover:h-8"></div>
                          <div className="w-1/6 bg-[#1455A0] h-9 rounded-t transition-all group-hover:h-11"></div>
                          <div className="w-1/6 bg-[#1455A0] h-12 rounded-t transition-all group-hover:h-14"></div>
                          <div className="w-1/6 bg-[#1455A0] h-8 rounded-t transition-all group-hover:h-10"></div>
                          <div className="w-1/6 bg-secondary h-14 rounded-t transition-all group-hover:h-16"></div>
                          <div className="w-1/6 bg-tertiary-fixed-dim h-16 rounded-t transition-all group-hover:h-16"></div>
                        </div>
                      </div>
                    ) : isBentoPlan ? (
                      <div className="relative h-52 w-full bg-gradient-to-br from-[#071B3A] to-[#168B45] text-white p-4 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-md bg-white/20 text-white text-xs font-semibold backdrop-blur-sm">
                            {article.categoryLabel}
                          </span>
                          <span className="material-symbols-outlined text-tertiary-fixed text-[24px]">
                            trending_down
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="text-[11px] text-surface-container-high uppercase tracking-wider font-semibold">
                            Interest Rate Spread
                          </div>
                          <div className="text-2xl sm:text-3xl font-extrabold text-[#F4C542]">
                            Save 150-225 bps
                          </div>
                        </div>
                      </div>
                    ) : isBentoBasics ? (
                      <div className="relative h-52 w-full bg-surface-container-high p-4 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-md bg-primary-container text-white text-xs font-semibold">
                            {article.categoryLabel}
                          </span>
                          <span className="material-symbols-outlined text-[24px] text-primary-container">
                            fact_check
                          </span>
                        </div>
                        <div className="bg-white/90 p-3 rounded-xl shadow-sm backdrop-blur space-y-1 border border-slate-200">
                          <div className="flex items-center gap-2 text-xs font-bold text-secondary">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>100% Audit Compliance Dossier</span>
                          </div>
                          <div className="text-[11px] text-on-surface-variant pl-6">
                            GST 2A/3B Reconciliation ready
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-52 w-full overflow-hidden bg-surface-container">
                        <img
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          src={article.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'}
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-2.5 py-1 rounded-md backdrop-blur text-xs font-semibold shadow-sm ${article.categoryColor}`}>
                            {article.categoryLabel}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-on-surface-variant text-xs">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{article.date} • {article.readTime}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-on-surface group-hover:text-[#1455A0] transition-colors leading-snug line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                            {article.author.avatarText}
                          </div>
                          <span className="truncate max-w-[120px]">{article.author.name}</span>
                        </div>

                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1455A0] group-hover:translate-x-1 transition-transform">
                          <span>Read Article</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* 5. NEWSLETTER / KNOWLEDGE SUBSCRIPTION BANNER */}
        <section className="w-full relative rounded-2xl bg-primary-container text-surface p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
          {/* Top subtle gold border representation via accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-tertiary-fixed via-tertiary-fixed-dim to-secondary"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-tertiary-fixed">
                <Mail className="w-4 h-4 text-tertiary-fixed" />
                <span>Bi-Weekly Institutional Intelligence</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Stay Ahead of Central India's Lending Benchmarks.
              </h3>
              <p className="text-sm sm:text-base text-surface-container max-w-xl leading-relaxed">
                Receive our bi-weekly advisory dossier on repo rate revisions, RBI circular insights, and enterprise credit structures directly from senior underwriters.
              </p>
            </div>

            <div className="lg:col-span-5">
              {newsletterStatus === 'success' ? (
                <div className="bg-emerald-800/60 border border-emerald-400 text-white p-4 rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Subscription Confirmed!</h4>
                    <p className="text-xs text-emerald-100">
                      You will receive our next debt syndication bulletin directly in your inbox.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    className="flex-1 bg-white text-slate-900 px-4 py-3 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F4C542]"
                    placeholder="Enter business email address"
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                  />
                  <button
                    className="px-6 py-3 rounded-xl bg-tertiary-fixed text-[#071B3A] hover:bg-tertiary-fixed-dim text-sm font-bold transition-all shrink-0 shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                    type="submit"
                    disabled={newsletterStatus === 'loading'}
                  >
                    <span>{newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              <div className="mt-4 pt-3 text-[11px] text-surface-container-highest flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-secondary-fixed shrink-0" />
                <span>Zero spam. Direct compliance, benchmark analysis, and syndicate bulletins only. Unsubscribe anytime.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. BOTTOM DIRECT CONSULTATION CTA */}
        <section className="w-full bg-surface-container-low rounded-2xl p-8 sm:p-12 text-center space-y-4 border border-slate-200">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-surface-container text-primary-container mx-auto shadow-sm">
            <span className="material-symbols-outlined text-[32px] text-primary-container">
              support_agent
            </span>
          </div>

          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-primary-container">
              Need Direct Advisory for Your Business Credit Line?
            </h3>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Speak with our principal debt syndicators in Raipur. We evaluate existing collateral, debt-service coverage, and recommend prime bank alignment.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/book-consultation"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim shadow-md transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Consultation</span>
            </Link>

            <a
              href="https://wa.me/919300022732"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#168B45] text-white hover:bg-[#127439] shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>WhatsApp Us (93000 22732)</span>
            </a>
          </div>
        </section>
      </div>

      {/* ARTICLE READER MODAL */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col border border-slate-200">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-slate-100 text-primary-container text-xs font-bold uppercase">
                  {activeArticleModal.categoryLabel}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {activeArticleModal.date} • {activeArticleModal.readTime}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticleModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {activeArticleModal.image && (
                <div className="w-full h-64 rounded-xl overflow-hidden shadow-sm bg-slate-900">
                  <img
                    src={activeArticleModal.image}
                    alt={activeArticleModal.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071B3A] leading-tight">
                  {activeArticleModal.title}
                </h2>
                <div className="flex items-center gap-3 pt-2 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-[#071B3A] text-white flex items-center justify-center font-bold text-xs">
                    {activeArticleModal.author.avatarText}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#071B3A]">
                      {activeArticleModal.author.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {activeArticleModal.author.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Takeaway Highlights Box */}
              {activeArticleModal.takeaways && activeArticleModal.takeaways.length > 0 && (
                <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-100 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1455A0]">
                    <Sparkles className="w-4 h-4 text-[#1455A0]" />
                    <span>Underwriter Key Takeaways</span>
                  </div>
                  <ul className="space-y-2">
                    {activeArticleModal.takeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#168B45] mt-0.5 shrink-0" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Content Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                {activeArticleModal.contentParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Action Strip at bottom of article */}
              <div className="p-6 rounded-2xl bg-[#071B3A] text-white space-y-4 mt-8">
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">
                    Need Structured Financing for Your Enterprise?
                  </h4>
                  <p className="text-xs text-slate-300">
                    Get in touch with our loan advisory desk in Raipur for quick pre-eligibility review.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/apply"
                    onClick={() => setActiveArticleModal(null)}
                    className="px-4 py-2.5 rounded-lg bg-[#F4C542] text-[#071B3A] text-xs font-bold hover:bg-[#e0b332] transition-colors"
                  >
                    Apply for Loan
                  </Link>
                  <Link
                    to="/book-consultation"
                    onClick={() => setActiveArticleModal(null)}
                    className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
