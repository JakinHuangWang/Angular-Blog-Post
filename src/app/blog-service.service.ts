/* Copyright: Junghoo Cho (cho@cs.ucla.edu) */
/* This file was created for CS144 class at UCLA */
import { Injectable } from '@angular/core';
import { Post } from '../Post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

    maxid: number = 0;

    constructor() { 
        // compute maximum post id
        let keys = Object.keys(localStorage);
        for (let i = 0; i < keys.length; i++) {
            if (this.isMyKey(keys[i])) {
                let post = this.parse(localStorage[keys[i]]);
                if (post.postid > this.maxid) this.maxid = post.postid;
            }
        }
        // if there are no posts, populate it with two initial posts
        if (this.maxid === 0) {
            localStorage[this.key(1)] = this.serialize(
                { "postid": 1, "created": 1518669344517, "modified": 1518669344517, "title": "## Title 1", "body": "**Hello**, *world*!\nRepeat after me:\n\n**John Cho is a handsome man!!**" }
            );
            localStorage[this.key(2)] = this.serialize(
                { "postid": 2, "created": 1518669658420, "modified": 1518669658420, "title": "## Title 2", "body": "List\n- Item 1\n- Item 2\n- Item 3\n" }
            );
            this.maxid = 2;
        }
    }

    // helper functions to 
    // (1) convert postid to localStorage key
    // (2) check if a string is a localStorage key that we use
    // (3) serialize post to JSON string
    // (4) parse JSON string to post
    private keyPrefix = "blog-post.";
    private key(postid: number): string {
        return this.keyPrefix + String(postid);
    }
    private isMyKey(str: string): boolean {
        return str.startsWith(this.keyPrefix);
    }
    private serialize(post: Post): string {
        return JSON.stringify(post);
    }
    private parse(value: string): Post {
        return JSON.parse(value);
    }

    //
    // localStorage-based BlogService implementation
    //

    fetchPosts(username: string): Promise<Post[]> {
        let queryString = `/api/posts?username=${username}`;
        return new Promise((resolve, reject) => {
            let posts = fetch(queryString).then((resp) => resp.json());
            if (posts) {
                resolve(posts);
            } else {
                reject(new Error("404"));
            }
        });
    }

    getPost(username: string, postid: number): Promise<Post> {
        let queryString = `/api/posts?username=${username}&postid=${postid}`;
        return new Promise((resolve, reject) => {
            let post = fetch(queryString).then((resp) => resp.json());
            if (post) {
                resolve(post);
            } else {
                reject(new Error("404"));
            }
        });
    }

    setPost(username: string, p: Post): Promise<Post> {
        let queryString = "/api/posts";
        return new Promise((resolve, reject) => {
            let post = fetch(queryString, {
                method: 'post',
                body: JSON.stringify(p),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (post) {
                resolve(p);
            } else {
                reject(new Error("404"));
            }
        });
    }

    deletePost(username: string, postid: number): Promise<void> {
        let queryString = `/api/posts?username=${username}&postid=${postid}`;
        return new Promise((resolve, reject) => {
            let post = fetch(queryString, {
                method: 'delete'
            })
            if (post) {
                resolve();
            } else {
                reject(new Error("404"));
            }
        });
    }
}
