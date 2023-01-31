import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInVM } from 'src/app/Models/User/signin.model';
import { SignUpVM } from 'src/app/Models/User/signup.model';
import { UserVM } from 'src/app/Models/User/user.model';
import { UpdUserModel } from 'src/app/Models/User/upduser.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }

  public SignIn(SignInVM: SignInVM){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.post<any>('https://localhost:7008/api/user/SignIn',SignInVM, {headers});
  }

  public SignUp(SignUpVM: SignUpVM){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.post<any>('https://localhost:7008/api/user/SignUp',SignUpVM, {headers});
  }

  public Profile(Id:number){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.get<UserVM>('https://localhost:7008/api/user/'+Id, {headers});
  }

  public UpdateUser(UpdUserVM: UpdUserModel){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.put<any>('https://localhost:7008/api/user',UpdUserVM, {headers});
  }

  public DownUser(Id: number){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.put<any>('https://localhost:7008/api/user/down',Id, {headers});
  }
  
}
