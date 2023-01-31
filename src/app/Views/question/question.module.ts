import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionRoutingModule } from './question-routing.module';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { QuestionComponent } from './question.component';
import { ElementsModule } from '../elements/elements.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    QuestionComponent,
    AddQuestionComponent,
    QuestionDetailsComponent
  ],
  imports: [
    CommonModule,
    ElementsModule,
    QuestionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class QuestionModule { }
