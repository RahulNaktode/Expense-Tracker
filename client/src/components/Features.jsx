import React from "react";
import { User, UserCheck, PlusCircle, BarChart3, CalendarDays, Download} from "lucide-react";

  const coreFeatures = [

    {
      title: "Comprehensive User Profile",
      desc: "Access a dedicated profile view containing account specific metrics, configurations, registration details, and security parameters in one central hub.",
      icon: <User size={24} />,
      iconBg: "bg-indigo-100 text-indigo-600"
    },
    {
      title: "Update Profile Functionality",
      desc: "Effortlessly update personal details, update credentials, change system settings, or adjust access criteria with instantaneous record synchronization.",
      icon: <UserCheck size={24} />,
      iconBg: "bg-purple-100 text-purple-600"
    },
    {
      title: "Add & Manage Transactions",
      desc: "Seamlessly log incoming revenue streams and operational costs. Real-time categorization and custom tagging remove structural bookkeeping friction.",
      icon: <PlusCircle size={24} />,
      iconBg: "bg-emerald-100 text-emerald-600"
    },
    {
      title: "Dashboard Overview",
      desc: "Provides a high-level analytics viewport computing total balances, monthly incoming streams, and aggregated outgoing distributions instantly upon access.",
      icon: <BarChart3 size={24} />,
      iconBg: "bg-amber-100 text-amber-600"
    },
    {
      title: "Monthly Tracking & Analytics",
      desc: "Organizes history into granular monthly reports, providing structural financial visibility to identify key saving avenues and spending anomalies.",
      icon: <CalendarDays size={24} />,
      iconBg: "bg-rose-100 text-rose-600"
    },
    {
      title: "Excel Data Export (.xlsx)",
      desc: "Provides clean tabular asset output. Export comprehensive transaction databases directly into professional Excel format with one click.",
      icon: <Download size={24} />,
      iconBg: "bg-teal-100 text-teal-600"
    }
  ];

function Features() {
    return (
        <section className="bg-white py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Enterprise Grade Asset Management Features
            </h2>
            <p className="text-slate-500">
              A comprehensive system built around precision logging, structured balance assessments, and zero operational overhead.
            </p>
          </div>

          {/* Features Layout Array Mapping */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 bg-slate-50 rounded-2xl hover:shadow-md transition duration-200 flex flex-col justify-between border border-slate-100/80"
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-xl w-fit ${feature.iconBg}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}

export default Features;