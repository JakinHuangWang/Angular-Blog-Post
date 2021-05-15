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

  async trigger(postid: number) {
    const currentPost = await this.BlogService.getPost("", postid);
    this.openPost.emit(currentPost);
  }

}
