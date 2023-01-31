import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryVM } from 'src/app/Models/Category/category.model';
import { QuestionVM } from 'src/app/Models/Question/question.model';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { QuestionService } from 'src/app/Services/Question/question.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public SearchForm: UntypedFormGroup;
  public AllCategories: CategoryVM[] = [];
  public SearchQuestions:QuestionVM[] = [];

  public IsSearching:boolean=false;
  public ErrorMessage='';
  
  constructor(private _CategoryServices: CategoryService,
              private _FormBuilder: FormBuilder,
              private _QuestionService: QuestionService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.GetCategories();
    this.GetParams();
    this.initForm();
  }

  /* INIT FORMS*/

  initForm():void{
    this.SearchForm = this._FormBuilder.group({
      title:['', [Validators.required]],
      categoryid: [1, [Validators.required]]
    })
  }

  GetParams():void{
    this.route.queryParams.subscribe(queryParams =>{
      this.SearchForm.patchValue({title: queryParams['title']});
    })
  }

  /* CALLS API */

  GetSearchQuestions():void{
    this.IsSearching=true;
    var response = this._QuestionService.GetSearchQuestions(this.SearchForm.value.title,this.SearchForm.value.categoryid);
    response.subscribe({
      next: data => {
          this.SearchQuestions = data;
          this.IsSearching=false;
      },
      error: error => {
          console.error('There was an error!', error);
          this.IsSearching=false;
      }
    });
  }

  GetCategories():void{
    var response = this._CategoryServices.GetAllCategories();
    response.subscribe({
      next: data => {
        this.AllCategories = data;
      },
      error: error => {
          console.error('There was an error!', error);
      }
  })
  }

  /* VALIDATIONS AND  TARGETS */

  selectCategory(evt:any){
    this.SearchForm.patchValue({categoryid: evt.target.value});
  }

}
