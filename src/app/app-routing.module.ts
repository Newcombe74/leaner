import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/pagenotfound.component';
import { AboutComponent } from './features/about/about.component';
import { ERAdmissionComponent } from './features/er-admission/er-admission.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { PrivacyStatementComponent } from './features/privacy-statement/privacy-statement.component';
import { RegisterComponent } from './features/register/register.component';
import { ResourcesComponent } from './features/resources/resources.component';
import { UserAccountComponent } from './features/user-account/user-account.component';
  
const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'about', component: AboutComponent},
    { path: 'privacy-statement', component: PrivacyStatementComponent},
    { path: 'resources', component: ResourcesComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'user-account', component: UserAccountComponent},
    { path: 'er-admission', component: ERAdmissionComponent},
  
    //Wild Card Route for 404 request
    { path: '**', pathMatch: 'full', 
        component: PageNotFoundComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }