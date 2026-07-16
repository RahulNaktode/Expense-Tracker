import React from 'react';
import { 
  Wallet,  
  ArrowRight, 
  TrendingUp, 
  Sparkles 
} from 'lucide-react';
import Features from '../components/Features.jsx';
import { Link, useNavigate, useOutletContext } from 'react-router';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const Homepage = ({ onLogout, user }) => {
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      <Navbar onLogout={onLogout} user={user} />
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center lg:text-left lg:flex lg:items-center lg:gap-12">
        <div className="lg:w-1/2 space-y-6">
          <div className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
            <Sparkles size={14} /> Comprehensive Fiscal Utility
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Track Your Expenses. <span className="bg-gradient-to-r from-cyan-600 to-slate-700 bg-clip-text text-transparent">Save Your Money.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
            A secure architecture designed to map financial pipelines, manage complex budgets, and establish absolute structural transparency over cash flow metrics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/dashboard" className="bg-gradient-to-r from-slate-700 to-cyan-600 hover:from-slate-800 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group">
              Get Started Now <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </div>

        {/* Dashboard Preview Interface Mock */}
        <div className="lg:w-2/3 mt-12 lg:mt-0">
          <div className="bg-gradient-to-tr from-slate-800 via-cyan-700 to-sky-500 p-4 rounded-3xl shadow-2xl">
            <div className="bg-white rounded-2xl p-6 shadow-inner space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Net Available Balance</p>
                  <p className="text-2xl font-bold text-slate-800">$4,520.00</p>
                </div>
                <span className="bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                  <TrendingUp size={14} /> +12.4% Performance
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm font-medium">Operational Expenses</span>
                  <span className="font-semibold text-red-500">-$1,200.00</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm font-medium">Verified Allocations</span>
                  <span className="font-semibold text-green-500">+$6,000.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Features />

      <Footer />

    </div>
  );
};

export default Homepage;