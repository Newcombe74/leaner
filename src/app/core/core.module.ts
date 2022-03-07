import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { throwIfAlreadyLoaded } from './guards/module-import-guard';

@NgModule({
  declarations: [NavbarComponent],
  imports: [MatToolbarModule, MatIconModule],
  providers: [],
  exports: [NavbarComponent],
  bootstrap: [NavbarComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
