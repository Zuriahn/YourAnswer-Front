import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionVM } from 'src/app/Models/Question/question.model';
import { UpdQuestionModel } from 'src/app/Models/Question/updquestion.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _httpClient: HttpClient) { }

  public AddQuestion(AddQuestionVM: QuestionVM){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.post<any>('https://localhost:7008/api/question',AddQuestionVM, {headers});
  }

  public GetQuestion(Id:number){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.get<QuestionVM>('https://localhost:7008/api/question/'+Id, {headers});
  }

  public GetAllQuestions(){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.get<QuestionVM[]>('https://localhost:7008/api/question', {headers});
  }

  public GetSearchQuestions(title:string, categoryid:number){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.get<QuestionVM[]>('https://localhost:7008/api/question/search/'+title+'/'+categoryid,{headers});
  }
  
  public UpdateQuestion(UpdQuestionModel: UpdQuestionModel){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.put<any>('https://localhost:7008/api/question',UpdQuestionModel, {headers});
  }

  public DownQuestion(Id: number){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.delete<any>('https://localhost:7008/api/question/'+ Id);
  }


}
