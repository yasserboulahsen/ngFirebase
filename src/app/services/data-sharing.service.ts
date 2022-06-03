import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  idDemoEdited: any;
  isAdmin: boolean = false;
  imageUrl: string = '';
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
}
