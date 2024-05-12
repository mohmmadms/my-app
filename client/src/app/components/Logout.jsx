import React from "react";
import { useRouter } from 'next/navigation';

const Logout = () => {
    const router = useRouter();

    const handleClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        router.push('/');
    };

    return (
        <div className="ms-3">
            <button className="btn btn-light p-1" onClick={handleClick}>Logout</button>
        </div>        
    );
};

export default Logout;
