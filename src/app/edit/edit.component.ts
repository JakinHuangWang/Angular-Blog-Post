import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { BlogService } from '../blog-service.service';
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

  constructor(private BlogService: BlogService) { }

  ngOnInit(): void {
  }

  triggerSave(event: Event) {
    this.savePost.emit(this.post);
    this.BlogService.setPost("", this.post);
  }

  triggerDelete(event: Event) {
    this.deletePost.emit(this.post);
  }

  triggerPreview(event: Event) {
    console.log(event.target);
    this.previewPost.emit(this.post);
  }

  onTitleChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.post.title = newValue;
    this.savePost.emit(this.post);
  }

  onBodyChange(event: Event) {
    const newValue = (event.target as HTMLTextAreaElement).value;
    this.post.body = newValue;
    this.savePost.emit(this.post);
  }

}
