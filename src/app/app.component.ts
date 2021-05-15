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
  testPost: Post = {} as Post;
  state: number;

  openPostHandler(value: number) {
    console.log(value);
    this.state = AppState.List;
  }

  constructor(private BlogService: BlogService) {
    this.state = AppState.List;
  }

  async ngOnInit() {
    this.posts = await this.BlogService.fetchPosts("123");
    this.testPost = await this.BlogService.getPost("123", 1);
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
