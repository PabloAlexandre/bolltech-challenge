import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Container = ({ children }: Props) => (
  <main className="container">
    { children }
  </main>
)