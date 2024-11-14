import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getToken(tokenName: string): string | null {
    const tokenData = localStorage.getItem(tokenName);

    if (tokenData) {
      const parsedToken = JSON.parse(tokenData);
      const now = new Date().getTime();

      if (now < parsedToken.expiresAt) {
        return parsedToken.value;
      } else {
        localStorage.removeItem(tokenName); // Token expired, so remove it
        localStorage.removeItem('user'); // Remove user data as well
        return null;
      }
    }

    return null;
  }

  setToken(tokenName: string, tokenValue: string): boolean {
    const maxAge = 60 * 60 * 24 * 1000; // 1 day in milliseconds
    const now = new Date().getTime();
    const expiresAt = now + maxAge;

    const tokenData = {
      value: tokenValue,
      expiresAt: expiresAt,
    };

    localStorage.setItem(tokenName, JSON.stringify(tokenData));
    return true;
  }

  clearToken(tokenName: string): boolean {
    localStorage.removeItem(tokenName);
    this.clearUserData();
    return true;
  }

  isTokenAvailable(tokenName: string): boolean {
    return !!localStorage.getItem(tokenName);
  }

  getUserData() {
    const userData = localStorage.getItem('user');

    if (userData) {
      return JSON.parse(userData);
    }

    return null;
  }

  setUserData(userData: any): boolean {
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  }

  updateUserData(userData: any): boolean {
    const existingUserData = this.getUserData();

    if (existingUserData) {
      const updatedUserData = {
        ...existingUserData,
        ...userData,
      };

      localStorage.setItem('user', JSON.stringify(updatedUserData));
      return true;
    }

    return false;
  }

  clearUserData(): boolean {
    localStorage.removeItem('user');
    return true;
  }
}
