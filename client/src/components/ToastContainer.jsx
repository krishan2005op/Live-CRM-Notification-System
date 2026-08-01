import React from 'react';
import NotificationToast from './NotificationToast';

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <NotificationToast 
          key={toast.id} 
          notification={toast} 
          onClose={() => removeToast(toast.id)} 
        />
      ))}
    </div>
  );
};

export default ToastContainer;
