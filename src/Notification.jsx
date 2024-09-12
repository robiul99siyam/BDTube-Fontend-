import React, { useEffect, useState } from 'react';

const Notification = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);

  useEffect(() => {

    const socket = new WebSocket('ws://127.0.0.1:8000/ws/sc/');


    socket.onopen = () => {
      console.log('WebSocket connection established');
    };


    socket.onmessage = (event) => {
      let messageData;


      try {
        messageData = JSON.parse(event.data);
        console.log('Parsed JSON message:', messageData.message);
      } catch (error) {

        console.log('Received plain text message:', event.data);
        messageData = { message: event.data };
      }


      setNotifications((prevNotifications) => [...prevNotifications, messageData.message]);


      setNewNotificationCount((prevCount) => prevCount + 1);
    };


    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };


    return () => {
      socket.close();
    };
  }, []);


  const toggleNotification = () => {
    setOpen(!open);

    if (!open) {
      setNewNotificationCount(0);
    }
  };

  return (
    <div>

      <button onClick={toggleNotification}>
        <i className="fa-solid fa-bell"></i>
        {newNotificationCount > 0 && <div className="badge">+{newNotificationCount}</div>}
      </button>


      {open && (
        <div className="notification-dropdown">
          <h3>Notifications</h3>
          <ul>
            {notifications.length === 0 ? (
              <li>No new notifications</li>
            ) : (
              notifications.map((notification, index) => (
                <li key={index}>{notification}</li>
              ))
            )}
          </ul>
        </div>
      )}





    </div>

   



  );
};

export default Notification;
