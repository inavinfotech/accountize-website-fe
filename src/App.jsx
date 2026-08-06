import { useState, useEffect, useMemo } from "react";
import {
  Wallet,
  TrendingUp,
  Banknote,
  ShieldCheck,
  ShieldAlert,
  PiggyBank,
  Download,
  ChevronDown,
  ChevronUp,
  Check,
  Lock,
  Database,
  RefreshCw,
  Users,
  ArrowRight,
  ChevronRight,
  X,
  Smartphone,
  Calculator,
  FileText
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip
} from "recharts";
import Lenis from "lenis";

export default function App() {
  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
    return () => lenis.destroy();
  }, []);

  // Handle Preloader Fade-out
  useEffect(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      const timer = setTimeout(() => {
        preloader.classList.add("fade-out");
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, []);

  // Header Scroll State
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Live Dashboard Simulator States ---
  const [balance, setBalance] = useState(18450);
  const [receivables, setReceivables] = useState(6800);
  const [payables, setPayables] = useState(3200);
  const [cash, setCash] = useState(4500);
  const [online, setOnline] = useState(13950);
  const [totalSpent, setTotalSpent] = useState(8200);
  const [recentLogs, setRecentLogs] = useState([
    { id: 1, type: "debit", desc: "Grocery Store", amount: 850, date: "Today" },
    { id: 2, type: "credit", desc: "Settle from Amit", amount: 1500, date: "Yesterday" },
    { id: 3, type: "debit", desc: "Electricity Bill", amount: 2200, date: "2 days ago" }
  ]);

  // Recharts 7-Day Spending Pattern Sparkline Data
  const sparklineData = [
    { day: "Mon", spend: 450 },
    { day: "Tue", spend: 850 },
    { day: "Wed", spend: 320 },
    { day: "Thu", spend: 1200 },
    { day: "Fri", spend: 600 },
    { day: "Sat", spend: 950 },
    { day: "Sun", spend: 400 }
  ];

  // Quick Math Split Showcase State
  const [mathInput, setMathInput] = useState("200+150+50");
  const parsedMath = useMemo(() => {
    try {
      if (!mathInput) return 0;
      const clean = String(mathInput).replace(/[^0-9+\-*/.]/g, "");
      return Function(`"use strict"; return (${clean})`)() || 0;
    } catch (_) {
      return 0;
    }
  }, [mathInput]);

  // Simulator actions
  const logSampleExpense = () => {
    const amount = 600;
    setOnline((prev) => Math.max(0, prev - amount));
    setBalance((prev) => Math.max(0, prev - amount));
    setTotalSpent((prev) => prev + amount);
    setRecentLogs((prev) => [
      { id: Date.now(), type: "debit", desc: "Coffee & Snacks", amount, date: "Just Now" },
      ...prev.slice(0, 2)
    ]);
  };

  const settleSampleReceivable = () => {
    if (receivables <= 0) return;
    const amount = 1200;
    setReceivables((prev) => Math.max(0, prev - amount));
    setOnline((prev) => prev + amount);
    setBalance((prev) => prev + amount);
    setRecentLogs((prev) => [
      { id: Date.now(), type: "credit", desc: "Repaid: Amit Partial", amount, date: "Just Now" },
      ...prev.slice(0, 2)
    ]);
  };

  const receiveSampleCash = () => {
    const amount = 1000;
    setCash((prev) => prev + amount);
    setBalance((prev) => prev + amount);
    setRecentLogs((prev) => [
      { id: Date.now(), type: "credit", desc: "Received Cash reward", amount, date: "Just Now" },
      ...prev.slice(0, 2)
    ]);
  };

  const resetSimulator = () => {
    setBalance(18450);
    setReceivables(6800);
    setPayables(3200);
    setCash(4500);
    setOnline(13950);
    setTotalSpent(8200);
    setRecentLogs([
      { id: 1, type: "debit", desc: "Grocery Store", amount: 850, date: "Today" },
      { id: 2, type: "credit", desc: "Settle from Amit", amount: 1500, date: "Yesterday" },
      { id: 3, type: "debit", desc: "Electricity Bill", amount: 2200, date: "2 days ago" }
    ]);
  };

  // --- Verification Simulator States ---
  const [digitalLedger, setDigitalLedger] = useState(24500);
  const [physicalWallet, setPhysicalWallet] = useState(24500);

  // Calculate verification result
  const difference = digitalLedger - physicalWallet;
  const isVerified = Math.abs(difference) < 0.01;

  // Quick preset triggers
  const setPresetMatch = () => {
    setDigitalLedger(18200);
    setPhysicalWallet(18200);
  };

  const setPresetMissingCash = () => {
    setDigitalLedger(18200);
    setPhysicalWallet(17850);
  };

  const setPresetDoubleCharge = () => {
    setDigitalLedger(18550);
    setPhysicalWallet(18200);
  };

  // --- Orbit Features Wheel ---
  const features = [
    {
      title: "Double-Entry Verification",
      description: "Matches digital banking balances against your manual physical cash logs. Catch missing transactions and double-charges immediately.",
      icon: ShieldCheck
    },
    {
      title: "Shared Cryptographic Ledgers",
      description: "Generate secure, temporary read-only or collaborative access tokens to share budget management with spouses, roommates, or partners.",
      icon: Users
    },
    {
      title: "Daily Budget Pacing",
      description: "Set a target per-day budget and monitor actual spending trends. The app calculates automatic monthly expense estimation dynamically.",
      icon: PiggyBank
    },
    {
      title: "Two-Factor Authentication",
      description: "Enable secure Multi-Factor Authentication (MFA) to lock your personal financial summaries safely away from unauthorized access.",
      icon: Lock
    },
    {
      title: "Professional PDF Statements",
      description: "No vendor lock-in. Generate & download executive PDF financial reports itemizing payables, receivables, liquidity balances, and date-wise expenses anytime.",
      icon: FileText
    },
    {
      title: "Row-Level Encryption",
      description: "Your data is stored securely using industry-standard AES encryption and isolated access rows, meaning only you can view your transactions.",
      icon: Database
    }
  ];

  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);

  // Auto-close feature popup after 5 seconds
  useEffect(() => {
    if (activeFeatureIdx === null) return;
    const timer = setTimeout(() => {
      setActiveFeatureIdx(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeFeatureIdx]);

  const activateFeature = (idx) => {
    setActiveFeatureIdx(idx);
    const element = document.getElementById("features");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // --- Pricing Toggle State ---
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' or 'annual'

  // --- FAQs Toggle States ---
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const faqs = [
    {
      q: "How does the automated verification (reconciliation) engine work?",
      a: "Accountize checks your digital record totals (bank accounts, cards) against your physical wallet manual counts. In spreadsheet templates, resolving double-entries or forgotten transactions is difficult. Accountize calculates these deviations in real-time, pointing you directly to the discrepancy so you can balance your ledger."
    },
    {
      q: "Is my financial data safe with Accountize?",
      a: "Absolutely. Accountize utilizes isolated cloud database architectures with strict row-level security checks. Plus, you can enable built-in Multi-Factor Authentication (MFA) to keep your finance summaries safe from unauthorized access."
    },
    {
      q: "Can I share my ledger with a partner or family member?",
      a: "Yes. Accountize's Shared Ledgers feature generates secure, unique tokens. You can send this access token to anyone, allowing them to view your shared accounts, track expenses together, and stay on top of the household budget."
    },
    {
      q: "Can I export my data or am I locked in?",
      a: "We believe you own your financial data. You can download your complete monthly summary, active asset details, and transactions as a professional PDF report at any time with a single click."
    },
    {
      q: "Does Accountize automatically connect to my bank accounts?",
      a: "Accountize prioritizes your privacy. Rather than reading raw bank logins, it lets you log online and cash details manually or via easy uploads, keeping you in complete control while avoiding standard banking security risks."
    }
  ];

  // --- Modals State ---
  const [modalType, setModalType] = useState(null); // 'privacy' | 'terms' | 'about' | 'contact'
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Formatter helper
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);
  };

  // Popup alignment helper to prevent mobile screen clipping
  const getPopupStyles = (idx) => {
    switch (idx) {
      case 0:
        return { transform: "translateX(-80%)", arrowLeft: "80%" };
      case 1:
        return { transform: "translateX(-75%)", arrowLeft: "75%" };
      case 2:
        return { transform: "translateX(-25%)", arrowLeft: "25%" };
      case 3:
        return { transform: "translateX(-20%)", arrowLeft: "20%" };
      case 4:
        return { transform: "translateX(-25%)", arrowLeft: "25%" };
      case 5:
        return { transform: "translateX(-75%)", arrowLeft: "75%" };
      default:
        return { transform: "translateX(-50%)", arrowLeft: "50%" };
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-slate-800 overflow-x-hidden selection:bg-blue-50 selection:text-[#2a498c]">
      {/* Fixed Navbar */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12
        ${
          scrolled
            ? "bg-white border-b border-slate-200 py-3 shadow-xs"
            : "bg-white/90 backdrop-blur-md py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-2 group">
            <img src="/logo.svg" alt="Accountize Logo" className="h-7 w-auto object-contain" />
            <span className="font-extrabold text-slate-800 text-lg md:text-xl tracking-tight">
              Accountize
            </span>
          </a>

          {/* Desktop Nav Items */}
          <ul className="hidden md:flex space-x-8 text-xs font-semibold uppercase tracking-wider">
            <li>
              <a href="#features" className="text-slate-500 hover:text-[#2a498c] transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="#simulator" className="text-slate-500 hover:text-[#2a498c] transition-colors">
                Live Sandbox
              </a>
            </li>
            <li>
              <a href="#pricing" className="text-slate-500 hover:text-[#2a498c] transition-colors">
                Pricing
              </a>
            </li>
            <li>
              <a href="#faqs" className="text-slate-500 hover:text-[#2a498c] transition-colors">
                FAQ
              </a>
            </li>
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://app.accountize.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Smartphone size={13} /> Install PWA
            </a>
            <a
              href="https://app.accountize.in/login"
              className="text-slate-500 hover:text-[#2a498c] text-xs font-semibold uppercase tracking-wider"
            >
              Log In
            </a>
            <a
              href="https://app.accountize.in/login"
              className="px-4 py-2 rounded bg-[#2a498c] text-white hover:bg-[#1e3362] transition-colors text-xs font-semibold uppercase tracking-wider"
            >
              Start Free
            </a>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <button
            aria-label="Toggle navigation menu"
            className="md:hidden flex flex-col justify-between w-6 h-4 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span
              className={`block h-0.5 w-full bg-slate-800 transition-transform duration-200 ${
                mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-slate-800 transition-opacity duration-200 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-slate-800 transition-transform duration-200 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 z-40 shadow-md">
            <div className="py-6 px-6 flex flex-col space-y-4">
              <a
                href="#features"
                className="text-sm font-semibold text-slate-700 hover:text-[#2a498c] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#simulator"
                className="text-sm font-semibold text-slate-700 hover:text-[#2a498c] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Live Sandbox
              </a>
              <a
                href="#pricing"
                className="text-sm font-semibold text-slate-700 hover:text-[#2a498c] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#faqs"
                className="text-sm font-semibold text-slate-700 hover:text-[#2a498c] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                <a
                  href="https://app.accountize.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 rounded border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Smartphone size={13} /> Install PWA
                </a>
                <a
                  href="https://app.accountize.in/login"
                  className="text-center py-2 text-sm font-semibold text-slate-700 hover:text-[#2a498c]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </a>
                <a
                  href="https://app.accountize.in/login"
                  className="text-center py-2.5 rounded bg-[#2a498c] text-white hover:bg-[#1e3362] text-xs font-semibold uppercase tracking-wider"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Free
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Stream */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative min-h-dvh w-full flex flex-col justify-center bg-white pt-24 pb-8 overflow-hidden border-b border-slate-100">
          {/* Background Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Info */}
            <div className="lg:col-span-7 text-left flex flex-col justify-center">


              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 tracking-tight leading-tight max-w-2xl">
                Take absolute control of your money,{" "}
                <span className="bg-gradient-to-r from-[#2a498c] to-[#1e3362] bg-clip-text text-transparent">
                  automatically
                </span>
                .
              </h1>

              <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-500 max-w-lg leading-relaxed">
                The modern financial ledger that replaces chaotic spreadsheets. Reconcile cash vs
                online balances, share group ledgers, and catch discrepancies automatically.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href="https://app.accountize.in/login"
                  className="group px-5 py-2.5 rounded bg-[#2a498c] text-white font-semibold text-xs uppercase tracking-wider
                  flex items-center justify-center gap-1 hover:bg-[#1e3362] transition-colors shadow-xs cursor-pointer"
                >
                  Get Started Free
                  <ChevronRight
                    size={13}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </a>
                <a
                  href="#simulator"
                  className="px-5 py-2.5 rounded border border-slate-200 bg-white text-slate-600 font-semibold text-xs uppercase tracking-wider
                  hover:bg-slate-50 hover:text-slate-800 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                >
                  Try Sandbox
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-x-6 gap-y-2 text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span>₹0 Card Needed</span>
                <span>•</span>
                <span>100% Data Ownership</span>
                <span>•</span>
                <span>MFA Secure Vault</span>
              </div>
            </div>

            {/* Hero Right: Live Interactive Sandbox Dashboard Card */}
            <div className="lg:col-span-5 w-full flex justify-center">
              <div className="w-full max-w-md relative animate-float">
                <div className="absolute inset-0 bg-[#2a498c]/5 blur-3xl rounded-full pointer-events-none" />

                {/* Dashboard Card Container */}
                <div className="relative bg-white border border-slate-200 rounded-lg shadow-md overflow-hidden w-full">
                  {/* Mockup Header */}
                  <div className="h-11 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-4">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded px-3 py-0.5 text-[10px] text-slate-400 select-none">
                      accountize.in/sandbox
                    </div>
                    <div className="w-6" />
                  </div>

                  {/* Mockup Body */}
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Financial Sandbox
                        </h3>
                        <p className="text-[10px] text-slate-400">Interactive App Preview</p>
                      </div>
                      <button
                        onClick={resetSimulator}
                        className="px-2 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-[10px] font-bold text-slate-500 flex items-center gap-1.5 transition-colors"
                        title="Reset Simulator"
                      >
                        <RefreshCw size={10} /> Reset
                      </button>
                    </div>

                    {/* Stats Rows */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="border border-slate-100 rounded p-3 bg-slate-50/50">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                            Net Available
                          </span>
                          <Wallet size={12} className="text-slate-400" />
                        </div>
                        <div className="text-base font-bold text-[#2a498c]">
                          {formatCurrency(balance)}
                        </div>
                      </div>
                      <div className="border border-slate-100 rounded p-3 bg-slate-50/50">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                            Receivables
                          </span>
                          <TrendingUp size={12} className="text-slate-400" />
                        </div>
                        <div className="text-base font-bold text-slate-700">
                          {formatCurrency(receivables)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="border border-slate-100 rounded p-2 text-center bg-white">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                          Cash-In-Hand
                        </span>
                        <div className="text-xs font-bold text-slate-700 mt-0.5">
                          {formatCurrency(cash)}
                        </div>
                      </div>
                      <div className="border border-slate-100 rounded p-2 text-center bg-white">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                          Online Accounts
                        </span>
                        <div className="text-xs font-bold text-slate-700 mt-0.5">
                          {formatCurrency(online)}
                        </div>
                      </div>
                      <div className="border border-slate-100 rounded p-2 text-center bg-white">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                          Total Spent
                        </span>
                        <div className="text-xs font-bold text-red-500 mt-0.5">
                          {formatCurrency(totalSpent)}
                        </div>
                      </div>
                    </div>

                    {/* Spending Trend Graph (Recharts Visual Sparkline) */}
                    <div className="border border-slate-100 rounded p-2.5 bg-slate-50/50 mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                          7-Day Spending Pattern
                        </span>
                        <span className="text-[8px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                          Recharts Graph
                        </span>
                      </div>
                      <div className="h-16 w-full mt-1">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={sparklineData}>
                            <defs>
                              <linearGradient id="sandboxGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#94a3b8' }} />
                            <Tooltip contentStyle={{ background: '#0f172a', borderRadius: '4px', color: '#fff', fontSize: '9px', border: 'none', padding: '4px 8px' }} formatter={(v) => [`₹${v}`, 'Spent']} />
                            <Area type="monotone" dataKey="spend" stroke="#6366f1" strokeWidth={1.5} fillOpacity={1} fill="url(#sandboxGrad)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Transaction Logs */}
                    <div className="border border-slate-100 rounded p-3 bg-slate-50/30 mb-3">
                      <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        <span>Transaction Logs</span>
                        <span>Auto-Syncing</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {recentLogs.map((log) => (
                          <div
                            key={log.id}
                            className="flex justify-between items-center text-[11px] pb-1.5 border-b border-slate-100 last:border-0 last:pb-0"
                          >
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  log.type === "credit" ? "bg-emerald-500" : "bg-red-400"
                                }`}
                              />
                              <span className="font-semibold text-slate-700">{log.desc}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] text-slate-400">{log.date}</span>
                              <span
                                className={`font-bold ${
                                  log.type === "credit" ? "text-emerald-600" : "text-red-500"
                                }`}
                              >
                                {log.type === "credit" ? "+" : "-"}
                                {formatCurrency(log.amount)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Math Split Showcase Evaluator */}
                    <div className="border border-indigo-100 bg-indigo-50/40 rounded p-2.5 mb-4 text-left">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1">
                          <Calculator size={10} /> Math Split Evaluator
                        </span>
                        <span className="text-[9px] text-indigo-600 font-bold bg-white border border-indigo-100 px-1.5 py-0.5 rounded">
                          Result: ₹{parsedMath}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={mathInput}
                          onChange={(e) => setMathInput(e.target.value)}
                          className="w-full bg-white border border-indigo-200 rounded px-2 py-0.5 text-xs text-slate-700 font-mono focus:outline-none focus:border-indigo-500"
                          placeholder="Try 200+150+50"
                        />
                      </div>
                    </div>

                    {/* Interaction Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={logSampleExpense}
                        className="flex-1 py-1.5 rounded bg-[#2a498c] hover:bg-[#1e3362] text-white text-[10px] font-semibold uppercase tracking-wider transition-colors"
                      >
                        Spend ₹600
                      </button>
                      <button
                        onClick={settleSampleReceivable}
                        disabled={receivables <= 0}
                        className="flex-1 py-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 text-[10px] font-semibold uppercase tracking-wider text-slate-600 transition-colors"
                      >
                        Collect ₹1.2k
                      </button>
                      <button
                        onClick={receiveSampleCash}
                        className="flex-1 py-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-semibold uppercase tracking-wider text-slate-600 transition-colors"
                      >
                        +₹1k Cash
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REBRANDED INTERACTIVE CTA BANNER 1 */}
        <section className="bg-slate-900 text-white py-12 px-6 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-5" aria-hidden="true">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Ready to upgrade your finance tracking?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              Bring clarity to your personal ledgers and collaborate on budget planning seamlessly.
            </p>
            <div className="mt-5">
              <a
                href="https://app.accountize.in/login"
                className="inline-block px-5 py-2.5 rounded bg-[#2a498c] text-white hover:bg-[#1e3362] transition-colors text-xs font-semibold uppercase tracking-wider"
              >
                Start Your Ledger
              </a>
            </div>
          </div>
        </section>

        {/* ORBIT FEATURES WHEEL SECTION */}
        <section className="py-20 px-6 bg-slate-50/50 border-b border-slate-100" id="features">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Rotating Wheel */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="orbit-container">
                <div
                  className="wheel-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveFeatureIdx(null);
                  }}
                  title="Click to reset rotation"
                >
                  <img src="/logo.svg" alt="Accountize Logo" className="wheel-logo" />
                </div>

                <div className="wheel-orbit-ring" />

                <div className="wheel-orbit">
                  {features.map((feat, idx) => {
                    const angle = (idx * 360) / features.length;
                    const Icon = feat.icon;
                    const popupStyle = getPopupStyles(idx);
                    return (
                      <button
                        key={idx}
                        className={`orbit-item ${activeFeatureIdx === idx ? "active" : ""}`}
                        style={{ "--angle": `${angle}deg` }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveFeatureIdx(idx);
                        }}
                        aria-label={feat.title}
                      >
                        <div className="orbit-icon-wrapper">
                          <Icon size={18} />

                          {activeFeatureIdx === idx && (
                            <div
                              className="orbit-popup-cloud-positioner"
                              style={{ transform: popupStyle.transform }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="orbit-popup-cloud">
                                <div
                                  className="popup-arrow"
                                  style={{ left: popupStyle.arrowLeft }}
                                />
                                <div className="popup-header">
                                  <h4 className="popup-title">{feat.title}</h4>
                                </div>
                                <p className="popup-desc">{feat.description}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Features Content */}
            <div className="lg:col-span-6 text-left flex flex-col justify-center">
              <span className="text-[#2a498c] text-xs font-bold uppercase tracking-widest mb-2 block">
                Product Features
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight leading-tight">
                Designed for clarity. Engineered for accuracy.
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-lg">
                Say goodbye to confusing bank statements and manual spreadsheet reconciliation.
                Explore our robust ledger feature set. Click any icon on the orbit
                wheel to see details.
              </p>
            </div>
          </div>
        </section>

        {/* DOUBLE-ENTRY SIMULATOR SECTION */}
        <section className="py-20 px-6 bg-white border-b border-slate-100" id="simulator">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Info: Reconciliation Explainers */}
            <div className="lg:col-span-6 text-left">
              <span className="text-[#2a498c] text-xs font-bold uppercase tracking-widest mb-2 block">
                Balance Verification
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight leading-tight">
                Automate your balance verification
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-lg mb-6">
                In standard spreadsheets, detecting a bank error or unlogged cash expense requires
                auditing dozens of rows line-by-line.
                <br />
                <br />
                Accountize's signature **Double-Entry Verification** compares bank/card statements with
                your actual physical count to highlight discrepancies. Use the presets below to see
                how our matching engine identifies errors.
              </p>

              {/* Preset Buttons */}
              <div className="flex flex-col gap-2.5 max-w-md">
                <button
                  onClick={setPresetMatch}
                  className="w-full text-left p-3 rounded border border-slate-200 hover:border-[#2a498c] bg-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <div>
                      <span className="font-semibold text-slate-700 text-xs sm:text-sm block">
                        Preset: Balanced Statement
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-400">
                        Digital records match physical wallet logs exactly.
                      </span>
                    </div>
                  </div>
                </button>

                <button
                  onClick={setPresetMissingCash}
                  className="w-full text-left p-3 rounded border border-slate-200 hover:border-[#2a498c] bg-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <div>
                      <span className="font-semibold text-slate-700 text-xs sm:text-sm block">
                        Preset: Missing Cash Log
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-400">
                        Wallet is short by ₹350. Highlights unlogged cash spend.
                      </span>
                    </div>
                  </div>
                </button>

                <button
                  onClick={setPresetDoubleCharge}
                  className="w-full text-left p-3 rounded border border-slate-200 hover:border-[#2a498c] bg-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <div>
                      <span className="font-semibold text-slate-700 text-xs sm:text-sm block">
                        Preset: Card Double-Charge
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-400">
                        Digital ledger is higher than physical. Highlights duplicate card charge.
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Right: Interactive Sandbox Calculator */}
            <div className="lg:col-span-6 w-full flex justify-center">
              <div className="w-full max-w-md border border-slate-200 rounded-lg p-6 bg-slate-50/30 shadow-xs">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-5">
                  Double-Entry Verification Simulator
                </h3>

                <div className="mb-4">
                  <label className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                    <span>Digital Ledger Total (Bank + Card Logs)</span>
                    <span className="text-[#2a498c] font-bold">Syncing</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs select-none">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={digitalLedger}
                      onChange={(e) => setDigitalLedger(Number(e.target.value))}
                      className="w-full pl-7 pr-4 py-2 border border-slate-200 bg-white rounded text-sm text-slate-700 focus:outline-none focus:border-[#2a498c]"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                    <span>Physical Cash / Passbook Check</span>
                    <span className="text-slate-400">Manual entry</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs select-none">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={physicalWallet}
                      onChange={(e) => setPhysicalWallet(Number(e.target.value))}
                      className="w-full pl-7 pr-4 py-2 border border-slate-200 bg-white rounded text-sm text-slate-700 focus:outline-none focus:border-[#2a498c]"
                    />
                  </div>
                </div>

                {isVerified ? (
                  <div className="p-4 border border-emerald-100 rounded bg-emerald-50/50 flex gap-3 text-emerald-800">
                    <div className="p-1.5 rounded bg-emerald-100 h-fit text-emerald-700">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider">Ledger Verified</h4>
                      <p className="text-[11px] mt-0.5 opacity-90 leading-relaxed">
                        Digital records match your physical count exactly. Perfect alignment.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border border-red-100 rounded bg-red-50/50 flex gap-3 text-red-800">
                    <div className="p-1.5 rounded bg-red-100 h-fit text-red-600">
                      <ShieldAlert size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider">
                        Verification Failed
                      </h4>
                      <p className="text-[11px] mt-0.5 opacity-90 leading-relaxed">
                        Discrepancy of <strong>{formatCurrency(Math.abs(difference))}</strong> found.
                        {difference > 0
                          ? " Digital ledger is higher than cash check. Check for bank double-charges or missing cash deposit logs."
                          : " Physical cash check is higher than digital. Check for unlogged online expenses."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section className="py-20 px-6 bg-slate-50/50 border-b border-slate-100" id="pricing">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[#2a498c] text-xs font-bold uppercase tracking-widest mb-2 block">
                Simple Pricing
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                Transparent plans. No hidden commissions.
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Choose the level that matches your needs. Get started for free, upgrade when you need
                multi-user collaboration.
              </p>

              {/* Monthly/Annual toggle button */}
              <div className="mt-6 flex justify-center items-center gap-3">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    billingCycle === "monthly" ? "text-slate-800" : "text-slate-400"
                  }`}
                >
                  Monthly
                </span>
                <button
                  onClick={() =>
                    setBillingCycle((prev) => (prev === "monthly" ? "annual" : "monthly"))
                  }
                  className="w-12 h-6 rounded-full bg-[#2a498c] relative transition-colors focus:outline-none"
                  aria-label="Toggle billing cycle"
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all ${
                      billingCycle === "annual" ? "translate-x-6" : ""
                    }`}
                  />
                </button>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
                    billingCycle === "annual" ? "text-slate-800" : "text-slate-400"
                  }`}
                >
                  Annual{" "}
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                    Save 33%
                  </span>
                </span>
              </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
              {/* Card 1: Starter Free */}
              <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 flex flex-col hover:shadow-md transition-shadow relative">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Starter Ledger
                </h3>
                <div className="mt-3 text-3xl font-bold text-slate-800">
                  ₹0 <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <p className="mt-2 text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                  Generous personal finance & collaborative expense tracking to get started.
                </p>

                <div className="border-t border-slate-100 my-4" />

                <ul className="flex flex-col gap-2.5 text-xs text-slate-500 mb-6 flex-1">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#2a498c]" />
                    <span>Up to 10 Custom Accounts (Cash, Online, Banks)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#2a498c]" />
                    <span>Up to 3 Active 2-Way Shared Ledger Links</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#2a498c]" />
                    <span>Cash & Online Statement Fault Reconciliation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#2a498c]" />
                    <span>Automated Monthly Expense Settlements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#2a498c]" />
                    <span>Interactive Bar & Trend Spending Charts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#2a498c]" />
                    <span>Multi-Factor Authentication (MFA / TOTP)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#2a498c]" />
                    <span>Installable PWA Mobile & Desktop Access</span>
                  </li>
                </ul>

                <a
                  href="https://app.accountize.in/login"
                  className="block text-center py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600 rounded transition-colors"
                >
                  Start Free
                </a>
              </div>

              {/* Card 2: Pro Plan (Popular) */}
              <div className="bg-white border-2 border-[#2a498c] rounded-lg p-6 sm:p-8 flex flex-col hover:shadow-md transition-shadow relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded bg-[#2a498c] text-white text-[9px] font-bold uppercase tracking-wider">
                  Recommended
                </span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2a498c]">
                  Pro Ledger
                </h3>
                <div className="mt-3 text-3xl font-bold text-slate-800">
                  {billingCycle === "monthly" ? "₹149" : "₹1,199"}{" "}
                  <span className="text-xs text-slate-400 font-normal">
                    / {billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                {billingCycle === "annual" && (
                  <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                    Just ₹100/month (billed annually)
                  </p>
                )}
                <p className="mt-2 text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                  Unlimited capacity, professional PDF statement exports, and daily budget overrun benchmarks.
                </p>

                <div className="border-t border-slate-100 my-4" />

                <ul className="flex flex-col gap-2.5 text-xs text-slate-500 mb-6 flex-1">
                  <li className="flex items-center gap-2 font-medium text-slate-700">
                    <Check size={14} className="text-[#2a498c]" />
                    <span>Unlimited Accounts (Cash, Online, Banks, Debtors)</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium text-slate-700">
                    <Check size={14} className="text-[#2a498c]" />
                    <span>Unlimited Shared Ledger Links & 2-Way Sync</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium text-slate-700">
                    <Check size={14} className="text-[#2a498c]" />
                    <span>Professional PDF Financial Statement Export</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium text-slate-700">
                    <Check size={14} className="text-[#2a498c]" />
                    <span>Target Per-Day Budget Benchmark & Overrun Alert</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <Check size={14} className="text-[#2a498c]" />
                    <span>30-Day Free Pro Trial Included on Signup</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <Check size={14} className="text-[#2a498c]" />
                    <span>Priority Support & Early Feature Access</span>
                  </li>
                </ul>

                <a
                  href="https://app.accountize.in/login"
                  className="block text-center py-2.5 bg-[#2a498c] hover:bg-[#1e3362] text-xs font-semibold uppercase tracking-wider text-white rounded transition-colors"
                >
                  Start 30-Day Free Trial
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQS SECTION */}
        <section className="py-20 px-6 bg-white" id="faqs">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[#2a498c] text-xs font-bold uppercase tracking-widest mb-2 block">
                FAQ
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                Got questions? We've got answers.
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Learn more about how Accountize's double-entry model simplifies your financial tracking.
              </p>
            </div>

            {/* Accordion List */}
            <div className="flex flex-col gap-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex justify-between items-center p-4 bg-slate-50/50 hover:bg-slate-50 text-left transition-colors"
                    >
                      <span className="font-semibold text-slate-700 text-xs sm:text-sm">{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp size={16} className="text-slate-400" />
                      ) : (
                        <ChevronDown size={16} className="text-slate-400" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-5" aria-hidden="true">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight max-w-lg">
              Upgrade your finance tracking today
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Reconcile physical counts with card statements in minutes. Save time, stop bank double-charges, and take control of your financial destiny.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="https://app.accountize.in/login"
                className="px-5 py-2.5 rounded bg-white hover:bg-slate-100 text-[#2a498c] transition-colors text-xs font-semibold uppercase tracking-wider shadow-sm text-center"
              >
                Create Free Account
              </a>
              <a
                href="#simulator"
                className="px-5 py-2.5 rounded border border-slate-700 bg-transparent hover:bg-slate-800 text-white transition-colors text-xs font-semibold uppercase tracking-wider text-center"
              >
                Try Sandbox Demo
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <img src="/logo.svg" alt="Accountize Logo" className="h-6 w-auto" />
              <span className="font-extrabold text-slate-800 text-base">Accountize</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Reconcile balances, detect ledger errors, and collaborate on expenses effortlessly. The modern Excel replacement.
            </p>
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Product</h4>
            <a href="#features" className="text-xs text-slate-500 hover:text-[#2a498c]">
              Features
            </a>
            <a href="#simulator" className="text-xs text-slate-500 hover:text-[#2a498c]">
              Sandbox Demo
            </a>
            <a href="#pricing" className="text-xs text-slate-500 hover:text-[#2a498c]">
              Pricing Plans
            </a>
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Security</h4>
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                activateFeature(5);
              }}
              className="text-xs text-slate-500 hover:text-[#2a498c]"
            >
              Data Encryption
            </a>
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                activateFeature(3);
              }}
              className="text-xs text-slate-500 hover:text-[#2a498c]"
            >
              MFA Settings
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setModalType("privacy");
                setContactSubmitted(false);
              }}
              className="text-xs text-slate-500 hover:text-[#2a498c]"
            >
              Privacy Policy
            </a>
          </div>

          <div className="md:col-span-3 flex flex-col gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Company</h4>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setModalType("about");
                setContactSubmitted(false);
              }}
              className="text-xs text-slate-500 hover:text-[#2a498c]"
            >
              About Us
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setModalType("contact");
                setContactSubmitted(false);
              }}
              className="text-xs text-slate-500 hover:text-[#2a498c]"
            >
              Contact Support
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setModalType("terms");
                setContactSubmitted(false);
              }}
              className="text-xs text-slate-500 hover:text-[#2a498c]"
            >
              Terms of Service
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400">
          <span>&copy; {new Date().getFullYear()} Accountize. All rights reserved. <br /> In collaboration with <a href="https://inexarum.in/" target="_blank" rel="noopener noreferrer" className="hover:underline text-slate-500 font-medium transition-colors">iNexarum Pvt. Ltd.</a></span>
          <div className="flex gap-4">
            <span>Corporate Address: Meerut, Uttar Pradesh India</span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {modalType && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={() => setModalType(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-lg shadow-lg w-full max-w-md overflow-hidden animate-scaleReveal relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4.5 right-4.5 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {modalType === "about" && (
              <div className="p-6">
                <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider mb-3">
                  About Accountize
                </h3>
                <div className="text-xs sm:text-sm text-slate-500 space-y-3 leading-relaxed">
                  <p>
                    Accountize was built by Team of Accountize in collaboration with <a href="https://inexarum.in/" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-[#2a498c] transition-colors">iNexarum Pvt. Ltd.</a> to rescue professionals,
                    families, and freelancers from static spreadsheets and complex accounting software.
                    Our mission is to bring double-entry financial reconciliation into a beautifully designed,
                    real-time ledger platform that just works.
                  </p>
                  <p>
                    Our team is dedicated to designing intuitive financial tools that prioritize user
                    ownership, data sovereignty, and cryptographic security.
                  </p>
                </div>
              </div>
            )}

            {modalType === "privacy" && (
              <div className="p-6">
                <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider mb-3">
                  Privacy Policy
                </h3>
                <div className="text-xs sm:text-sm text-slate-500 space-y-3 leading-relaxed">
                  <p>
                    Your financial privacy is our highest priority. We do not sell your personal or
                    transactional data, nor do we track your credentials.
                  </p>
                  <p>
                    All ledger details stored in Accountize are protected with row-level database
                    rules and standard AES encryption. You can export your data as a professional PDF report
                    at any time, or permanently delete your account and all associated ledgers with a
                    single click.
                  </p>
                </div>
              </div>
            )}

            {modalType === "terms" && (
              <div className="p-6">
                <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider mb-3">
                  Terms of Service
                </h3>
                <div className="text-xs sm:text-sm text-slate-500 space-y-3 leading-relaxed">
                  <p>
                    By using Accountize, you agree to manage your financial ledger and collaborative
                    read-only tokens responsibly.
                  </p>
                  <p>
                    Accountize is designed as an interactive sandbox and personal finance tracking
                    tool. We do not provide professional financial advice, tax auditing, or legal
                    consulting. Always consult a certified accountant for critical business auditing.
                  </p>
                </div>
              </div>
            )}

            {modalType === "contact" && (
              <div className="p-6">
                <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider mb-3">
                  Contact Support
                </h3>
                {contactSubmitted ? (
                  <div className="text-center py-4 flex flex-col items-center">
                    <div className="p-3 rounded-full bg-emerald-100 text-emerald-600 mb-3">
                      <Check size={24} />
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm">Message Sent!</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs">
                      Thank you for reaching out. A support representative will review your message
                      and reply via email within 24 hours.
                    </p>
                    <button
                      onClick={() => setModalType(null)}
                      className="mt-5 px-5 py-2.5 bg-[#2a498c] hover:bg-[#1e3362] text-white text-xs font-semibold uppercase tracking-wider rounded"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setContactSubmitted(true);
                    }}
                    className="flex flex-col gap-3.5 mt-2"
                  >
                    <p className="text-xs text-slate-400 leading-normal">
                      Have questions about double-entry verification or collaborative shared
                      ledgers? Let us know how we can help.
                    </p>
                    <div>
                      <label htmlFor="contact-name" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:border-[#2a498c]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:border-[#2a498c]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="How can we help you?"
                        rows={3}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:border-[#2a498c]"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#2a498c] hover:bg-[#1e3362] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
