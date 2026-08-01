import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';
import NotificationBell from './NotificationBell';

const Navbar = ({
  users,
  currentUserId,
  onUserChange,
  notifications,
  setNotifications,
  unreadCount,
  setUnreadCount,
}) => {
  return (
    <nav className="navbar py-2 px-4">
      <div className="container flex items-center justify-between">
        <div className="navbar-brand">CRM Notification System</div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted font-semibold">Logged User:</span>
            <select
              className="form-select"
              style={{ width: 'auto', padding: '0.35rem 0.75rem' }}
              value={currentUserId}
              onChange={(e) => onUserChange(e.target.value)}
            >
              <option value="" disabled>
                Select User
              </option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>

          <NotificationBell
            notifications={notifications}
            unreadCount={unreadCount}
            setUnreadCount={setUnreadCount}
            setNotifications={setNotifications}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
