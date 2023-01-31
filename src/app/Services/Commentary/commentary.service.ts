import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentaryVM } from 'src/app/Models/Commentary/commentary.model';
import { UpdCommentaryModel } from 'src/app/Models/Commentary/updcommentary.model';

@Injectable({
  providedIn: 'root'
})
export class CommentaryService {

  constructor(private _httpClient: HttpClient) { }

  public AddCommentary(AddCommentaryVM: CommentaryVM){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.post<any>('https://localhost:7008/api/commentary',AddCommentaryVM, {headers});
  }

    
  public UpdateCommentary(UpdCommentaryVM: UpdCommentaryModel){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.put<any>('https://localhost:7008/api/commentary',UpdCommentaryVM, {headers});
  }

  public DownCommentary(Id: number){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.delete<any>('https://localhost:7008/api/commentary/' + Id);
  }

}
