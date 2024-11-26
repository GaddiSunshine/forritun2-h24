import { createContext } from "react";

const ContextSchema = {
  message: "",
  updateMessage: () => {},
};

type ContextType = {
  message: string;
  updateMessage: (newMessage: string) => void;
};

export const MessageContext = createContext<ContextType>(ContextSchema);

export const ParentMessageContext = createContext<ContextType>(ContextSchema);
