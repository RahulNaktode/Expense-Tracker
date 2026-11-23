import { ShieldCheck, Database, Heart, Lock } from "lucide-react";

function Footer({ t }) {
  return (
    <footer className="relative border-t border-slate-600 bg-slate-600 text-slate-300 font-sans">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md">
        <div className="max-w-[1180px] mx-auto px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="flex items-center gap-2 font-mono text-slate-200">
              <Database size={14} className="text-cyan-400" />
              <span>Database Connected</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            {[
              { name: "Google Safe Browsing", status: "Active" },
              { name: "VirusTotal Engine", status: "Connected" },
              { name: "PhishTank Feed", status: "Live" }
            ].map((feed, i) => (
              <div 
                key={i} 
                className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1 rounded-full text-slate-200 transition-all cursor-default"
              >
                <ShieldCheck size={12} className="text-cyan-400" />
                <span>{feed.name}</span>
                <span className="text-[9px] bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded font-sans">
                  {feed.status}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Main Footer Layout */}
      <div className="max-w-[1180px] mx-auto px-6 pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800 text-xs">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-base tracking-wide">
              <div className="p-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
                <Lock size={16} />
              </div>
              <span>QRShield<span className="text-cyan-400">.ai</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              AI-driven heuristic analyzer detecting quishing threats, malicious redirects, and UPI payee spoofing in real time.
            </p>
          </div>

          {/* Column 2: Protection Modules */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase font-mono text-cyan-400">
              Protection
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li className="hover:text-cyan-300 transition-colors cursor-pointer">
                <span>UPI Payee Verification</span>
              </li>
              <li className="hover:text-cyan-300 transition-colors cursor-pointer">
                <span>Phishing Link Detection</span>
              </li>
              <li className="hover:text-cyan-300 transition-colors cursor-pointer">
                <span>Voice Warning Alerts</span>
              </li>
            </ul>
          </div>

          {/* Column 3: System Status Card */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase font-mono text-cyan-400">
              Status
            </h4>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400">API Latency</span>
                <span className="text-emerald-400 font-mono">~24ms</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full w-[88%]" />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-400">
          <p className="text-xs text-slate-400 font-mono tracking-wide">
            &copy; {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">QRShield</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart size={12} className="text-red-500 fill-red-500" />
            <span>for Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;