import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  localUser: string | null = '';
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
      this.localUser = JSON.parse(user);
    }
  }
  getLocalUser() {
    return this.localUser;
  }
  getUserEmail() {
    return this.userEmail;
  }

  setUserEmail(email: string | null) {
    this.userEmail = email;
  }
}
