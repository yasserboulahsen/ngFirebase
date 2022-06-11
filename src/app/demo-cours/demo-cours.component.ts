import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { demos } from '../interfaces/demos';
import { DataSharingService } from '../services/data-sharing.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-demo-cours',
  templateUrl: './demo-cours.component.html',
  styleUrls: ['./demo-cours.component.css'],
})
export class DemoCoursComponent implements OnInit {
  nycDamoData: any[] = [];
  // {
  //   id: 'id',
  //   demo: {
  //     cours: 'nyc',
  //     chapitre: 'na',
  //     demo: { name: 'na', place: 'na', material: 'no materialsl', url: 'na' },
  //   },
  // },
  // ];

  constructor(
    private sharedData: DataSharingService,
    private database: DatabaseService
  ) {}

  ngOnInit() {}
}
