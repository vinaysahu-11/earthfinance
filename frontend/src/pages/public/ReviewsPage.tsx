import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reviewApi } from '../../services/reviewApi';
import { Review } from '../../types';

interface CuratedTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  category: 'business' | 'industrial' | 'property' | 'healthcare';
  categoryLabel: string;
  categoryBadgeClass: string;
  amount: string;
  quote: string;
  rating: number;
}

const CURATED_TESTIMONIALS: CuratedTestimonial[] = [
  {
    id: 'c1',
    name: 'Mahesh Singhania',
    role: 'Director',
    company: 'Singhania Steels',
    location: 'Raipur',
    category: 'industrial',
    categoryLabel: 'Industrial Capex',
    categoryBadgeClass: 'bg-brandLightBlue text-brandRoyalBlue',
    amount: '₹8.2 Cr Working Capital Limit',
    quote:
      'We needed to automate our rolling mill in Siltara. Earth Finance structured our consortium debt flawlessly, saving our finance department hundreds of man-hours.',
    rating: 5
  },
  {
    id: 'c2',
    name: 'Dr. Anita Dewangan',
    role: 'Managing Trustee',
    company: 'Sanjeevani Care',
    location: 'Bilaspur',
    category: 'healthcare',
    categoryLabel: 'Healthcare',
    categoryBadgeClass: 'bg-brandLightGreen text-brandGreen',
    amount: '₹4.5 Cr Medical Equipment Loan',
    quote:
      'Equipping our super-specialty cardiac wing required precise diagnostic leasing terms. Earth Finance arranged medical equipment financing with zero collateral hindrance.',
    rating: 5
  },
  {
    id: 'c3',
    name: 'Vikas Banchhor',
    role: 'Proprietor',
    company: 'Central Logistics Hub',
    location: 'Durg',
    category: 'property',
    categoryLabel: 'Property & LAP',
    categoryBadgeClass: 'bg-amber-50 text-amber-700',
    amount: '₹6.0 Cr Loan Against Property',
    quote:
      'We consolidated high-interest NBFC loans by unlocking equity against our warehouse asset on Ring Road. The monthly repayment drops were immediate and immense.',
    rating: 5
  },
  {
    id: 'c4',
    name: 'Priya Chandrakar',
    role: 'Partner',
    company: 'Chandrakar Retail Outlets',
    location: 'Bhilai',
    category: 'business',
    categoryLabel: 'Business Credit',
    categoryBadgeClass: 'bg-brandLightBlue text-brandRoyalBlue',
    amount: '₹1.8 Cr Secured CC Line',
    quote:
      'Transparent documentation and zero hidden files. The desk managed multi-party sanction letters in record time ahead of the festive retail peak season.',
    rating: 5
  },
  {
    id: 'c5',
    name: 'Suresh Patel',
    role: 'Founder',
    company: 'Narmada Agro Tech',
    location: 'Rajnandgaon',
    category: 'business',
    categoryLabel: 'Agro Processing',
    categoryBadgeClass: 'bg-brandLightGreen text-brandGreen',
    amount: '₹9.0 Cr Agro Term Facility',
    quote:
      'Setting up modern grain silo processing plants required specialized priority sector documentation. Earth Finance handled both central subsidies and bank approvals.',
    rating: 5
  },
  {
    id: 'c6',
    name: 'Alok Verma',
    role: 'Chief Engineer & Partner',
    company: 'A.V. Infra',
    location: 'Korba',
    category: 'industrial',
    categoryLabel: 'Infra & Construction',
    categoryBadgeClass: 'bg-amber-50 text-amber-700',
    amount: '₹14.0 Cr Project BG/LC Facility',
    quote:
      'Their team comprehends bank guarantees, performance bonds, and mobilization lines like true investment bankers. Highest caliber corporate advisory in Chhattisgarh.',
    rating: 5
  }
];

