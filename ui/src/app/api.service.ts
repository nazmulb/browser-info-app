import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
  }
}
