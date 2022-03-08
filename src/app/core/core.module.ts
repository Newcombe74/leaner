import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from '../app-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [NavbarComponent],
  imports: [AppRoutingModule, MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule],
  providers: [],
  exports: [NavbarComponent],
  bootstrap: [NavbarComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
