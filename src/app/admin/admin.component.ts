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
import { Observable } from 'rxjs';
import { of } from 'rxjs';
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

  dataObs: Observable<demos[]> | null;

  constructor(
    public dialog: MatDialog,
    private sharedData: DataSharingService,
    private database: DatabaseService
  ) {
    this.dataObs = null;
  }

  ngOnInit(): void {
    this.getdata();
  }
  getdata() {
    this.database.getAllDemos('demonstrations').then((data) => {
      this.dataResult = data;
    });
  }

  async deleteData() {
    const docdelete = doc(this.data, 'demonstrations', this.idDemo);
    deleteDoc(docdelete).then(() => console.log('doc deleted'));
  }
  onclick(event: any, clicked: any) {
    const tr = clicked.target.parentElement.parentElement;
    //tr.classList.add('moveToleft');
    const index = this.dataResult.indexOf(event);
    this.dataResult.splice(index, 1);
    this.idDemo = event.id;
    this.deleteData();
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
}
