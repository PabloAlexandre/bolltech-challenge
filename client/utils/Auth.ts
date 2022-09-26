import jwt_decode from 'jwt-decode';

export function saveUserCredentials(token: string) {
  return localStorage.setItem('auth-key', token);
}

export function getUserCredentials() {
  return localStorage.getItem('auth-key');
}

export function logout() {
  return localStorage.removeItem('auth-key');
}

export function getDataFromToken(): Record<string, any> {
  const token = getUserCredentials();
  if(!token) return {};
  
  return jwt_decode(token);
}