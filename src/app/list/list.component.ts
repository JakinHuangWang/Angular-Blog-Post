import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../Post';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() posts: Post[];
  @Output() openPost = new EventEmitter();
  @Output() newPost = new EventEmitter();

  constructor() {
    this.posts = [];
  }

  ngOnInit(): void {
  }

  trigger(value: number) {
    console.log("trigger");
    this.openPost.emit(value);
  }

}
