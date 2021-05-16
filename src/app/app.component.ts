import { Component } from '@angular/core';
import * as cookie from 'cookie';
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
  list_state: number = AppState.List;
  edit_state: number = AppState.Edit;
  preview_state: number = AppState.Preview;
  
  constructor(private BlogService: BlogService) {}

  async ngOnInit() {
    this.state = AppState.List;
    this.posts = await this.BlogService.fetchPosts("123");
    const cookies = cookie.parse(document.cookie);
    console.log(cookies);
  }

  // event handlers for the list component
  openPostHandler(post: Post) {
    this.currentPost = post;
    this.state = AppState.Edit;
  }

  newPostHandler() {
    var newPost = {} as Post;
    this.BlogService.setPost("", newPost);
  }
  
  // event handlers for the edit component
  savePostHandler(post: Post) {
    this.currentPost = post;
  }

  async deletePostHandler(post: Post) {
    this.BlogService.deletePost("", post.postid);
    this.posts = await this.BlogService.fetchPosts("");
    this.state = AppState.List;
  }

  previewPostHandler(post: Post) {
    this.state = AppState.Preview;
  }

  // event handlers for the preview component
  editPostHandler(post: Post) {
    this.state = AppState.Edit;
  }

  // function to parse JWT token
  parseJWT(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }
}
