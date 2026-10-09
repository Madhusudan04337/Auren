import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Sparkles, 
  Send, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  CheckCheck,
  Calendar,
  MessageSquare,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { LuxuryImage } from '../components/ui/LuxuryImage';
import { HERO_IMAGE, MORNING_RITUAL_IMAGE } from '../data/products';

interface ContactPageProps {
  onNavigate: (page: string, params?: any) => void;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: string;
  orderNumber: string;
  preferredChannel: 'email' | 'call' | 'virtual';
  message: string;
  subscribeGazette: boolean;
}

const INQUIRY_TYPES = [
  'Personal Skincare Consultation',
  'Haute Parfumerie Curation',
  'Order & Delivery Status',
  'Bespoke Gifting & Atelier Services',
  'Wholesale & Boutique Partners',
  'Press & Editorial Inquiries',
  'General Maison Inquiries'
];

const FAQS = [
  {
    question: 'How do virtual skincare and fragrance consultations work?',
    answer: 'Our private virtual appointments are 20-minute one-on-one sessions with an AUREN formulation specialist. We evaluate your current lipid barrier health, environmental exposure, and olfactory preferences, curating a bespoke morning and evening regimen with tailored sample recommendations sent directly to your door.'
  },
  {
    question: 'Can I experience fragrance samples prior to purchasing full flacons?',
    answer: 'Yes. With every order, you receive two complimentary 2ml extrait samples of your choice. Additionally, our Discovery Coffret features all current extraits accompanied by an atelier voucher redeemable against any 50ml or 100ml flacon within 60 days.'
  },
  {
    question: 'What is your response time for concierge inquiries?',
    answer: 'Our client concierge operates Monday through Saturday across Paris (CET), New York (EST), and Tokyo (JST) time zones. All inquiries received during operating hours are reviewed and answered with personal care within 4 business hours.'
  },
  {
    question: 'What is your delivery and returns policy for sensitive formulations?',
    answer: 'We provide complimentary carbon-neutral courier delivery worldwide for all orders over $150. If any unopened formulation or sealed fragrance fails to complement your skin or senses within 30 days, we arrange complimentary white-glove collection and full reimbursement.'
  },
  {
    question: 'How do I arrange bespoke corporate or celebratory private gifting?',
    answer: 'Our Atelier Concierge prepares numbered, hand-calligraphed presentation boxes sealed with vegetable-dyed wax. For corporate orders or wedding scent favors, please select "Bespoke Gifting" in the contact form, and our gifting director will contact you within 24 hours.'
  }
];

