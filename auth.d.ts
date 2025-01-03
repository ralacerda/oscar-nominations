declare module "#auth-utils" {
  interface User {
    sub: string;
    name: string;
    picture: string;
    email: string;
  }
}

export {};
