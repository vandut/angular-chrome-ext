import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    var storeWindowPosition = () => {
      localStorage['windowWidth'] = window.outerWidth;
      localStorage['windowHeight'] = window.outerHeight;
      localStorage['windowTop'] = window.screenTop;
      localStorage['windowLeft'] = window.screenLeft;
    };
    window.addEventListener('resize', storeWindowPosition);
    window.addEventListener('beforeunload', storeWindowPosition);
  }

}
