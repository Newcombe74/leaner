import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/pagenotfound.component';
import { HomeComponent } from './features/home/home.component';
  
const routes: Routes = [
    { path: '', component: HomeComponent},
  
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