import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryVM } from 'src/app/Models/Category/category.model';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { QuestionService } from 'src/app/Services/Question/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Session:any;
  
  public QuestionForm: UntypedFormGroup;
  public AllCategories: CategoryVM[] = [];

  public IsAdd:boolean=false;
  public ErrorMessage='';

  constructor(private _QuestionService: QuestionService, private _CategoryServices: CategoryService,private _FormBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.InitSession();
    this.GetCategories();
    this.initForm();
  }

  /* INIT FORMS*/
  
  InitSession():void{
    this.Session = JSON.parse(sessionStorage.getItem('session')!);
  }

  public initForm(): void{
    this.QuestionForm = this._FormBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      userid: this.Session.id,
      categoryid: [1, [Validators.required]],
      image: ['', [Validators.required]]
    })
  }

  /* CALLS API */

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

  SaveQuestion():void{
    this.IsAdd=true;
    if(this.QuestionForm.valid)
    {
      var response = this._QuestionService.AddQuestion(this.QuestionForm.value);
      response.subscribe({
          next: data => {
              this.router.navigate(['/question/'+data])
          },
          error: error => {
              console.error('There was an error!', error);
              this.ErrorMessage='Hubo un error en la base de datos';
              this.IsAdd=true;
          }
      })
    }else{
      this.ErrorMessage='Acción no valida';
      this.IsAdd=false;
    }
  }

  /* VALIDATIONS AND  TARGETS */

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
      this.QuestionForm.patchValue({image: ImageSignUp});
  }

}
