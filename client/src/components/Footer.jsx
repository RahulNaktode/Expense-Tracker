import { Home, BarChart3, ArrowUp, ArrowDown, User } from 'lucide-react';
import { useNavigate } from 'react-router';

function Button({ name, onClick, icon: Icon }) {
    return (
        <div>
            <button
                onClick={onClick}
                className="hover:text-cyan-700 hover:transition-colors hover:translate-y-[-2px] text-slate-500 transition-colors flex flex-col items-center gap-1"
            >
                <Icon size={20} />
                <span>{name}</span>
            </button>
        </div>
    )
}

function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="bg-slate-900 text-white py-6 border-t border-slate-700">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-around items-center gap-6 mb-6">
                    <div className="max-w-md text-center md:text-left">
                        <h2 className="text-2xl text-white md:text-3xl font-[550] lobster-regular ">
                            Expense Tracker
                        </h2>
                        <hr className="border-slate-700 my-3" />
                        <p className="text-sm text-slate-400 leading-relaxed">
                            A secure architecture designed to map financial pipelines, manage complex budgets, and establish absolute structural transparency over cash flow metrics.
                        </p>
                    </div>

                    <div className="flex items-center justify-around text-xs font-semibold text-gray-400 gap-6 sm:gap-9 w-full md:w-auto">
                        <Button name="Home" onClick={() => navigate("/home")} icon={Home} />
                        <Button name="Dashboard" onClick={() => navigate("/dashboard")} icon={BarChart3} />
                        <Button name="Income" onClick={() => navigate("/income")} icon={ArrowUp} />
                        <Button name="Expenses" onClick={() => navigate("/expenses")} icon={ArrowDown} />
                        <Button name="Profile" onClick={() => navigate("/profile")} icon={User} />
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