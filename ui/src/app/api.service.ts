import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ApiService {

  private REST_API_SERVER = "http://localhost:8082";

  constructor(private httpClient: HttpClient) { }

  public stat(token) {
    return this.httpClient.get(`${this.REST_API_SERVER}/stat`, {headers: {auth_token: token}});
  }

  public auth(password) {
    return this.httpClient.post<any>(`${this.REST_API_SERVER}/auth`, { password });

    /*
    .pipe(
      map(data => {
        // login successful if there's a jwt token in the response
        if (data && data.token) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("token", data.token);
        }

        return data;
      })
    );
    */
  }
}
