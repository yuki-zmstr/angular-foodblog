import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SectionComponent } from './section/section.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
// import { MatFormFieldModule } from '@angular/material/form-field';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

// Icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { FoodComponent } from './food/food.component';

// import * as $ from '../../node_modules/jquery"

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    SectionComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    BodyComponent,
    HeroComponent,
    FooterComponent,
    FoodComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'my-app-name'),
    HttpClientModule,
    FontAwesomeModule
    // MatFormFieldModule,
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
