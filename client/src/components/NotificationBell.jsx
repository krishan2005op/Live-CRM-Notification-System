import React, { useState, useRef, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import NotificationDropdown from './NotificationDropdown';

const NotificationBell = ({ notifications, unreadCount, setUnreadCount, setNotifications }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button 
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BellIcon style={{ width: '24px', height: '24px', color: '#4b5563' }} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 badge">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <NotificationDropdown 
          notifications={notifications}
          setNotifications={setNotifications}
          setUnreadCount={setUnreadCount}
          closeDropdown={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default NotificationBell;
