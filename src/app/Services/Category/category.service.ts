import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryVM } from 'src/app/Models/Category/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _httpClient: HttpClient) { }

  public GetAllCategories(){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._httpClient.get<CategoryVM[]>('https://localhost:7008/api/category', {headers});
  }

}
