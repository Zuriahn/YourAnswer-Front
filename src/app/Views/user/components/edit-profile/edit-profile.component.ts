import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
 
  public Session:any;
  
  public UserUpdForm: UntypedFormGroup;

  public IsUpdate:boolean=false;
  public ErrorMessage='';
  
  constructor(private _UserService: UserService,private _FormBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.InitSession();
    this.initForm();
  }

  /* INIT FORMS*/

  InitSession():void{
    this.Session = JSON.parse(sessionStorage.getItem('session')!);
  }

  initForm(): void{
    this.UserUpdForm = this._FormBuilder.group({
      id: this.Session.id,
      name: '',
      password: '',
      image: ''
    })
  }

  /* CALLS API */

  SaveEdit():void{
    this.IsUpdate = true;
    if(this.UserUpdForm.valid)
    {
      var response = this._UserService.UpdateUser(this.UserUpdForm.value);
      response.subscribe({
          next: data => {
              this.router.navigate(['/user/'+this.Session.id])
          },
          error: error => {
              console.error('There was an error!', error);
              this.ErrorMessage='Hubo un error en la base de datos';
              this.IsUpdate = false;
          }
      })
    }else{
      this.ErrorMessage='Acción no valida';
      this.IsUpdate = false;
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
      this.UserUpdForm.patchValue({image:ImageSignUp});
  }
}
