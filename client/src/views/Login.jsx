import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { loginStyles } from "../assets/dummyStyles.js"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

function Login({ onLogin }) {
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    const navigate = useNavigate();

    const checkUserLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:8000/user/login", userLogin);
            
            if (response.data.success) {
                toast.success(response.data.message || "Login Successful!", { id: "loginSuccess" });
                
                const { jwtToken, data } = response.data;

                setUserLogin({ email: "", password: "" });

                if (onLogin) {
                    onLogin(data, jwtToken, rememberMe);
                } else {
                    if (rememberMe) {
                        localStorage.setItem("token", jwtToken);
                        localStorage.setItem("user", JSON.stringify(data));
                    } else {
                        sessionStorage.setItem("token", jwtToken);
                        sessionStorage.setItem("user", JSON.stringify(data));
                    }
                    navigate("/");
                }
            } else {
                toast.error(response.data.message || "Invalid account credentials.", { id: "loginError" });
            }
        } catch (err) {
            const serverErrorMessage = err.response?.data?.message || "Server connection failed. Try again.";
            toast.error(serverErrorMessage, { id: "loginError" });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={loginStyles.pageContainer}>
            <div className={loginStyles.cardContainer}>
                <div className={loginStyles.header}>
                    <div className={loginStyles.avatar}>
                        <User className="w-10 h-10 text-white" />
                    </div>
                    <h1 className={loginStyles.headerTitle}>Welcome Back</h1>
                    <p className={loginStyles.headerSubtitle}>Sign in to your Expense Tracker account</p>
                </div>

                <div className={loginStyles.formContainer}>
                    <form onSubmit={checkUserLogin}>
                        <div className="mb-6">
                            <label htmlFor="email" className={loginStyles.label}>Email Address</label>
                            <div className={loginStyles.inputContainer}>
                                <div className={loginStyles.inputIcon}>
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={userLogin.email}
                                    onChange={(e) => setUserLogin({...userLogin, email: e.target.value})}
                                    className={loginStyles.input}
                                    placeholder="your@example.com" 
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className={loginStyles.label}>Password</label>
                            <div className={loginStyles.inputContainer}>
                                <div className={loginStyles.inputIcon}>
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"} 
                                    id="password"
                                    required
                                    value={userLogin.password}
                                    onChange={(e) => setUserLogin({...userLogin, password: e.target.value})}
                                    className={loginStyles.input}
                                    placeholder="••••••••" 
                                />

                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)} 
                                    className={loginStyles.passwordToggle}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className={loginStyles.checkboxContainer}>
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className={loginStyles.checkbox}
                            />
                            <label htmlFor="rememberMe" className={loginStyles.checkboxLabel}>
                                Remember Me
                            </label>
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className={`${loginStyles.button} ${isLoading ? 'opacity-70 cursor-not-allowed' : ""}`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </div>
                            ) : "Login"}
                        </button>
                    </form>

                    <div className={loginStyles.signUpContainer}>
                        <p className={loginStyles.signUpText}>
                            Don't have an account?{" "}
                            <Link to="/signup" className={loginStyles.signUpLink}>
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    )
}

export default Login;