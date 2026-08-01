import React, { useEffect, useState, useCallback } from 'react';
import socket from './socket/socket';
import { getUsers } from './services/userService';
import { getNotifications } from './services/notificationService';

import Navbar from './components/Navbar';
import DashboardLayout from './components/DashboardLayout';
import ToastContainer from './components/ToastContainer';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [toasts, setToasts] = useState([]);

  // Load users on initial mount
  useEffect(() => {
    const fetchInitialUsers = async () => {
      try {
        const res = await getUsers();
        const userList = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        setUsers(userList);
        if (userList.length > 0) {
          setCurrentUserId(userList[0]._id);
        }
      } catch (err) {
        console.error('Failed to load users:', err);
      }
    };
    fetchInitialUsers();
  }, []);

  // Fetch notifications for selected user
  const fetchUserNotifications = useCallback(async (userId) => {
    if (!userId) return;
    try {
      const res = await getNotifications(userId);
      const list = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setNotifications(list);
      const unread = list.filter((n) => !n.read).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  }, []);

  // Handle User Change & Socket Connection
  useEffect(() => {
    if (!currentUserId) return;

    // Disconnect previous socket connection if any
    if (socket.connected) {
      socket.disconnect();
    }

    // Connect & Join User Room
    socket.connect();
    socket.emit('join', currentUserId);

    // Load Notifications & Unread count
    fetchUserNotifications(currentUserId);

    // Socket Listener for Live Notifications
    const handleNewNotification = (notification) => {
      // Add Toast Notification
      const toastItem = {
        ...notification,
        id: Date.now() + Math.random(),
      };
      setToasts((prev) => [...prev, toastItem]);

      // Prepend to notifications list
      setNotifications((prev) => [notification, ...prev]);

      // Increment unread count
      setUnreadCount((prev) => prev + 1);
    };

    socket.on('newNotification', handleNewNotification);

    return () => {
      socket.off('newNotification', handleNewNotification);
      socket.disconnect();
    };
  }, [currentUserId, fetchUserNotifications]);

  const handleUserChange = (newUserId) => {
    setCurrentUserId(newUserId);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-main">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <Navbar
        users={users}
        currentUserId={currentUserId}
        onUserChange={handleUserChange}
        notifications={notifications}
        setNotifications={setNotifications}
        unreadCount={unreadCount}
        setUnreadCount={setUnreadCount}
      />

      <ErrorBoundary>
        {currentUserId ? (
          <DashboardLayout
            currentUserId={currentUserId}
            notifications={notifications}
          />
        ) : (
          <div className="container py-6 text-center text-muted">
            Loading Users...
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;