export const ReviewsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dbReviews, setDbReviews] = useState<Review[]>([]);

  // Form State
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [business, setBusiness] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewContent, setReviewContent] = useState<string>('');

  // Status
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    reviewApi
      .getPublicReviews()
      .then(res => {
        if (res.data && Array.isArray(res.data)) {
          setDbReviews(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    if (reviewContent.trim().length < 10) {
      setSubmitError('Please provide a review of at least 10 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: fullName.trim(),
        rating,
        review: reviewContent.trim(),
        profession: city.trim() ? `Location: ${city.trim()}` : undefined,
        business: business.trim() ? `${business.trim()} (${email.trim()})` : email.trim()
      };

      const res = await reviewApi.submitReview(payload);
      if (res.success || res.data) {
        setSubmitSuccess(true);
        setFullName('');
        setEmail('');
        setBusiness('');
        setCity('');
        setReviewContent('');
        setRating(5);
      } else {
        setSubmitError(res.message || 'Unable to submit review. Please try again.');
      }
    } catch (err: any) {
      setSubmitError(
        err?.response?.data?.message || err?.message || 'Unable to submit review right now. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCurated = CURATED_TESTIMONIALS.filter(t => {
    if (activeCategory === 'all') return true;
    return t.category === activeCategory;
  });

  return (
    <div className="w-full bg-brandBg min-h-screen text-brandNavy font-sans">
      {/* BREADCRUMB AND TRUST RIBBON */}
      <section className="bg-brandLightBlue border-b border-blue-100 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-slate-600 font-medium">
            <Link to="/" className="hover:text-brandRoyalBlue transition-colors">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-brandNavy font-bold">Client Reviews</span>
          </nav>
          <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow-sm border border-blue-100">
            <div className="flex text-amber-400 text-xs">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <span className="font-bold text-brandNavy text-xs">4.9 / 5.0 Rating</span>
            <span className="text-slate-400">|</span>
            <span className="text-brandGreen font-medium text-xs">350+ Verified Client Reviews</span>
          </div>
        </div>
      </section>

      {/* SPLIT HERO SECTION */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Copy & Key Metrics */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brandLightGreen rounded-full text-brandGreen font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-brandGreen" />
              <span>Real Capital. Proven Transformation.</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brandNavy leading-tight tracking-tight">
              Trusted by People and Businesses Across <span className="text-brandRoyalBlue">Central India</span>
            </h1>

            <p className="text-slate-600 text-base leading-relaxed">
              From premier steel plants in Urla and Siltara to high-growth hospital facilities in Bilaspur and retail
              chains in Durg, discover how Earth Finance structures fast, high-volume lending solutions with total
              clarity.
            </p>

            {/* 3 Key Metrics */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-slate-200">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-brandNavy">₹450+ Cr</p>
                <p className="text-xs text-slate-500 font-medium">Syndicated</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-brandGreen">100%</p>
                <p className="text-xs text-slate-500 font-medium">Verified Borrowers</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-brandRoyalBlue">₹0</p>
                <p className="text-xs text-slate-500 font-medium">Upfront Advisory Fee</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="#review-form"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold bg-brandNavy text-white hover:bg-brandRoyalBlue transition shadow-md"
              >
                Submit Your Review
              </a>
              <a
                href="#all-reviews"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold text-brandNavy bg-brandLightBlue border border-blue-200 hover:bg-white transition"
              >
                Explore All 350+ Stories
              </a>
            </div>
          </div>

          {/* Right Hero Image Card with Gold Accent Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Gold Accent Frame Backdrop */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-brandGold via-brandWarmGold to-brandGreen opacity-80 blur-sm" />
              <div className="relative bg-white p-3 rounded-2xl shadow-xl border border-slate-100">
                <img
                  alt="Indian business clients giving testimonials and reviewing financial documents in an upscale modern corporate office in Raipur Chhattisgarh"
                  className="w-full h-[360px] sm:h-[420px] object-cover rounded-xl shadow-inner"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr6GHL8E2W-0EOVI4qOzR8JYr-ZOXCRdSsXtKH-ob5NBiVe0fr-JJbC_Fn_kiIYj2WvrblzY813Xha6kgpHtrCDe7UMkXApjZ634JcJcmKWRbsd2FnOEZCydp-L-aMCflyfVuknpS1H6ba88VMsfa-8-rAEIHu56K1JpwyxUhcIbCDjLjoxzrSdP7AFUnEGgJeFh9yBGVZHvnR4D9NKxQ9kf79ioELMmRG4OBdKsN0otQbj1PaWHm2"
                />
                <div className="mt-3 p-3 bg-brandLightBlue rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-brandNavy">Corporate Review Session</p>
                    <p className="text-[11px] text-slate-500">Commercial Syndication Desk • Raipur HQ</p>
                  </div>
                  <span className="text-xs font-extrabold text-brandGreen bg-white px-2.5 py-1 rounded shadow-sm border border-emerald-100">
                    ISO Certified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TESTIMONIAL SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative overflow-hidden rounded-2xl bg-brandNavy text-white p-8 sm:p-12 shadow-2xl border-t-4 border-brandGold">
          {/* Background Graphic Element */}
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 text-white/5 font-serif text-[180px] select-none pointer-events-none">
            “
          </div>
          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brandGold text-brandNavy">
                Executive Spotlight
              </span>
              <div className="flex text-brandGold text-sm">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            <blockquote className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-slate-100 italic">
              "Earth Finance facilitated our{' '}
              <span className="text-brandGold font-semibold">₹18.5 Cr Capex facility</span> within just 21 working days
              when top public banks were caught in bureaucratic loops. Their Raipur deal team underwrote our heavy
              machinery balance sheet with absolute precision and secured a rate 1.15% below our prior lending quotes."
            </blockquote>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-white/10 gap-4">
              <div>
                <p className="text-base font-bold text-white tracking-wide">Rajesh Agrawal</p>
                <p className="text-xs text-slate-300">Managing Director, Urla Industrial Unit • Raipur, CG</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs uppercase tracking-wider text-slate-400">Sanctioned Amount</span>
                <p className="text-lg font-bold text-brandGold">₹18,50,00,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER & REVIEWS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="all-reviews">
        {/* Section Title & Filter Nav */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brandNavy">
            Real Stories. Measurable Capital Growth.
          </h2>
          <p className="text-slate-600 text-sm">
            Browse verified borrower submissions categorized across sectors in Chhattisgarh and Central India.
          </p>
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
                activeCategory === 'all'
                  ? 'bg-brandNavy text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-brandNavy hover:text-brandNavy'
              }`}
            >
              All Reviews (350+)
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('business')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                activeCategory === 'business'
                  ? 'bg-brandNavy text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-brandNavy hover:text-brandNavy'
              }`}
            >
              Business &amp; Working Capital
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('industrial')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                activeCategory === 'industrial'
                  ? 'bg-brandNavy text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-brandNavy hover:text-brandNavy'
              }`}
            >
              Industrial Capex
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('property')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                activeCategory === 'property'
                  ? 'bg-brandNavy text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-brandNavy hover:text-brandNavy'
              }`}
            >
              Property &amp; LAP
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('healthcare')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                activeCategory === 'healthcare'
                  ? 'bg-brandNavy text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-brandNavy hover:text-brandNavy'
              }`}
            >
              Healthcare
            </button>
          </div>
        </div>

        {/* 6 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCurated.map(t => (
            <article
              key={t.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex text-amber-400 text-sm">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <span key={idx}>★</span>
                    ))}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${t.categoryBadgeClass}`}>
                    {t.categoryLabel}
                  </span>
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed mb-6">"{t.quote}"</p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-brandNavy">{t.name}</h3>
                <p className="text-xs text-slate-500">
                  {t.role}, {t.company} • {t.location}
                </p>
                <p className="text-xs font-semibold text-brandGreen mt-1">{t.amount}</p>
              </div>
            </article>
          ))}

          {/* Additional Dynamic Approved Reviews from Database */}
          {activeCategory === 'all' &&
            dbReviews.map(r => (
              <article
                key={r.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex text-amber-400 text-sm">
                      {Array.from({ length: r.rating || 5 }).map((_, idx) => (
                        <span key={idx}>★</span>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brandLightBlue text-brandRoyalBlue">
                      Verified Client
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed mb-6">"{r.review}"</p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-brandNavy">{r.name}</h3>
                  <p className="text-xs text-slate-500">
                    {r.profession ? `${r.profession} • ` : ''}
                    {r.business || 'Enterprise Partner'}
                  </p>
                  <p className="text-xs font-semibold text-brandGreen mt-1">Verified Borrowing Record</p>
                </div>
              </article>
            ))}
        </div>
      </section>

      {/* SHARE YOUR EXPERIENCE FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="review-form">
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg border border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest text-brandGreen font-extrabold">Client Feedback</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brandNavy mt-1">
              Share Your Earth Finance Experience
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Your insights empower other enterprise owners across Central India to choose the right advisory partner.
            </p>
          </div>

          {submitSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>
                Thank you! Your testimonial has been securely submitted for compliance review and will be visible
                shortly.
              </span>
            </div>
          )}

          {submitError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center gap-2">
              <span className="text-lg">⚠</span>
              <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleReviewSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1" htmlFor="full-name">
                  Full Name *
                </label>
                <input
                  id="full-name"
                  name="full-name"
                  required
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full rounded-lg border-slate-300 text-sm focus:border-brandNavy focus:ring-brandNavy"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1" htmlFor="email">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  required
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="ramesh@company.com"
                  className="w-full rounded-lg border-slate-300 text-sm focus:border-brandNavy focus:ring-brandNavy"
                />
              </div>

              {/* Profession / Business */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1" htmlFor="business">
                  Profession / Enterprise Name *
                </label>
                <input
                  id="business"
                  name="business"
                  required
                  type="text"
                  value={business}
                  onChange={e => setBusiness(e.target.value)}
                  placeholder="e.g. Director, Sunrise Rice Mills"
                  className="w-full rounded-lg border-slate-300 text-sm focus:border-brandNavy focus:ring-brandNavy"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1" htmlFor="city">
                  City / Location *
                </label>
                <input
                  id="city"
                  name="city"
                  required
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="e.g. Raipur, CG"
                  className="w-full rounded-lg border-slate-300 text-sm focus:border-brandNavy focus:ring-brandNavy"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Your Overall Rating *
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-2xl text-amber-400 cursor-pointer">
                  {[1, 2, 3, 4, 5].map(star => {
                    const active = hoverRating !== null ? star <= hoverRating : star <= rating;
                    return (
                      <span
                        key={star}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        onClick={() => setRating(star)}
                        className={`transition-transform hover:scale-110 select-none ${
                          active ? 'text-amber-400' : 'text-slate-200'
                        }`}
                      >
                        ★
                      </span>
                    );
                  })}
                </div>
                <span className="text-xs text-slate-500 font-medium">({rating} Stars Selected)</span>
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1" htmlFor="review-content">
                Your Review &amp; Financing Journey *
              </label>
              <textarea
                id="review-content"
                name="review-content"
                required
                rows={4}
                value={reviewContent}
                onChange={e => setReviewContent(e.target.value)}
                placeholder="Please share details about loan processing speed, advisor support, or loan structure..."
                className="w-full rounded-lg border-slate-300 text-sm focus:border-brandNavy focus:ring-brandNavy"
              />
            </div>

            {/* Submit Button & Compliance Disclaimer */}
            <div className="pt-2 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-brandGold hover:bg-brandWarmGold text-brandNavy font-extrabold text-sm uppercase tracking-wider rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting Testimonial...' : 'Submit Review'}
              </button>
              <p className="text-[11px] text-slate-500 mt-3 sm:mt-0 max-w-sm">
                * Note: All reviews undergo compliance review before publication to preserve institutional
                confidentiality.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="apply">
        <div className="rounded-2xl bg-gradient-to-r from-brandNavy via-brandNavy to-brandRoyalBlue text-white p-8 sm:p-12 shadow-xl border border-white/10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brandGold">Accelerate Commercial Growth</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Ready to Accelerate Your Capital Acquisition?
            </h2>
            <p className="text-sm text-slate-300">
              Connect with senior syndication managers in Raipur. Sanctions structured from ₹50 Lakhs to ₹100+ Crores.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              to="/apply"
              className="px-6 py-3 bg-brandGold hover:bg-brandWarmGold text-brandNavy text-center font-extrabold text-xs uppercase tracking-wider rounded-lg shadow transition"
            >
              Apply for Loan
            </Link>
            <Link
              to="/book-consultation"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-center font-bold text-xs uppercase tracking-wider rounded-lg border border-white/20 transition"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewsPage;
