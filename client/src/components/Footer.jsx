import { Home, BarChart3, ArrowUp, ArrowDown, User } from 'lucide-react';
import { useNavigate } from 'react-router';

function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="bg-gray-700 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-around items-center gap-6 mb-6">
                    <div className="max-w-md text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-[550] lobster-regular">
                            Expense Tracker
                        </h2>
                        <hr className="border-gray-600 my-3" />
                        <p className="text-sm text-gray-400 leading-relaxed">
                            A secure architecture designed to map financial pipelines, manage complex budgets, and establish absolute structural transparency over cash flow metrics.
                        </p>
                    </div>

                    <div className="flex items-center justify-around text-xs font-semibold text-gray-400 gap-6 sm:gap-9 w-full md:w-auto">
                        <button 
                            onClick={() => navigate('/')} 
                            className="hover:text-white text-white transition-colors flex flex-col items-center gap-1"
                        >
                            <Home size={20} />
                            <span>Home</span>
                        </button>
                        <button 
                            onClick={() => navigate('/dashboard')} 
                            className="hover:text-white transition-colors flex flex-col items-center gap-1"
                        >
                            <BarChart3 size={20} />
                            <span>Dashboard</span>
                        </button>
                        <button 
                            onClick={() => navigate('/income')} 
                            className="hover:text-white transition-colors flex flex-col items-center gap-1"
                        >
                            <ArrowUp size={20} />
                            <span>Income</span>
                        </button>
                        <button 
                            onClick={() => navigate('/expense')} 
                            className="hover:text-white transition-colors flex flex-col items-center gap-1"
                        >
                            <ArrowDown size={20} />
                            <span>Expense</span>
                        </button>
                        <button 
                            onClick={() => navigate('/profile')} 
                            className="hover:text-white transition-colors flex flex-col items-center gap-1"
                        >
                            <User size={20} />
                            <span>Profile</span>
                        </button>
                    </div>
                </div>

                <hr className="border-gray-600 my-4" />
                <p className="text-center text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;