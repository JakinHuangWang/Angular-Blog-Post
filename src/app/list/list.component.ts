import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { BlogService } from '../blog-service.service';
import { Post } from '../../Post';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
  
export class ListComponent implements OnInit {

  @Input() posts: Post[] = [];
  @Output() openPost = new EventEmitter();
  @Output() newPost = new EventEmitter();
  date: string = "";

  constructor(private BlogService: BlogService) {}

  async ngOnInit() {}

  async triggerOpenPost(post: Post) {
    this.openPost.emit(post);
  }

  triggerNewPost() {
    this.openPost.emit({});
  }

}
