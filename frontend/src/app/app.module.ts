import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';
import { SaveBookComponent } from './biblio/save-book/save-book.component';
import { ListBookComponent } from './biblio/list-book/list-book.component';
import { RegisterUserComponent } from './admin/register-user/register-user.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { BookService } from './services/book.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './guard/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    SaveBookComponent,
    ListBookComponent,
    RegisterUserComponent,
    ListUserComponent,
    UpdateUserComponent,
    ListRoleComponent,
    RegisterRoleComponent,
    UpdateRoleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
  ],

  providers: [
    UserService,
    RoleService,
    BookService,
    TokenInterceptorService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
