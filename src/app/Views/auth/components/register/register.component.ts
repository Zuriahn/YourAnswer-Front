import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public SignUpForm: UntypedFormGroup;
  
  public IsRegister:boolean=false;
  public ErrorMessage='';

  constructor(private _UserService: UserService,private _FormBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  /* INIT FORMS*/

  initForm(): void{
    this.SignUpForm = this._FormBuilder.group({
      username: '',
      name: '',
      email: '',
      password: '',
      image: 'https://source.unsplash.com/random/100x100'
    })
  }

  /* CALLS API */

  SignUpUser():void{
    this.IsRegister=true;
    if(this.SignUpForm.valid)
    {
      var response = this._UserService.SignUp(this.SignUpForm.value);
      response.subscribe({
          next: data => {
              sessionStorage.setItem('session', JSON.stringify(data));
              this.router.navigate(['/home'])
          },
          error: error => {
              console.error('There was an error!', error);
              this.ErrorMessage='Ocurrio un error en la base de datos';
              this.IsRegister=false;
          }
      })
    }else{
      this.ErrorMessage='Acción no valida';
      this.IsRegister=false;
    }
  }

  /* VALIDATIONS AND  TARGETS */

  handleFileSelect(evt:any){
    var files = evt.target.files;
    var file = files[0];
  
  if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
  }

  _handleReaderLoaded(readerEvt:any) {
      var binaryString = readerEvt.target.result;
      var ImageSignUp = ('data:image/png;base64,' + btoa(binaryString));
      this.SignUpForm.patchValue({image:ImageSignUp});
  }

}
