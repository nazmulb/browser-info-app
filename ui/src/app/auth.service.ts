import { Injectable } from "@angular/core";

import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  authLogin(password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.auth(password).subscribe((data: any) => {
        if (data.token) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("token", data.token);
          resolve(true);
        }

        reject(false);
      }, (error) => {
        console.log(error);
        reject(false);
      }
      );
    }).catch((error) => {
      console.log(error);
    });
  }

  logout(): void {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("token");
  }
}
