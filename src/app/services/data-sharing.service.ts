import { Injectable } from '@angular/core';
import { userData } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  localUser: userData = {
    user: {
      name: '',
      email: '',
      isAdmin: false,
      uid: '',
    },
  };
  idDemoEdited: any;
  isAdmin: boolean = false;
  imageUrl: string = '';
  isUser: boolean = false;
  userUid: string | null = '';
  userEmail: string | null = '';
  constructor() {}

  setId(id: any) {
    this.idDemoEdited = id;
  }
  getId() {
    return this.idDemoEdited;
  }
  checkIfAdmin(admin: boolean) {
    this.isAdmin = admin;
  }
  getIsAdmin() {
    return this.isAdmin;
  }
  setImage(image: string) {
    this.imageUrl = image;
  }
  getImage() {
    return this.imageUrl;
  }
  getUser() {
    return this.isUser;
  }
  setUser(user: boolean) {
    this.isUser = user;
  }
  getUserUid() {
    return this.userUid;
  }
  setUserUid(uid: string | null) {
    this.userUid = uid;
  }

  setLocalUser(user: string | null) {
    if (user !== null) {
      this.localUser = JSON.parse(user) as userData;
    }
  }
  getLocalUser() {
    return this.localUser as userData;
  }
  getUserEmail() {
    return this.userEmail;
  }

  setUserEmail(email: string | null) {
    this.userEmail = email;
  }
}
