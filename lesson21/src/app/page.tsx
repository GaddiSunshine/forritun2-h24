"use client";

import type React from "react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { PropsWithChildren } from "react";

const SandBox = ({ children }: PropsWithChildren) => {
  return <div className="border">{children}</div>;
};

export class DeferredPromise<T> {
  _promise: Promise<T>;

  resolve!: (value: T) => void;

  reject!: (value: unknown) => void;

  then: Promise<T>["then"];

  catch: Promise<T>["catch"];

  finally: Promise<T>["finally"];

  get [Symbol.toStringTag]() {
    return "Promise";
  }

  constructor() {
    this._promise = new Promise((resolve, reject) => {
      // assign the resolve and reject functions to `this`
      // making them usable on the class instance
      this.resolve = resolve;
      this.reject = reject;
    });
    // bind `then` and `catch` to implement the same interface as Promise
    this.then = this._promise.then.bind(this._promise);
    this.catch = this._promise.catch.bind(this._promise);
    this.finally = this._promise.finally.bind(this._promise);
  }
}

type ButtonHandle = {
  doSomething: () => DeferredPromise<unknown>;
};

type ButtonProps = PropsWithChildren<{
  onClick: () => void;
}>;

// eslint-disable-next-line react/display-name
const RegularButton = forwardRef<ButtonHandle, ButtonProps>(
  ({ onClick, children }, ref) => {
    const deferredRef = useRef<DeferredPromise<unknown>>();
    const intervalRef = useRef<NodeJS.Timeout>();
    const [state, setState] = useState(0);

    const startCountdown = useCallback(() => {
      intervalRef.current = setInterval(() => {
        setState((s) => s + 1);
        if (state === 3) {
          console.log("here");
        }
      }, 1000);
    }, [state]);

    useEffect(() => {
      if (state === 3) {
        deferredRef.current?.resolve(10);
      }
    }, [state]);

    const doSomething = () => {
      deferredRef.current = new DeferredPromise();

      startCountdown();

      return deferredRef.current;
    };

    useImperativeHandle(ref, () => ({
      doSomething,
    }));

    useEffect(() => {
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, []);

    await deferredRef.current;

    return (
      <div>
        <p>{state}</p>
        <button type="button" onClick={onClick}>
          {children}
        </button>
      </div>
    );
  }
);

const TaskManagerApp: React.FC = () => {
  const buttonRef = useRef<ButtonHandle | null>(null);
  const [showButton, setShowButton] = useState(true);

  const onPress = async () => {
    if (buttonRef.current) {
      await buttonRef.current.doSomething();
      setShowButton(false);
    }
  };

  return (
    <div>
      <SandBox>
        <h1>Playing with children</h1>
      </SandBox>
      {showButton ? (
        <RegularButton ref={buttonRef} onClick={onPress}>
          <div className="flex">
            <div className="h-4 w-4 bg-red-600"></div>
            <p>Press!</p>
          </div>
        </RegularButton>
      ) : (
        <p>Booh!</p>
      )}
    </div>
  );
};

export default TaskManagerApp;
