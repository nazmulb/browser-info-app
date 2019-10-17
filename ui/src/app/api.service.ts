import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {

  private REST_API_SERVER = "http://localhost:8082";

  constructor(private httpClient: HttpClient) { }

  public stat() {
    return this.httpClient.get(`${this.REST_API_SERVER}/stat`);
  }

  public auth() {
    return this.httpClient.post(`${this.REST_API_SERVER}/auth`, { password: "123" });
  }
}
