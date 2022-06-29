import { Component, OnInit } from '@angular/core';
import { FirebaseApp, provideFirebaseApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';

import { initializeApp } from 'firebase/app';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { demos } from 'src/app/interfaces/demos';

import { MatDialog } from '@angular/material/dialog';
import { EditdemoComponent } from '../editdemo/editdemo.component';
import { AddDemoComponent } from '../add-demo/add-demo.component';
import { DataSharingService } from '../services/data-sharing.service';
import { DatabaseService } from '../services/database.service';
import { ShowImagesComponent } from '../show-images/show-images.component';
import { Observable, of as observableOf, merge } from 'rxjs';

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

import { map, startWith } from 'rxjs/operators';
import { demo } from '../interfaces/demo';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  getFire = initializeApp(environment.firebase);
  data = getFirestore(this.getFire);
  idDemo: string = '';
  dataResult: any[] = [];
  dataSource: any[] = [];
  displayedColumns: string[] = ['Chapitre', 'Nom', 'Place', 'Image', 'Edit'];

  myControl = new FormControl('');

  filteredOptions: Observable<demos[]> = new Observable();

  constructor(
    public dialog: MatDialog,
    private sharedData: DataSharingService,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    this.getdata();
  }
  async getdata() {
    await this.database.getAllDemos('demonstrations').then((data) => {
      this.dataSource = data;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value?.name)),
        map((name) => (name ? this._filter(name) : this.dataSource.slice()))
      );

      this.sharedData.setDataResult(this.dataSource);
    });
  }

  async deleteData() {
    const docdelete = doc(this.data, 'demonstrations', this.idDemo);
    deleteDoc(docdelete).then(() => console.log('doc deleted'));
  }
  onclick(event: any, clicked: any) {
    const tr = clicked.target.parentElement.parentElement;
    //tr.classList.add('moveToleft');

    this.sharedData.setAdminDeleteDemo(event);
    this.dialog.open(DeleteDialogComponent);
    this.dataSource = this.sharedData.getDataResult();
    // const index = this.dataResult.indexOf(event);
    // this.dataResult.splice(index, 1);

    //this.getdata();
  }
  openDialog(idEvent: any) {
    this.dialog.open(EditdemoComponent);
    this.sharedData.setId(idEvent);
  }
  ajouterDemo() {
    this.dialog.open(AddDemoComponent);
  }
  showPic(demo: string) {
    this.sharedData.setImage(demo);
    this.dialog.open(ShowImagesComponent);
  }
  displayFn(user: demos): string {
    return user ? user.demo.name : '';
  }

  private _filter(name: string): demos[] {
    const filterValue = name.toLowerCase();
    console.log(filterValue);
    return this.dataResult.filter((option) =>
      option.demo.name.toLowerCase().includes(filterValue)
    );
  }
}
