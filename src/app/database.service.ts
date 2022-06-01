import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
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

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  getFire = initializeApp(environment.firebase);
  data = getFirestore(this.getFire);
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

  async postData(f: NgForm, database: string) {
    await setDoc(doc(collection(this.data, database)), {
      cours: f.value.cours,
      chapitre: f.value.chapitre,
      demo: {
        name: f.value.nom,
        place: f.value.place,
        material: f.value.textarea,
        url: f.value.url,
      },
    });
  }
  async getdata(database: string, cours: string) {
    const docref = query(
      collection(this.data, database),
      where('cours', '==', cours)
    );
    const snap = await getDocs(docref);
    snap.forEach((e) => {
      this.demosData = e.data() as demos;
      this.demosData.id = e.id;

      this.dataResult.push(this.demosData);
    });
  }
  async deleteData(database: string, id: string) {
    const docdelete = doc(this.data, database, id);
    deleteDoc(docdelete).then(() => console.log('doc deleted'));
  }
}
