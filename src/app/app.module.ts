import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { ResourcesComponent } from './features/resources/resources.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { UserService } from './core/services/user.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { OnlyNumber } from './shared/directives/only-number.directive';
import { AppDBService } from './core/services/db.service';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ToastService } from './shared/services/toast.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent, ResourcesComponent, 
    LoginComponent, RegisterComponent, OnlyNumber, ToastComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
  ],
  providers: [AppDBService, UserService, ToastService, {provide: MAT_DATE_LOCALE, useValue: 'en-US'}],
  bootstrap: [AppComponent],
})
export class AppModule {}
