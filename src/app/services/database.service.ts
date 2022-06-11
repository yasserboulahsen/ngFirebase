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
  DocumentData,
  orderBy,
} from 'firebase/firestore';
import {
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
  StorageReference,
  uploadBytes,
} from 'firebase/storage';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { demos } from 'src/app/interfaces/demos';
import { userData } from '../interfaces/users';
import { groupBy } from 'rxjs/internal/operators/groupBy';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  userdata: userData[] = [];
  getFire = initializeApp(environment.firebase);
  data = getFirestore(this.getFire);
  storage = getStorage(this.getFire);
  imageRef: string = '';

  dataResult: demos[] = [];
  demosByCours: demos[] = [];

  constructor() {}

  split(str: string) {
    return str.replace(/^.*(\\|\/|\:)/, '');
  }

  async postData(f: NgForm, database: string, file: File) {
    await setDoc(doc(collection(this.data, database)), {
      cours: f.value.cours,
      chapitre: f.value.chapitre,
      demo: {
        name: f.value.nom,
        place: f.value.place,
        material: f.value.textarea,
        url: await this.uploadImage(f.value.url, f.value.cours, file),
      },
    });
  }

  async postReserveDemo(data: demos, database: string) {
    await setDoc(doc(collection(this.data, database)), {
      data,
    });
  }

  async getdata(database: string, cours: string) {
    const docref = query(
      collection(this.data, database),
      where('cours', '==', cours)
    );
    const snap = await getDocs(docref);
    this.demosByCours = snap.docs.map(
      (e) => ({ id: e.id, ...e.data() } as demos)
    );
    return this.demosByCours;
  }

  getDataObservable(database: string, cours: string) {
    const docref = query(
      collection(this.data, database),
      where('cours', '==', cours)
    );
  }

  async deleteData(database: string, id: string) {
    const docdelete = doc(this.data, database, id);
    deleteDoc(docdelete).then(() => console.log('doc deleted'));
  }

  async uploadImage(image: string, cours: string, file: File): Promise<string> {
    const imageSplit = this.split(image);
    const imageRef = ref(this.storage, `${cours}/${imageSplit}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  }

  async getAllDemos(database: string) {
    const docref = query(collection(this.data, database));
    const snap = await getDocs(docref);
    this.dataResult = snap.docs.map(
      (e) => ({ id: e.id, ...e.data() } as demos)
    );

    return this.dataResult;
  }

  async getUserDatabase(uid: string) {
    const docref = query(
      collection(this.data, 'users'),
      where('user.uid', '==', uid)
    );
    const snap = await getDocs(docref);
    this.userdata = snap.docs.map((e) => ({ ...e.data() } as userData));

    return this.userdata;
  }
}
