import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryVM } from 'src/app/Models/Category/category.model';
import { QuestionVM } from 'src/app/Models/Question/question.model';
import { AnswerService } from 'src/app/Services/Answer/answer.service';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { CommentaryService } from 'src/app/Services/Commentary/commentary.service';
import { QuestionService } from 'src/app/Services/Question/question.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {

  public Session:any;

  public QuestionId:number;
  public SaveIdAns:number;
  public SaveIdCom:number;

  public Question:QuestionVM = new QuestionVM();
  public QuestionForm: UntypedFormGroup;
  public AnswerForm: UntypedFormGroup;
  public UpdAnswerForm: UntypedFormGroup;
  public CommentaryForm: UntypedFormGroup;
  public UpdCommentaryForm: UntypedFormGroup;
  public AllCategories: CategoryVM[] = [];

  public IsLoading:boolean=true;
  public IsCUD:boolean=false;
  public ErrorMessage='';
  
  constructor(private _QuestionService: QuestionService,
              private _AnswerService: AnswerService,
              private _CommentaryService: CommentaryService,
              private _CategoryServices: CategoryService,
              private _FormBuilder: FormBuilder, 
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.GetCategories();
    this.GetQuestion();
    this.InitSession();
    this.initForm();
  }

  /* INIT FORMS*/

  InitSession():void{
    this.Session = JSON.parse(sessionStorage.getItem('session')!);
  }

  initForm(): void{
    this.QuestionForm = this._FormBuilder.group({
      id: this.QuestionId,
      description: '',
      image: '',
      categoryid: 0
    });
    this.AnswerForm = this._FormBuilder.group({
      description: ['', [Validators.required]],
      userid: this.Session.id,
      questionid: this.QuestionId
    });
    this.UpdAnswerForm = this._FormBuilder.group({
      id: this.SaveIdAns,
      description: ''
    });
    this.CommentaryForm = this._FormBuilder.group({
      description: ['', [Validators.required]],
      userid: this.Session.id,
      answerid: this.SaveIdAns
    });
    this.UpdCommentaryForm = this._FormBuilder.group({
      id: this.SaveIdCom,
      description: ''
    });
  }

  /* CALLS API */

  EditQuestion():void{
    this.IsCUD=true;
    if(this.QuestionForm.valid)
    {
      if(this.QuestionForm.value.categoryid === 0){
        this.QuestionForm.patchValue({categoryid: this.Question.categoryid});
      }
      var response = this._QuestionService.UpdateQuestion(this.QuestionForm.value);
      response.subscribe({
          next: data => {
            window.location.reload();
          },
          error: error => {
              console.error('There was an error!', error);
              this.IsCUD=false;
          }
      })
    }else{
      this.IsCUD=false;
    }
  }
  DownQuestion():void{
    this.IsCUD=true;
    var response = this._QuestionService.DownQuestion(this.QuestionId);
    response.subscribe({
        next: data => {
          window.location.reload();
        },
        error: error => {
            console.error('There was an error!', error);
            this.IsCUD=false;
        }
    })
  }

  SaveAnswer():void{
    this.IsCUD=true;
    if(this.AnswerForm.valid)
    {
      var response = this._AnswerService.AddAnswer(this.AnswerForm.value);
      response.subscribe({
          next: data => {
            window.location.reload();
          },
          error: error => {
              console.error('There was an error!', error);
              this.IsCUD=false;
          }
      })
    }else{
      this.IsCUD=false;
    }
  }
  EditAnswer():void{
    this.IsCUD=true;
    if(this.UpdAnswerForm.valid)
    {
      var response = this._AnswerService.UpdateAnswer(this.UpdAnswerForm.value);
      response.subscribe({
          next: data => {
            window.location.reload();  
          },
          error: error => {
              console.error('There was an error!', error);
              this.IsCUD=false;
          }
      })
    }else{
      this.IsCUD=false;
    }
  }
  DownAnswer():void{
    this.IsCUD=true;
    var response = this._AnswerService.DownAnswer(this.SaveIdAns);
    response.subscribe({
        next: data => {
          window.location.reload();
        },
        error: error => {
            console.error('There was an error!', error);
            this.IsCUD=false;
        }
    })
  }

  SaveCommentary():void{
    this.IsCUD=true;
    if(this.CommentaryForm.valid)
    {
      console.log(this.CommentaryForm.value)
      var response = this._CommentaryService.AddCommentary(this.CommentaryForm.value);
      response.subscribe({
          next: data => {
            window.location.reload();
          },
          error: error => {
              console.error('There was an error!', error);
              this.IsCUD=false;
          }
      })
    }else{
      this.IsCUD=false;
    }
  }
  EditCommentary():void{
    this.IsCUD=true;
    if(this.UpdCommentaryForm.valid)
    {
      var response = this._CommentaryService.UpdateCommentary(this.UpdCommentaryForm.value);
      response.subscribe({
          next: data => {
            window.location.reload();
          },
          error: error => {
              console.error('There was an error!', error);
              this.IsCUD=false;
          }
      })
    }else{
      this.IsCUD=false;
    }
  }
  DownCommentary():void{
    this.IsCUD=true;
    var response = this._CommentaryService.DownCommentary(this.SaveIdCom);
    response.subscribe({
        next: data => {
          window.location.reload();
        },
        error: error => {
            console.error('There was an error!', error);
            this.IsCUD=false;
        }
    })
  }
  
  GetQuestion():void{
    this.route.params.subscribe(param =>{
      this.QuestionId = param['id'];
      var response = this._QuestionService.GetQuestion(this.QuestionId);
      response.subscribe({
        next: data => {
          this.Question = data;
          this.IsLoading=false;
        },
        error: error => {
            console.error('There was an error!', error);
            this.router.navigate(['not found'])
        }
      });
    })
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

  SaveIdAnswer(id:number){
    this.SaveIdAns = id;
    this.UpdAnswerForm.patchValue({id:id});
    this.CommentaryForm.patchValue({answerid:id});
  }
  SaveIdCommentary(id:number){
    this.SaveIdCom = id;
    this.UpdCommentaryForm.patchValue({id:id});
  }

  selectCategory(evt:any){
    this.QuestionForm.patchValue({categoryid: evt.target.value});
  }

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
      this.QuestionForm.patchValue({image:ImageSignUp});
  }

}

