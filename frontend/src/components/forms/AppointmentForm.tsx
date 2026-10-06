import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentApi } from '../../services/appointmentApi';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { ConsultationType } from '../../types';

interface AppointmentFormProps {
  initialService?: string;
  onSuccess?: () => void;
  className?: string;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialService = 'Corporate Debt Advisory',
  onSuccess,
  className = ''
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: initialService,
    appointment_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    appointment_time: '11:00 AM',
    consultation_type: 'ONLINE' as ConsultationType,
    notes: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  const services = [
    'Corporate Debt Advisory',
    'Working Capital Syndication',
    'Machinery / Equipment Finance Advisory',
    'MSME Subsidy & Term Loan Planning',
    'Balance Sheet Restructuring Consultation'
  ];

  const timeSlots = [
    '10:00 AM',
    '11:30 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await appointmentApi.createAppointment(formData);
      if (res.success) {
        setIsBooked(true);
        if (onSuccess) {
          onSuccess();
        } else {
          setTimeout(() => {
            navigate('/appointment-confirmation');
          }, 1500);
        }
      } else {
        setError(res.error || 'Failed to book consultation.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'A network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isBooked) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-emerald-200 text-center shadow-card">
        <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-[#071B3A] mb-2">Consultation Scheduled!</h3>
        <p className="text-sm text-[#667085] max-w-md mx-auto mb-4">
          Your appointment has been confirmed for {formData.appointment_date} at {formData.appointment_time}. A confirmation email has been dispatched.
        </p>
        <span className="text-xs text-slate-400">Redirecting to confirmation...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-2xl border border-slate-200 shadow-card p-6 md:p-8 space-y-4 ${className}`}>
      <div className="mb-2">
        <h3 className="text-xl font-bold text-[#071B3A]">Schedule a Financial Consultation</h3>
        <p className="text-xs text-[#667085]">Reserve a dedicated slot with our senior credit managers</p>
      </div>

      {error && <Alert type="error" message={error} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#101828] mb-1">
            Your Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Anand Mahindra"
            className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#101828] mb-1">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 9876543210"
            className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#101828] mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.in"
            className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#101828] mb-1">
            Service Required <span className="text-red-500">*</span>
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A]"
          >
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#101828] mb-1">
            Preferred Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="appointment_date"
            required
            value={formData.appointment_date}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#101828] mb-1">
            Time Slot <span className="text-red-500">*</span>
          </label>
          <select
            name="appointment_time"
            value={formData.appointment_time}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A]"
          >
            {timeSlots.map((ts) => (
              <option key={ts} value={ts}>
                {ts}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#101828] mb-1">
            Consultation Mode <span className="text-red-500">*</span>
          </label>
          <select
            name="consultation_type"
            value={formData.consultation_type}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A]"
          >
            <option value="ONLINE">Online Video Call (Google Meet)</option>
            <option value="PHONE">Direct Telephonic Call</option>
            <option value="OFFICE">In-Person Office Visit (BKC, Mumbai)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#101828] mb-1">
          Discussion Objective / Notes (Optional)
        </label>
        <textarea
          name="notes"
          rows={2}
          value={formData.notes}
          onChange={handleChange}
          placeholder="Briefly state your financing goals or queries..."
          className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A]"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full"
        rightIcon={<Calendar className="w-4 h-4" />}
      >
        Confirm Consultation Booking
      </Button>
    </form>
  );
};
