import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogApi } from '../../services/blogApi';
import { BlogPost } from '../../types';

interface ExtendedBlogPost extends BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  author_initials: string;
  author_role: string;
  status: 'PUBLISHED' | 'DRAFT' | 'SCHEDULED' | 'ARCHIVED';
  cover_image: string;
  read_time: string;
  methodology: string;
  formatted_date: string;
  date_subtitle: string;
  reads_count: number;
  engagement_subtitle: string;
  excerpt: string;
  content: string;
  scheduled_at?: string | null;
  region?: string;
}

const SEED_ARTICLES: ExtendedBlogPost[] = [
  {
    id: 'art-01',
    title: 'How Raipur Enterprises Can Optimize Cash Credit (CC) Limits Ahead of Peak Operational Cycles',
    slug: 'optimize-cash-credit-limits-raipur-enterprises',
    category: 'Working Capital & CC',
    author: 'Rajesh Sharma',
    author_initials: 'RS',
    author_role: 'Lead Underwriter',
    status: 'PUBLISHED',
    cover_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZOShxk2su-dVGidSV6VmSFrvF1r0XWSu8P4rEXxT6WwZ8wrMgGZbJ-_0TbwyM2vNCzPS8yb5ux0EWqNLRsae14OQP6Flm5PAgdy70mUOS7d1jbS1u16DEUghGoCrzhkYBaRwu0292C65Ah6f6sFDzLVW9QpGOq0cFyQu5EHdazURYTSYQUdDWmzJtHaxoNgS7woJbL0q58DLMuNIO6gJh7So0HnT8xzLaexYm9Ha-T2zdC1X8lRCm',
    read_time: '8 min read',
    methodology: 'CMA Methodology',
    formatted_date: 'May 14, 2025',
    date_subtitle: 'Live 2 days ago',
    reads_count: 8400,
    engagement_subtitle: '94 shares • 32 leads',
    excerpt:
      'Strategic guidelines for manufacturing units in Urla and Siltara on aligning drawing power formulas with 90-day debtors cycles and stock audit certifications.',
    content:
      'Cash credit facilities constitute the monetary lifeblood of industrial manufacturing across Central India. However, seasonal credit crunches frequently occur when enterprise drawing powers are misaligned with raw material procurement cycles.\n\n### 1. The 90-Day Book Debt Realignment\nUnderwriters audit verified book debts strictly within 90 days. Older unpaid invoices must be factored out or transitioned to vendor discounting lines.\n\n### 2. CA Stock Audit Verification\nMaintaining quarterly stock certificates through empaneled Chartered Accountants ensures uninterrupted credit tranches during high-production quarters.',
    tags: ['Working Capital', 'Cash Credit', 'CMA Data', 'Raipur Industry'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-02',
    title: 'Industrial Capex Subventions in Siltara & Urla: State Interest Subsidy Demystified',
    slug: 'industrial-capex-subventions-siltara-urla-interest-subsidy',
    category: 'Industrial Capex',
    author: 'Amit Sahu',
    author_initials: 'AS',
    author_role: 'Regional Credit Mgr',
    status: 'SCHEDULED',
    cover_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCx-5sesqNDt0Jm7ztwqM97YlWMXKXmGtSPpsqbD96husJcEMhvgJZRPnTnqJ2y0_WiwYG6WjcqxW3WWanHAPjX09_bHWb5SZQyPYqOe35obiFIv6ixyGHFUwU6NXLtApuHRbONiUX1kzzq3BSs4FmgLbLLD2gIk1OMVqmhunHe8doLIKcjxjVTNI6F6HohT3KlhCIHYKqsguu6s59mHk1f4tJ7IodPeQyk3bgLMWK0zNeejppSFLfl',
    read_time: '11 min read',
    methodology: 'Subsidies & Term Loans',
    formatted_date: 'June 02, 2025',
    date_subtitle: 'Slated 09:00 AM IST',
    reads_count: 0,
    engagement_subtitle: 'Pre-launch checklist ready',
    excerpt:
      'How steel re-rolling and fabrication plants can capture up to 350 bps interest subsidies through CSIDC schemes combined with institutional term loans.',
    content:
      'Chhattisgarh State Industrial Development Corporation (CSIDC) provisions specific incentives for heavy manufacturing investments. Understanding how bank term loans interact with state subsidies prevents liquidity lockups during equipment commissioning.',
    tags: ['Industrial Capex', 'CSIDC Subsidy', 'Term Loan', 'Siltara'],
    region: 'Chhattisgarh Corridor',
    scheduled_at: '2025-06-02T09:00:00Z'
  },
  {
    id: 'art-03',
    title: 'LAP vs. Commercial Term Loan: Balancing LTV, Tenor, and Interest Burdens in 2025',
    slug: 'lap-vs-commercial-term-loan-ltv-tenor-interest',
    category: 'Property & LAP',
    author: 'Rajesh Sharma',
    author_initials: 'RS',
    author_role: 'Lead Underwriter',
    status: 'PUBLISHED',
    cover_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBYIuttSU8KsazE0IP2HAPV3NVi0Qwb7qxMtYo5jovff096un04XwsNDiiGYZK7iIMAZlbD3hNeJvFHYiYGou5Mch_kA8zLOJyT922yZynow9FAVM1jYfgMp7HbaQtQ4-86ko6jhMIt0IgaW9KZriZT0RBmpmKV3wpVAeYm0SQVLsWu4W0sjs1hqkPqwxKx-jUvPpBqxJCeAWobA_pp37p3Q7cGU6iuJL4_Ave7tmd6uCy7gs_uREuF',
    read_time: '6 min read',
    methodology: 'Asset Monetization',
    formatted_date: 'May 02, 2025',
    date_subtitle: 'Live 14 days ago',
    reads_count: 12100,
    engagement_subtitle: '210 shares • 58 inquiries',
    excerpt:
      'A granular financial comparison examining tenure, cost of debt, and cash-flow flexibility when pledging commercial real estate in Pandri and Devendra Nagar.',
    content:
      'When enterprises require substantial non-revolving capital, deciding between a Loan Against Property (LAP) and a Corporate Term Loan dictates long-term debt-service obligations. We analyze loan-to-value ratios, amortizations, and tax efficiency.',
    tags: ['LAP', 'Commercial Real Estate', 'Debt Advisory', 'LTV'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-04',
    title: 'Doctor Practice Overdraft Norms: Structuring Equipment Leases with Unsecured Lines',
    slug: 'doctor-practice-overdraft-norms-equipment-leases',
    category: 'Business Finance',
    author: 'Editorial Desk',
    author_initials: 'ED',
    author_role: 'Institutional Research',
    status: 'DRAFT',
    cover_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAOrdAc0d6zFYWw1ZnD0QkwNuoJnrHOmWfN2D2KLkT0xoqRRFR_HoqTXR9SbXjX0a_XhVS843hM4a1rueGgTGf5uXCWhkuwmGk7xrys6K37IrOrFUPiLRXKEF09KOGgDTR6sSQAOnyYMijNWV19eShF1hxsCyAG3fhjXthrijXYyRVmFDNt8gYYY6nATJ2SbJTpGpJS4QznQAklG8-FTusC1K3NoqeSLjoXp4d4eYxMRFEv38szeqPj',
    read_time: '5 min read',
    methodology: 'Specialized Professional Debt',
    formatted_date: 'May 15, 2025',
    date_subtitle: 'Updated 3h ago',
    reads_count: 0,
    engagement_subtitle: 'Internal review only',
    excerpt:
      'Specialized underwriting frameworks allowing multi-specialty hospitals and radiologists to combine diagnostic machine term leases with liquid operational lines.',
    content:
      'Modern healthcare diagnostic centers require high-ticket medical instruments such as 128-slice CT scanners and MRI units. Operating leases blended with unsecured doctor lines optimize tax shields and maintain liquidity.',
    tags: ['Doctor Loan', 'Medical Equipment', 'Hospital Capex'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-05',
    title: 'Paddy Millers Credit Conundrum: Handling Mandi Cess and Seasonal Cash Deficits',
    slug: 'paddy-millers-credit-mandi-cess-seasonal-cash-deficits',
    category: 'Working Capital & CC',
    author: 'Rajesh Sharma',
    author_initials: 'RS',
    author_role: 'Lead Underwriter',
    status: 'PUBLISHED',
    cover_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCggeGYszC1hyys9GAJzhjoLtz-yYbEMDa66eO-73F68LCv_wnxyAaD6TJnvYa3Bgf7sB8zoE6z0SwtDIH7RmH_oNGhMwiBH86AmdFuhlNzg7l1sTEqdo5yp5dCUNFLtLNEv8XywCq3DhJreZ-q176qeRCUA95tewhpMD_0GUs4g3gnVb3GlSAWSeNssnOKzYm_vmaXbBpWfRVC5i7LoosRlgJNDilGbAaTIE2WC9lfTmT7st7TcLaR',
    read_time: '10 min read',
    methodology: 'Agro-Processing Finance',
    formatted_date: 'Apr 21, 2025',
    date_subtitle: 'Live 25 days ago',
    reads_count: 14600,
    engagement_subtitle: '342 shares • 89 leads',
    excerpt:
      'Navigating seasonal paddy procurement peaks, Mandi cess levies, and warehouse receipt pledging across Bilaspur and Dhamtari agrarian belts.',
    content:
      'Paddy milling operations in Central India operate under concentrated procurement windows where working capital demand surges multifold within weeks. Negotiable Warehouse Receipts (NWR) and pledge financing offer critical relief.',
    tags: ['Agro Processing', 'Rice Mills', 'Warehouse Receipts', 'Dhamtari'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-06',
    title: 'CMA Data Formulation: 5 Essential Ratios Public Sector Banks Scrutinize',
    slug: 'cma-data-formulation-5-essential-ratios-psb-scrutiny',
    category: 'Financial Planning',
    author: 'Amit Sahu',
    author_initials: 'AS',
    author_role: 'Regional Credit Mgr',
    status: 'PUBLISHED',
    cover_image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDtrrJ3pWhoXzohigVZZfFDaFohnqPkxwrS7X5slx6MwNAzF7wwjCpBuWso9Qr9D7lhFBkWP2daO8SBuAfHjzeUUzDPYneTTO3ekUMaCjS2gBSKwpgk4ozTCRqcHZ44VsMr_HQzEEBxgHjDSDRYg_bTj6hnpC3WcHzn4ejAUmOnpaXosH0EX3jxcQ7ufLhjyTXYQBhyHoMIIU0w4dwz4yznhkW2w2mYFbu0MiHzAeMS98pA3lpOXkx0',
    read_time: '14 min read',
    methodology: 'Underwriting Standards',
    formatted_date: 'Apr 10, 2025',
    date_subtitle: 'Live 36 days ago',
    reads_count: 7700,
    engagement_subtitle: '112 shares • 45 leads',
    excerpt:
      'Credit Monitoring Arrangement (CMA) data forms the bedrock of institutional sanction. Here is how Current Ratio, TOL/ATNW, and DSCR are benchmarked.',
    content:
      'When submitting multi-crore credit proposals to public and private sector banks, the CMA dataset is the primary underwriting artifact. Benchmarking the Current Ratio above 1.33 and holding Debt-Equity within 2.5:1 accelerates credit committee clearance.',
    tags: ['CMA Data', 'Banking Norms', 'DSCR', 'Financial Ratios'],
    region: 'Chhattisgarh Corridor'
  },
  // Additional catalog seed items to fulfill the 24 total count (18 published, 4 drafts, 2 scheduled)
  {
    id: 'art-07',
    title: 'Rooftop Solar Term Financing for Heavy Engineering Plants in Bhilai',
    slug: 'rooftop-solar-term-financing-heavy-engineering-bhilai',
    category: 'Industrial Capex',
    author: 'Amit Sahu',
    author_initials: 'AS',
    author_role: 'Regional Credit Mgr',
    status: 'PUBLISHED',
    cover_image:
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
    read_time: '7 min read',
    methodology: 'Green Capex',
    formatted_date: 'Apr 02, 2025',
    date_subtitle: 'Live 44 days ago',
    reads_count: 3200,
    engagement_subtitle: '48 shares • 19 leads',
    excerpt: 'Accessing concessional green credit lines for captive solar units up to 2 MW.',
    content: 'Green energy Capex enables immediate electricity cost deflation while unlocking preferential loan spreads.',
    tags: ['Solar', 'Green Capex', 'Bhilai'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-08',
    title: 'School Campus Infrastructure Expansion: Structuring 15-Year Institutional Facilities',
    slug: 'school-campus-infrastructure-expansion-loans',
    category: 'Business Finance',
    author: 'Rajesh Sharma',
    author_initials: 'RS',
    author_role: 'Lead Underwriter',
    status: 'PUBLISHED',
    cover_image:
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
    read_time: '9 min read',
    methodology: 'Education Debt',
    formatted_date: 'Mar 25, 2025',
    date_subtitle: 'Live 52 days ago',
    reads_count: 2450,
    engagement_subtitle: '31 shares • 14 leads',
    excerpt: 'Long-term debt modeling for K-12 private institutions and higher education trusts.',
    content: 'Tuition receivables modeling provides predictable amortization profiles for campus infrastructure.',
    tags: ['Education', 'Campus Loan', 'Trust Financing'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-09',
    title: 'Consortium Debt Syndication Rules for Exposures Above ₹25 Crores',
    slug: 'consortium-debt-syndication-rules-large-exposures',
    category: 'Business Finance',
    author: 'Rajesh Sharma',
    author_initials: 'RS',
    author_role: 'Lead Underwriter',
    status: 'PUBLISHED',
    cover_image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    read_time: '12 min read',
    methodology: 'Syndicated Debt',
    formatted_date: 'Mar 15, 2025',
    date_subtitle: 'Live 62 days ago',
    reads_count: 5100,
    engagement_subtitle: '78 shares • 26 leads',
    excerpt: 'Navigating multiple banking arrangements and common loan covenants in Central India.',
    content: 'Consortium lending requires inter-creditor pacts and balanced security creation across lead banks.',
    tags: ['Consortium', 'Large Debt', 'Syndication'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-10',
    title: 'Machinery Hypothecation vs Lease Financing: Tax Shield Comparison',
    slug: 'machinery-hypothecation-vs-lease-financing-tax-shields',
    category: 'Industrial Capex',
    author: 'Amit Sahu',
    author_initials: 'AS',
    author_role: 'Regional Credit Mgr',
    status: 'PUBLISHED',
    cover_image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    read_time: '8 min read',
    methodology: 'Asset Underwriting',
    formatted_date: 'Mar 04, 2025',
    date_subtitle: 'Live 73 days ago',
    reads_count: 3900,
    engagement_subtitle: '52 shares • 21 leads',
    excerpt: 'Depreciation benefits vs lease rental expense deductions under Corporate Tax provisions.',
    content: 'A comprehensive financial model evaluating post-tax cash flows for CNC machines and rolling lines.',
    tags: ['Machinery', 'Tax Shield', 'Capex'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-11',
    title: 'Overdraft Against Fixed Deposits vs Clean Working Capital Lines',
    slug: 'overdraft-against-fixed-deposits-vs-clean-lines',
    category: 'Financial Planning',
    author: 'Editorial Desk',
    author_initials: 'ED',
    author_role: 'Institutional Research',
    status: 'PUBLISHED',
    cover_image:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    read_time: '5 min read',
    methodology: 'Treasury Optimization',
    formatted_date: 'Feb 20, 2025',
    date_subtitle: 'Live 85 days ago',
    reads_count: 1850,
    engagement_subtitle: '22 shares • 8 leads',
    excerpt: 'Leveraging corporate surplus liquidity to lower overall borrowing costs.',
    content: 'OD against institutional fixed deposits maintains interest income arbitrage while fulfilling payroll deficits.',
    tags: ['Overdraft', 'Fixed Deposits', 'Treasury'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-12',
    title: 'Warehouse Logistics Capex in Raipur Transport Nagar: 2025 Outlook',
    slug: 'warehouse-logistics-capex-raipur-transport-nagar',
    category: 'Property & LAP',
    author: 'Rajesh Sharma',
    author_initials: 'RS',
    author_role: 'Lead Underwriter',
    status: 'PUBLISHED',
    cover_image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    read_time: '7 min read',
    methodology: 'Commercial Logistics',
    formatted_date: 'Feb 10, 2025',
    date_subtitle: 'Live 95 days ago',
    reads_count: 2900,
    engagement_subtitle: '41 shares • 15 leads',
    excerpt: 'Financing automated warehousing and multi-modal distribution centers along NH-53.',
    content: 'Central India is emerging as a premier logistics crossroads, driving institutional demand for grade-A godown funding.',
    tags: ['Logistics', 'Warehousing', 'Transport Nagar'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-13',
    title: 'Sponge Iron Unit Debt Restructuring: Tenor Rescheduling Under RBI Guidelines',
    slug: 'sponge-iron-unit-debt-restructuring-tenor-rescheduling',
    category: 'Industrial Capex',
    author: 'Amit Sahu',
    author_initials: 'AS',
    author_role: 'Regional Credit Mgr',
    status: 'PUBLISHED',
    cover_image:
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    read_time: '13 min read',
    methodology: 'Restructuring',
    formatted_date: 'Jan 28, 2025',
    date_subtitle: 'Live 108 days ago',
    reads_count: 4200,
    engagement_subtitle: '66 shares • 23 leads',
    excerpt: 'Regulatory avenues to avoid NPA slippage during raw material supply shocks.',
    content: 'Prudential norms permit structured repayment realignments when backed by sound technical viability studies.',
    tags: ['Sponge Iron', 'Debt Restructuring', 'RBI Norms'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-14',
    title: 'Cold Storage Financing with MOFPI Capital Subsidies: Central India Blueprint',
    slug: 'cold-storage-financing-mofpi-subsidies',
    category: 'Working Capital & CC',
    author: 'Rajesh Sharma',
    author_initials: 'RS',
    author_role: 'Lead Underwriter',
    status: 'PUBLISHED',
    cover_image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    read_time: '9 min read',
    methodology: 'Agro Infrastructure',
    formatted_date: 'Jan 15, 2025',
    date_subtitle: 'Live 121 days ago',
    reads_count: 3100,
    engagement_subtitle: '39 shares • 17 leads',
    excerpt: 'Integrating Ministry of Food Processing grants with composite institutional credit.',
    content: 'Cold chain development attracts up to 50% capital grants, radically reducing promoter equity commitments.',
    tags: ['Cold Storage', 'MOFPI', 'Agro Infra'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-15',
    title: 'Hospitality & Hotel Financing in Raipur: Lease Rent Discounting vs Project Debt',
    slug: 'hospitality-hotel-financing-raipur-lrd',
    category: 'Property & LAP',
    author: 'Editorial Desk',
    author_initials: 'ED',
    author_role: 'Institutional Research',
    status: 'PUBLISHED',
    cover_image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    read_time: '6 min read',
    methodology: 'Hospitality Debt',
    formatted_date: 'Jan 05, 2025',
    date_subtitle: 'Live 131 days ago',
    reads_count: 1750,
    engagement_subtitle: '25 shares • 9 leads',
    excerpt: 'Financing premium banquet facilities and business hotels based on forward occupancy projections.',
    content: 'LRD instruments enable hotel proprietors to monetize steady institutional corporate leases.',
    tags: ['Hospitality', 'Hotel Loan', 'LRD'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-16',
    title: 'CGTMSE Coverage Expansion to ₹5 Crores: MSME Collateral-Free Horizons',
    slug: 'cgtmse-coverage-expansion-5-crores-msme',
    category: 'Business Finance',
    author: 'Amit Sahu',
    author_initials: 'AS',
    author_role: 'Regional Credit Mgr',
    status: 'PUBLISHED',
    cover_image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    read_time: '10 min read',
    methodology: 'Credit Guarantees',
    formatted_date: 'Dec 20, 2024',
    date_subtitle: 'Live 147 days ago',
    reads_count: 4800,
    engagement_subtitle: '72 shares • 29 leads',
    excerpt: 'Unlocking unsecured business loans without tangible real estate mortgage requirements.',
    content: 'The revised CGTMSE ceiling enables high-growth MSME units in manufacturing to secure non-collateral debt.',
    tags: ['CGTMSE', 'MSME', 'Unsecured Debt'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-17',
    title: 'EPC Contractor Bank Guarantees: Margin Money Optimization Strategies',
    slug: 'epc-contractor-bank-guarantees-margin-money-optimization',
    category: 'Working Capital & CC',
    author: 'Rajesh Sharma',
    author_initials: 'RS',
    author_role: 'Lead Underwriter',
    status: 'PUBLISHED',
    cover_image:
      'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80',
    read_time: '11 min read',
    methodology: 'Non-Fund Based Lines',
    formatted_date: 'Dec 10, 2024',
    date_subtitle: 'Live 157 days ago',
    reads_count: 3600,
    engagement_subtitle: '55 shares • 18 leads',
    excerpt: 'Minimizing cash margins on performance and financial guarantees for road and rail contracts.',
    content: 'Structured non-fund lines prevent contractor cash traps during government tender bid submissions.',
    tags: ['Bank Guarantee', 'EPC', 'Contractor Finance'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-18',
    title: 'Commercial Vehicle Fleet Financing: Bulk Refinancing for Mining Corridors',
    slug: 'commercial-vehicle-fleet-financing-mining-corridors',
    category: 'Business Finance',
    author: 'Editorial Desk',
    author_initials: 'ED',
    author_role: 'Institutional Research',
    status: 'PUBLISHED',
    cover_image:
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80',
    read_time: '7 min read',
    methodology: 'Fleet Capital',
    formatted_date: 'Nov 28, 2024',
    date_subtitle: 'Live 169 days ago',
    reads_count: 2200,
    engagement_subtitle: '33 shares • 11 leads',
    excerpt: 'Refinancing heavy multi-axle tippers and coal transport fleets across Korba and Raigarh.',
    content: 'Asset-backed fleet credit lines ensure optimal maintenance working capital for mineral logistics companies.',
    tags: ['Fleet Loan', 'Mining', 'Commercial Vehicles'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-19',
    title: 'Draft: NBFC Co-Lending Arrangements for Tier-3 Chhattisgarh Industrialists',
    slug: 'nbfc-co-lending-arrangements-tier-3-industrialists',
    category: 'Business Finance',
    author: 'Editorial Desk',
    author_initials: 'ED',
    author_role: 'Institutional Research',
    status: 'DRAFT',
    cover_image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    read_time: '6 min read',
    methodology: 'Co-Lending Models',
    formatted_date: 'May 16, 2025',
    date_subtitle: 'Updated yesterday',
    reads_count: 0,
    engagement_subtitle: 'Pending Underwriter Sign-off',
    excerpt: 'Blended cost of credit mechanisms pairing commercial banks with specialized NBFCs.',
    content: 'Reviewing risk-sharing matrices under RBI co-lending framework Model 2.',
    tags: ['Co-Lending', 'NBFC', 'Credit Risk'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-20',
    title: 'Draft: Export Letter of Credit Discounting for Rice Mills Shipping to ASEAN',
    slug: 'export-lc-discounting-rice-mills-asean',
    category: 'Working Capital & CC',
    author: 'Amit Sahu',
    author_initials: 'AS',
    author_role: 'Regional Credit Mgr',
    status: 'DRAFT',
    cover_image:
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
    read_time: '8 min read',
    methodology: 'Trade Finance',
    formatted_date: 'May 14, 2025',
    date_subtitle: 'Updated 2d ago',
    reads_count: 0,
    engagement_subtitle: 'Pending Underwriter Sign-off',
    excerpt: 'Mitigating foreign exchange and default risks through verified export LC discounting.',
    content: 'Post-shipment export credit provisions under RBI master directions.',
    tags: ['Export LC', 'Trade Finance', 'Rice Export'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-21',
    title: 'Draft: Green Bond Issuance Feasibility for Regional Iron & Steel Aggregators',
    slug: 'green-bond-issuance-regional-iron-steel',
    category: 'Financial Planning',
    author: 'Rajesh Sharma',
    author_initials: 'RS',
    author_role: 'Lead Underwriter',
    status: 'DRAFT',
    cover_image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    read_time: '10 min read',
    methodology: 'Capital Markets',
    formatted_date: 'May 12, 2025',
    date_subtitle: 'Updated 4d ago',
    reads_count: 0,
    engagement_subtitle: 'Pending Underwriter Sign-off',
    excerpt: 'Exploring secondary market institutional paper for decarbonization investments.',
    content: 'Initial structuring advisory on green corporate bonds and ESG verification.',
    tags: ['Green Bonds', 'ESG', 'Capital Markets'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-22',
    title: 'Scheduled: FY25-26 Budget Impact on Central India Infra Borrowing Spreads',
    slug: 'fy25-26-budget-impact-central-india-infra-borrowing',
    category: 'Financial Planning',
    author: 'Editorial Desk',
    author_initials: 'ED',
    author_role: 'Institutional Research',
    status: 'SCHEDULED',
    cover_image:
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    read_time: '9 min read',
    methodology: 'Fiscal Policy',
    formatted_date: 'June 15, 2025',
    date_subtitle: 'Slated 10:00 AM IST',
    reads_count: 0,
    engagement_subtitle: 'Pre-launch checklist ready',
    excerpt: 'Analyzing state fiscal budget allocations for highways, power, and industrial parks.',
    content: 'How sovereign and state infra expenditures influence regional bank lending rates.',
    tags: ['Budget', 'Fiscal Policy', 'Infrastructure'],
    region: 'Chhattisgarh Corridor',
    scheduled_at: '2025-06-15T10:00:00Z'
  },
  {
    id: 'art-23',
    title: 'Archived: ECLGS 3.0 Special Relief Credit Scheme Documentation Dossier',
    slug: 'eclgs-3-0-special-relief-credit-scheme-dossier',
    category: 'Business Finance',
    author: 'Amit Sahu',
    author_initials: 'AS',
    author_role: 'Regional Credit Mgr',
    status: 'ARCHIVED',
    cover_image:
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    read_time: '7 min read',
    methodology: 'Statutory Archive',
    formatted_date: 'Oct 12, 2023',
    date_subtitle: 'Archived post-expiry',
    reads_count: 1400,
    engagement_subtitle: 'Historical regulatory audit only',
    excerpt: 'Historic COVID-19 emergency credit line guarantee scheme operational framework.',
    content: 'Archived for reference and historical compliance verification.',
    tags: ['ECLGS', 'Archived', 'COVID Relief'],
    region: 'Chhattisgarh Corridor'
  },
  {
    id: 'art-24',
    title: 'Archived: Pre-GST Industrial Entry Tax Dispute Resolution Financing',
    slug: 'pre-gst-industrial-entry-tax-dispute-resolution',
    category: 'Industrial Capex',
    author: 'Rajesh Sharma',
    author_initials: 'RS',
    author_role: 'Lead Underwriter',
    status: 'ARCHIVED',
    cover_image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    read_time: '8 min read',
    methodology: 'Litigation Capital',
    formatted_date: 'Aug 14, 2023',
    date_subtitle: 'Archived post-settlement',
    reads_count: 950,
    engagement_subtitle: 'Historical case law reference',
    excerpt: 'Bridge loan structures during state entry tax tribunal proceedings.',
    content: 'Historical dossier preserved for enterprise corporate dispute reference.',
    tags: ['Entry Tax', 'Tax Litigation', 'Bridge Debt'],
    region: 'Chhattisgarh Corridor'
  }
];

const CATEGORIES = [
  'Business Finance',
  'Property & LAP',
  'Industrial Capex',
  'Working Capital & CC',
  'Financial Planning'
];

export const AdminBlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<ExtendedBlogPost[]>(SEED_ARTICLES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [authorFilter, setAuthorFilter] = useState<string>('all');
  const [regionFilterActive, setRegionFilterActive] = useState<boolean>(true);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Action Menu Dropdown State
  const [menuOpenArticleId, setMenuOpenArticleId] = useState<string | null>(null);
  const [menuCoords, setMenuCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // Modals
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [articleToDelete, setArticleToDelete] = useState<ExtendedBlogPost | null>(null);

  const [isEditorModalOpen, setIsEditorModalOpen] = useState<boolean>(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState<boolean>(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState<boolean>(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [previewArticle, setPreviewArticle] = useState<ExtendedBlogPost | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState<string>('');
  const [formSlug, setFormSlug] = useState<string>('');
  const [formCategory, setFormCategory] = useState<string>('Business Finance');
  const [formAuthor, setFormAuthor] = useState<string>('Rajesh Sharma');
  const [formStatus, setFormStatus] = useState<'PUBLISHED' | 'DRAFT' | 'SCHEDULED' | 'ARCHIVED'>('PUBLISHED');
  const [formReadTime, setFormReadTime] = useState<string>('8 min read');
  const [formMethodology, setFormMethodology] = useState<string>('CMA Methodology');
  const [formCoverImage, setFormCoverImage] = useState<string>('');
  const [formExcerpt, setFormExcerpt] = useState<string>('');
  const [formContent, setFormContent] = useState<string>('');
  const [formTags, setFormTags] = useState<string>('Working Capital, Debt Advisory');

  // Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Close context dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.action-menu-trigger') && !(e.target as HTMLElement).closest('.action-dropdown-menu')) {
        setMenuOpenArticleId(null);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  // Sync with backend if available
  useEffect(() => {
    const fetchAdminPosts = async () => {
      try {
        const res = await blogApi.getAdmin();
        if (res.success && res.data && res.data.length > 0) {
          // Merge remote with seeds
          const remoteMapped: ExtendedBlogPost[] = res.data.map((item, idx) => ({
            id: String(item.id || `remote-${idx}`),
            title: item.title,
            slug: item.slug,
            category: item.category || 'Business Finance',
            author: item.author || 'Rajesh Sharma',
            author_initials: (item.author || 'RS').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
            author_role: 'Lead Underwriter',
            status: (item.status as any) || 'PUBLISHED',
            cover_image:
              item.cover_image ||
              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
            read_time: item.read_time || '8 min read',
            methodology: item.methodology || 'Institutional Credit',
            formatted_date: item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent',
            date_subtitle: 'Synced from Database',
            reads_count: item.reads_count || 1200,
            engagement_subtitle: `${item.shares_count || 24} shares • ${item.leads_count || 8} leads`,
            excerpt: item.excerpt || item.content.slice(0, 120),
            content: item.content,
            tags: item.tags || []
          }));
          setArticles(remoteMapped);
        }
      } catch {
        // Fallback gracefully to SEED_ARTICLES
      }
    };
    fetchAdminPosts();
  }, []);

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.author.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q) ||
        art.methodology.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.tags?.some((t) => t.toLowerCase().includes(q));

      const matchCat =
        categoryFilter === 'all' ||
        (categoryFilter === 'business' && art.category === 'Business Finance') ||
        (categoryFilter === 'property' && art.category === 'Property & LAP') ||
        (categoryFilter === 'capex' && art.category === 'Industrial Capex') ||
        (categoryFilter === 'cc' && art.category === 'Working Capital & CC') ||
        (categoryFilter === 'planning' && art.category === 'Financial Planning') ||
        art.category.toLowerCase() === categoryFilter.toLowerCase();

      const matchStat =
        statusFilter === 'all' ||
        (statusFilter === 'published' && art.status === 'PUBLISHED') ||
        (statusFilter === 'draft' && art.status === 'DRAFT') ||
        (statusFilter === 'scheduled' && art.status === 'SCHEDULED') ||
        (statusFilter === 'archived' && art.status === 'ARCHIVED');

      const matchAuth =
        authorFilter === 'all' ||
        (authorFilter === 'rajesh' && art.author.includes('Rajesh')) ||
        (authorFilter === 'amit' && art.author.includes('Amit')) ||
        (authorFilter === 'desk' && art.author.includes('Editorial Desk')) ||
        art.author.toLowerCase().includes(authorFilter.toLowerCase());

      const matchRegion = !regionFilterActive || !art.region || art.region === 'Chhattisgarh Corridor';

      return matchSearch && matchCat && matchStat && matchAuth && matchRegion;
    });
  }, [articles, searchQuery, categoryFilter, statusFilter, authorFilter, regionFilterActive]);

  // Pagination Slice
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(start, start + itemsPerPage);
  }, [filteredArticles, currentPage, itemsPerPage]);

  // Master Checkbox
  const handleSelectAllOnPage = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedArticles.map((a) => a.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelectOne = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  // Open Actions Context Menu
  const handleToggleMenu = (e: React.MouseEvent, art: ExtendedBlogPost) => {
    e.stopPropagation();
    if (menuOpenArticleId === art.id) {
      setMenuOpenArticleId(null);
      return;
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMenuCoords({
      top: rect.bottom + window.scrollY + 4,
      left: Math.max(10, rect.right + window.scrollX - 192)
    });
    setMenuOpenArticleId(art.id);
  };

  // Actions from Dropdown
  const handleDuplicate = (art: ExtendedBlogPost) => {
    const duplicated: ExtendedBlogPost = {
      ...art,
      id: `art-${Date.now()}`,
      title: `${art.title} (Copy)`,
      slug: `${art.slug}-copy`,
      status: 'DRAFT',
      reads_count: 0,
      engagement_subtitle: 'Internal review only',
      formatted_date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      date_subtitle: 'Duplicated draft'
    };
    setArticles((prev) => [duplicated, ...prev]);
    setMenuOpenArticleId(null);
    showToast('Article duplicated as Draft');
  };

  const handleUnpublish = (art: ExtendedBlogPost) => {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === art.id
          ? { ...a, status: 'DRAFT', engagement_subtitle: 'Internal review only', date_subtitle: 'Moved to Draft' }
          : a
      )
    );
    setMenuOpenArticleId(null);
    showToast(`Unpublished "${art.title.slice(0, 30)}..."`);
  };

  const handleArchive = (art: ExtendedBlogPost) => {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === art.id
          ? { ...a, status: 'ARCHIVED', engagement_subtitle: 'Archived asset', date_subtitle: 'Archived' }
          : a
      )
    );
    setMenuOpenArticleId(null);
    showToast('Article moved to Archive');
  };

  // Delete flow
  const handleInitiateDelete = (art: ExtendedBlogPost) => {
    setArticleToDelete(art);
    setIsDeleteModalOpen(true);
    setMenuOpenArticleId(null);
  };

  const handleConfirmDelete = async () => {
    if (!articleToDelete) return;
    try {
      await blogApi.delete(articleToDelete.id);
    } catch {
      // Local fallback
    }
    setArticles((prev) => prev.filter((a) => a.id !== articleToDelete.id));
    setSelectedIds((prev) => prev.filter((id) => id !== articleToDelete.id));
    setIsDeleteModalOpen(false);
    setArticleToDelete(null);
    showToast('Article permanently deleted from repository');
  };

  // Create / Edit article navigation
  const handleOpenCreateModal = () => {
    navigate('/admin/blog/new');
  };

  const handleOpenEditModal = (art: ExtendedBlogPost) => {
    navigate(`/admin/blog/${art.id}/edit`);
  };

  // Save Article
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Please provide an article title');
      return;
    }

    const calculatedSlug =
      formSlug.trim() ||
      formTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const authorInitials = formAuthor
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const authorRole = formAuthor.includes('Amit')
      ? 'Regional Credit Mgr'
      : formAuthor.includes('Desk')
      ? 'Institutional Research'
      : 'Lead Underwriter';

    const tagsArray = formTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editorMode === 'create') {
      const newId = `art-${Date.now()}`;
      const newArticle: ExtendedBlogPost = {
        id: newId,
        title: formTitle.trim(),
        slug: calculatedSlug,
        category: formCategory,
        author: formAuthor,
        author_initials: authorInitials,
        author_role: authorRole,
        status: formStatus,
        cover_image: formCoverImage,
        read_time: formReadTime,
        methodology: formMethodology,
        formatted_date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        date_subtitle: formStatus === 'PUBLISHED' ? 'Live today' : formStatus === 'SCHEDULED' ? 'Slated 09:00 AM IST' : 'Draft note',
        reads_count: 0,
        engagement_subtitle: formStatus === 'PUBLISHED' ? '0 shares • 0 leads' : 'Internal review only',
        excerpt: formExcerpt || formContent.slice(0, 140),
        content: formContent,
        tags: tagsArray,
        region: 'Chhattisgarh Corridor'
      };

      try {
        await blogApi.create({
          title: newArticle.title,
          slug: newArticle.slug,
          excerpt: newArticle.excerpt,
          content: newArticle.content,
          cover_image: newArticle.cover_image,
          author: newArticle.author,
          category: newArticle.category,
          tags: newArticle.tags,
          status: newArticle.status
        });
      } catch {
        // Local fallback
      }

      setArticles((prev) => [newArticle, ...prev]);
      setIsEditorModalOpen(false);
      showToast(formStatus === 'PUBLISHED' ? 'Article published to /blog!' : 'Article saved as Draft');
    } else {
      // Edit existing
      try {
        if (activeArticleId) {
          await blogApi.update(activeArticleId, {
            title: formTitle.trim(),
            slug: calculatedSlug,
            excerpt: formExcerpt,
            content: formContent,
            cover_image: formCoverImage,
            author: formAuthor,
            category: formCategory,
            tags: tagsArray,
            status: formStatus
          });
        }
      } catch {
        // Local fallback
      }

      setArticles((prev) =>
        prev.map((a) =>
          a.id === activeArticleId
            ? {
                ...a,
                title: formTitle.trim(),
                slug: calculatedSlug,
                category: formCategory,
                author: formAuthor,
                author_initials: authorInitials,
                author_role: authorRole,
                status: formStatus,
                cover_image: formCoverImage,
                read_time: formReadTime,
                methodology: formMethodology,
                excerpt: formExcerpt,
                content: formContent,
                tags: tagsArray,
                date_subtitle: 'Updated just now'
              }
            : a
        )
      );
      setIsEditorModalOpen(false);
      showToast('Article updated successfully');
    }
  };

  // Preview on Web
  const handleOpenPreview = (art: ExtendedBlogPost) => {
    setPreviewArticle(art);
    setIsPreviewModalOpen(true);
  };

  // Batch CSV Export
  const handleExportCSV = () => {
    const listToExport = selectedIds.length > 0 ? articles.filter((a) => selectedIds.includes(a.id)) : articles;
    const headers = ['ID', 'Title', 'Slug', 'Category', 'Author', 'Status', 'Date', 'Read Time', 'Reads', 'Methodology'];
    const rows = listToExport.map((a) => [
      a.id,
      `"${a.title.replace(/"/g, '""')}"`,
      a.slug,
      `"${a.category.replace(/"/g, '""')}"`,
      `"${a.author.replace(/"/g, '""')}"`,
      a.status,
      a.formatted_date,
      a.read_time,
      a.reads_count,
      `"${a.methodology.replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'earth_finance_blog_articles.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${listToExport.length} articles to CSV`);
  };

  // Bulk Publish Selected
  const handleBulkPublish = () => {
    if (selectedIds.length === 0) {
      alert('Please select one or more articles first');
      return;
    }
    setArticles((prev) =>
      prev.map((a) =>
        selectedIds.includes(a.id)
          ? { ...a, status: 'PUBLISHED', date_subtitle: 'Published via batch action' }
          : a
      )
    );
    showToast(`Published ${selectedIds.length} articles to live website!`);
    setSelectedIds([]);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setStatusFilter('all');
    setAuthorFilter('all');
    setRegionFilterActive(false);
    setCurrentPage(1);
    showToast('Filters cleared');
  };

  // Metrics
  const totalCatalog = articles.length;
  const liveCount = articles.filter((a) => a.status === 'PUBLISHED').length;
  const inReviewCount = articles.filter((a) => a.status === 'DRAFT').length;
  const scheduledCount = articles.filter((a) => a.status === 'SCHEDULED').length;
  const totalReadsSum = articles.reduce((acc, curr) => acc + (curr.reads_count || 0), 0);
  const formattedReach = totalReadsSum > 0 ? `${totalReadsSum.toLocaleString()}+` : '42,850+';

  return (
    <div className="flex flex-col w-full space-y-6 text-[#141b2c] max-w-[1600px] mx-auto">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#071b3a] text-white shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4">
          <span className="material-symbols-outlined text-[20px] text-[#efc13e]">check_circle</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Global Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-[#75777f] font-semibold">
            <span className="font-bold text-[#071b3a]">Earth Finance Admin</span>
            <span className="material-symbols-outlined text-[16px] text-[#75777f]">chevron_right</span>
            <span>Content Hub</span>
            <span className="material-symbols-outlined text-[16px] text-[#75777f]">chevron_right</span>
            <span className="text-[#141b2c] font-semibold">Blog &amp; Market Insights</span>
          </div>
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071b3a] tracking-tight">
              Financial Insights &amp; Blog
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#8cf6a3]/30 text-[#007235] text-[11px] font-bold uppercase tracking-wider">
              CMS v2.4 Live
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#75777f] max-w-3xl leading-relaxed">
            Create, schedule, and curate institutional debt articles, CMA guidelines, and lending advisory content for Central India's commercial corridors.
          </p>
        </div>

        {/* Global Action Launchers */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          {/* Editorial Calendar */}
          <button
            type="button"
            onClick={() => setIsCalendarModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[#071b3a] text-xs font-bold shadow-sm hover:bg-slate-50 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span>Editorial Calendar</span>
          </button>

          {/* Manage Categories */}
          <button
            type="button"
            onClick={() => setIsCategoriesModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[#071b3a] text-xs font-bold shadow-sm hover:bg-slate-50 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">folder_special</span>
            <span>Manage Categories</span>
          </button>

          {/* + Create Article Primary CTA */}
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#efc13e] text-[#241a00] text-xs font-extrabold shadow-md hover:bg-[#ffdf94] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              edit_square
            </span>
            <span>+ Create Article</span>
          </button>
        </div>
      </div>

      {/* 5 Summary Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* KPI 1: Total Catalog */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold">Total Catalog</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-[#071b3a] material-symbols-outlined text-[20px]">
              library_books
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#071b3a] tracking-tight">{totalCatalog}</div>
            <p className="text-xs text-[#75777f] mt-1">Published &amp; Draft assets</p>
          </div>
        </div>

        {/* KPI 2: Live on /blog */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold">Live on /blog</span>
            <span className="p-1.5 rounded-lg bg-[#8cf6a3]/30 text-[#006d33] material-symbols-outlined text-[20px]">
              check_circle
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#006d33] tracking-tight">{liveCount}</div>
            <p className="text-xs text-[#75777f] mt-1">Public &amp; SEO indexed</p>
          </div>
        </div>

        {/* KPI 3: In Review */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold">In Review</span>
            <span className="p-1.5 rounded-lg bg-[#ffdf94]/50 text-[#241a00] material-symbols-outlined text-[20px]">
              rate_review
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#a47f00] tracking-tight">
              {inReviewCount < 10 ? `0${inReviewCount}` : inReviewCount}
            </div>
            <p className="text-xs text-[#75777f] mt-1">Pending Underwriter Sign-off</p>
          </div>
        </div>

        {/* KPI 4: Scheduled */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold">Scheduled</span>
            <span className="p-1.5 rounded-lg bg-slate-100 text-[#071b3a] material-symbols-outlined text-[20px]">
              schedule
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#071b3a] tracking-tight">
              {scheduledCount < 10 ? `0${scheduledCount}` : scheduledCount}
            </div>
            <p className="text-xs text-[#75777f] mt-1">Slated for Q2 FY25 cycle</p>
          </div>
        </div>

        {/* KPI 5: Cumulative Reach */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-[#75777f] font-bold">Cumulative Reach</span>
            <span className="p-1.5 rounded-lg bg-[#8cf6a3]/30 text-[#007235] material-symbols-outlined text-[20px]">
              trending_up
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#071b3a] tracking-tight">{formattedReach}</div>
            <p className="text-xs text-[#006d33] font-semibold mt-1">Verified Central India Reads</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar Card */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5">
          {/* Search Input */}
          <div className="lg:col-span-4 relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#75777f]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search articles by title, author, or keyword..."
              className="w-full h-11 pl-9 pr-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#141b2c] placeholder-[#75777f] focus:outline-none focus:bg-white focus:border-[#071b3a] transition-all shadow-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="lg:col-span-2">
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-11 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a] transition-all shadow-sm cursor-pointer"
            >
              <option value="all">All Categories (6)</option>
              <option value="business">Business Finance</option>
              <option value="property">Property &amp; LAP</option>
              <option value="capex">Industrial Capex</option>
              <option value="cc">Working Capital &amp; CC</option>
              <option value="planning">Financial Planning</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="lg:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-11 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a] transition-all shadow-sm cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft / Review</option>
              <option value="scheduled">Scheduled</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Author Filter */}
          <div className="lg:col-span-2">
            <select
              value={authorFilter}
              onChange={(e) => {
                setAuthorFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-11 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a] transition-all shadow-sm cursor-pointer"
            >
              <option value="all">All Authors</option>
              <option value="rajesh">Rajesh Sharma</option>
              <option value="amit">Amit Sahu</option>
              <option value="desk">Editorial Desk</option>
            </select>
          </div>

          {/* Date Range Selector */}
          <div className="lg:col-span-2 flex items-center">
            <div className="w-full h-11 px-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-[#141b2c] cursor-pointer hover:bg-slate-100 transition-colors">
              <span className="flex items-center gap-1.5 truncate">
                <span className="material-symbols-outlined text-[16px] text-[#75777f]">date_range</span>
                <span className="font-semibold">FY24 - FY25</span>
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#75777f]">expand_more</span>
            </div>
          </div>
        </div>

        {/* Active Filters Bar */}
        <div className="flex items-center justify-between pt-1 text-[#75777f] text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span>Active Filters:</span>
            {regionFilterActive && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[#141b2c] text-[11px] font-semibold">
                Region: Chhattisgarh Corridor
                <span
                  onClick={() => setRegionFilterActive(false)}
                  className="material-symbols-outlined text-[14px] cursor-pointer hover:text-rose-600"
                >
                  close
                </span>
              </span>
            )}
            {(searchQuery || categoryFilter !== 'all' || statusFilter !== 'all' || authorFilter !== 'all' || regionFilterActive) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[#071b3a] font-bold hover:underline text-xs ml-1"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="text-xs">
            Showing <span className="font-bold text-[#141b2c]">{filteredArticles.length}</span> of{' '}
            <span className="font-bold text-[#141b2c]">{articles.length}</span> articles
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
        {filteredArticles.length === 0 ? (
          /* Zero-state Preview */
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-[#071b3a]">
              <span className="material-symbols-outlined text-[32px]">manage_search</span>
            </div>
            <div className="space-y-1 max-w-md">
              <h3 className="text-lg font-bold text-[#071b3a]">No articles found matching filters</h3>
              <p className="text-xs text-[#75777f]">
                No advisory or market insight items matched your search criteria. Try modifying your filters or write a fresh editorial note.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#efc13e] text-[#241a00] text-xs font-bold shadow-sm hover:bg-[#ffdf94] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                add_circle
              </span>
              <span>Create New Article</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-[#75777f] text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={
                        paginatedArticles.length > 0 && paginatedArticles.every((a) => selectedIds.includes(a.id))
                      }
                      onChange={(e) => handleSelectAllOnPage(e.target.checked)}
                      className="rounded border-slate-300 text-[#071b3a] focus:ring-0 cursor-pointer"
                    />
                  </th>
                  <th className="py-3.5 px-4">Article Details</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Editorial Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Engagement</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-[#141b2c]">
                {paginatedArticles.map((art) => {
                  const isChecked = selectedIds.includes(art.id);

                  return (
                    <tr key={art.id} className="hover:bg-slate-50/70 transition-colors group">
                      {/* Checkbox */}
                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelectOne(art.id)}
                          className="rounded border-slate-300 text-[#071b3a] focus:ring-0 cursor-pointer"
                        />
                      </td>

                      {/* Article Details */}
                      <td className="py-3.5 px-4 max-w-md">
                        <div className="flex items-center gap-3">
                          <img
                            src={art.cover_image}
                            alt={art.title}
                            className="w-16 h-12 rounded-lg object-cover flex-shrink-0 shadow-sm border border-slate-200"
                          />
                          <div className="flex flex-col min-w-0">
                            <span
                              onClick={() => handleOpenEditModal(art)}
                              className="text-xs sm:text-sm text-[#071b3a] font-bold group-hover:text-blue-900 transition-colors line-clamp-1 cursor-pointer"
                              title={art.title}
                            >
                              {art.title}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#75777f]">
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[13px]">timer</span>
                                {art.read_time}
                              </span>
                              <span>•</span>
                              <span className="text-[#006d33] font-semibold">{art.methodology}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#071b3a] border border-blue-100 text-[11px] font-semibold">
                          {art.category}
                        </span>
                      </td>

                      {/* Author */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                              art.author_initials === 'RS'
                                ? 'bg-[#071b3a] text-white'
                                : art.author_initials === 'AS'
                                ? 'bg-slate-200 text-[#071b3a]'
                                : 'bg-[#efc13e] text-[#241a00]'
                            }`}
                          >
                            {art.author_initials}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-[#141b2c]">{art.author}</span>
                            <span className="text-[10px] text-[#75777f]">{art.author_role}</span>
                          </div>
                        </div>
                      </td>

                      {/* Editorial Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {art.status === 'PUBLISHED' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#8cf6a3]/30 text-[#006d33] border border-[#006d33]/20 text-[11px] font-bold">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                            Published
                          </span>
                        ) : art.status === 'SCHEDULED' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-[#071b3a] border border-slate-200 text-[11px] font-bold">
                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                            Scheduled
                          </span>
                        ) : art.status === 'DRAFT' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ffdf94]/40 text-[#241a00] border border-[#efc13e]/40 text-[11px] font-bold">
                            <span className="material-symbols-outlined text-[14px]">edit_note</span>
                            Draft Review
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-bold">
                            <span className="material-symbols-outlined text-[14px]">archive</span>
                            Archived
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-[#141b2c]">{art.formatted_date}</span>
                          <span className="text-[10px] text-[#75777f]">{art.date_subtitle}</span>
                        </div>
                      </td>

                      {/* Engagement */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[#071b3a]">
                            {art.reads_count > 0 ? `${(art.reads_count / 1000).toFixed(1)}k reads` : '—'}
                          </span>
                          <span className="text-[10px] text-[#75777f]">{art.engagement_subtitle}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(art)}
                            title="Edit Article"
                            className="p-1.5 rounded-lg text-[#75777f] hover:text-[#071b3a] hover:bg-slate-100 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenPreview(art)}
                            title="Preview on Web"
                            className="p-1.5 rounded-lg text-[#75777f] hover:text-[#071b3a] hover:bg-slate-100 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                          </button>
                          <div className="relative inline-block text-left">
                            <button
                              type="button"
                              onClick={(e) => handleToggleMenu(e, art)}
                              title="More Options"
                              className="action-menu-trigger p-1.5 rounded-lg text-[#75777f] hover:text-[#071b3a] hover:bg-slate-100 transition-colors"
                            >
                              <span className="material-symbols-outlined text-[18px]">more_vert</span>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination & Rows Per Page Footer */}
        {filteredArticles.length > 0 && (
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#75777f]">
            <div className="flex items-center gap-3">
              <span>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredArticles.length)} of {filteredArticles.length} articles
              </span>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <span>Show</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="h-7 px-2 rounded border border-slate-200 bg-white text-[#141b2c] text-xs focus:outline-none"
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                </select>
                <span>per page</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pg) => (
                <button
                  key={pg}
                  type="button"
                  onClick={() => setCurrentPage(pg)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
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
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Batch Editorial Operations Bottom Ribbon */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#006d33] text-[24px]">verified</span>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-[#071b3a]">Batch Editorial Operations</span>
            <span className="text-xs text-[#75777f]">
              Select articles from the list above to execute bulk deployment or data extraction.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 text-[#071b3a] text-xs font-bold hover:bg-slate-200 transition-colors border border-slate-200"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>Export Articles (CSV)</span>
          </button>
          <button
            type="button"
            onClick={handleBulkPublish}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#071b3a] text-white text-xs font-bold hover:bg-blue-900 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">publish</span>
            <span>Bulk Publish Selected</span>
          </button>
        </div>
      </div>

      {/* Floating Action Menu Dropdown */}
      {menuOpenArticleId && (
        <div
          style={{ top: `${menuCoords.top}px`, left: `${menuCoords.left}px` }}
          className="action-dropdown-menu fixed bg-white rounded-xl shadow-xl py-1 z-50 w-48 text-[#141b2c] text-xs border border-slate-200 animate-in fade-in"
        >
          {(() => {
            const currentItem = articles.find((a) => a.id === menuOpenArticleId);
            if (!currentItem) return null;

            return (
              <>
                <button
                  type="button"
                  onClick={() => handleDuplicate(currentItem)}
                  className="w-full text-left px-4 py-2 hover:bg-slate-100 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#75777f]">content_copy</span>
                  <span>Duplicate</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleUnpublish(currentItem)}
                  className="w-full text-left px-4 py-2 hover:bg-slate-100 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#75777f]">unpublished</span>
                  <span>Unpublish</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleArchive(currentItem)}
                  className="w-full text-left px-4 py-2 hover:bg-slate-100 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#75777f]">archive</span>
                  <span>Archive</span>
                </button>
                <div className="h-px bg-slate-200 my-1"></div>
                <button
                  type="button"
                  onClick={() => handleInitiateDelete(currentItem)}
                  className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2 font-semibold"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                  <span>Delete Article</span>
                </button>
              </>
            );
          })()}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && articleToDelete && (
        <div className="fixed inset-0 bg-[#071b3a]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 border border-rose-200">
                <span className="material-symbols-outlined text-[22px]">warning</span>
              </div>
              <div className="flex flex-col">
                <h4 className="text-base font-bold text-[#141b2c]">Confirm Article Deletion</h4>
                <span className="text-[11px] text-[#75777f]">Action cannot be rolled back</span>
              </div>
            </div>
            <p className="text-xs text-[#75777f] leading-relaxed">
              Are you sure you want to permanently remove <strong className="text-[#071b3a]">"{articleToDelete.title}"</strong> from the repository? Associated analytics and canonical SEO references will be permanently severed.
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setArticleToDelete(null);
                }}
                className="px-4 py-2 rounded-lg bg-slate-100 text-[#141b2c] text-xs font-semibold hover:bg-slate-200 transition-colors border border-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors shadow-sm"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Article Modal */}
      {isEditorModalOpen && (
        <div className="fixed inset-0 bg-[#071b3a]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 space-y-5 my-8 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-[#071b3a]">
                  {editorMode === 'create' ? 'Create Institutional Article' : 'Edit Article Specification'}
                </h3>
                <span className="text-xs text-[#75777f]">
                  Publish comprehensive financial guidance and regional market advisories
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsEditorModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              {/* Title & Slug */}
              <div className="space-y-1">
                <label className="font-bold text-[#141b2c]">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. How Raipur Enterprises Can Optimize Cash Credit (CC) Limits..."
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#141b2c]">URL Slug</label>
                  <input
                    type="text"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="auto-generated-from-title"
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#141b2c]">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a] cursor-pointer"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Author & Editorial Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#141b2c]">Author</label>
                  <select
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a] cursor-pointer"
                  >
                    <option value="Rajesh Sharma">Rajesh Sharma (Lead Underwriter)</option>
                    <option value="Amit Sahu">Amit Sahu (Regional Credit Mgr)</option>
                    <option value="Editorial Desk">Editorial Desk (Institutional Research)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#141b2c]">Editorial Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a] cursor-pointer"
                  >
                    <option value="PUBLISHED">Published (Live on website)</option>
                    <option value="DRAFT">Draft / Review</option>
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#141b2c]">Read Time</label>
                  <input
                    type="text"
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(e.target.value)}
                    placeholder="e.g. 8 min read"
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a]"
                  />
                </div>
              </div>

              {/* Methodology & Cover Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#141b2c]">Topic / Methodology Tag</label>
                  <input
                    type="text"
                    value={formMethodology}
                    onChange={(e) => setFormMethodology(e.target.value)}
                    placeholder="e.g. CMA Methodology, Subsidies & Term Loans"
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#141b2c]">Cover Image URL</label>
                  <input
                    type="text"
                    value={formCoverImage}
                    onChange={(e) => setFormCoverImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a]"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-1">
                <label className="font-bold text-[#141b2c]">Excerpt / Lead Paragraph</label>
                <textarea
                  rows={2}
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="Summary paragraph displayed in catalogs and Google preview cards..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a]"
                ></textarea>
              </div>

              {/* Content Body */}
              <div className="space-y-1">
                <label className="font-bold text-[#141b2c]">Article Markdown Content *</label>
                <textarea
                  rows={6}
                  required
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Write the full financial advisory text, subheadings (###), bullet points, and calculations..."
                  className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a] font-mono leading-relaxed"
                ></textarea>
              </div>

              {/* Tags */}
              <div className="space-y-1">
                <label className="font-bold text-[#141b2c]">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="e.g. Working Capital, CMA Data, Raipur"
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-xs text-[#141b2c] focus:outline-none focus:bg-white focus:border-[#071b3a]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditorModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-[#141b2c] text-xs font-semibold hover:bg-slate-200 transition-colors border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#efc13e] text-[#241a00] text-xs font-extrabold hover:bg-[#ffdf94] active:scale-95 transition-all shadow-sm"
                >
                  {editorMode === 'create' ? 'Save & Deploy Article' : 'Save Modifications'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Editorial Calendar Modal */}
      {isCalendarModalOpen && (
        <div className="fixed inset-0 bg-[#071b3a]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px] text-[#071b3a]">calendar_month</span>
                <h3 className="text-base font-bold text-[#071b3a]">Editorial Publishing Schedule</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCalendarModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-[#75777f]">
              Chronological pipeline of upcoming and recently released institutional reports slated for Central India commercial sectors.
            </p>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {articles
                .filter((a) => a.status === 'SCHEDULED' || a.status === 'PUBLISHED')
                .slice(0, 5)
                .map((art) => (
                  <div key={art.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#071b3a] text-white flex flex-col items-center justify-center font-bold text-[10px] leading-tight">
                        <span>{art.formatted_date.split(' ')[0]}</span>
                        <span className="text-xs text-[#efc13e]">{art.formatted_date.split(' ')[1]?.replace(',', '')}</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-[#071b3a] truncate max-w-sm">{art.title}</span>
                        <span className="text-[11px] text-[#75777f]">{art.category} • By {art.author}</span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        art.status === 'PUBLISHED'
                          ? 'bg-[#8cf6a3]/30 text-[#006d33]'
                          : 'bg-slate-200 text-[#071b3a]'
                      }`}
                    >
                      {art.status}
                    </span>
                  </div>
                ))}
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsCalendarModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#071b3a] text-white text-xs font-bold hover:bg-blue-900 transition-colors"
              >
                Close Calendar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Categories Modal */}
      {isCategoriesModalOpen && (
        <div className="fixed inset-0 bg-[#071b3a]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px] text-[#071b3a]">folder_special</span>
                <h3 className="text-base font-bold text-[#071b3a]">Manage Article Categories</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCategoriesModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-2">
              {CATEGORIES.map((cat) => {
                const count = articles.filter((a) => a.category === cat).length;
                return (
                  <div key={cat} className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#071b3a]">{cat}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-600">
                      {count} articles
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsCategoriesModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#071b3a] text-white text-xs font-bold hover:bg-blue-900 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article Web Preview Modal */}
      {isPreviewModalOpen && previewArticle && (
        <div className="fixed inset-0 bg-[#071b3a]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 space-y-5 my-8 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#071b3a]">open_in_new</span>
                <span className="text-xs font-bold text-[#75777f]">
                  Public Article Preview (https://earthfinance.in/blog/{previewArticle.slug})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#071b3a] border border-blue-100 text-xs font-bold uppercase tracking-wider">
                {previewArticle.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#071b3a] leading-tight">
                {previewArticle.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-[#75777f] pb-3 border-b border-slate-100">
                <span>By {previewArticle.author} ({previewArticle.author_role})</span>
                <span>•</span>
                <span>{previewArticle.formatted_date}</span>
                <span>•</span>
                <span>{previewArticle.read_time}</span>
              </div>

              <img
                src={previewArticle.cover_image}
                alt={previewArticle.title}
                className="w-full h-64 object-cover rounded-xl border border-slate-200"
              />

              <p className="text-sm font-semibold text-slate-700 leading-relaxed italic border-l-4 border-[#efc13e] pl-3 py-1">
                {previewArticle.excerpt}
              </p>

              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line space-y-2">
                {previewArticle.content}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <span className="text-[11px] text-[#75777f]">
                Earth Finance Commercial Credit Research &amp; Advisory Desk
              </span>
              <button
                type="button"
                onClick={() => setIsPreviewModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#071b3a] text-white text-xs font-bold hover:bg-blue-900 transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogPage;
