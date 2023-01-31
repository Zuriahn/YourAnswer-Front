import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileSliderComponent } from './elements/profile-slider/profile-slider.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ElementsModule } from '../elements/elements.module';
import { AnswersComponent } from './components/answers/answers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
    ProfileSliderComponent,
    EditProfileComponent,
    AnswersComponent
  ],
  imports: [
    CommonModule,
    ElementsModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
