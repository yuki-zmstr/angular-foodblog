import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/components/home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SectionComponent } from './features/components/section/section.component';
import { LoginComponent } from './features/components/login/login.component';
import { SignupComponent } from './features/components/signup/signup.component';
import { HeaderComponent } from './features/components/header/header.component';
import { BodyComponent } from './features/components/body/body.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './features/services/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

// Icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeroComponent } from './features/components/hero/hero.component';
import { FooterComponent } from './features/components/footer/footer.component';
import { FoodComponent } from './features/components/food/food.component';
import { AddFoodComponent } from './features/components/add-food/add-food.component';

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
    AddFoodComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'my-app-name'),
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
