import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentApi } from '../../services/appointmentApi';

interface ServiceOption {
  id: string;
  label: string;
  icon: string;
  fullTitle: string;
}

const SERVICES: ServiceOption[] = [
  {
    id: 'Business Finance & Working Capital',
    label: 'Business Finance',
    icon: 'domain',
    fullTitle: 'Business Finance & Working Capital'
  },
  {
    id: 'Property Finance / Loan Against Property',
    label: 'Property / LAP',
    icon: 'real_estate_agent',
    fullTitle: 'Property Finance / Loan Against Property'
  },
  {
    id: 'Industrial Capex & Project Term Loan',
    label: 'Industrial Capex',
    icon: 'factory',
    fullTitle: 'Industrial Capex & Project Term Loan'
  },
  {
    id: 'Medical Equipment & Doctor Facility',
    label: 'Medical / Doctor Line',
    icon: 'medical_services',
    fullTitle: 'Medical Equipment & Doctor Facility'
  },
  {
    id: 'Institutional Education Finance',
    label: 'Education Finance',
    icon: 'school',
    fullTitle: 'Institutional Education Finance'
  },
  {
    id: 'Personal Wealth & Commercial Fleet',
    label: 'Personal & Fleet',
    icon: 'directions_car',
    fullTitle: 'Personal Wealth & Commercial Fleet'
  }
];

interface ConsultationMode {
  id: string;
  title: string;
  apiType: 'OFFICE' | 'PHONE' | 'ONLINE';
  locationText: string;
  description: string;
  tag: string;
  icon: string;
  tagIcon: string;
}

const CONSULTATION_MODES: ConsultationMode[] = [
  {
    id: 'Office Visit',
    title: 'Office Visit',
    apiType: 'OFFICE',
    locationText: 'Civil Lines Executive Suite, Raipur, CG',
    description: 'Meet our senior advisory team at Earth Finance headquarters in Civil Lines, Raipur.',
    tag: 'Civil Lines, Raipur',
    icon: 'corporate_fare',
    tagIcon: 'location_on'
  },
  {
    id: 'Phone Advisory',
    title: 'Phone Advisory',
    apiType: 'PHONE',
    locationText: 'Dedicated Direct Line (Recorded)',
    description: 'Speak with a dedicated credit officer over a recorded, confidential telephone call.',
    tag: '30 Min Briefing',
    icon: 'phone_in_talk',
    tagIcon: 'schedule'
  },
  {
    id: 'Secure Video Conference',
    title: 'Secure Video',
    apiType: 'ONLINE',
    locationText: 'Encrypted Institutional Video Link',
    description: 'Interactive video session with screen sharing for financial statement review.',
    tag: 'End-to-End Encrypted',
    icon: 'video_camera_front',
    tagIcon: 'lock'
  }
];

