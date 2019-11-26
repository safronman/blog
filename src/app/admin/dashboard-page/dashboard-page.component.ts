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
    search = '';
    postSubscription: Subscription;
    deleteSubscription: Subscription;

    constructor(private postsService: PostsService) {
    }

    ngOnInit() {
        this.postSubscription = this.postsService.getPosts()
            .subscribe((res) => {
                this.posts = res;
            });
    }

    deletePost(id: string) {
        this.deleteSubscription = this.postsService.deletePost(id)
            .subscribe((res) => {
                this.posts = this.posts.filter(post => {
                    return post.id !== id;
                });
            });
    }

    ngOnDestroy(): void {
        if (this.postSubscription) {
            this.postSubscription.unsubscribe();
        }
        if (this.deleteSubscription) {
            this.deleteSubscription.unsubscribe();
        }
    }
}
