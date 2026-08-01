import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

/**
 * A single toast notification.
 * Props:
 *   - notification: { title, message, _id }
 *   - onClose: () => void   // called when toast is dismissed
 */
const NotificationToast = ({ notification, onClose }) => {
  // Auto dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-4 mb-2 flex items-start space-x-3 animate-fade-in">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{notification.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 focus:outline-none">
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default NotificationToast;
