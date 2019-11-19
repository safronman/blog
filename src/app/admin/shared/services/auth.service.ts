import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../interfaces/interfaces';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {
    }

    get token(): string {
        return '';
    }

    logIn(user: User): Observable<any> {
        return this.http.post('', user);
    }

    logOut() {
    }

    isAuth(): boolean {
        return !!this.token;
    }

    private setToken() {

    }

}
