"use client";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MessageContext, ParentMessageContext } from "./context/MessageContext";
export default function Home() {
  const [message, setMessage] = useState("Hello from App!");
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("render");
  });

  const incrementCount = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const contextValue = useMemo(() => {
    return {
      message,
      updateMessage: setMessage,
    };
  }, [message]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>App state: {message}</p>
      <MessageContext.Provider value={contextValue}>
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <p>Hello world</p>
          <Parent />
        </main>
      </MessageContext.Provider>
      <p>{count}</p>
      <button onClick={incrementCount} type="button">
        Click!
      </button>
    </div>
  );
}

// Parent component
// eslint-disable-next-line react/display-name
const Parent = memo(() => {
  useEffect(() => {
    console.log("render parent");
  });
  return (
    <ParentMessageContext.Provider
      value={{
        message: "message from parent",
        updateMessage: () => {
          console.log("haha youc annot update");
        },
      }}
    >
      <div className="border border-white m-4">
        <h2>Parent Component</h2>
        <Child />
      </div>
    </ParentMessageContext.Provider>
  );
});

// Child component
const Child = () => {
  useEffect(() => {
    console.log("render child");
  });
  return (
    <div className="border border-white m-4">
      <h3>Child Component</h3>
      <GrandChild />
    </div>
  );
};

// GrandChild component
const GrandChild = () => {
  useEffect(() => {
    console.log("render grand child");
  });
  const messageContext = useContext(MessageContext);

  const onClick = () => {
    messageContext.updateMessage("Hello from GrandChild!");
  };

  return (
    <div className="border border-white m-4">
      <h4>GrandChild Component</h4>
      <button onClick={onClick} type="button">
        Set message received!
      </button>
      <p>Message: {messageContext?.message}</p>
    </div>
  );
};
