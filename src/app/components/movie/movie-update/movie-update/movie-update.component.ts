import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../models/movie-list.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css']
})

export class MovieUpdateComponent implements OnDestroy{
private updateSubscriptions?: Subscription;

  movie: Movie = {
    id: 0,
    title: '',
    description: '',
    rating: 0,
    image: '',
    createdAt: '',
    updatedAt: ''
  };

  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService) { }

  ngOnInit(): void {
    // Retrieve movie data from route parameters
    const movieData = this.route.snapshot.paramMap.get('movieh');
    if (movieData !== null) {
      this.movie = JSON.parse(movieData);
    } else {
      console.error('Error: Movie data is null');
    }
  }

  onSubmit(){
    console.log(this.movie);
    this.updateSubscriptions = this.movieService.updateMovie(this.movie)
    .subscribe({
      next: (response) =>{
        console.log(response);      
        this.router.navigate(['/movie/list']); 
      }
    })
  }

  ngOnDestroy(): void {
    this.updateSubscriptions?.unsubscribe();
  }
}
