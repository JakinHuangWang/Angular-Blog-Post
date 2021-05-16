import { Component, HostListener } from '@angular/core';
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
  username: string = "";
  
  constructor(private BlogService: BlogService) { }
  
  @HostListener('window:hashchange')
  async onHashChange() {
    const fragment = window.location.hash;
    const fragmentArr = fragment.split('/');
    console.log(fragmentArr);

    if (fragmentArr.length < 3) {
      this.state = AppState.List;
      this.posts = await this.BlogService.fetchPosts(this.username);
    } else if (fragmentArr[1] == 'edit') {
      this.state = AppState.Edit;
      this.currentPost = await this.BlogService.getPost(this.username, parseInt(fragmentArr[2]));
    } else if (fragmentArr[2] == 'preview') {
      this.state = AppState.Preview;
      this.currentPost = await this.BlogService.getPost(this.username, parseInt(fragmentArr[2]));
    } else {
      this.state = AppState.List;
      this.currentPost = {} as Post;
    }
  }

  async ngOnInit() {
    window.location.hash = "#/";
    this.state = AppState.List;

    // Parse the JWT Cookie
    const cookies = cookie.parse(document.cookie);
    const JWT = this.parseJWT(cookies["jwt"]);
    this.username = JWT['usr'];
    // Intialize the posts from our service
    this.posts = await this.BlogService.fetchPosts(this.username);
  }

  // event handlers for the list component
  openPostHandler(post: Post) {
    this.currentPost = post;
    this.state = AppState.Edit;
    window.location.hash = `#/edit/${post.postid}`;
  }

  newPostHandler() {
    this.currentPost = {
      postid: 0,
      username: this.username,
      title: "",
      body: "",
      created: 0,
      modified: 0
    } as Post;
    this.state = AppState.Edit;
    window.location.hash = `#/edit/0`;
  }
  
  // event handlers for the edit component
  async savePostHandler(target: EventTarget) {
    if (target instanceof HTMLInputElement) {
      const newTitle = (target as HTMLInputElement).value;
      this.currentPost.title = newTitle;
    } else if (target instanceof HTMLTextAreaElement) {
      const newBody = (target as HTMLTextAreaElement).value;
      this.currentPost.body = newBody;
    } else if (target instanceof HTMLButtonElement) {
      this.currentPost.modified = Date.now();
      await this.BlogService.setPost(this.username, this.currentPost);
      console.log(this.currentPost);
      this.posts = await this.BlogService.fetchPosts(this.username);
    }
  }

  async deletePostHandler(post: Post) {
    this.BlogService.deletePost(this.username, post.postid);
    this.posts = await this.BlogService.fetchPosts(this.username);
    if (this.posts) {
      this.state = AppState.List;
    }
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
