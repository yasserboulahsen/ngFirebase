import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { demos } from 'src/app/interfaces/demos';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ShowImagesComponent } from 'src/app/show-images/show-images.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent implements OnInit {
  @Input('demoCard') nycDamoData: any[] = [];
  constructor(
    public dialog: MatDialog,
    private sharedData: DataSharingService,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {}
  showPic(data: string) {
    this.sharedData.setImage(data);
    this.dialog.open(ShowImagesComponent);
  }
  reserve(event: demos) {
    this.database
      .postReserveDemo(event, 'reserved')
      .then(() => console.log('reserved'));
  }
}
