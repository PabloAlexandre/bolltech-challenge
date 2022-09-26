import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthGuard } from '../components/auth-guard';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthGuard>
      <Component {...pageProps} />
    </AuthGuard>
  );
}

export default MyApp
