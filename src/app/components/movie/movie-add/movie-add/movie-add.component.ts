import { Component, OnDestroy } from '@angular/core';
import { AddMovieRequest } from '../../models/movie-add-request.model';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnDestroy{
  model: AddMovieRequest;
  private addMovieSubscription?: Subscription;

  constructor(private movieService: MovieService, private route: Router) {

    this.model = {
      id:1,
      title: '',
      description: '',
      rating: 0,
      image: '',
      createdAt: '',//new Date().toISOString().split('T')[0],
      updatedAt: ''//new Date().toISOString().split('T')[0]
    };
    
  }

  onFormSubmit(){
    //console.log(this.model);
    this.addMovieSubscription = this.movieService.addMovie(this.model)
    .subscribe({
      next: (response) =>{
        console.log('This successfull');        
        this.route.navigate(['/movie/list']);
      }
    })
  }

  ngOnDestroy(): void {
    this.addMovieSubscription?.unsubscribe();
  }

}
