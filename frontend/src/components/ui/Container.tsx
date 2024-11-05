import { ReactElement, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?:String;
}

function Container({ children,className }: ContainerProps):ReactElement {
  return (
    <div
      className={`w-full h-full  bg-light-theme dark:bg-dark-theme text-light-theme-text dark:text-dark-theme-text ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
