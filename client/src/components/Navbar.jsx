import React, { useEffect, useRef, useState } from 'react'
import { navbarStyles } from "../assets/dummyStyles.js";
import ImgLogo from "../assets/logo.png";
import { useNavigate } from 'react-router'
import { ChevronDown, LogOut, User } from 'lucide-react';
import axios from 'axios';

function Navbar({ user:propUser, onLogout }) {
    const navigate = useNavigate();
    const menuRef = useRef();
    const [menuOpen, setMenuOpen] = useState();


    const user = propUser || {
        name: "",
        email: "",
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if(!token) return;
            try{
                const response = await axios.get("http://localhost:8000/user/get", {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setUser(response.data);

            }catch(error){
                console.error("Fialed to load profile", error)
            }
        }
    })

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const handleLogout = () => {
        setMenuOpen(false);
        localStorage.removeItem("token");
        onLogout?.();
        navigate("/login");
    }
  return (
    <header className={navbarStyles.header}>
        <div className={navbarStyles.container}>
            <div onClick={() => navigate("/")} className={navbarStyles.logoContainer}>
                <div className={navbarStyles.logoImage}>
                <img src={ImgLogo} alt="Logo" />
            </div>
            <span className={navbarStyles.logoText}>Expense Tracker</span>
        </div>

        {user && (
            <div className={navbarStyles.userContainer} ref={menuRef}>
                <button onClick={toggleMenu} className={navbarStyles.userButton}>
                    <div className="relative">
                        <div className={navbarStyles.userAvatar}>
                            {user?.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div className={navbarStyles.statusIndicator}></div>
                    </div>

                    <div className={navbarStyles.userTextContainer}>
                        <p className={navbarStyles.userName}>
                            {user?.name || "User"}
                        </p>
                        <p className={navbarStyles.userEmail}>{user?.email || "user@example.com"}</p>
                    </div>

                    <ChevronDown className={navbarStyles.chevronIcon(menuOpen)} />
                </button>

                {menuOpen && (
                    <div className={navbarStyles.dropdownMenu}>
                        <div className={navbarStyles.dropdownHeader}>
                            <div className='flex items-center gap-3'>
                                <div className={navbarStyles.dropdownAvatar}>
                                    {user?.name?.[0]?.toUpperCase() || "U"}
                                </div>

                                <div className={navbarStyles.dropdownName}>
                                    {user?.name || "User"}
                                </div>
                                <div className={navbarStyles.dropdownEmail}>
                                    {user?.email || "user@example.com"}
                                </div>
                            </div>
                        </div>

                        <div className={navbarStyles.menuItemContainer}>
                            <button
                            onClick={() => {
                                setMenuOpen(false)
                                navigate("/profile")
                            }} className={navbarStyles.menuItem}
                            >
                                <User className="w-5 h-5" />
                                <span>My Profile</span>
                            </button>
                        </div>

                        <div className={navbarStyles.menuItemBorder}>
                            <button
                            onClick={handleLogout}
                            className={navbarStyles.logoutButton} 
                            >
                                <LogOut className='w-4 h-4' />
                                <span>LogOut</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
