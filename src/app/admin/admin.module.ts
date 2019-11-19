import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {CreatePageComponent} from './create-page/create-page.component';


@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        EditPageComponent,
        DashboardPageComponent,
        CreatePageComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule
    ],
})
export class AdminModule {
}
