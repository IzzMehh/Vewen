import { ReactElement, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps):ReactElement {
  return (
    <div className="w-full bg-light-theme dark:bg-dark-theme text-light-theme-text dark:text-dark-theme-text  p-3 ">
      {children}
    </div>
  );
}

export default Container;
