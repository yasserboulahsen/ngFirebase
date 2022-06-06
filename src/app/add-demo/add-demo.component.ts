import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-add-demo',
  templateUrl: './add-demo.component.html',
  styleUrls: ['./add-demo.component.css'],
})
export class AddDemoComponent implements OnInit {
  fileImages: any = null;
  constructor(private dataPost: DatabaseService, public dialog: MatDialog) {}

  ngOnInit(): void {}
  formData(f: NgForm) {
    this.dataPost.postData(f, 'demonstrations', this.fileImages);
    this.dialog.closeAll();
  }
  imageFileChane(event: any) {
    this.fileImages = <File>event.target.files[0];
  }
}
