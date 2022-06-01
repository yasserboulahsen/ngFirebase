import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  getFire = initializeApp(environment.firebase);
  auth = getAuth(this.getFire);
  constructor(private route: Router, private dataCharing: DataSharingService) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}
  login(from: any) {
    signInWithEmailAndPassword(this.auth, from.value.email, from.value.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user.email === 'yasserboulahsen@gmail.com') {
          this.dataCharing.checkIfAdmin(true);
        }
        this.route.navigate(['/home']);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}
