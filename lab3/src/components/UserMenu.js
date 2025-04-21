// src/components/UserMenu.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { FaUserCircle } from 'react-icons/fa';

const UserMenu = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user] = useAuthState(auth);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const handleSignOut = () => signOut(auth);

    return (
        <div className="user-menu">
            <FaUserCircle size={30} onClick={toggleDropdown} className="user-icon" />
            {dropdownOpen && (
                <div className="user-dropdown">
                    {user ? (
                        <>
                            <p>{user.email}</p>
                            <button onClick={handleSignOut}>Вийти</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Увійти</Link>
                            <Link to="/register">Зареєструватися</Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserMenu;
