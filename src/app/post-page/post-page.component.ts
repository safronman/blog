import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../shared/posts.service';
import {Observable} from 'rxjs';
import {Post} from '../admin/shared/interfaces/interfaces';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-post-page',
    templateUrl: './post-page.component.html',
    styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

    post$: Observable<Post>;

    constructor(
        private route: ActivatedRoute,
        private postsService: PostsService
    ) {
    }

    ngOnInit() {
        this.post$ = this.route.params
            .pipe(
                // позволяет изменить направление стрима от params до нужного нам стрима Хм...
                switchMap((params: Params) => {
                    return this.postsService.getPostById(params.id);
                })
            );
    }

}
