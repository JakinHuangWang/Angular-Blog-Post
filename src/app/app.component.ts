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
  state: number = AppState.List;
  list_state: number = AppState.List;
  edit_state: number = AppState.Edit;
  preview_state: number = AppState.Preview;
  username: string = "";
  
  constructor(private BlogService: BlogService) { }
  
  @HostListener('window:hashchange')
  async onHashChange() {
    const fragment = window.location.hash;
    const fragmentArr = fragment.split('/');

    if (fragmentArr.length < 3) {
      this.state = AppState.List;
      this.posts = await this.BlogService.fetchPosts(this.username);
    } else if (fragmentArr[1] == 'edit') {
      let postid = parseInt(fragmentArr[2]);
      if (postid == 0) {
        this.currentPost = {
          postid: postid,
          username: this.username,
          title: "",
          body: "",
          created: 0,
          modified: 0
        } as Post;
      } else {
        try {
          this.currentPost = await this.BlogService.getPost(this.username, postid);
        } catch (error) {
          this.currentPost = {
            postid: postid,
            username: this.username,
            title: "",
            body: "",
            created: 0,
            modified: 0
          } as Post;
        }
      }
      
      this.state = AppState.Edit;
    } else if (fragmentArr[1] == 'preview') {
      let postid = parseInt(fragmentArr[2]);
      this.state = AppState.Preview;
      if (postid == 0) {
        this.currentPost = {
          postid: postid,
          username: this.username,
          title: "",
          body: "",
          created: 0,
          modified: 0
        } as Post;
      } else {
        this.currentPost = await this.BlogService.getPost(this.username, postid);
      }
    } else {
      this.state = AppState.List;
      this.currentPost = {} as Post;
    }
  }

  async ngOnInit() {
    // const fragment = window.location.hash;
    // const fragmentArr = fragment.split('/');
    // if (fragmentArr.length < 3) {
    //   this.state = AppState.List;
    // } else if (fragmentArr[1] == 'edit') {
    //   this.state = AppState.Edit;
    // } else if (fragmentArr[1] == 'preview') {
    //   this.state = AppState.Preview;
    // } else {
    //   this.state = AppState.List;
    // }

    // Parse the JWT Cookie
    const cookies = cookie.parse(document.cookie);
    const JWT = this.parseJWT(cookies["jwt"]);
    this.username = JWT['usr'];

    // Intialize the posts from our service
    this.posts = await this.BlogService.fetchPosts(this.username);
    this.onHashChange();
  }

  // event handlers for the list component
  openPostHandler(post: Post) {
    this.currentPost = post;
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
    window.location.hash = `#/edit/0`;
  }
  
  // event handlers for the edit component
  async savePostHandler(target: EventTarget) {
    if (target instanceof HTMLInputElement) {
      const newTitle = (target as HTMLInputElement).value;
      this.currentPost.title = newTitle;
      this.posts = this.posts.map((post) => { return post.postid == this.currentPost.postid ? this.currentPost : post });
    } else if (target instanceof HTMLTextAreaElement) {
      const newBody = (target as HTMLTextAreaElement).value;
      this.currentPost.body = newBody;
      this.posts = this.posts.map((post) => { return post.postid == this.currentPost.postid ? this.currentPost : post});
    } else if (target instanceof HTMLButtonElement) {
      this.currentPost.modified = Date.now();
      this.currentPost.created = Date.now()
      await this.BlogService.setPost(this.username, this.currentPost);
      this.posts = await this.BlogService.fetchPosts(this.username);
    }
  }

  async deletePostHandler(post: Post) {
    if (post.postid == 0) {
      this.currentPost = {
        postid: 0,
        username: this.username,
        title: "",
        body: "",
        created: 0,
        modified: 0
      } as Post;
      window.location.hash = '#/';
    } else {
      this.BlogService.deletePost(this.username, post.postid);
      this.posts = await this.BlogService.fetchPosts(this.username);
      if (this.posts) {
        window.location.hash = '#/'
      }
    }
  }

  previewPostHandler(post: Post) {
    window.location.hash = `#/preview/${post.postid}`;
  }

  // event handlers for the preview component
  editPostHandler(post: Post) {
    window.location.hash = `#/edit/${post.postid}`;
  }

  // function to parse JWT token
  parseJWT(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }
}
