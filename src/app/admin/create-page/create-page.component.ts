import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../shared/interfaces/interfaces';
import {PostsService} from '../../shared/posts.service';

@Component({
    selector: 'app-create-page',
    templateUrl: './create-page.component.html',
    styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent {

    postsForm = new FormGroup({
        title: new FormControl('', Validators.required),
        text: new FormControl(''),
        author: new FormControl('', Validators.required)
    });

    constructor(private postsService: PostsService) {
    }

    onSubmit() {
        const post: Post = {
            title: this.postsForm.value.title,
            author: this.postsForm.value.author,
            text: this.postsForm.value.text,
            date: new Date()
        };
        this.postsService.createPost(post)
            .subscribe((res) => {
            });
    }

}
