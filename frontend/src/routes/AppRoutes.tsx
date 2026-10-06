import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { LoansPage } from '../pages/public/LoansPage';
import { LoanDetailPage } from '../pages/public/LoanDetailPage';
import { IndustriesPage } from '../pages/public/IndustriesPage';
import { IndustryDetailPage } from '../pages/public/IndustryDetailPage';
import { AboutPage } from '../pages/public/AboutPage';
import { HowItWorksPage } from '../pages/public/HowItWorksPage';
import { EmiCalculatorPage } from '../pages/public/EmiCalculatorPage';
import { ApplyPage } from '../pages/public/ApplyPage';
import { AppointmentPage } from '../pages/public/AppointmentPage';
import { ReviewsPage } from '../pages/public/ReviewsPage';
import { FaqPage } from '../pages/public/FaqPage';
import { BlogPage } from '../pages/public/BlogPage';
import { BlogDetailPage } from '../pages/public/BlogDetailPage';
import { OffersPage } from '../pages/public/OffersPage';
import { SolutionsGalleryPage } from '../pages/public/SolutionsGalleryPage';
import { ContactPage } from '../pages/public/ContactPage';
import { PrivacyPolicyPage, TermsPage, DisclaimerPage } from '../pages/public/LegalPages';
import { ThankYouPage } from '../pages/public/ThankYouPage';
import { AppointmentConfirmationPage } from '../pages/public/AppointmentConfirmationPage';
import { NotFoundPage } from '../pages/public/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminLeadsPage } from '../pages/admin/AdminLeadsPage';
import { AdminLeadDetailPage } from '../pages/admin/AdminLeadDetailPage';
import { AdminAppointmentsPage } from '../pages/admin/AdminAppointmentsPage';
import { AdminAppointmentDetailPage } from '../pages/admin/AdminAppointmentDetailPage';
import { AdminLoansPage } from '../pages/admin/AdminLoansPage';
import { AdminLoanEditPage } from '../pages/admin/AdminLoanEditPage';
import { AdminIndustriesPage } from '../pages/admin/AdminIndustriesPage';
import { AdminBannersPage } from '../pages/admin/AdminBannersPage';
import { AdminReviewsPage } from '../pages/admin/AdminReviewsPage';
import { AdminTestimonialsPage } from '../pages/admin/AdminTestimonialsPage';
import { AdminFaqsPage } from '../pages/admin/AdminFaqsPage';
import { AdminBlogPage } from '../pages/admin/AdminBlogPage';
import { AdminBlogEditPage } from '../pages/admin/AdminBlogEditPage';
import { AdminGalleryPage } from '../pages/admin/AdminGalleryPage';
import { AdminMessagesPage } from '../pages/admin/AdminMessagesPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';
import { AdminSeoPage } from '../pages/admin/AdminSeoPage';
import { AdminStaffPage } from '../pages/admin/AdminStaffPage';
import { AdminReportsPage } from '../pages/admin/AdminReportsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes with standard PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/loans/:slug" element={<LoanDetailPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/industries/:slug" element={<IndustryDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/emi-calculator" element={<EmiCalculatorPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/book-consultation" element={<AppointmentPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/solutions-gallery" element={<SolutionsGalleryPage />} />
        <Route path="/gallery" element={<SolutionsGalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/terms-conditions" element={<TermsPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/regulatory-disclaimer" element={<DisclaimerPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/enquiry-confirmed" element={<ThankYouPage />} />
        <Route path="/inquiry-confirmed" element={<ThankYouPage />} />
        <Route path="/appointment-confirmation" element={<AppointmentConfirmationPage />} />
        <Route path="/consultation-confirmed" element={<AppointmentConfirmationPage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Route>

      {/* Admin Login Route (Public, but redirects to dashboard if already logged in) */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="leads" element={<AdminLeadsPage />} />
        <Route path="leads/:id" element={<AdminLeadDetailPage />} />
        <Route path="appointments" element={<AdminAppointmentsPage />} />
        <Route path="appointments/:id" element={<AdminAppointmentDetailPage />} />
        <Route path="loans" element={<AdminLoansPage />} />
        <Route path="loans/new" element={<AdminLoanEditPage />} />
        <Route path="loans/:id/edit" element={<AdminLoanEditPage />} />
        <Route path="loans/edit/:id" element={<AdminLoanEditPage />} />
        <Route path="industries" element={<AdminIndustriesPage />} />
        <Route path="banners" element={<AdminBannersPage />} />
        <Route path="banners-campaigns" element={<AdminBannersPage />} />
        <Route path="reviews" element={<AdminReviewsPage />} />
        <Route path="testimonials" element={<AdminTestimonialsPage />} />
        <Route path="faqs" element={<AdminFaqsPage />} />
        <Route path="blog" element={<AdminBlogPage />} />
        <Route path="blog/new" element={<AdminBlogEditPage />} />
        <Route path="blog/:id/edit" element={<AdminBlogEditPage />} />
        <Route path="blog/edit/:id" element={<AdminBlogEditPage />} />
        <Route path="gallery" element={<AdminGalleryPage />} />
        <Route path="messages" element={<AdminMessagesPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route path="seo" element={<AdminSeoPage />} />
        <Route path="staff" element={<AdminStaffPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
      </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
