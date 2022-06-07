import { Component, OnInit } from '@angular/core';
import { demos } from 'src/app/interfaces/demos';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-nyc',
  templateUrl: './nyc.component.html',
  styleUrls: ['./nyc.component.css'],
})
export class NycComponent implements OnInit {
  nycdemos: demos[] = [];
  constructor(
    private sharedData: DataSharingService,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    this.getNycData();
  }
  getNycData() {
    this.database
      .getdata('demonstrations', 'nyc')
      .then((data) => {
        this.nycdemos = data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
