import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnswerVM } from 'src/app/Models/Answer/answer.model';
import { UpdAnswerModel } from 'src/app/Models/Answer/updanswer.model';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private _httpClient: HttpClient) { }

  public AddAnswer(AddAnswerVM: AnswerVM){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.post<any>('https://localhost:7008/api/answer',AddAnswerVM, {headers});
  }

  public UpdateAnswer(UpdAnswerModel: UpdAnswerModel){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.put<any>('https://localhost:7008/api/answer',UpdAnswerModel, {headers});
  }

  public DownAnswer(Id: number){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.delete<any>('https://localhost:7008/api/answer/'+ Id);
  }

}
