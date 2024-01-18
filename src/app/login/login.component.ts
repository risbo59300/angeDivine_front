import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';

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
    console.log("Bonjour");
    const password = this.loginForm.get('password')?.value;
    const username = this.loginForm.get('email')?.value;

    this.authService.login(username, password).subscribe(
      (res: any) =>{
        if(UserStorageService.isAdminLoggedIn()){
          console.log("Bonjour1");
          console.log(UserStorageService.isAdminLoggedIn());
          this.router.navigateByUrl('admin/dashboard');
        } else  if(UserStorageService.isCustomerLoggedIn()){
          console.log("Bonjour_2");

          this.router.navigateByUrl('customer/dashboard');
        }
      },
      (error: any) =>{
        this.snackBar.open('Bad credentials.', 'ERROR', {duration: 5000});
      }
    )
    console.log("Bonjour_3");

  }

}
