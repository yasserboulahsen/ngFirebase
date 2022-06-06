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
import { DataSharingService } from '../services/data-sharing.service';
import { LoginLogoutService } from '../services/login-logout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  getFire = initializeApp(environment.firebase);
  auth = getAuth(this.getFire);
  constructor(private logService: LoginLogoutService) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}
  logFrom(form: NgForm) {
    this.logService.login(form);
  }
}
