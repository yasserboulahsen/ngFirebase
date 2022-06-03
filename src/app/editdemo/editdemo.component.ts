import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataSharingService } from '../services/data-sharing.service';
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
  updateDoc,
} from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editdemo',
  templateUrl: './editdemo.component.html',
  styleUrls: ['./editdemo.component.css'],
})
export class EditdemoComponent implements OnInit {
  getFire = initializeApp(environment.firebase);
  data = getFirestore(this.getFire);

  constructor(private charedData: DataSharingService) {}

  ngOnInit(): void {}
  async onsubmit(f: NgForm) {
    const id = this.charedData.getId().id;
    const docupdate = doc(this.data, 'demonstrations', id);

    await updateDoc(docupdate, {
      demo: {
        name: f.value.nom,
        material: f.value.material,
        place: f.value.place,
        url: f.value.url,
      },
    }).then(() => {
      console.log('doc updated');
    });
  }
}
