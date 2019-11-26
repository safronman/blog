import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PostPageComponent} from './post-page/post-page.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PostComponent} from './shared/components/post/post.component';
import {SharedModule} from './admin/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './shared/auth.interceptor';

registerLocaleData(ruLocale, 'ru');

export const INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};

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
        AppRoutingModule,
        SharedModule
    ],
    providers: [INTERCEPTOR_PROVIDER],
    bootstrap: [AppComponent]
})
export class AppModule {
}
