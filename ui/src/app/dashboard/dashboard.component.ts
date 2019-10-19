import { Component, OnInit } from "@angular/core";

import { ApiService } from "../api.service";
import { Stat } from "../interfaces/stat.interface";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  stats = [];
  time = "";

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    const token = localStorage.getItem("token");
    this.apiService.stat(token).subscribe((data: Stat) => {
      this.time = (data.insertedTime) ? new Date(data.insertedTime).toLocaleString() : "";
      this.stats = (data.entriesByTypeOSVersion) ? data.entriesByTypeOSVersion : [];
    });
  }
}
