import { Component } from '@angular/core';
import { BlogService } from './blog-service.service';
import { Post } from '../Post';
enum AppState { List, Edit, Preview };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  posts: Post[] = [];
  currentPost: Post = {} as Post;
  state: number = 0;

  
  constructor(private BlogService: BlogService) {}

  async ngOnInit() {
    this.state = AppState.List;
    this.posts = await this.BlogService.fetchPosts("123");
    this.currentPost = await this.BlogService.getPost("123", 1);
  }

  openPostHandler(post: Post) {
    this.currentPost = post;
    this.state = AppState.Edit;
  }

  newPostHandler() { }
  
  savePostHandler(post: Post) {
    console.log(post);
  }

  deletePostHandler(post: Post) {
    console.log(post);
  }

  previewPostHandler(post: Post) {
    this.state = AppState.Preview;
    console.log(post);
  }

  editPostHandler(post: Post) {
    this.state = AppState.Edit;
    console.log(post);
  }
}
