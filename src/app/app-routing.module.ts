import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Views/auth/auth.component';
import { HomeComponent } from './Views/public/home/home.component';
import { NotFoundComponent } from './Views/public/not-found/not-found.component';
import { SearchComponent } from './Views/public/search/search.component';
import { QuestionComponent } from './Views/question/question.component';
import { UserComponent } from './Views/user/user.component';

const routes: Routes = [
  {path: '', component: AuthComponent,
    loadChildren: () => import('./Views/auth/auth.module').then((x)=>x.AuthModule), pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {
    path: 'auth', component: AuthComponent,
    loadChildren: () => import('./Views/auth/auth.module').then((x)=>x.AuthModule)
  },
  {
    path: 'question', component: QuestionComponent,
    loadChildren: () => import('./Views/question/question.module').then((x)=>x.QuestionModule)
  },
  {
    path: 'user', component: UserComponent,
    loadChildren: () => import('./Views/user/user.module').then((x)=>x.UserModule)
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
