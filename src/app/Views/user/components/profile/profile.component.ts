import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserVM } from 'src/app/Models/User/user.model';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  public Session:any;

  public id:number;

  public ProfileUser:UserVM = new UserVM();

  public EventHidder:boolean = true;
  public IsLoading=true;

  constructor(private route: ActivatedRoute, private _UserService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.GetUser();
    this.InitSession();
  }

  /* INIT FORMS*/

  InitSession():void{
    this.Session = JSON.parse(sessionStorage.getItem('session')!);
  }

  /* CALLS API */

  GetUser():void{
    this.route.params.subscribe(param =>{
      this.id = param['id'];
      var response = this._UserService.Profile(this.id);
      response.subscribe({
        next: data => {
          this.ProfileUser = data;
          this.IsLoading=false;
        },
        error: error => {
          console.error('There was an error!', error);
          this.router.navigate(['not found'])
        }
      });
    })
  }

  /* VALIDATIONS AND  TARGETS */

  ClickHidder():void{
    if(this.EventHidder === true){
      this.EventHidder = false;
    }else{
      this.EventHidder = true;
    }
  }

}
