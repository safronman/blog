import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../shared/interfaces/interfaces';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

    posts: Post[] = [];
    postSubscription: Subscription;

    constructor(private postsService: PostsService) {
    }

    ngOnInit() {
        this.postSubscription = this.postsService.getPosts()
            .subscribe((res) => {
                this.posts = res;
            });
    }

    deletePost(id: string) {
        console.log('Delete post');
    }

    ngOnDestroy(): void {
        if (this.postSubscription) {
            this.postSubscription.unsubscribe();
        }
    }
}
