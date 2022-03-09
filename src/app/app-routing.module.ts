import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/pagenotfound.component';
import { AboutComponent } from './features/about/about.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { ResourcesComponent } from './features/resources/resources.component';
  
const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'about', component: AboutComponent},
    { path: 'resources', component: ResourcesComponent},
    { path: 'login', component: LoginComponent},
  
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