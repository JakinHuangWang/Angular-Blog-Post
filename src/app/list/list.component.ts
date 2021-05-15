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

  constructor(private BlogService: BlogService) {}

  async ngOnInit() {
    this.posts = await this.BlogService.fetchPosts("123");
  }

  trigger(value: number) {
    console.log("trigger");
    this.openPost.emit(value);
  }

}
