import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Eye, EyeOff, ArrowRight, ArrowLeft, Sparkles, Check, Gift, Sun, Moon } from 'lucide-react';
import { CLOUD_BARRIER_IMAGE } from '../data/products';
import { LuxuryImage } from '../components/ui/LuxuryImage';

interface SignUpPageProps {
  onNavigate: (page: string, params?: any) => void;
  onSuccessReturn?: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate, onSuccessReturn }) => {
  const { signup } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  // Step management: 1 = Basic Info, 2 = Bespoke Dermal Consultation
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Dermal Preferences
  const [skinType, setSkinType] = useState('Combination / Sensitive');
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>(['Barrier Resilience', 'Cellular Hydration']);
  const [fragranceFamily, setFragranceFamily] = useState('Woody Amber & Smoked Resins');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const skinTypeOptions = [
    'Dry & Dehydrated',
    'Sensitive & Reactive',
    'Combination / Sensitive',
    'Normal & Balanced',
    'Oily & Congested'
  ];

  const concernOptions = [
    'Barrier Resilience',
    'Cellular Hydration',
    'Redness & Flush Calm',
    'Circadian Repair',
    'Texture & Micro-Tone',
    'Pore Architecture'
  ];

  const fragranceOptions = [
    'Woody Amber & Smoked Resins',
    'Solar Citrus & Neroli Fleur',
    'Deep Incense & Atlas Cedar',
    'Aquatic Sea Salt & Driftwood'
  ];

  const toggleConcern = (concern: string) => {
    if (selectedConcerns.includes(concern)) {
      setSelectedConcerns(selectedConcerns.filter(c => c !== concern));
    } else {
      setSelectedConcerns([...selectedConcerns, concern]);
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!name.trim()) {
      setErrorMessage('Please state your full name.');
      return;
    }
    if (!email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must contain at least 6 characters.');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('Please agree to the Maison terms and privacy protocol.');
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    setErrorMessage('');

    const res = await signup({
      name,
      email,
      password,
      skinType,
      concerns: selectedConcerns,
      fragranceFamily
    });

    setIsLoading(false);

    if (res.success) {
      if (onSuccessReturn) {
        onSuccessReturn();
      } else {
        onNavigate('account');
      }
    } else {
      setErrorMessage(res.error || 'Failed to initialize Maison profile.');
    }
  };

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#0C0C0C] min-h-screen flex flex-col lg:flex-row text-[#121212] dark:text-[#F5F3EF] transition-colors duration-300">
      
      {/* =========================================================================
          LEFT HALF: Full Half-Side Form (100% on Mobile, 50% on Desktop)
         ========================================================================= */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16">
        
        {/* Top Header inside the form side */}
        <header className="flex items-center justify-between pb-6 sm:pb-8 border-b border-[#E5DFD5]/60 dark:border-[#222222]/70">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#121212]/75 dark:text-[#F5F3EF]/75 hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Maison</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="font-serif text-2xl tracking-[0.25em] uppercase text-[#121212] dark:text-[#F5F3EF] hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="AUREN Home"
          >
            AUREN
          </button>

          <button
            onClick={toggleTheme}
            className="p-1.5 text-[#121212]/70 dark:text-[#F5F3EF]/70 hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors cursor-pointer flex items-center gap-1.5 text-xs tracking-wider"
            aria-label="Toggle Theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4" />}
          </button>
        </header>

        {/* Center Form Stage (Full half side, spacious and elegant) */}
        <div className="my-auto py-8 sm:py-12 max-w-xl w-full mx-auto">
          
          {/* Step indicator header */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Maison Membership Protocol</span>
              </div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#121212]/50 dark:text-[#F5F3EF]/50">
                Step {step} of 2
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#121212] dark:text-[#F5F3EF] font-normal tracking-tight">
              {step === 1 ? 'Initiate Membership' : 'Bespoke Dermal Dossier'}
            </h1>
            
            <p className="text-xs sm:text-sm text-[#121212]/70 dark:text-[#F5F3EF]/70 font-light leading-relaxed max-w-lg">
              {step === 1
                ? 'Create your private credentials. You will unlock a 500-point welcome grant and access to restricted formulation harvests.'
                : 'Curate your cellular profile so our algorithms and skin atelier can recommend precise AM/PM circadian choreography.'}
            </p>
          </div>

          {/* Error feedback */}
          {errorMessage && (
            <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-[0.16em] text-[#121212]/70 dark:text-[#F5F3EF]/70 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Julian Sorel"
                  className="w-full bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#2A2A2A] rounded-xl px-4 py-3.5 text-sm text-[#121212] dark:text-[#F5F3EF] placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none focus:border-[#B89B6C] dark:focus:border-[#D4AF37] transition-colors shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.16em] text-[#121212]/70 dark:text-[#F5F3EF]/70 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#2A2A2A] rounded-xl px-4 py-3.5 text-sm text-[#121212] dark:text-[#F5F3EF] placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none focus:border-[#B89B6C] dark:focus:border-[#D4AF37] transition-colors shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.16em] text-[#121212]/70 dark:text-[#F5F3EF]/70 font-medium mb-2">
                  Password (min 6 characters)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#2A2A2A] rounded-xl px-4 py-3.5 pr-11 text-sm text-[#121212] dark:text-[#F5F3EF] placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none focus:border-[#B89B6C] dark:focus:border-[#D4AF37] transition-colors shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#121212] dark:hover:text-white transition-colors cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Consents */}
              <div className="space-y-3 pt-2 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer text-[#121212]/75 dark:text-[#F5F3EF]/75">
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="mt-0.5 rounded-xs border-[#E5DFD5] dark:border-[#333] text-[#121212] focus:ring-[#B89B6C]"
                  />
                  <span>Receive the Private Gazette (strictly restricted fragrance releases & formulation notes)</span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-[#121212]/75 dark:text-[#F5F3EF]/75">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded-xs border-[#E5DFD5] dark:border-[#333] text-[#121212] focus:ring-[#B89B6C]"
                  />
                  <span>I agree to the Maison Terms of Service & Privacy Protocol</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#121212] py-4 px-6 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md mt-4"
              >
                <span>Proceed to Dermal Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* STEP 2: Dermal Profile Customization */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Skin Type selector */}
              <div>
                <label className="block text-xs uppercase tracking-[0.16em] text-[#121212]/70 dark:text-[#F5F3EF]/70 font-medium mb-3">
                  1. Epidermal Skin Behavior
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {skinTypeOptions.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSkinType(st)}
                      className={`p-3.5 text-left rounded-xl text-xs transition-all border cursor-pointer ${
                        skinType === st
                          ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#121212] border-transparent shadow-sm'
                          : 'bg-white dark:bg-[#161616] border-[#E5DFD5] dark:border-[#2A2A2A] text-[#121212] dark:text-[#F5F3EF] hover:border-[#B89B6C]'
                      }`}
                    >
                      <div className="font-medium">{st}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Concerns */}
              <div>
                <label className="block text-xs uppercase tracking-[0.16em] text-[#121212]/70 dark:text-[#F5F3EF]/70 font-medium mb-3">
                  2. Primary Biological Concerns (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {concernOptions.map((concern) => {
                    const isSelected = selectedConcerns.includes(concern);
                    return (
                      <button
                        key={concern}
                        type="button"
                        onClick={() => toggleConcern(concern)}
                        className={`px-3.5 py-2 rounded-full text-xs transition-all border cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#121212] border-transparent'
                            : 'bg-white dark:bg-[#161616] border-[#E5DFD5] dark:border-[#2A2A2A] text-[#121212] dark:text-[#F5F3EF] hover:border-[#B89B6C]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{concern}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fragrance Family */}
              <div>
                <label className="block text-xs uppercase tracking-[0.16em] text-[#121212]/70 dark:text-[#F5F3EF]/70 font-medium mb-3">
                  3. Preferred Olfactive Sillage
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {fragranceOptions.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFragranceFamily(f)}
                      className={`p-3.5 text-left rounded-xl text-xs transition-all border cursor-pointer ${
                        fragranceFamily === f
                          ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#121212] border-transparent shadow-sm'
                          : 'bg-white dark:bg-[#161616] border-[#E5DFD5] dark:border-[#2A2A2A] text-[#121212] dark:text-[#F5F3EF] hover:border-[#B89B6C]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3.5 rounded-full text-xs uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 hover:text-[#121212] dark:hover:text-white border border-[#E5DFD5] dark:border-[#2A2A2A] cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#121212] py-4 px-6 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Initializing Maison Dossier...</span>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Login link */}
          <div className="mt-8 pt-6 border-t border-[#E5DFD5] dark:border-[#222222] text-center">
            <p className="text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70">
              Already have an atelier profile?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-[#121212] dark:text-[#F5F3EF] font-semibold hover:text-[#B89B6C] dark:hover:text-[#D4AF37] underline underline-offset-4 cursor-pointer ml-1"
              >
                Sign In
              </button>
            </p>
          </div>

        </div>

        {/* Minimalist Footnote */}
        <footer className="pt-6 border-t border-[#E5DFD5]/40 dark:border-[#222222]/50 text-[11px] text-[#121212]/40 dark:text-[#F5F3EF]/40 font-mono tracking-wider text-center lg:text-left">
          © AUREN MAISON DE BEAUTÉ · QUIET LUXURY FORMULATIONS
        </footer>
      </div>

      {/* =========================================================================
          RIGHT HALF: Full Half-Side Image & Atmosphere (HIDDEN on Mobile Responsive)
         ========================================================================= */}
      <div className="hidden lg:flex lg:w-1/2 relative min-h-screen bg-[#0C0C0C] border-l border-[#E5DFD5]/70 dark:border-[#222222] overflow-hidden">
        <LuxuryImage
          src={CLOUD_BARRIER_IMAGE}
          alt="Cloud Barrier Cream"
          fallbackText="Welcome"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 pointer-events-none" />

        <div className="relative z-10 p-12 xl:p-16 flex flex-col justify-between text-white w-full h-full">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            <Gift className="w-4 h-4" />
            <span>Welcome Privileges</span>
          </div>

          <div className="space-y-6 max-w-md">
            <div className="space-y-2">
              <div className="text-3xl xl:text-4xl font-serif text-white">
                500 Complimentary Tier Points
              </div>
              <p className="text-xs text-white/80 font-light leading-relaxed">
                Instantly credited upon registration. Redeemable towards micro-harvests, complimentary discovery coffrets, and bespoke consultations.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 text-xs space-y-2 text-white/85">
              <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
                Architectural Integrity
              </div>
              <p className="font-light leading-relaxed text-white/75">
                We protect your digital sovereignty. Your dermal metrics and consultation records are encrypted on-device and never sold to third-party ad brokers.
              </p>
            </div>
          </div>

          <div className="text-[11px] font-mono tracking-widest uppercase text-white/40">
            HAUTE PARFUMERIE · BIOMIMETIC LIPIDS · CELLULAR PROTOCOLS
          </div>
        </div>
      </div>

    </div>
  );
};
