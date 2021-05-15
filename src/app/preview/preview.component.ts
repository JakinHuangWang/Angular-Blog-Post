import { Component, OnInit, OnChanges} from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Parser, HtmlRenderer } from 'commonmark';
import { Post } from '../../Post';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input() post: Post = {} as Post;
  @Output() editPost: EventEmitter<Post> = new EventEmitter();
  markdown_post: Post = {} as Post;

  constructor() {}

  ngOnInit() {
    const reader = new Parser();
    const writer = new HtmlRenderer();
    const new_title = writer.render(reader.parse(this.post.title));
    const new_body = writer.render(reader.parse(this.post.body));
    this.markdown_post = { ...this.post, title: new_title, body: new_body };
  }

  trigger(event: Event) {    
    this.editPost.emit(this.markdown_post);
  }

}
