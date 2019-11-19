import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostComponent } from './shared/components/post/post.component';

@NgModule({
    declarations: [
        AppComponent,
        MainLayoutComponent,
        HomePageComponent,
        PostPageComponent,
        PageNotFoundComponent,
        PostComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
