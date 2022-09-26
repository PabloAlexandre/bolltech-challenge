export function saveUserCredentials(token: string) {
  return localStorage.setItem('auth-key', token);
}

export function getUserCredentials() {
  return localStorage.getItem('auth-key');
}

export function logout() {
  return localStorage.removeItem('auth-key');
}