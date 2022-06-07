import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from '../services/data-sharing.service';
import { LoginLogoutService } from '../services/login-logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isadmin: boolean = false;
  isUser: string = '';
  email: string | null = '';
  uid: string | null = '';

  constructor(
    private dataCharing: DataSharingService,
    private log: LoginLogoutService
  ) {}

  ngOnInit(): void {
    this.isadmin = this.dataCharing.getLocalUser().user.isAdmin;
    this.isUser = this.dataCharing.getLocalUserState();
    this.uid = this.dataCharing.getUserUid();
    this.email = this.dataCharing.getLocalUser().user.name;
  }
  logout() {
    this.log.logout();
  }
}
