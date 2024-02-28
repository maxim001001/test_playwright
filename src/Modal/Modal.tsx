import { useEffect, useMemo, ReactNode } from "react";
import { createPortal } from "react-dom";

const modalRootElement = document.querySelector("#modal")!;

export const Modal = ({ children }: { children: ReactNode }) => {
  const element = useMemo(() => document.createElement("div"), []);
  useEffect(() => {
    modalRootElement.appendChild(element);
    return () => {
      modalRootElement.removeChild(element);
    };
  });
  return createPortal(children, element);
};
