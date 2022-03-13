import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from '../app-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { AppDBService } from './services/db.service';
import { ToastService } from '../shared/services/toast.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [NavbarComponent],
  imports: [BrowserModule, AppRoutingModule, MatToolbarModule, MatIconModule, MatButtonModule,
    MatTooltipModule, MatFormFieldModule],
  exports: [NavbarComponent, MatIconModule, MatButtonModule, MatTooltipModule, MatFormFieldModule,
    FormsModule, ReactiveFormsModule, MatInputModule, MatCardModule, MatStepperModule,
    MatDatepickerModule, MatSelectModule, MatNativeDateModule, MatSnackBarModule, MatTabsModule],
  providers: [AppDBService, UserService, ToastService],
  bootstrap: [NavbarComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
