import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-auth-layout',
  imports: [LoginComponent, RegisterComponent, RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
