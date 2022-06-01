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
import { demos } from '../demos';

import { MatDialog } from '@angular/material/dialog';
import { EditdemoComponent } from '../editdemo/editdemo.component';
import { AddDemoComponent } from '../add-demo/add-demo.component';
import { DataSharingService } from '../data-sharing.service';
import { DatabaseService } from '../database.service';
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

  constructor(
    public dialog: MatDialog,
    private charedData: DataSharingService,
    private database: DatabaseService
  ) {}
  ngOnInit(): void {
    this.getdata();
  }
  getdata() {
    this.database.getdata('demonstrations', 'nya');
    this.dataResult = this.database.dataResult;
  }

  async deleteData() {
    const docdelete = doc(this.data, 'reserved', this.idDemo);
    deleteDoc(docdelete).then(() => console.log('doc deleted'));
  }
  onclick(event: any, clicked: any) {
    const tr = clicked.target.parentElement.parentElement;
    //tr.classList.add('moveToleft');
    const index = this.dataResult.indexOf(event);
    this.dataResult.splice(index, 1);
    // this.idDemo = event.id;
    //this.deleteData();
    //this.getdata();
  }
  openDialog(idEvent: any) {
    this.dialog.open(EditdemoComponent);
    this.charedData.setId(idEvent);
  }
  ajouterDemo() {
    this.dialog.open(AddDemoComponent);
  }
}
