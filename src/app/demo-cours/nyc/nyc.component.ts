import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { demos } from 'src/app/interfaces/demos';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { DatabaseService } from 'src/app/services/database.service';

import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-nyc',
  templateUrl: './nyc.component.html',
  styleUrls: ['./nyc.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class NycComponent implements OnInit {
  panelOpenState = false;
  dataSource: any[] = [];

  ngOnInit(): void {
    this.getNyaData()
      .then((e) => {
        const dataToDisplay = this.groupBy(e, 'chapitre');
        this.dataSource = dataToDisplay;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  constructor(
    private sharedData: DataSharingService,
    private database: DatabaseService
  ) {}

  async getNyaData() {
    return await this.database.getdata('demonstrations', 'nyc');
  }
  groupBy(collection: any[], property: string) {
    var i = 0,
      val,
      index,
      values = [],
      result = [];
    for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1) result[index].push(collection[i]);
      else {
        values.push(val);
        result.push([collection[i]]);
      }
    }
    return result;
  }
}
