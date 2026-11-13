type StatusType = "ERROR" | "SUCCESS";

interface ToastStateType {
  isOpen: boolean;
  title: string;
  message: string;
  status: StatusType;
}

let listener: ((state: ToastStateType) => void) | null = null;
let memoryState: ToastStateType = { 
  isOpen: false, 
  title: "", 
  message: "", 
  status: "SUCCESS" 
};

export const showToast = (title: string, message: string, status: StatusType = "SUCCESS") => {
  memoryState = { isOpen: true, title, message, status };
  if (listener) listener(memoryState);
};

export const hideToast = () => {
  memoryState = { ...memoryState, isOpen: false };
  if (listener) listener(memoryState);
};

import { useState, useEffect } from "react";
export const useToastStore = () => {
  const [state, setState] = useState<ToastStateType>(memoryState);
  useEffect(() => {
    listener = setState;
    return () => { 
      listener = null; 
    };
  }, []);
  return state;
};