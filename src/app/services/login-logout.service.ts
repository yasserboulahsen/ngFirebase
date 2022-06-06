import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
  User,
} from 'firebase/auth';
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
import { DataSharingService } from '../services/data-sharing.service';
@Injectable({
  providedIn: 'root',
})
export class LoginLogoutService {
  getFire = initializeApp(environment.firebase);
  auth = getAuth(this.getFire);

  constructor(private route: Router, private dataCharing: DataSharingService) {}
  login(from: any) {
    signInWithEmailAndPassword(this.auth, from.value.email, from.value.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        if (user.email === 'yasserboulahsen@gmail.com') {
          this.dataCharing.checkIfAdmin(true);
        }
        this.dataCharing.setUser(true);
        this.route.navigate(['/home']);
        this.dataCharing.setUserEmail(user.email);
        const jsonUser = JSON.stringify(user);
        localStorage.setItem('user', jsonUser);
        const userJson = localStorage.getItem('user');
        this.dataCharing.setLocalUser(userJson);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  logout() {
    signOut(this.auth).then(() => {
      this.route.navigate(['/login']);
      this.dataCharing.checkIfAdmin(false);
      const logoutUser = localStorage.clear();
    });
  }
}
