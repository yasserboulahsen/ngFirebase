import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-add-demo',
  templateUrl: './add-demo.component.html',
  styleUrls: ['./add-demo.component.css'],
})
export class AddDemoComponent implements OnInit {
  constructor(private dataPost: DatabaseService) {}

  ngOnInit(): void {}
  formData(f: NgForm) {
    this.dataPost.postData(f, 'demonstrations');
  }
}
