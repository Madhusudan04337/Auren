import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Eye, EyeOff, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, CheckCircle2, Sun, Moon } from 'lucide-react';
import { NOIR_FRAGRANCE_IMAGE } from '../data/products';
import { LuxuryImage } from '../components/ui/LuxuryImage';

interface LoginPageProps {
  onNavigate: (page: string, params?: any) => void;
  onSuccessReturn?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onSuccessReturn }) => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      if (onSuccessReturn) {
        onSuccessReturn();
      } else {
        onNavigate('account');
      }
    } else {
      setErrorMessage(res.error || 'Invalid credentials.');
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    const res = await login('ariadne.vance@auren-atelier.com', 'password');
    setIsLoading(false);
    if (res.success) {
      if (onSuccessReturn) {
        onSuccessReturn();
      } else {
        onNavigate('account');
      }
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetEmail.includes('@')) {
      setResetSuccess(true);
      setTimeout(() => {
        setResetSuccess(false);
        setShowResetModal(false);
        setResetEmail('');
      }, 2500);
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
          
          {/* Header */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89B6C] dark:text-[#D4AF37] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Maison Sanctuary</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#121212] dark:text-[#F5F3EF] font-normal tracking-tight">
              Sign In
            </h1>
            <p className="text-xs sm:text-sm text-[#121212]/70 dark:text-[#F5F3EF]/70 font-light leading-relaxed max-w-md">
              Enter your credentials to access your cellular skin dossier, order trackings, and private allocations.
            </p>
          </div>

          {/* Error feedback */}
          {errorMessage && (
            <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-[#121212]/70 dark:text-[#F5F3EF]/70 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@auren-atelier.com"
                className="w-full bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#2A2A2A] rounded-xl px-4 py-3.5 text-sm text-[#121212] dark:text-[#F5F3EF] placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none focus:border-[#B89B6C] dark:focus:border-[#D4AF37] transition-colors shadow-xs"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs uppercase tracking-[0.16em] text-[#121212]/70 dark:text-[#F5F3EF]/70 font-medium">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="text-xs text-[#B89B6C] dark:text-[#D4AF37] hover:underline cursor-pointer"
                >
                  Forgot Key?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
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

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#121212]/75 dark:text-[#F5F3EF]/75">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded-xs border-[#E5DFD5] dark:border-[#333] text-[#121212] focus:ring-[#B89B6C]"
                />
                <span>Remember this terminal</span>
              </label>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#121212] hover:bg-black dark:bg-[#F5F3EF] dark:hover:bg-white text-white dark:text-[#121212] py-4 px-6 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Enter the Maison</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            {/* Instant Demo Collector Shortcut */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="w-full bg-white dark:bg-[#161616] hover:bg-[#F5F1EB] dark:hover:bg-[#202020] text-[#121212] dark:text-[#F5F3EF] border border-[#E5DFD5] dark:border-[#2F2F2F] py-3 px-4 rounded-full text-xs tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89B6C] dark:bg-[#D4AF37]" />
                <span>Quick Demo Member: Ariadne Vance (Noir Connoisseur)</span>
              </button>
            </div>
          </form>

          {/* Sign Up Redirect */}
          <div className="mt-8 pt-6 border-t border-[#E5DFD5] dark:border-[#222222] text-center">
            <p className="text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70">
              New to Auren?{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="text-[#121212] dark:text-[#F5F3EF] font-semibold hover:text-[#B89B6C] dark:hover:text-[#D4AF37] underline underline-offset-4 cursor-pointer ml-1"
              >
                Create Maison Account
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
          src={NOIR_FRAGRANCE_IMAGE}
          alt="Auren Atelier Flacon"
          fallbackText="Sanctuary"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 pointer-events-none" />

        <div className="relative z-10 p-12 xl:p-16 flex flex-col justify-between text-white w-full h-full">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Private Member Privileges</span>
          </div>

          <div className="space-y-6 max-w-md">
            <h2 className="font-serif text-3xl xl:text-4xl text-white font-normal leading-snug">
              "Formulations crafted with architectural quietude for cellular longevity."
            </h2>
            <div className="space-y-3.5 pt-2 text-xs text-white/80 font-light">
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                <span>Complimentary 10ml travel extrait on all orders exceeding $1,500</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                <span>Priority access to micro-batch harvests & private perfumery drops</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                <span>Personal circadian dermal dossier and bespoke ritual tracking</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono tracking-widest uppercase text-white/40">
            HAUTE PARFUMERIE · BIOMIMETIC LIPIDS · CELLULAR PROTOCOLS
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#161616] border border-[#E5DFD5] dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-4">
            <h3 className="font-serif text-2xl text-[#121212] dark:text-[#F5F3EF]">
              Password Recovery
            </h3>
            <p className="text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70 leading-relaxed font-light">
              Enter your registered atelier email. We will dispatch a secure one-time cryptographic reset link.
            </p>

            {resetSuccess ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Verification dispatched. Please check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-4 pt-2">
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="name@auren-atelier.com"
                  className="w-full bg-[#FAF8F5] dark:bg-[#1F1F1F] border border-[#E5DFD5] dark:border-[#333] rounded-xl px-4 py-3 text-xs text-[#121212] dark:text-[#F5F3EF] focus:outline-none focus:border-[#B89B6C]"
                />
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowResetModal(false)}
                    className="px-4 py-2 text-xs uppercase tracking-wider text-[#121212]/70 dark:text-[#F5F3EF]/70 hover:text-[#121212] dark:hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#121212] dark:bg-[#F5F3EF] text-white dark:text-[#121212] px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium cursor-pointer"
                  >
                    Dispatch Key
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
