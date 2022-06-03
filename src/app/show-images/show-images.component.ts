import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrls: ['./show-images.component.css'],
})
export class ShowImagesComponent implements OnInit {
  imageUrl: string = '';

  constructor(private charedData: DataSharingService) {}

  ngOnInit(): void {
    this.imageUrl = this.charedData.getImage();
  }
}
