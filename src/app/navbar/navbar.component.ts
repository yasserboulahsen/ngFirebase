import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isadmin: boolean = false;
  constructor(private dataCharing: DataSharingService) {}

  ngOnInit(): void {
    this.isadmin = this.dataCharing.getIsAdmin();
  }
}
