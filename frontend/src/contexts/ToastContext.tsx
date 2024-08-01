// ./contexts/ToastContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";
// import { useErrorBoundary } from "react-error-boundary";

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  // const { showBoundary } = useErrorBoundary();

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000); // Toast disappears after 5 seconds
    // showBoundary("Error");
    // throw new Error("Error");
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastMessage && <div className='toast'>{toastMessage}</div>}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
