import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteAccountButton = ({ onSuccess }) => {
  const router = useRouter();
  
  const handleDeleteAccount = async () => { 
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/users/delete-account/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        localStorage.removeItem('token');
        onSuccess();
        router.push('/');
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </div>
  );
};

export default DeleteAccountButton;
