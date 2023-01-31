import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';

const routes: Routes = [
  {path: 'new', component: AddQuestionComponent},
  {path: ':id', component: QuestionDetailsComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
