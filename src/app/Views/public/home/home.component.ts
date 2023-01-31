import { Component, OnInit } from '@angular/core';
import { QuestionVM } from 'src/app/Models/Question/question.model';
import { QuestionService } from 'src/app/Services/Question/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public AllQuestions:QuestionVM[] = [];

  public IsLoading=true;

  constructor(private _QuestionService: QuestionService) { }

  ngOnInit(): void {
    this.GetAllQuestions();
  }

  /* INIT FORMS*/
  
  /* CALLS API */

  GetAllQuestions():void{
    var response = this._QuestionService.GetAllQuestions();
    response.subscribe({
      next: data => {
          this.AllQuestions = data;
          this.IsLoading=false;
      },
      error: error => {
          console.error('There was an error!', error);
          this.IsLoading=false;
      }
    });
  }

  /* VALIDATIONS AND  TARGETS */

}
