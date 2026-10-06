import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Building,
  ShieldCheck,
  Download,
  Copy,
  ExternalLink,
  ChevronDown,
  ArrowLeft,
  Home,
  Headphones,
  RotateCcw,
  Sparkles,
  FileText,
  Lock,
  Share2,
  Check
} from 'lucide-react';
import { SUPPORT_PHONE, SUPPORT_EMAIL, OFFICE_ADDRESS } from '../../config/constants';

interface BookingDetails {
  bookingId: string;
  clientName: string;
  phone: string;
  email: string;
  service: string;
  facilityScope: string;
  modality: 'Office Visit' | 'Phone Call' | 'Digital Meet';
  dateStr: string;
  timeStr: string;
  deskAllocated: string;
  unitName: string;
}

export const AppointmentConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Load appointment details from router state, search params, or high-fidelity defaults
  const stateData = location.state as Partial<BookingDetails> | undefined;

  const [booking, setBooking] = useState<BookingDetails>({
    bookingId: stateData?.bookingId || searchParams.get('id') || 'EF-78429',
    clientName: stateData?.clientName || searchParams.get('name') || 'Rajesh Kumar',
    phone: stateData?.phone || searchParams.get('phone') || '+91 93000 22732',
    email: stateData?.email || searchParams.get('email') || 'r.kumar@outlook.com',
    service: stateData?.service || 'Business Finance & Working Capital Advisory',
    facilityScope: stateData?.facilityScope || 'Credit Facilities from ₹50 Lakhs to ₹25+ Crores',
    modality: (stateData?.modality as any) || 'Office Visit',
    dateStr: stateData?.dateStr || 'Thursday, 22nd May',
    timeStr: stateData?.timeStr || '11:00 AM IST',
    deskAllocated: stateData?.deskAllocated || 'Desk #04 Allocated',
    unitName: stateData?.unitName || 'Senior Debt Underwriting Desk'
  });

  const [selectedModality, setSelectedModality] = useState<'Office Visit' | 'Phone Call' | 'Digital Meet'>(
    booking.modality
  );

  // Calendar dropdown state
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<any>(null);

  // Reschedule Modal state
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [newSelectedDate, setNewSelectedDate] = useState('');
  const [newSelectedSlot, setNewSelectedSlot] = useState('11:00 AM');

  // Trigger floating micro-interaction toast
  const showToast = (message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Close calendar dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // Copy Meeting Details to Clipboard
  const copyAppointmentSummary = () => {
    const summary = `Earth Finance Institutional Advisory Consultation
Booking ID: #${booking.bookingId}
Client: ${booking.clientName}
Direct Line: ${booking.phone}
Advisory Unit: ${booking.unitName}
Facility: ${booking.service} (${booking.facilityScope})
Modality: ${selectedModality}
Date & Time: ${booking.dateStr} at ${booking.timeStr}
Desk: ${booking.deskAllocated}
Venue: ${OFFICE_ADDRESS}
Helpline: ${SUPPORT_PHONE}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary).then(() => {
        setIsCalendarOpen(false);
        showToast('Consultation summary copied to clipboard.');
      });
    } else {
      setIsCalendarOpen(false);
      showToast('Consultation summary copied to clipboard.');
    }
  };

  // Generate & Download .ICS Calendar File
  const downloadICS = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Earth Finance//Institutional Advisory Desk//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:Earth Finance Consultation - ${booking.service}`,
      `DESCRIPTION:Institutional advisory meeting with ${booking.unitName}. Client: ${booking.clientName}. Format: ${selectedModality}. Helpline: ${SUPPORT_PHONE}.`,
      `LOCATION:${OFFICE_ADDRESS}`,
      'DTSTART:20250522T053000Z',
      'DTEND:20250522T063000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Earth_Finance_Consultation_${booking.bookingId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsCalendarOpen(false);
    showToast('Calendar event file (.ics) downloaded.');
  };

  // Google Calendar pre-filled URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Earth Finance Advisory Consultation - ${booking.service}`
  )}&details=${encodeURIComponent(
    `Senior Debt Underwriting Desk Session at Raipur HQ\nBooking ID: #${booking.bookingId}\nClient: ${booking.clientName}\nDirect Line: ${booking.phone}\nModality: ${selectedModality}`
  )}&location=${encodeURIComponent(OFFICE_ADDRESS)}&dates=20250522T053000Z/20250522T063000Z`;

  const handleConfirmReschedule = () => {
    if (!newSelectedDate) {
      showToast('Please select a preferred date for rescheduling.');
      return;
    }
    setBooking(prev => ({
      ...prev,
      dateStr: newSelectedDate,
      timeStr: `${newSelectedSlot} IST`
    }));
    setShowRescheduleModal(false);
    showToast(`Session successfully rescheduled to ${newSelectedDate} at ${newSelectedSlot}.`);
  };

  return (
    <div className="w-full bg-[#f9f9ff] min-h-screen text-[#141b2c] pt-24 pb-20 relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Ambient Depth Underlays */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-[#d7e2ff]/40 via-[#e9edff]/20 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[#8ff9a6]/20 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-2/3 -left-48 w-96 h-96 bg-[#ffdf94]/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Animated Status Indicator */}
        <div className="relative mb-6 flex items-center justify-center">
          <span className="absolute w-24 h-24 rounded-full bg-[#8cf6a3]/40 animate-ping opacity-60" />
          <span className="absolute w-20 h-20 rounded-full bg-[#73dc8c]/30 animate-pulse" />
          <div className="relative w-16 h-16 rounded-full bg-[#006d33] flex items-center justify-center shadow-lg shadow-[#006d33]/25">
            <span
              className="material-symbols-outlined text-white text-[34px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
        </div>

        {/* Trust Meta Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e0e8ff] text-[#364768] mb-3 shadow-sm border border-[#c5c6cf]/30">
          <span className="material-symbols-outlined text-[#006d33] text-[16px]">verified</span>
          <span className="text-xs uppercase tracking-wider font-bold">
            Priority Corporate Queue • Confirmed ID: #{booking.bookingId}
          </span>
        </div>

        {/* Primary Announcement */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#071b3a] text-center tracking-tight max-w-2xl leading-tight">
          Your Consultation is Confirmed
        </h1>
        <p className="text-base sm:text-lg text-[#44474e] text-center mt-3 max-w-xl leading-relaxed">
          We have reserved your advisory session. Please review the institutional briefing and booking credentials below.
        </p>

        {/* Institutional Master Card */}
        <div className="w-full mt-8 bg-white rounded-2xl shadow-xl overflow-hidden relative border border-slate-200/90 transition-all hover:shadow-2xl">
          {/* Top Status Bar: Multi-Color Prestigious Accents */}
          <div className="h-2 w-full flex">
            <div className="h-full w-2/5 bg-[#071b3a]" />
            <div className="h-full w-1/5 bg-[#efc13e]" />
            <div className="h-full w-2/5 bg-[#006d33]" />
          </div>

          <div className="p-6 sm:p-8 md:p-10 flex flex-col gap-6">
            {/* Card Header & Ticket Split */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 bg-[#f1f3ff] p-4 sm:p-5 rounded-xl border border-slate-200/60">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#071b3a] flex items-center justify-center shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-[#ffdf94] text-[26px]">account_balance</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#44474e] uppercase tracking-wider block font-semibold">
                    Assigned Advisory Unit
                  </span>
                  <span className="text-lg sm:text-xl text-[#071b3a] font-bold tracking-tight">
                    {booking.unitName}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start md:self-center px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006d33] animate-pulse" />
                <span className="text-xs sm:text-sm text-[#141b2c] font-semibold">
                  Institutional Status: Priority Locked
                </span>
              </div>
            </div>

            {/* Structured Summary Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Service & Channel */}
              <div className="space-y-4">
                {/* Service Line */}
                <div className="bg-white p-5 rounded-xl border border-slate-200/80 bg-gradient-to-r from-[#f1f3ff]/50 to-white">
                  <div className="flex items-center gap-2 text-[#44474e] text-xs font-semibold uppercase tracking-wider mb-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#4e5e81]">finance_chip</span>
                    <span>Financial Facility Scope</span>
                  </div>
                  <p className="text-lg sm:text-xl text-[#141b2c] font-bold leading-snug">{booking.service}</p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#007235]">
                    <span className="material-symbols-outlined text-[15px]">trending_up</span>
                    <span>{booking.facilityScope}</span>
                  </div>
                </div>

                {/* Consultation Modality Toggle */}
                <div className="p-5 rounded-xl bg-[#f1f3ff] border border-slate-200/70">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-[#44474e] text-xs font-semibold uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[18px] text-[#4e5e81]">meeting_room</span>
                      <span>Consultation Modality</span>
                    </div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded bg-[#dbe2f9] text-[#364768] uppercase tracking-wider font-bold">
                      {selectedModality}
                    </span>
                  </div>

                  {/* Pill Toggle View */}
                  <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedModality('Office Visit');
                        showToast('Modality preference set to Office Visit (Raipur HQ).');
                      }}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg transition-all ${
                        selectedModality === 'Office Visit'
                          ? 'bg-[#071b3a] text-white shadow-sm ring-2 ring-[#071b3a]/20'
                          : 'bg-white text-[#44474e] hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#ffdf94]">apartment</span>
                      <span>Office Visit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedModality('Phone Call');
                        showToast('Modality preference set to Phone Consultation.');
                      }}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg transition-all ${
                        selectedModality === 'Phone Call'
                          ? 'bg-[#071b3a] text-white shadow-sm ring-2 ring-[#071b3a]/20'
                          : 'bg-white text-[#44474e] hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#ffdf94]">call</span>
                      <span>Phone Call</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedModality('Digital Meet');
                        showToast('Modality preference set to Secure Digital Video Meet.');
                      }}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg transition-all ${
                        selectedModality === 'Digital Meet'
                          ? 'bg-[#071b3a] text-white shadow-sm ring-2 ring-[#071b3a]/20'
                          : 'bg-white text-[#44474e] hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#ffdf94]">videocam</span>
                      <span>Digital Meet</span>
                    </button>
                  </div>
                </div>

                {/* Candidate / Client Identity */}
                <div className="p-5 rounded-xl bg-[#f1f3ff] flex items-center justify-between border border-slate-200/70">
                  <div>
                    <span className="text-[11px] text-[#44474e] block uppercase tracking-wider font-semibold">
                      Client Representative
                    </span>
                    <span className="text-base sm:text-lg text-[#141b2c] font-bold">{booking.clientName}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#44474e] block uppercase tracking-wider font-semibold">
                      Direct Verified Line
                    </span>
                    <span className="text-sm sm:text-base text-[#141b2c] font-bold">{booking.phone}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Schedule & Physical Venue */}
              <div className="space-y-4 flex flex-col justify-between">
                {/* Date & Time Showcase Box */}
                <div className="bg-[#071b3a] text-white p-6 rounded-xl shadow-lg relative overflow-hidden flex flex-col justify-between border border-[#0b2d5c]">
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-[#b5c7ee]/10 pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#dbe2f9] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                      <span className="material-symbols-outlined text-[#ffdf94] text-[18px]">calendar_today</span>
                      Reserved Time Window
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#006d33] text-white text-[11px] font-bold shadow-sm">
                      60 Min Session
                    </span>
                  </div>
                  <div className="my-5">
                    <div className="text-2xl sm:text-3xl text-white tracking-tight font-extrabold">
                      {booking.dateStr}
                    </div>
                    <div className="text-2xl text-[#ffdf94] mt-1 flex items-center gap-2 font-extrabold">
                      <span>{booking.timeStr}</span>
                      <span className="text-xs text-[#dbe2f9] font-normal tracking-normal">(Raipur HQ)</span>
                    </div>
                  </div>
                  <div className="pt-3 flex items-center justify-between text-xs text-[#e9edff] border-t border-[#4e5e81]/40">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-[#8ff9a6]">schedule</span>
                      Arrive 10 mins prior
                    </span>
                    <span className="text-[#ffdf94] font-semibold">{booking.deskAllocated}</span>
                  </div>
                </div>

                {/* Corporate Location Details */}
                <div className="p-5 rounded-xl bg-[#f1f3ff] flex flex-col justify-between h-full border border-slate-200/70">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#44474e] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#071b3a] text-[18px]">pin_drop</span>
                        Physical Consultation Venue
                      </span>
                      <a
                        className="text-xs text-[#071b3a] font-bold hover:underline inline-flex items-center gap-1"
                        href="https://maps.google.com/?q=Earth+Finance+Raipur+Ekatam+Parisar"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span>Get Directions</span>
                        <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                      </a>
                    </div>
                    <p className="text-sm font-bold text-[#141b2c] leading-snug">Earth Finance Corporate Office</p>
                    <p className="text-xs text-[#44474e] leading-relaxed mt-1">{OFFICE_ADDRESS}</p>
                  </div>
                  <div className="mt-3 pt-2 flex items-center gap-4 text-[#44474e] text-xs border-t border-slate-200/60">
                    <span className="flex items-center gap-1 text-[#006d33] font-medium">
                      <span className="material-symbols-outlined text-[16px] text-[#4e5e81]">local_parking</span>
                      Reserved Valet Parking Available
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Institutional Preparation Checklist */}
            <div className="p-5 rounded-xl bg-[#e9edff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#c5c6cf]/40">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#071b3a] text-[24px] mt-0.5 shrink-0">
                  assignment_turned_in
                </span>
                <div>
                  <span className="text-sm text-[#071b3a] block font-bold">
                    Suggested Documentation to Bring
                  </span>
                  <span className="text-xs text-[#44474e] leading-relaxed block mt-0.5">
                    Last 2 years audited ITR, 12 months primary bank statement, and GST clearance summaries for accelerated appraisal.
                  </span>
                </div>
              </div>
              <div className="shrink-0">
                <span className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white text-[#071b3a] shadow-sm inline-block border border-slate-200">
                  Digital Uploads Accepted
                </span>
              </div>
            </div>
          </div>

          {/* Integrated Calendar & Navigation Action Row */}
          <div className="bg-[#e0e8ff]/60 px-6 sm:px-8 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 relative">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto relative" ref={calendarRef}>
              {/* Add to Calendar Button with Interactive Dropdown */}
              <div className="relative w-full sm:w-auto">
                <button
                  type="button"
                  id="calendarBtn"
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ffdf94] text-[#241a00] text-sm font-bold hover:bg-[#efc13e] shadow-md transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                  <span>Add to Calendar</span>
                  <span
                    className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                      isCalendarOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {/* Calendar Options Dropdown Menu */}
                {isCalendarOpen && (
                  <div className="absolute left-0 bottom-full mb-2 bg-white shadow-2xl rounded-xl p-2 z-50 flex flex-col gap-1 min-w-[240px] border border-slate-200 animate-fadeIn">
                    <button
                      type="button"
                      onClick={downloadICS}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#141b2c] hover:bg-[#f1f3ff] text-left w-full transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#4e5e81]">download</span>
                      <span>Apple / Outlook (.ics)</span>
                    </button>
                    <a
                      href={googleCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsCalendarOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#141b2c] hover:bg-[#f1f3ff] text-left w-full transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#006d33]">event</span>
                      <span>Google Calendar</span>
                    </a>
                    <button
                      type="button"
                      onClick={copyAppointmentSummary}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#141b2c] hover:bg-[#f1f3ff] text-left w-full transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#efc13e]">content_copy</span>
                      <span>Copy Meeting Details</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Secondary Actions */}
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#071b3a] text-white text-sm font-bold hover:bg-[#0b2d5c] transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">home</span>
                <span>Back to Home</span>
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#071b3a] text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm border border-slate-200"
              >
                <span className="material-symbols-outlined text-[18px]">support_agent</span>
                <span>Contact Desk</span>
              </Link>
            </div>

            <div className="flex items-center gap-1.5 text-[#44474e] text-xs font-medium">
              <span className="material-symbols-outlined text-[#006d33] text-[16px]">forward_to_inbox</span>
              <span>Summary sent to {booking.email}</span>
            </div>
          </div>
        </div>

        {/* Reschedule & Modification Bar */}
        <div className="w-full mt-6 bg-[#f1f3ff] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border border-slate-200/80">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#dbe2f9] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#071b3a] text-[22px]">edit_calendar</span>
            </div>
            <div>
              <h4 className="text-base sm:text-lg text-[#071b3a] font-bold">
                Need to make a change or reschedule?
              </h4>
              <p className="text-xs sm:text-sm text-[#44474e] mt-0.5">
                You can adjust dates or modify your facility request up to 4 hours before your meeting slot.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowRescheduleModal(true)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#071b3a] bg-white hover:bg-slate-50 transition-colors shadow-sm border border-slate-200"
            >
              <span className="material-symbols-outlined text-[16px]">change_circle</span>
              <span>Reschedule Slot</span>
            </button>
            <a
              href={`tel:${SUPPORT_PHONE.replace(/[^0-9]/g, '')}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#071b3a] hover:bg-[#0b2d5c] transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px] text-[#ffdf94]">call</span>
              <span>{SUPPORT_PHONE}</span>
            </a>
          </div>
        </div>

        {/* Institutional Fiduciary Guarantee Card */}
        <div className="w-full mt-4 bg-white rounded-2xl p-5 shadow-sm flex items-start gap-4 border border-slate-200/80">
          <div className="w-10 h-10 rounded-xl bg-[#8cf6a3]/30 flex items-center justify-center shrink-0 mt-0.5">
            <span
              className="material-symbols-outlined text-[#006d33] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lock
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base text-[#071b3a] font-bold">
                Fiduciary &amp; Institutional Confidentiality Guarantee
              </span>
              <span className="material-symbols-outlined text-[#006d33] text-[16px]">verified_user</span>
            </div>
            <p className="text-xs sm:text-sm text-[#44474e] mt-1 leading-relaxed">
              All discussions, turnover disclosures, financial projections, and corporate documentation shared during your consultation are protected under institutional NDA and strict RBI statutory data confidentiality governance. Your sensitive portfolio data is never syndicated without formal executive sanction.
            </p>
          </div>
        </div>

        {/* Quick Regional Desk Direct Line Note */}
        <div className="mt-8 text-center text-xs text-[#44474e] flex flex-wrap items-center justify-center gap-2">
          <span>Earth Finance Regional Syndication Hub</span>
          <span>•</span>
          <span className="text-[#071b3a] font-semibold">Civil Lines &amp; Rajbandha Maidan Hubs, Raipur</span>
          <span>•</span>
          <span>Working Hours: Mon–Sat 10:00 AM – 7:30 PM</span>
        </div>
      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071b3a]/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#f1f3ff] flex items-center justify-center text-[#071b3a]">
                  <span className="material-symbols-outlined text-[20px]">event_repeat</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#071b3a]">Reschedule Consultation</h3>
                  <p className="text-xs text-[#44474e]">Select a new convenient time slot</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowRescheduleModal(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#071b3a] uppercase tracking-wider mb-1.5">
                  Choose New Date
                </label>
                <input
                  type="date"
                  value={newSelectedDate}
                  onChange={(e) => setNewSelectedDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#071b3a]"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#071b3a] uppercase tracking-wider mb-1.5">
                  Select Advisory Slot
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['10:30 AM', '11:00 AM', '12:30 PM', '02:30 PM', '04:00 PM', '05:30 PM'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setNewSelectedSlot(slot)}
                      className={`py-2 px-1 text-xs font-semibold rounded-lg border transition-all ${
                        newSelectedSlot === slot
                          ? 'bg-[#071b3a] text-white border-[#071b3a]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowRescheduleModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReschedule}
                className="flex-1 py-2.5 rounded-xl bg-[#071b3a] text-white text-xs font-bold hover:bg-[#0b2d5c] transition-colors shadow-sm"
              >
                Confirm Reschedule
              </button>
            </div>

            <div className="pt-2 text-center border-t border-slate-100">
              <p className="text-xs text-slate-500">
                Or speak immediately with our Underwriting Desk:{' '}
                <a href={`tel:${SUPPORT_PHONE.replace(/[^0-9]/g, '')}`} className="font-bold text-[#071b3a] hover:underline">
                  {SUPPORT_PHONE}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#071b3a] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-bounce duration-300 border border-[#4e5e81]">
          <span
            className="material-symbols-outlined text-[#8ff9a6] text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
