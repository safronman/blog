import {Component} from '@angular/core';

@Component({
    selector: 'app-page-not-found',
    template: `
        <h1>PAGE NOT FOUND: 404</h1>`,
    styles: [`
        h1 {
            font-size: 36px;
            color: darkred;
            text-align: center;
        }
    `]
})
export class PageNotFoundComponent {
}
