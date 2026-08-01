import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { markAsRead } from '../services/notificationService';

const NotificationDropdown = ({ notifications, setNotifications, setUnreadCount, closeDropdown }) => {
  const handleMarkRead = async (id, e) => {
    e.stopPropagation();
    try {
      await markAsRead(id);
      setNotifications(prev => 
        prev.map(n => n._id === id ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  return (
    <div className="dropdown-menu">
      <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <h3 className="font-semibold" style={{ margin: 0 }}>Notifications</h3>
      </div>
      <div className="flex-col">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted">No notifications</div>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification._id} 
              className={`dropdown-item ${!notification.read ? 'unread' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div style={{ flex: 1 }}>
                  <h4 className="font-semibold text-sm">
                    {!notification.read && <span style={{ color: 'var(--primary-color)', marginRight: '4px' }}>•</span>}
                    {notification.title}
                  </h4>
                  <p className="text-sm text-muted" style={{ marginTop: '4px' }}>{notification.message}</p>
                  <p className="text-xs text-muted" style={{ marginTop: '8px' }}>
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </p>
                </div>
                {!notification.read && (
                  <button 
                    onClick={(e) => handleMarkRead(notification._id, e)}
                    className="btn btn-sm btn-outline"
                    style={{ marginLeft: '12px' }}
                  >
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
