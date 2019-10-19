import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor() { }

  authLogin(password: string): boolean {
    if (password === "123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", "12345");
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("token");
  }
}
