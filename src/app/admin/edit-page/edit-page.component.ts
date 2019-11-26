import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../shared/posts.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../shared/interfaces/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

    postForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private postsService: PostsService) {
    }

    ngOnInit() {
        /*this.route.params.subscribe((params: Params) => {
            this.postsService.getPostById(params.id);
        });*/
        this.route.params
            .pipe(
                switchMap((params: Params) => {
                    return this.postsService.getPostById(params.id);
                })
            )
            .subscribe((post: Post) => {
                this.postForm = new FormGroup({
                    title: new FormControl(post.title, Validators.required),
                    text: new FormControl(post.text, Validators.required)
                });
            });
    }

    onSubmit() {
        console.log(this.postForm.value);
    }
}
