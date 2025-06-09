// utils/auth.ts
import {jwtDecode }from "jwt-decode";

interface TokenPayload {
  exp: number;
  iat: number;
  id: string;
  email: string;
  name:string;
}

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};


export const getUserFromToken = () : TokenPayload | null => {
const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
} 