const ATELIERS = [
  {
    city: 'Paris',
    flagship: 'Maison Saint-Honoré',
    address: '28 Rue du Faubourg Saint-Honoré, 75008 Paris',
    phone: '+33 1 42 68 55 00',
    hours: 'Mon – Sat: 10:00 – 19:30 CET',
    services: 'Full Scent Organ · Bespoke Compounding · Sensory Cabin'
  },
  {
    city: 'New York',
    flagship: 'Meatpacking Studio',
    address: '450 West 14th Street, New York, NY 10014',
    phone: '+1 (212) 584-3320',
    hours: 'Mon – Sat: 11:00 – 19:00 EST / Sun: 12:00 – 18:00',
    services: 'Biomimetic Skin Analysis · Refill Station · Private Appointments'
  },
  {
    city: 'Tokyo',
    flagship: 'Ginza Archive',
    address: '6-10-1 Ginza, Chuo City, Tokyo 104-0061',
    phone: '+81 3 6264 5110',
    hours: 'Daily: 10:30 – 20:00 JST',
    services: 'Olfactory Tea Sanctuary · Micro-Harvest Previews · Skin Diagnostics'
  }
];

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: INQUIRY_TYPES[0],
    orderNumber: '',
    preferredChannel: 'email',
    message: '',
    subscribeGazette: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('concierge@aurenbeauty.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury concierge processing
    setTimeout(() => {
      const randomCode = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
      setTicketId(randomCode);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      inquiryType: INQUIRY_TYPES[0],
      orderNumber: '',
      preferredChannel: 'email',
      message: '',
      subscribeGazette: false
    });
    setIsSubmitted(false);
  };

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#0C0C0C] min-h-screen text-[#121212] dark:text-[#F5F3EF] transition-colors duration-200">
      {/* 1. Header Hero */}
      <section className="border-b border-[#E5DFD5]/70 dark:border-[#222222] py-14 sm:py-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Client Concierge &amp; Ateliers</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-[#121212] dark:text-[#F5F3EF]">
              Connect with the Maison.
            </h1>
            <p className="text-sm sm:text-base text-[#121212]/80 dark:text-[#F5F3EF]/80 font-light leading-relaxed">
              Whether you desire a personal lipid barrier consultation, guidance on bespoke fragrance sillage, 
              or assistance with an existing order, our dedicated concierge team is at your disposal.
            </p>
          </div>

          {/* Quick Contact Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-12 pt-8 border-t border-[#E5DFD5]/70 dark:border-[#222222]">
            <div className="bg-white dark:bg-[#141414] p-5 sm:p-6 border border-[#E5DFD5]/80 dark:border-[#222222] flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37] font-medium block">
                  Digital Concierge
                </span>
                <p className="font-mono text-sm text-[#121212] dark:text-[#F5F3EF]">
                  concierge@aurenbeauty.com
                </p>
                <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light">
                  Direct client advisory &amp; formulation support
                </p>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2 text-[#121212]/60 hover:text-[#B89B6C] dark:text-[#F5F3EF]/60 dark:hover:text-[#D4AF37] transition-colors"
                title="Copy email address"
                aria-label="Copy concierge email"
              >
                {copiedEmail ? <CheckCheck className="w-4 h-4 text-[#B89B6C]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="bg-white dark:bg-[#141414] p-5 sm:p-6 border border-[#E5DFD5]/80 dark:border-[#222222] space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37] font-medium block">
                Atelier Telephone
              </span>
              <p className="font-mono text-sm text-[#121212] dark:text-[#F5F3EF]">
                +33 1 42 68 55 00 / +1 (212) 584-3320
              </p>
              <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light">
                Paris &amp; New York client suites
              </p>
            </div>

            <div className="bg-white dark:bg-[#141414] p-5 sm:p-6 border border-[#E5DFD5]/80 dark:border-[#222222] space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37] font-medium block">
                Response Guarantee
              </span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37]" />
                <span className="text-sm font-medium">Within 4 Business Hours</span>
              </div>
              <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light">
                Mon – Sat: 09:00 – 19:30 CET / EST
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Form & Atelier Editorial Section */}
      <section className="py-16 sm:py-24 border-b border-[#E5DFD5]/70 dark:border-[#222222]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Form Column (7 Cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-[#141414] p-8 sm:p-12 border border-[#E5DFD5] dark:border-[#222222] shadow-sm">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#B89B6C]/10 dark:bg-[#D4AF37]/15 flex items-center justify-center text-[#B89B6C] dark:text-[#D4AF37]">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                      Inquiry Received
                    </span>
                    <h3 className="font-serif text-3xl text-[#121212] dark:text-[#F5F3EF]">
                      Thank you, {formData.fullName}.
                    </h3>
                    <p className="text-sm text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light max-w-md mx-auto leading-relaxed">
                      Your consultation request has been routed to our Paris atelier specialists under reference:
                    </p>
                    <div className="font-mono text-sm tracking-wider font-semibold py-2 px-4 bg-[#FAF8F5] dark:bg-[#1C1C1C] border border-[#E5DFD5] dark:border-[#2E2E2E] inline-block">
                      {ticketId}
                    </div>
                  </div>
                  <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light max-w-md mx-auto">
                    A confirmation email has been dispatched to <span className="font-mono">{formData.email}</span>. A concierge specialist will respond within 4 hours.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 border border-[#121212] dark:border-[#F5F3EF] text-xs uppercase tracking-widest font-medium hover:bg-[#121212] hover:text-white dark:hover:bg-[#F5F3EF] dark:hover:text-[#0C0C0C] transition-colors"
                    >
                      Send Another Message
                    </button>
                    <button
                      onClick={() => onNavigate('shop')}
                      className="px-6 py-3 bg-[#B89B6C] dark:bg-[#D4AF37] text-[#121212] text-xs uppercase tracking-widest font-medium hover:bg-[#A08356] dark:hover:bg-[#E2C265] transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Explore Shop</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold block mb-2">
                      Transmission to the Atelier
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] dark:text-[#F5F3EF]">
                      Private Inquiry Form
                    </h2>
                    <p className="text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 font-light mt-1">
                      Please detail your request. All communications remain strictly confidential within our private maison records.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-[#121212]/80 dark:text-[#F5F3EF]/80 font-medium block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Elena Rostova"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#2C2C2C] px-4 py-3 text-sm text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#B89B6C] dark:focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-[#121212]/80 dark:text-[#F5F3EF]/80 font-medium block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="elena@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#2C2C2C] px-4 py-3 text-sm text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#B89B6C] dark:focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-[#121212]/80 dark:text-[#F5F3EF]/80 font-medium block">
                        Telephone (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#2C2C2C] px-4 py-3 text-sm text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#B89B6C] dark:focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-[#121212]/80 dark:text-[#F5F3EF]/80 font-medium block">
                        Order Number (If applicable)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. #AUR-4928"
                        value={formData.orderNumber}
                        onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                        className="w-full bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#2C2C2C] px-4 py-3 text-sm text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#B89B6C] dark:focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-[#121212]/80 dark:text-[#F5F3EF]/80 font-medium block">
                      Inquiry Category *
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#2C2C2C] px-4 py-3 text-sm text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#B89B6C] dark:focus:border-[#D4AF37] transition-colors cursor-pointer"
                    >
                      {INQUIRY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Channel Preference */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-[#121212]/80 dark:text-[#F5F3EF]/80 font-medium block">
                      Preferred Response Medium
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredChannel: 'email' })}
                        className={`p-3 text-xs border text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                          formData.preferredChannel === 'email'
                            ? 'border-[#B89B6C] dark:border-[#D4AF37] bg-[#B89B6C]/10 dark:bg-[#D4AF37]/10 text-[#121212] dark:text-[#F5F3EF]'
                            : 'border-[#E5DFD5] dark:border-[#2C2C2C] text-[#121212]/70 dark:text-[#F5F3EF]/70 hover:border-[#121212]/30'
                        }`}
                      >
                        <Mail className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37]" />
                        <span>Email Written Reply</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredChannel: 'call' })}
                        className={`p-3 text-xs border text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                          formData.preferredChannel === 'call'
                            ? 'border-[#B89B6C] dark:border-[#D4AF37] bg-[#B89B6C]/10 dark:bg-[#D4AF37]/10 text-[#121212] dark:text-[#F5F3EF]'
                            : 'border-[#E5DFD5] dark:border-[#2C2C2C] text-[#121212]/70 dark:text-[#F5F3EF]/70 hover:border-[#121212]/30'
                        }`}
                      >
                        <Phone className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37]" />
                        <span>Private Phone Call</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredChannel: 'virtual' })}
                        className={`p-3 text-xs border text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                          formData.preferredChannel === 'virtual'
                            ? 'border-[#B89B6C] dark:border-[#D4AF37] bg-[#B89B6C]/10 dark:bg-[#D4AF37]/10 text-[#121212] dark:text-[#F5F3EF]'
                            : 'border-[#E5DFD5] dark:border-[#2C2C2C] text-[#121212]/70 dark:text-[#F5F3EF]/70 hover:border-[#121212]/30'
                        }`}
                      >
                        <Calendar className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37]" />
                        <span>Virtual Video Diagnostic</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-[#121212]/80 dark:text-[#F5F3EF]/80 font-medium block">
                      Message &amp; Skin / Scent Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Share your skin profile, barrier concerns, preferred scent families, or specific order questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#E5DFD5] dark:border-[#2C2C2C] p-4 text-sm text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#B89B6C] dark:focus:border-[#D4AF37] transition-colors resize-y"
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="subscribeGazette"
                      checked={formData.subscribeGazette}
                      onChange={(e) => setFormData({ ...formData, subscribeGazette: e.target.checked })}
                      className="mt-1 accent-[#B89B6C] dark:accent-[#D4AF37] cursor-pointer"
                    />
                    <label htmlFor="subscribeGazette" className="text-xs text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light leading-relaxed cursor-pointer">
                      Grant permission to receive private harvest releases, seasonal scent allocations, and formulation notes via the Private Gazette.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#121212] hover:bg-[#2A2A2A] dark:bg-[#F5F3EF] dark:hover:bg-[#FFFFFF] dark:text-[#0C0C0C] text-white text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#B89B6C] dark:text-[#121212]" />
                        <span>Submit Atelier Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Editorial Information Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="border border-[#E5DFD5] dark:border-[#222222] bg-white dark:bg-[#141414] overflow-hidden">
                <div className="aspect-16/10 overflow-hidden bg-[#E8DFD3] dark:bg-[#1C1C1C]">
                  <LuxuryImage
                    src={MORNING_RITUAL_IMAGE}
                    alt="AUREN Atelier Consultation Studio"
                    fallbackText="Atelier Studio"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>The Atelier Protocol</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#121212] dark:text-[#F5F3EF]">
                    Bespoke Consultation Privileges
                  </h3>
                  <p className="text-xs text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light leading-relaxed">
                    Every consultation is conducted by trained compounding estheticians and perfume evaluators. 
                    We do not prescribe generic routines; we analyze your lipid architecture, environmental factors, 
                    and sensory preferences to engineer a tailored protocol.
                  </p>
                  <ul className="space-y-2 text-xs text-[#121212]/80 dark:text-[#F5F3EF]/80 font-light border-t border-[#E5DFD5]/70 dark:border-[#222222] pt-4">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#B89B6C] dark:bg-[#D4AF37] rounded-full"></span>
                      <span>Complimentary discovery sample trio included with each consultation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#B89B6C] dark:bg-[#D4AF37] rounded-full"></span>
                      <span>Personal formulation card stored in private Maison archives</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#B89B6C] dark:bg-[#D4AF37] rounded-full"></span>
                      <span>Priority allocation for seasonal Haute Parfumerie extraits</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Press & Trade Card */}
              <div className="p-6 sm:p-8 border border-[#E5DFD5] dark:border-[#222222] bg-white dark:bg-[#141414] space-y-3">
                <span className="text-[11px] uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37] font-medium block">
                  Press, Stockists &amp; Architectural Hospitality
                </span>
                <h4 className="font-serif text-lg text-[#121212] dark:text-[#F5F3EF]">
                  Institutional &amp; Global Partnerships
                </h4>
                <p className="text-xs text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light leading-relaxed">
                  For press inquiries, editorial loans, high-end hotel amenity collaborations, or selective niche stockist representations:
                </p>
                <div className="pt-2 font-mono text-xs text-[#B89B6C] dark:text-[#D4AF37]">
                  press@aurenbeauty.com · partnerships@aurenbeauty.com
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Global Flagship Ateliers */}
      <section className="py-16 sm:py-20 border-b border-[#E5DFD5]/70 dark:border-[#222222]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="max-w-2xl space-y-3 mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold block">
              Global Destinations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] dark:text-[#F5F3EF]">
              Flagship Ateliers &amp; Scent Bars
            </h2>
            <p className="text-xs sm:text-sm text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light leading-relaxed">
              Step into our physical sanctuaries for sensory sampling, personalized barrier diagnostics, and flacon refills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {ATELIERS.map((atelier) => (
              <div 
                key={atelier.city}
                className="bg-white dark:bg-[#141414] p-8 border border-[#E5DFD5] dark:border-[#222222] flex flex-col justify-between hover:border-[#B89B6C]/50 dark:hover:border-[#D4AF37]/50 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B89B6C] dark:text-[#D4AF37]">
                      {atelier.city}
                    </span>
                    <MapPin className="w-4 h-4 text-[#121212]/40 dark:text-[#F5F3EF]/40" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#121212] dark:text-[#F5F3EF]">
                      {atelier.flagship}
                    </h3>
                    <p className="text-xs text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light mt-1.5 leading-relaxed">
                      {atelier.address}
                    </p>
                  </div>
                  <div className="pt-2 text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 font-mono">
                    {atelier.phone}
                  </div>
                  <div className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 font-light flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#B89B6C] dark:text-[#D4AF37]" />
                    <span>{atelier.hours}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5DFD5]/70 dark:border-[#222222]">
                  <span className="text-[11px] uppercase tracking-wider text-[#121212]/50 dark:text-[#F5F3EF]/50 block mb-1">
                    Atelier Amenities
                  </span>
                  <p className="text-xs text-[#121212]/80 dark:text-[#F5F3EF]/80 font-light">
                    {atelier.services}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Frequently Addressed Concierge Inquiries (FAQ) */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
              Concierge Guidance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] dark:text-[#F5F3EF]">
              Frequently Addressed Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-[#121212]/70 dark:text-[#F5F3EF]/70 font-light max-w-xl mx-auto">
              Direct insights into appointments, sampling programs, and artisanal ordering.
            </p>
          </div>

          <div className="divide-y divide-[#E5DFD5] dark:divide-[#222222] border-y border-[#E5DFD5] dark:border-[#222222]">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="py-6">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg sm:text-xl text-[#121212] dark:text-[#F5F3EF] group-hover:text-[#B89B6C] dark:group-hover:text-[#D4AF37] transition-colors pr-6">
                      {faq.question}
                    </span>
                    <span className="text-[#B89B6C] dark:text-[#D4AF37] shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pt-4 text-xs sm:text-sm text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light leading-relaxed max-w-3xl animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Callout */}
          <div className="bg-white dark:bg-[#141414] p-8 border border-[#E5DFD5] dark:border-[#222222] text-center space-y-4">
            <h3 className="font-serif text-2xl text-[#121212] dark:text-[#F5F3EF]">
              Seeking Immediate Assistance?
            </h3>
            <p className="text-xs sm:text-sm text-[#121212]/75 dark:text-[#F5F3EF]/75 font-light max-w-md mx-auto">
              Our direct lines are open during studio hours. You can also review our signature rituals and formulations anytime.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('shop')}
                className="px-6 py-3 bg-[#121212] dark:bg-[#F5F3EF] text-white dark:text-[#0C0C0C] text-xs uppercase tracking-widest font-semibold hover:bg-[#2A2A2A] dark:hover:bg-white transition-colors cursor-pointer"
              >
                Browse Formulations
              </button>
              <button
                onClick={() => onNavigate('rituals')}
                className="px-6 py-3 border border-[#E5DFD5] dark:border-[#2C2C2C] text-xs uppercase tracking-widest font-medium hover:border-[#121212] dark:hover:border-white transition-colors cursor-pointer"
              >
                Discover Daily Rituals
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
