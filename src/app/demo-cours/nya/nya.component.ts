import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { DataSharingService } from 'src/app/data-sharing.service';
import { DatabaseService } from 'src/app/database.service';
import { demos } from 'src/app/demos';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { demo } from 'src/app/demo';
export class TableExpandableRowsExample {}

@Component({
  selector: 'app-nya',
  templateUrl: './nya.component.html',
  styleUrls: ['./nya.component.css'],
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
export class NyaComponent implements OnInit {
  demosNya: demos[] = [];
  ELEMENT_DATA: demo[] = [];
  dataSource: any[] = [];
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplayWithExpand: string[] = [];
  expandedElement!: demos;
  ngOnInit(): void {
    this.getNyaData()
      .then((e) => {
        this.ELEMENT_DATA = e;
        this.dataSource = this.ELEMENT_DATA;

        this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
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
    return await this.database.getdata('demonstrations', 'nya');
  }
}
