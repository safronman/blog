import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {PostPageComponent} from './post-page/post-page.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            {path: '', redirectTo: '/', pathMatch: 'full'},
            {path: '', component: HomePageComponent},
            {path: 'post/:id', component: PostPageComponent}
        ],
    },
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
