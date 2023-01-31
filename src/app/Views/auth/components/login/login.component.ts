import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public SignInForm: UntypedFormGroup;
  
  public IsLogin:boolean=false;
  public ErrorMessage='';

  constructor(private _UserService: UserService,private _FormBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  /* INIT FORMS*/

  initForm(): void{
    this.SignInForm = this._FormBuilder.group({
      email: '',
      password: ''
    })
  }

  /* CALLS API */

  SignInUser():void{
    this.IsLogin=true;
    if(this.SignInForm.valid)
    {
      var response = this._UserService.SignIn(this.SignInForm.value);
      response.subscribe({
        next: data => {
          sessionStorage.setItem('session', JSON.stringify(data));
          this.router.navigate(['/home'])
        },
        error: error => {
          console.error('There was an error!', error);
          this.ErrorMessage = 'Correo o contraseña incorrectos';
          this.IsLogin=false;
        }
    })
    }else{
      this.ErrorMessage = 'Acción no valida';
      this.IsLogin=false;
    }
  }

  /* VALIDATIONS AND  TARGETS */

}
