import React, { createContext, useContext, useState, useEffect } from "react";
import Alert from "../components/elements/Alert";

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}
export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const processQueue = () => {
      if (queue.length > 0) {
        const [nextAlert, ...restQueue] = queue;

        setAlerts((prevAlerts) => [...prevAlerts, nextAlert]);
        setQueue(restQueue);

        setTimeout(() => {
          hideAlert(nextAlert.id);
        }, nextAlert.timeout || 5000);
      }
    };

    processQueue();
  }, [queue]);

  const showAlert = (
    type,
    message,
    timeout = 5000
  ) => {
    const id = Date.now();
    const newAlert = { id, message, type, timeout };

    setQueue((prevQueue) => [...prevQueue, newAlert]);
  };

  const hideAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  const contextValue = {
    showAlert,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      <div className="toast toast-top toast-end">
        {alerts
          .slice()
          .reverse()
          .map((alert, index) => (
            <Alert
              key={alert.id}
              type={alert.type}
              message={alert.message}
              onclick={() => hideAlert(alert.id)}
            />
          ))}
      </div>
    </AlertContext.Provider>
  );
};