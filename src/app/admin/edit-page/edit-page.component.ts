import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PostsService} from '../../shared/posts.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../shared/interfaces/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit, OnDestroy {

    postForm: FormGroup;
    post: Post;
    submitted = false;
    updateSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private postsService: PostsService,
        private alertService: AlertService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.route.params
            .pipe(
                // todo: why switchMap?
                switchMap((params: Params) => {
                    return this.postsService.getPostById(params.id);
                })
            )
            .subscribe((post: Post) => {
                this.post = post;
                this.postForm = new FormGroup({
                    title: new FormControl(post.title, Validators.required),
                    text: new FormControl(post.text, Validators.required)
                });
            });
    }

    onSubmit() {
        this.submitted = true;

        this.updateSubscription = this.postsService.updatePost({
            ...this.post,
            text: this.postForm.value.text,
            title: this.postForm.value.title
        }).subscribe(() => {
            this.submitted = false;
            this.router.navigate(['/admin', 'dashboard']);
        });

        this.alertService.warning('Post was updated');
    }

    ngOnDestroy() {
        if (this.updateSubscription) {
            this.updateSubscription.unsubscribe();
        }
    }
}
