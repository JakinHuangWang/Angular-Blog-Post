import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../Post';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() post: Post = {} as Post;
  @Output() savePost: EventEmitter<Post> = new EventEmitter();
  @Output() deletePost: EventEmitter<Post> = new EventEmitter();
  @Output() previewPost: EventEmitter<Post> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  triggerSave(event: Event) {
    console.log(event.target);
    this.savePost.emit(this.post);
  }

  triggerDelete(event: Event) {
    console.log(event.target);
    this.deletePost.emit(this.post);
  }

  triggerPreview(event: Event) {
    console.log(event.target);
    this.previewPost.emit(this.post);
  }

}
