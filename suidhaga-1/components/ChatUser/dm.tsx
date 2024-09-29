import React from 'react';
import Notificationlayout from './layout';

// Define the Notification type
type Notification = {
  name: string;
  message: string;
}

interface NotificationData {
  notifications: Notification[];
}

const ChatUser: React.FC<NotificationData> = ({ notifications }) => {
  console.log(notifications);
  
  return (
    <div>
      <div className='font-semibold text-gray-700 text-sm'>Notifications</div>
      <div className='mt-[5%] flex flex-col gap-2'>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <Notificationlayout key={index} userName={notification.name} newMessages={notification.message} />
          ))
        ) : (
          <div>No notifications</div>
        )}
      </div>
    </div>
  );
}

export default ChatUser;
