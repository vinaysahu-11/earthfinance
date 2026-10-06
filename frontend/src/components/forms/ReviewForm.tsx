import React, { useState } from 'react';
import { reviewApi } from '../../services/reviewApi';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';
import { Star, CheckCircle2 } from 'lucide-react';

export const ReviewForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    rating: 5,
    review: '',
    profession: '',
    business: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await reviewApi.submitReview(formData);
      if (res.success) {
        setIsSubmitted(true);
        if (onSuccess) onSuccess();
      } else {
        setError(res.error || 'Failed to submit review');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit review');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-emerald-200 text-center shadow-card">
        <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-[#071B3A] mb-2">Review Submitted</h3>
        <p className="text-sm text-[#667085]">
          Thank you for sharing your experience! Your review is in moderation and will be featured upon review by our editorial team.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 md:p-8 space-y-4">
      <div>
        <h3 className="text-xl font-bold text-[#071B3A]">Share Your Experience</h3>
        <p className="text-xs text-[#667085]">We value enterprise feedback and transparency</p>
      </div>

      {error && <Alert type="error" message={error} />}

      <div className="flex items-center gap-2">
        <label className="text-xs font-semibold text-[#101828]">Rating:</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
              className="p-1 focus:outline-none"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= formData.rating ? 'text-[#F4C542] fill-[#F4C542]' : 'text-slate-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#101828] mb-1">Your Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="e.g. Sunil Mehta"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#101828] mb-1">Company / Enterprise</label>
          <input
            type="text"
            value={formData.business}
            onChange={(e) => setFormData((prev) => ({ ...prev, business: e.target.value }))}
            placeholder="e.g. Mehta Precision Works Ltd."
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#101828] mb-1">Designation / Profession</label>
        <input
          type="text"
          value={formData.profession}
          onChange={(e) => setFormData((prev) => ({ ...prev, profession: e.target.value }))}
          placeholder="e.g. Managing Director / CFO"
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A]"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#101828] mb-1">Your Feedback *</label>
        <textarea
          required
          rows={4}
          value={formData.review}
          onChange={(e) => setFormData((prev) => ({ ...prev, review: e.target.value }))}
          placeholder="Tell us how Earth Finance assisted your business financing..."
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A]"
        />
      </div>

      <Button type="submit" variant="primary" size="md" isLoading={isLoading} className="w-full">
        Submit Review for Verification
      </Button>
    </form>
  );
};
