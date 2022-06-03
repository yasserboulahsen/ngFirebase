import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { EditdemoComponent } from './editdemo/editdemo.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './login/signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AddDemoComponent } from './add-demo/add-demo.component';
import { DemoCoursComponent } from './demo-cours/demo-cours.component';
import { NyaComponent } from './demo-cours/nya/nya.component';
import { NybComponent } from './demo-cours/nyb/nyb.component';
import { NycComponent } from './demo-cours/nyc/nyc.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { ShowImagesComponent } from './show-images/show-images.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard] },

  { path: 'login', component: LoginComponent },
  {
    path: 'signup',
    component: SignupComponent,
  },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardGuard] },
  {
    path: 'demos',
    component: DemoCoursComponent,
    canActivate: [AuthGuardGuard],
  },
  { path: '**', component: LoginComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    EditdemoComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
    AdminComponent,
    AddDemoComponent,
    DemoCoursComponent,
    NyaComponent,
    NybComponent,
    NycComponent,
    ShowImagesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatTreeModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    RouterModule.forRoot(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
