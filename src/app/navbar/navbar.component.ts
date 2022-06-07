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
  isUser: boolean = false;
  email: string | null = '';
  uid: string | null = '';

  constructor(
    private dataCharing: DataSharingService,
    private log: LoginLogoutService
  ) {}

  ngOnInit(): void {
    this.isadmin = this.dataCharing.getIsAdmin();
    this.isUser = this.dataCharing.getUser();
    this.uid = this.dataCharing.getUserUid();
    console.log(this.dataCharing.getLocalUser().user.isAdmin);
  }
  logout() {
    this.log.logout();
  }
}
