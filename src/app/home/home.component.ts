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

import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isdelted: boolean = false;
  getFire = initializeApp(environment.firebase);
  data = getFirestore(this.getFire);
  idDemo: string = '';
  dataResult: any[] = [];
  demosData: demos = {
    id: '',
    demo: {
      category: '',
      demo: {
        name: '',
        place: '',
        url: '',
      },
    },
  };
  constructor(
    public dialog: MatDialog,
    private charedData: DataSharingService
  ) {}
  ngOnInit(): void {
    this.getdata();
  }
  async getdata() {
    const docref = query(
      collection(this.data, 'demonstrations'),
      where('cours', '==', 'nya')
    );
    const snap = await getDocs(docref);
    snap.forEach((e) => {
      this.demosData = e.data() as demos;
      this.demosData.id = e.id;

      this.dataResult.push(this.demosData);
    });
  }

  async postData() {
    await setDoc(doc(collection(this.data, 'reserved')), {
      category: 'NYA',
      demo: {
        name: 'fireBase',
        place: '125G',
        url: 'https://miro.medium.com/max/300/1*R4c8lHBHuH5qyqOtZb3h-w.png',
      },
    });
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
}
