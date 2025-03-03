import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Authentication Context';
import DigitalID from './DigitalID';
import LostCardToggle from './LostCardToggle';
import AccountBalance from './AccountBalance';
import AlertBanner from './AlertBanner';
import QRCodeAccess from './QRCodeAccess';

const Dashboard = () => {
  const { currentUser, userData, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock notifications
  const notifications = [
    { id: 1, message: "Dining Hall closes early today at 6:00 PM.", type: "info" },
    { id: 2, message: "Severe weather warning – classes delayed.", type: "warning" },
    { id: 3, message: "Lost and found: ID card found near library.", type: "info" }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* St. Thomas logo watermark */}
      <div className="fixed inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <img src="/assets/st-thomas-logo.png" alt="" className="w-2/3 max-w-md" />
      </div>
      
      {/* Header */}
      <header className="bg-purple-900 shadow-md relative z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">UST-ID</h1>
          
          <div className="flex items-center">
            {/* User profile */}
            <div className="text-white mr-4 text-sm">
              {currentUser?.displayName || 'Student'}
            </div>
            
            {/* Hamburger menu button */}
            <button 
              className="text-white hover:text-purple-200 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      {/* Side Menu (fixed position when open) */}
      <div 
        className={`fixed inset-y-0 right-0 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} w-64 bg-gray-900 shadow-lg transition duration-300 ease-in-out z-20`}
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-lg font-bold">Menu</h2>
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="space-y-3">
            <a href="#" className="block py-2 px-4 rounded hover:bg-gray-800 text-gray-300 hover:text-white transition">
              Class Schedule
            </a>
            <a href="#" className="block py-2 px-4 rounded hover:bg-gray-800 text-gray-300 hover:text-white transition">
              Library Resources
            </a>
            <a href="#" className="block py-2 px-4 rounded hover:bg-gray-800 text-gray-300 hover:text-white transition">
              Campus Map
            </a>
            <a href="#" className="block py-2 px-4 rounded hover:bg-gray-800 text-gray-300 hover:text-white transition">
              Emergency Contacts
            </a>
            <hr className="border-gray-700 my-4" />
            <button
              onClick={handleSignOut}
              className="w-full text-left block py-2 px-4 rounded hover:bg-gray-800 text-gray-300 hover:text-white transition"
            >
              Sign Out
            </button>
          </nav>
        </div>
      </div>
      
      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleMenu}
        ></div>
      )}
      
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Digital ID Section */}
          <section className="mb-8 flex flex-col items-center">
            <DigitalID
              studentName={userData?.displayName || currentUser?.displayName}
              studentId={userData?.studentId}
              profilePicture={userData?.photoURL || currentUser?.photoURL}
            />
            
            <div className="mt-6">
              <LostCardToggle />
            </div>
          </section>
          
          {/* QR Code Access */}
          <section className="mb-8">
            <QRCodeAccess studentId={userData?.studentId} />
          </section>
          
          {/* Account Balance */}
          <section className="mb-8">
            <AccountBalance />
          </section>
        </div>
      </main>
      
      {/* Alert Banner */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <AlertBanner notifications={notifications} />
      </footer>
    </div>
  );
};

export default Dashboard;
