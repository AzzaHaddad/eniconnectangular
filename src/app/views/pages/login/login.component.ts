import { Component } from '@angular/core';
import { ButtonGroupModule } from '@coreui/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../authentication/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userType: string = 'admin';
  constructor(private authService: AuthService, private router: Router) { }
  

  login(email: string, password: string) {
    console.log(password, email,this.userType)
    let authFunction;
    switch(this.userType) {
      case 'admin':
        (this.authService.adminLogin(email, password).subscribe(
          data => {
            this.router.navigate(['/admin'])
          },/*
          error => {
            this.invalidLogin = true
            this.error = error.message;
    
          }*/
        )
        );
        break;
      case 'responsable':
        (this.authService.responsableLogin(email, password).subscribe(
          data => {
            this.router.navigate(['/responsable'])
          },/*
          error => {
            this.invalidLogin = true
            this.error = error.message;
    
          }*/
        )
        );
        break;
      case 'etudiant':
        (this.authService.etudiantLogin(email, password).subscribe(
          data => {
            this.router.navigate(['/etudiant'])
          },/*
          error => {
            this.invalidLogin = true
            this.error = error.message;
    
          }*/
        )
        );
        break;
      default:
         // Default to admin authentication
    }

  
  }

}
