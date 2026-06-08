// src/api/auth.ts

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  token: string;
};

// Simulated user database
const mockUser = {
  id: "1",
  name: "Demo User",
  email: "demo@moviehub.com",
  password: "password123",
  token: "fake-jwt-token"
};

export function login({ email, password }: LoginCredentials): Promise<AuthUser> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === mockUser.email && password === mockUser.password) {
        const { password, ...user } = mockUser;
        resolve(user);
      } else {
        reject(new Error("Credenciales incorrectas"));
      }
    }, 800);
  });
}

export function logout(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 300);
  });
}

