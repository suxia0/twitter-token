import { useState, useEffect } from 'react';
import UpdateUserForm from '../components/UpdateUserForm';
import Dashboard from '../components/Dashboard';

export default function DashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/';
    } else {
      setAuthenticated(true);
      setToken(token);
    }
  }, []);

  const handleUpdate = () => {
    setIsUpdated(true);
    setTimeout(() => setIsUpdated(false), 3000); // Show update success message for 3 seconds
  };

  return authenticated ? (
    <div>
      <h2>Dashboard</h2>
      {isUpdated && <p>User updated successfully!</p>}
      <UpdateUserForm token={token} onUpdate={handleUpdate} />
      <Dashboard />
    </div>
  ) : (
    <p>Loading...</p>
  );
}