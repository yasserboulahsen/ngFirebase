import { Component } from '@angular/core';
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
import { demos } from './demos';
import { demo } from './demo';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
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
  constructor() {}
  ngOnInit(): void {
    this.getdata();
  }
  async getdata() {
    const docref = query(
      collection(this.data, 'reserved'),
      where('category', '==', 'NYA')
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
  onclick(event: any) {
    this.idDemo = event.id;
    this.deleteData();
  }
}
