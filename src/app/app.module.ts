import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Views/public/home/home.component';
import { NotFoundComponent } from './Views/public/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './Views/public/search/search.component';
import { ElementsModule } from './Views/elements/elements.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    ElementsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
