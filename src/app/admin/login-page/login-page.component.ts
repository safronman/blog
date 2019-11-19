import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/interfaces/interfaces';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    onSubmit() {
        console.log(this.loginForm.value);
        const user: User = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        };

        this.authService.logIn(user)
            .subscribe((res) => {
                this.loginForm.reset();
                this.router.navigate(['/admin', 'dashboard']);
            });
    }
}