const TIME_SLOTS = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM'
];

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export const AppointmentPage: React.FC = () => {
  const navigate = useNavigate();
  // Service selection
  const [selectedService, setSelectedService] = useState<string>('Business Finance & Working Capital');

  // Mode selection
  const [selectedMode, setSelectedMode] = useState<string>('Office Visit');

  // Calendar month state
  const [calendarDate, setCalendarDate] = useState<Date>(() => {
    const now = new Date();
    // Default to current month or May 2025 if in past/demo mode
    // We start on first day of current month
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  // Selected Date state
  const [selectedDay, setSelectedDay] = useState<Date>(() => {
    const target = new Date();
    // Default to tomorrow or next business day
    target.setDate(target.getDate() + 1);
    return target;
  });

  // Slot selection
  const [selectedSlot, setSelectedSlot] = useState<string>('11:00 AM');

  // Form Fields
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Active mode details
  const activeModeObj = CONSULTATION_MODES.find(m => m.id === selectedMode) || CONSULTATION_MODES[0];

  // Helper date strings
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = calendarDate.getFullYear();
  const currentMonth = calendarDate.getMonth();
  const monthName = monthNames[currentMonth];

  // Calendar math
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevMonthDaysCount = new Date(currentYear, currentMonth, 0).getDate();
  // Day of week of first day: 0 (Sun) to 6 (Sat) -> convert to Mon (0) to Sun (6)
  const firstDayRaw = new Date(currentYear, currentMonth, 1).getDay();
  const firstDayCol = (firstDayRaw + 6) % 7;

  // Selected date formatted
  const selectedDayOfWeek = selectedDay.toLocaleDateString('en-US', { weekday: 'long' });
  const selectedDayNum = selectedDay.getDate();
  const selectedMonthName = selectedDay.toLocaleDateString('en-US', { month: 'short' });
  const selectedFullMonthName = selectedDay.toLocaleDateString('en-US', { month: 'long' });
  const selectedYear = selectedDay.getFullYear();
  const formattedDisplayDate = `${selectedDayOfWeek}, ${selectedDayNum}${getOrdinalSuffix(selectedDayNum)} ${selectedMonthName}`;
  const formattedFullDisplayDate = `${selectedDayOfWeek}, ${selectedDayNum}${getOrdinalSuffix(selectedDayNum)} ${selectedFullMonthName} ${selectedYear}`;
  const isoDateString = `${selectedYear}-${String(selectedDay.getMonth() + 1).padStart(2, '0')}-${String(selectedDayNum).padStart(2, '0')}`;

  const handlePrevMonth = () => {
    setCalendarDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDay(newDate);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const notesPayload = company.trim()
        ? `Entity: ${company.trim()}\nAgenda: ${notes.trim()}`
        : notes.trim();

      const res = await appointmentApi.createAppointment({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        service: selectedService,
        appointment_date: isoDateString,
        appointment_time: selectedSlot,
        consultation_type: activeModeObj.apiType,
        notes: notesPayload || undefined
      });

      if (res.success || res.data) {
        setIsSubmitted(true);
        const bookingId = (res as any)?.data?.booking_id || (res as any)?.data?.id || `EF-${Math.floor(10000 + Math.random() * 90000)}`;
        navigate('/appointment-confirmation', {
          state: {
            bookingId: typeof bookingId === 'string' && bookingId.startsWith('EF-') ? bookingId : `EF-${bookingId}`,
            clientName: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            service: selectedService,
            facilityScope: 'Credit Facilities from ₹50 Lakhs to ₹25+ Crores',
            modality: selectedMode,
            dateStr: formattedDisplayDate,
            timeStr: `${selectedSlot} IST`,
            deskAllocated: 'Desk #04 Allocated',
            unitName: 'Senior Debt Underwriting Desk'
          }
        });
      } else {
        setError(res.message || 'Unable to schedule consultation. Please check your details and try again.');
      }
    } catch (err: any) {
      console.error('Appointment booking error:', err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Unable to schedule consultation right now. Please verify your contact details or call 9300022732 directly.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google Calendar URL generator
  const getGoogleCalendarUrl = () => {
    let [timeStr, modifier] = selectedSlot.split(' ');
    let [hoursStr, minutesStr] = timeStr.split(':');
    let hours = parseInt(hoursStr, 10);
    let minutes = parseInt(minutesStr, 10);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const startIso = `${isoDateString.replace(/-/g, '')}T${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}00`;
    const endHours = hours + 1;
    const endIso = `${isoDateString.replace(/-/g, '')}T${String(endHours).padStart(2, '0')}${String(minutes).padStart(2, '0')}00`;

    const title = `Earth Finance Advisory Consultation - ${selectedService}`;
    const details = `Institutional Credit Advisory Consultation\nClient: ${name || 'Principal'}\nEntity: ${company || 'N/A'}\nService: ${selectedService}\nFormat: ${selectedMode}\nLocation: ${activeModeObj.locationText}\nDirect Line: +91 9300022732`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startIso}/${endIso}&details=${encodeURIComponent(
      details
    )}&location=${encodeURIComponent(activeModeObj.locationText)}`;
  };

  return (
    <div className="w-full bg-background min-h-screen text-on-surface">
      {/* HERO SECTION */}
      <section className="relative w-full bg-gradient-to-r from-primary-container via-[#0B2D5C] to-primary-container text-white px-4 md:px-8 py-16 md:py-24 overflow-hidden">
        {/* Subtle Gold Architectural Lines & Backdrop Elements */}
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-tertiary-fixed/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 -bottom-32 w-80 h-80 rounded-full bg-primary-fixed/5 blur-2xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffdf94_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tertiary-fixed/15 text-tertiary-fixed text-xs font-bold uppercase tracking-wider mb-6 shadow-sm border border-tertiary-fixed/20">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>ONE-ON-ONE STRATEGIC CONSULTATION</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                Book an Advisory{' '}
                <span className="text-tertiary-fixed underline decoration-tertiary-fixed/30 underline-offset-8">
                  Consultation
                </span>
              </h1>
              <p className="text-base md:text-lg text-[#dbe2f9] max-w-2xl leading-relaxed">
                Choose a convenient date and time to discuss your enterprise financing, debt restructuring, or property
                loan requirement with senior credit specialists in Raipur.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 text-sm">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="material-symbols-outlined text-tertiary-fixed text-[24px]">verified_user</span>
                <div>
                  <p className="font-semibold text-white">Strict NDA Protected</p>
                  <p className="text-[#dbe2f9] text-xs">Fiduciary confidentiality guaranteed</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="material-symbols-outlined text-secondary-fixed text-[24px]">currency_rupee</span>
                <div>
                  <p className="font-semibold text-white">Zero Advisory Fee</p>
                  <p className="text-[#dbe2f9] text-xs">Complimentary structural evaluation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN BOOKING WORKSPACE */}
      <section className="w-full bg-background px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* CONFIRMATION VIEW (Shown upon successful submission) */}
          {isSubmitted ? (
            <div className="max-w-3xl mx-auto bg-surface-container-lowest rounded-2xl shadow-xl p-8 md:p-12 text-center space-y-8 border border-outline-variant/30 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-secondary-container text-on-secondary-container mx-auto flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-[48px]">check_circle</span>
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-secondary font-bold">Booking Confirmed</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary-container">
                  Appointment Successfully Scheduled
                </h2>
                <p className="text-sm md:text-base text-on-surface-variant max-w-lg mx-auto leading-relaxed">
                  Your consultation request has been reserved with Earth Finance's corporate underwriting division. A
                  calendar invitation and accreditation packet have been dispatched to{' '}
                  <span className="font-semibold text-on-surface">{email || 'your email'}</span>.
                </p>
              </div>

              {/* Summary Badges Container */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-xl mx-auto pt-2">
                <span className="px-4 py-2 rounded-full bg-surface-container text-xs md:text-sm font-semibold text-primary-container flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">domain</span>
                  <span>{selectedService}</span>
                </span>
                <span className="px-4 py-2 rounded-full bg-surface-container text-xs md:text-sm font-semibold text-primary-container flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                  <span>{formattedDisplayDate}</span>
                </span>
                <span className="px-4 py-2 rounded-full bg-surface-container text-xs md:text-sm font-semibold text-primary-container flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  <span>{selectedSlot}</span>
                </span>
                <span className="px-4 py-2 rounded-full bg-surface-container text-xs md:text-sm font-semibold text-primary-container flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">{activeModeObj.icon}</span>
                  <span>{selectedMode}</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setPhone('');
                    setEmail('');
                    setCompany('');
                    setNotes('');
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary-container font-semibold text-sm transition-all"
                >
                  Schedule Another
                </button>
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary-container text-surface-container-lowest hover:bg-[#0B2D5C] font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">event</span>
                  <span>Add to Google Calendar</span>
                </a>
                <a
                  href="tel:9300022732"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-primary-container font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                  <span>Contact Support</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="booking-interface">
              {/* LEFT PANEL: 4-Step Interactive Scheduler (65% width) */}
              <div className="lg:col-span-8 space-y-10">
                {/* STEP 1: SELECT SERVICE */}
                <div className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-sm border border-outline-variant/30 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary-container text-surface-container-lowest flex items-center justify-center font-bold text-sm">
                      1
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-primary-container">Select Financial Service</h2>
                      <p className="text-sm text-on-surface-variant">
                        Choose the financial mandate you wish to evaluate with our credit committee.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SERVICES.map(srv => {
                      const isActive = selectedService === srv.id;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => setSelectedService(srv.id)}
                          className={`text-left p-3.5 rounded-xl transition-all flex flex-col gap-2 ${
                            isActive
                              ? 'bg-primary-container text-surface-container-lowest shadow-sm'
                              : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-[22px] ${
                              isActive ? 'text-tertiary-fixed' : 'text-primary-container'
                            }`}
                          >
                            {srv.icon}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold">{srv.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 2: CONSULTATION FORMAT */}
                <div className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-sm border border-outline-variant/30 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary-container text-surface-container-lowest flex items-center justify-center font-bold text-sm">
                      2
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-primary-container">Consultation Format</h2>
                      <p className="text-sm text-on-surface-variant">Select your preferred interaction model.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {CONSULTATION_MODES.map(mode => {
                      const isActive = selectedMode === mode.id;
                      return (
                        <div
                          key={mode.id}
                          onClick={() => setSelectedMode(mode.id)}
                          className={`cursor-pointer p-5 rounded-xl transition-all flex flex-col justify-between relative shadow-sm border ${
                            isActive
                              ? 'bg-primary-container/5 border-primary-container/30 hover:bg-primary-container/10'
                              : 'bg-surface-container border-transparent hover:bg-surface-container-high'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                isActive
                                  ? 'bg-primary-container text-tertiary-fixed'
                                  : 'bg-surface-container-highest text-primary-container'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[24px]">{mode.icon}</span>
                            </div>
                            {isActive ? (
                              <span className="w-6 h-6 rounded-full bg-tertiary-fixed text-primary-container flex items-center justify-center font-bold text-xs shadow-sm">
                                ✓
                              </span>
                            ) : (
                              <span className="w-6 h-6 rounded-full border border-outline-variant flex items-center justify-center text-transparent text-xs" />
                            )}
                          </div>

                          <div className="mt-4">
                            <h3 className="text-base font-bold text-primary-container">{mode.title}</h3>
                            <p className="text-xs text-on-surface-variant mt-1.5 leading-snug">{mode.description}</p>
                          </div>

                          <div className="mt-4 pt-3 text-xs font-semibold flex items-center gap-1.5 text-primary-container">
                            <span className="material-symbols-outlined text-[16px]">{mode.tagIcon}</span>
                            <span>{mode.tag}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 3: CALENDAR & TIME SLOTS */}
                <div className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-sm border border-outline-variant/30 space-y-8">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary-container text-surface-container-lowest flex items-center justify-center font-bold text-sm">
                      3
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-primary-container">Select Date &amp; Preferred Window</h2>
                      <p className="text-sm text-on-surface-variant">Real-time availability of credit committee leaders.</p>
                    </div>
                  </div>

                  {/* Interactive Calendar Container */}
                  <div className="bg-surface-container-low p-6 rounded-xl space-y-4 border border-outline-variant/20">
                    {/* Calendar Header with Navigation */}
                    <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary-container">calendar_month</span>
                        <span className="text-lg font-bold text-primary-container">
                          {monthName} {currentYear}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          aria-label="Previous month"
                          onClick={handlePrevMonth}
                          className="w-8 h-8 rounded-lg bg-surface-container-lowest hover:bg-surface-container flex items-center justify-center text-primary-container transition-colors shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                        </button>
                        <button
                          type="button"
                          aria-label="Next month"
                          onClick={handleNextMonth}
                          className="w-8 h-8 rounded-lg bg-surface-container-lowest hover:bg-surface-container flex items-center justify-center text-primary-container transition-colors shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                        </button>
                      </div>
                    </div>

                    {/* Day Names */}
                    <div className="grid grid-cols-7 text-center text-xs font-bold text-on-surface-variant pb-1">
                      {dayNames.map((d, idx) => (
                        <span key={d} className={idx === 6 ? 'text-outline' : ''}>
                          {d}
                        </span>
                      ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1.5 text-center text-sm">
                      {/* Previous Month Padding */}
                      {Array.from({ length: firstDayCol }).map((_, i) => {
                        const dayNum = prevMonthDaysCount - firstDayCol + 1 + i;
                        return (
                          <span key={`prev-${i}`} className="py-2.5 text-outline-variant opacity-30 select-none">
                            {dayNum}
                          </span>
                        );
                      })}

                      {/* Current Month Days */}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dayNum = i + 1;
                        const isSelected =
                          selectedDay.getDate() === dayNum &&
                          selectedDay.getMonth() === currentMonth &&
                          selectedDay.getFullYear() === currentYear;

                        return (
                          <button
                            key={`curr-${dayNum}`}
                            type="button"
                            onClick={() => handleSelectDay(dayNum)}
                            className={`py-2.5 rounded-lg transition-all text-xs sm:text-sm ${
                              isSelected
                                ? 'bg-tertiary-fixed text-primary-container font-bold shadow-md scale-105'
                                : 'text-on-surface hover:bg-surface-container font-medium'
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}

                      {/* Next Month Padding to fill week */}
                      {Array.from({
                        length: (7 - ((firstDayCol + daysInMonth) % 7)) % 7
                      }).map((_, i) => (
                        <span key={`next-${i}`} className="py-2.5 text-outline-variant opacity-30 select-none">
                          {i + 1}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 text-center border-t border-outline-variant/10">
                      <span className="text-xs text-on-surface-variant flex items-center justify-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-tertiary-fixed-dim">event_available</span>
                        <span>Selected Date: <strong>{formattedFullDisplayDate}</strong></span>
                      </span>
                    </div>
                  </div>

                  {/* TIME SLOT SELECTOR */}
                  <div className="space-y-3">
                    <label className="block text-sm text-primary-container font-bold">
                      Select Available Slot (IST)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                      {TIME_SLOTS.map(slot => {
                        const isActive = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2.5 px-3 rounded-lg text-xs font-semibold text-center transition-all ${
                              isActive
                                ? 'bg-primary-container text-surface-container-lowest shadow-sm scale-105'
                                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* STEP 4: YOUR DETAILS */}
                <form
                  onSubmit={handleSubmit}
                  className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-sm border border-outline-variant/30 space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary-container text-surface-container-lowest flex items-center justify-center font-bold text-sm">
                      4
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-primary-container">Enter Principal Details</h2>
                      <p className="text-sm text-on-surface-variant">
                        Provide authorized contact information for session accreditation.
                      </p>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2">
                      <span className="material-symbols-outlined text-[20px] text-red-600 mt-0.5">error</span>
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-primary-container" htmlFor="client-name">
                        Full Name *
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-3 text-[20px] text-outline">
                          person
                        </span>
                        <input
                          id="client-name"
                          name="name"
                          required
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="Director / Promoter Name"
                          className="w-full h-12 pl-10 pr-4 bg-surface-container-low focus:bg-surface-container-lowest rounded-lg border border-transparent focus:border-primary-container/30 text-on-surface text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-primary-container" htmlFor="client-phone">
                        Contact Number *
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-3 text-[20px] text-outline">
                          call
                        </span>
                        <input
                          id="client-phone"
                          name="phone"
                          required
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="+91 93000 22732"
                          className="w-full h-12 pl-10 pr-4 bg-surface-container-low focus:bg-surface-container-lowest rounded-lg border border-transparent focus:border-primary-container/30 text-on-surface text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-primary-container" htmlFor="client-email">
                        Business Email Address *
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-3 text-[20px] text-outline">
                          mail
                        </span>
                        <input
                          id="client-email"
                          name="email"
                          required
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="director@enterprise.in"
                          className="w-full h-12 pl-10 pr-4 bg-surface-container-low focus:bg-surface-container-lowest rounded-lg border border-transparent focus:border-primary-container/30 text-on-surface text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-primary-container" htmlFor="company-name">
                        Entity / Firm Name
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-3 text-[20px] text-outline">
                          apartment
                        </span>
                        <input
                          id="company-name"
                          name="company"
                          type="text"
                          value={company}
                          onChange={e => setCompany(e.target.value)}
                          placeholder="Firm / Corporate Entity Name"
                          className="w-full h-12 pl-10 pr-4 bg-surface-container-low focus:bg-surface-container-lowest rounded-lg border border-transparent focus:border-primary-container/30 text-on-surface text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-1.5">
                      <label className="block text-xs font-bold text-primary-container" htmlFor="client-notes">
                        Brief Agenda / Facility Requirements
                      </label>
                      <textarea
                        id="client-notes"
                        name="notes"
                        rows={3}
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="E.g. Discuss working capital enhancement, balance sheet structuring, or machinery capex."
                        className="w-full p-3.5 bg-surface-container-low focus:bg-surface-container-lowest rounded-lg border border-transparent focus:border-primary-container/30 text-on-surface text-sm outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Fiduciary Notice & Submit Button */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-outline-variant/15">
                    <div className="flex items-center gap-2 text-on-surface-variant text-xs">
                      <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                      <span>Immediate confirmation token dispatched to phone &amp; email.</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-primary-container text-sm md:text-base font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin material-symbols-outlined text-[20px]">refresh</span>
                          <span>Scheduling Consultation...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm Appointment</span>
                          <span className="material-symbols-outlined text-[20px]">north_east</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* RIGHT PANEL: Consultation Overview & Regional Branch (35% width, Sticky) */}
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                {/* SUMMARY CARD */}
                <div className="bg-surface-container-lowest rounded-xl shadow-md p-6 space-y-6 border border-outline-variant/30">
                  <div className="flex items-center justify-between pb-4 bg-surface-container-low -mx-6 -mt-6 p-6 rounded-t-xl border-b border-outline-variant/20">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                        Live Itinerary
                      </span>
                      <h3 className="text-xl font-bold text-primary-container">Consultation Summary</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container text-xs font-bold">
                      RESERVED
                    </span>
                  </div>

                  {/* Itemized Specs */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary-container mt-0.5 text-[20px]">
                        account_balance_wallet
                      </span>
                      <div>
                        <span className="block text-xs text-on-surface-variant font-medium">Selected Facility</span>
                        <span className="text-sm font-bold text-primary-container">{selectedService}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary-container mt-0.5 text-[20px]">
                        handshake
                      </span>
                      <div>
                        <span className="block text-xs text-on-surface-variant font-medium">Format Mode</span>
                        <span className="text-sm font-bold text-primary-container">{selectedMode}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary-container mt-0.5 text-[20px]">
                        event_available
                      </span>
                      <div>
                        <span className="block text-xs text-on-surface-variant font-medium">Date &amp; Time Slot</span>
                        <span className="text-sm font-bold text-primary-container">
                          {formattedDisplayDate} • {selectedSlot}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary-container mt-0.5 text-[20px]">
                        location_city
                      </span>
                      <div>
                        <span className="block text-xs text-on-surface-variant font-medium">
                          Advisory Desk / Location
                        </span>
                        <span className="text-sm font-bold text-primary-container">
                          {activeModeObj.locationText}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary-container mt-0.5 text-[20px]">
                        badge
                      </span>
                      <div>
                        <span className="block text-xs text-on-surface-variant font-medium">
                          Assigned Lead Specialization
                        </span>
                        <span className="text-sm font-bold text-primary-container">
                          Senior Debt Underwriting Director
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Guarantee Notice */}
                  <div className="p-4 rounded-lg bg-surface-container space-y-1">
                    <div className="flex items-center gap-2 text-secondary text-xs font-bold">
                      <span className="material-symbols-outlined text-[16px]">verified_user</span>
                      <span>Fiduciary Guarantee</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Zero Consultation Fee • Strictly Confidential Under Institutional Non-Disclosure Agreement (NDA).
                    </p>
                  </div>
                </div>

                {/* REGIONAL OFFICE INFO CARD */}
                <div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden border border-outline-variant/30">
                  <div className="relative h-44 w-full">
                    <img
                      alt="Earth Finance Corporate Headquarters"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida/AEtjO1WCx2JI9MgqLuGhznVQiD_XJuMzXTF75kkDXncMcbsn5QWiAp3Q2-eBLOWHTdVgUSDN--IvcMNWpf1hH6FR2ynxmvvGJQACdwLOscEBvxGZlbXejeFbh49edOQz1KaFqvc5eb7rkUbgSXAxyS5Sz-XStg17KGMqVN7wqpkFum2tpRCgW6MMsQqDoSOWRa2VH3So29T5rO4TtDkeWSl8FZzUlxyUPScG5T5LQ2mtzH1RQ1rPJoUNuHHy9MY"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-xs text-tertiary-fixed uppercase font-semibold">Corporate Headquarters</span>
                      <p className="text-lg font-bold">Earth Finance Center</p>
                    </div>
                  </div>
                  <div className="p-5 space-y-3 text-sm">
                    <div className="flex items-start gap-2.5 text-on-surface">
                      <span className="material-symbols-outlined text-primary-container text-[20px] mt-0.5">
                        pin_drop
                      </span>
                      <div>
                        <p className="font-semibold text-primary-container">Civil Lines Executive Hub</p>
                        <p className="text-on-surface-variant text-xs">
                          Opp. Raj Bhavan Road, Raipur, Chhattisgarh - 492001
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 text-on-surface pt-1">
                      <span className="material-symbols-outlined text-primary-container text-[20px]">call</span>
                      <a
                        className="font-semibold text-primary-container hover:text-tertiary-container transition-colors"
                        href="tel:9300022732"
                      >
                        +91 9300022732
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5 text-on-surface pt-1">
                      <span className="material-symbols-outlined text-primary-container text-[20px]">schedule</span>
                      <span className="text-on-surface-variant text-xs">Mon – Sat: 10:00 AM – 06:30 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* STRATEGIC VALUE TILES SECTION */}
      <section className="w-full bg-surface-container-low px-4 md:px-8 py-16 border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs text-secondary uppercase tracking-wider font-bold">
              Institutional Preparedness
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary-container">
              What to Expect During Your Session
            </h2>
            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
              Our advisory team follows a rigorous institutional methodology to unlock capital efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-3 border border-outline-variant/20">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[28px]">query_stats</span>
              </div>
              <h3 className="text-base font-bold text-primary-container">1. Debt Capacity Audit</h3>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                A rapid financial ratio breakdown comparing your EBITDA, DSCR, and balance sheet collateral against current lending benchmarks.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-3 border border-outline-variant/20">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[28px]">account_balance</span>
              </div>
              <h3 className="text-base font-bold text-primary-container">2. Multi-Bank Structuring</h3>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Syndicated or bilateral arrangement options across premier private and public banks to minimize cost of capital and margin calls.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-3 border border-outline-variant/20">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[28px]">speed</span>
              </div>
              <h3 className="text-base font-bold text-primary-container">3. Expedited Sanction Plan</h3>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Transparent timeline mapping from documentation assembly and valuation to credit approval and timely disbursement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppointmentPage;
