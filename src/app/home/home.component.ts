import { Component, OnInit } from '@angular/core';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

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

import { DataSharingService } from '../services/data-sharing.service';
import { DatabaseService } from '../services/database.service';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  getFire = initializeApp(environment.firebase);
  data = getFirestore(this.getFire);

  ngOnInit(): void {}
  openDoc() {
    const storage = getStorage();
    getDownloadURL(ref(storage, 'word/A3 - Pendule de Newton.doc'))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        window.open(url);

        // Or inserted into an <img> element
      })
      .catch((error) => {
        // Handle any errors
      });
  }
}
