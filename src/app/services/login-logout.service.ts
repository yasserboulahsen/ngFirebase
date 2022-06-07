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
import { DatabaseService } from './database.service';
import { userData } from '../interfaces/users';
@Injectable({
  providedIn: 'root',
})
export class LoginLogoutService {
  getFire = initializeApp(environment.firebase);
  auth = getAuth(this.getFire);

  constructor(
    private route: Router,
    private dataCharing: DataSharingService,
    private dateSource: DatabaseService
  ) {}
  login(from: any) {
    signInWithEmailAndPassword(this.auth, from.value.email, from.value.password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        // this.dataCharing.setUserUid(user.uid);
        // this.dataCharing.setUserEmail(user.email);
        const userLocal = await this.dateSource.getUserDatabase(user.uid);
        this.dataCharing.checkIfAdmin(userLocal[0].user.isAdmin);
        // this.dataCharing.setUser(true);
        this.route.navigate(['/home']);
        const jsonUser = JSON.stringify(userLocal[0]);
        localStorage.setItem('user', jsonUser);
        localStorage.setItem('userLoged', 'true');

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
      const logoutUser = localStorage.clear();
    });
  }
}
