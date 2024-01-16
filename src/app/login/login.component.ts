import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;

  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ){}

  ngOnInit() : void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void{
    const password = this.loginForm.get('password')?.value;
    const username = this.loginForm.get('email')?.value;

    this.authService.login(username, password).subscribe(
      (res: any) =>{
        this.snackBar.open('Login success', 'Ok', {duration: 5000});
      },
      (error: any) =>{
        this.snackBar.open('Bad credentials.', 'ERROR', {duration: 5000});
      }
    )
  }

}
