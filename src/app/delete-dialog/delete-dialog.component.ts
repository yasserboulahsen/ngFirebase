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
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit {
  getFire = initializeApp(environment.firebase);
  data = getFirestore(this.getFire);

  constructor(
    public dialog: MatDialog,
    private sharedData: DataSharingService,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {}
  async deleteData(idDemo: string) {
    const docdelete = doc(this.data, 'demonstrations', idDemo);
    deleteDoc(docdelete).then(() => console.log('doc deleted'));
  }
  deletDemo() {
    const dataResult = this.sharedData.getDataResult();
    const index = dataResult.indexOf(this.sharedData.getAdminDeleteDemo());
    const dataSplice = dataResult.splice(index, 1);
    this.sharedData.setDataResult(dataSplice);
    const demoId = this.sharedData.getAdminDeleteDemo().id;
    this.deleteData(demoId);
    this.dialog.closeAll();
  }
}
