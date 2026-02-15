import { createContext, useContext, useState } from "react";

const DATA = [
  {
    id: "MSG-101",
    type: "Message",
    title: "Appointment Query",
    sender: "Ramesh Kumar",
    content: "Doctor, I want to reschedule my appointment.",
    status: "read",
    date: "15/10/2023",
  },
  {
    id: "MSG-101",
    type: "Message",
    title: "Appointment Query",
    sender: "Ramesh Kumar",
    content: "Doctor, I want to reschedule my appointment.",
    status: "read",
    date: "15/10/2023",
  },
  {
    id: "MSG-101",
    type: "Message",
    title: "Appointment Query",
    sender: "Ramesh Kumar",
    content: "Doctor, I want to reschedule my appointment.",
    status: "Unread",
    date: "15/10/2023",
  },
  {
    id: "NOT-208",
    type: "Notification",
    title: "Payment Received",
    sender: "System",
    content: "₹500 payment received for OPD-234.",
    status: "Read",
    date: "14/10/2023",
  },
  {
    id: "MSG-112",
    type: "Message",
    title: "Prescription Doubt",
    sender: "Neha Singh",
    content: "Can I take medicine after dinner?",
    status: "Unread",
    date: "14/10/2023",
  },
];

const NotificationContext = createContext(null);

export const Notificationprovider = ({ children }) => {
  const [msg, setMsg] = useState(DATA);

  const unreadMsg = msg.filter((m) => m.status === "Unread").length;

  return (
    <NotificationContext.Provider value={{ msg, setMsg, unreadMsg }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  //   const context = useContext(NotificationContext);
  const { unreadMsg } = useContext(NotificationContext);

  if (!unreadMsg) {
    throw new Error(
      "useNotifications must be used within Notificationprovider"
    );
  }

  return unreadMsg;
//   return context;
};
