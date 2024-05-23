import React from "react";
import { useRouter } from 'next/navigation';

const Logout = () => {
    const router = useRouter();

    const handleClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('isAdmin');
        router.push('/');
    };

    return (
        <div className="ms-3">
            <button  className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-2 rounded-md transition-colors duration-300" onClick={handleClick}>Logout</button>
        </div>        
    );
};

export default Logout;
