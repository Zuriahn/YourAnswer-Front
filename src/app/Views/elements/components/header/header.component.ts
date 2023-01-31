import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public SessionHeader:any;

  public SearchHeaderForm: UntypedFormGroup;
  
  constructor(private router: Router, private _FormBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.InitSession();
    this.initForm();

    // console.log(this.SessionHeader)
    // this.SessionHeader = SessionJson.username;
    // var SessionParse = SessionJson ? JSON.parse(SessionJson) : null;
    // this.UsernameHeader = SessionParse.username;
  }

 /* INIT FORMS*/

  InitSession():void{
    this.SessionHeader = JSON.parse(sessionStorage.getItem('session')!);
  }

  initForm():void{
    this.SearchHeaderForm = this._FormBuilder.group({
      title:''
    })
  }

  SearchQuestion():void{
    this.router.navigate(['/search'],{queryParams:{title:this.SearchHeaderForm.value.title}})
  }

  /* CALLS API */

  SignOut():void{
    sessionStorage.removeItem('session');
  }

  /* VALIDATIONS AND  TARGETS */

}
