import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { IStat } from '../istat';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = [];
  time = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.stat().subscribe((data: IStat) => {
      console.log(data);

      this.time = (data) ? new Date(data.insertedTime).toLocaleString() : '';
      this.stats = (data) ? data.entriesByTypeOSVersion : [];
    });
  }
}
