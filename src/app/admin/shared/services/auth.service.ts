import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbAuthResponse, User} from '../interfaces/interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {
    }

    get token(): string {
        return '';
    }

    logIn(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken)
            );
    }

    logOut() {
    }

    isAuth(): boolean {
        return !!this.token;
    }

    private setToken(res: FbAuthResponse) {
        debugger
        const expareDate = new Date( new Date().getTime() + Number(res.expiresIn) * 1000 );
        localStorage.setItem('fb-token-id', res.idToken);
        localStorage.setItem('fb-token-exp', expareDate.toString());

        console.log(res);
    }

}
