import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './components/movie/movie-list/movie-list.component';
import { MovieAddComponent } from './components/movie/movie-add/movie-add/movie-add.component';
import { MovieUpdateComponent } from './components/movie/movie-update/movie-update/movie-update.component';

const routes: Routes = [
  {
    path:'movie/list',
    component:MovieListComponent
  },
  {
    path: 'movie/add',
    component:MovieAddComponent
  },
  {
    path:'movie/update',
    component:MovieUpdateComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
