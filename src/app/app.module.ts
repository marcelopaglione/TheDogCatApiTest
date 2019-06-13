
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatsComponent } from './components/cats/cats.component';
import { DogsComponent } from './components/dogs/dogs.component';
import { ButtonComponent } from './components/dummy/button/button.component';
import { ImgComponent } from './components/dummy/img/img.component';
import { ListComponent } from './components/dummy/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ListComponent,
    ImgComponent,
    CatsComponent,
    DogsComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
