import { Component } from '@angular/core';
import { Post } from '../Post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts: Post[] = [
    {
      postid: 0,
      created: 0,
      modified: 0,
      title: "Good Day",
      body: "Very Good Day"
    },
    {
      postid: 1,
      created: 2,
      modified: 3,
      title: "Good Week",
      body: "Very Good Week"
    }
  ];

  openPostHandler(value: number) {
    console.log(value);
  }

  newPostHandler() {
    
  }
}
