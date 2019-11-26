import {Component, OnInit} from '@angular/core';
import {PostsService} from '../shared/posts.service';
import {Post} from '../admin/shared/interfaces/interfaces';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

    posts$: Observable<Post[]>;

    constructor(private postsService: PostsService) {
    }

    ngOnInit() {
        this.posts$ = this.postsService.getPosts();
    }

}
