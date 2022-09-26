import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react"
import { getUserCredentials } from "../utils/Auth";

interface Props {
  children: ReactNode;
}

const openedRoutes = ['/login', '/signup'];

export const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setShowing(true);
  }, []);

  if(!showing) return null;

  const hasUser = getUserCredentials();

  if(!hasUser && !openedRoutes.includes(router.pathname)) {
    router.push('/login');
    return null;
  } else if(hasUser && openedRoutes.includes(router.pathname)) {
    router.push('/');
    return null;
  }

  return <>{children}</>; 
}