import React, { useState } from 'react';
import { signupStyles } from "../assets/dummyStyles.js";
import { useNavigate } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { User, Mail, ArrowLeft, EyeOff, Eye, Lock } from 'lucide-react';
import { Link } from "react-router";

function Signup() {
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserSignup(prev => ({ ...prev, [name]: value }));
    };

    const createUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            const response = await axios.post("http://localhost:8000/user/signup", userSignup);

            if (response.data.success) {
                toast.success(response.data.message, { id: "signupSuccess" });
                setUserSignup({ name: "", email: "", password: "" });

                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                toast.error(response.data.message || "Signup failed");
            }
        } catch (error) {
            const apiMsg = error.response?.data?.message || "Something went wrong";
            toast.error(apiMsg);
            setErrors({ api: apiMsg });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={signupStyles.pageContainer}>
            <Toaster position="top-center" />
            <div className={signupStyles.cardContainer}>
                <div className={signupStyles.header}>
                    <button onClick={() => navigate("/login")} className={signupStyles.backButton}>
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className={signupStyles.avatar}>
                        <User className="w-10 h-10 text-white" />
                    </div>
                    <h1 className={signupStyles.headerTitle}>Create Account</h1>
                    <p className={signupStyles.headerSubtitle}>Join ExpenseTracker to manage your finances</p>
                </div>

                <div className={signupStyles.formContainer}>
                    {errors.api && <p className={signupStyles.apiError}>{errors.api}</p>}

                    <form onSubmit={createUser} noValidate>
                        <div className="mb-6">
                            <label htmlFor='name' className={signupStyles.label}>Full Name</label>
                            <div className={signupStyles.inputContainer}>
                                <div className={signupStyles.inputIcon}>
                                    <User className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={userSignup.name}
                                    onChange={handleChange}
                                    className={`${signupStyles.input} ${errors.name ? "border-red-500" : ""}`}
                                    placeholder="John Doe"
                                    required
                                />
                                {errors.name && (<p className={signupStyles.fieldError}>{errors.name}</p>)}
                            </div>
                            </div>

                            <div className="mb-6">
                            <label htmlFor='email' className={signupStyles.label}>Email Address</label>
                            <div className={signupStyles.inputContainer}>
                                <div className={signupStyles.inputIcon}>
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={userSignup.email}
                                    onChange={handleChange}
                                    className={`${signupStyles.input} ${errors.email ? "border-red-500" : ""}`}
                                    placeholder="jane.doe@example.com"
                                    required
                                />
                                {errors.email && (<p className={signupStyles.fieldError}>{errors.email}</p>)}
                            </div>
                            </div>

                            <div className="mb-6">
                            <label htmlFor='password' className={signupStyles.label}>Password</label>
                            <div className={signupStyles.inputContainer}>
                                <div className={signupStyles.inputIcon}>
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"} // Dynamic type toggle
                                    id="password"
                                    name="password"
                                    value={userSignup.password}
                                    onChange={handleChange}
                                    className={`${signupStyles.input} ${errors.password ? "border-red-500" : ""}`}
                                    placeholder="••••••••"
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className={signupStyles.passwordToggle}>
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                {errors.password && (<p className={signupStyles.fieldError}>{errors.password}</p>)}
                            </div>
                            </div>

                            <div className={signupStyles.checkboxContainer}>
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    className={signupStyles.checkbox}
                                />
                                <label htmlFor="rememberMe" className={signupStyles.checkboxLabel}>
                                    Remember Me
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className={`${signupStyles.button} ${isLoading ? signupStyles.buttonDisabled : ""}`}
                            >
                                {isLoading ? "Creating account..." : "Sign Up"}
                            </button>
                    </form>

                    <div className={signupStyles.signInContainer}>
                        <p className={signupStyles.signInText}>
                            Already have an account?{" "}
                            <Link to="/login" className={signupStyles.signInLink}>
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;