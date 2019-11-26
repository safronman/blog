import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbCreatePostResponse, Post} from '../admin/shared/interfaces/interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {
        this.getPosts();
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

    getPosts(): Observable<Post[]> {
        return this.http.get(`${environment.fbBaseUrl}/posts.json`)
            .pipe(
                map((res: { [key: string]: any }) => {
                    return Object
                        .keys(res)
                        .map((key) => {
                            return {
                                ...res[key],
                                id: key,
                                date: new Date(res[key].date)
                            };
                        });
                })
            );
    }

    deletePost(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.fbBaseUrl}/posts/${id}.json`)
    }

}
