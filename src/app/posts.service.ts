import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FbCreatePostResponse, Post} from './admin/shared/interfaces/interfaces';
import {environment} from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {
    }

    createPost(post: Post): Observable<Post> {
        return this.http.post(`${environment.fbBaseUrl}/posts.json`, post)
            .pipe(
                map((res: FbCreatePostResponse) => {
                    return {
                        ...post,
                        id: res.name,
                        date: new Date(post.date)
                    };
                })
            );
    }


}
