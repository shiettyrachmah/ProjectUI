import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie-list.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnDestroy{
  private movieSubscription?: Subscription;

  movies: Movie[] = [];
  res: {} = {};
  movieh: Movie | undefined;
  constructor(private movieService: MovieService, private route: Router) { }

  ngOnInit(): void {
    this.movieSubscription = this.movieService.listMovie()
    .subscribe({
      next : (data) =>{
       this.movies  = data;
      }
    })
  }

  onDelClick(movieId: number): void {
    if (movieId != undefined) {
      this.movieSubscription = this.movieService.delMovie(movieId)
      .subscribe({
        next : (data) =>{
          this.res = data;
          console.log(data);
          const remove = this.movies.findIndex(x => x.id == movieId);
          if(remove != -1){
            this.movies.splice(remove, 1);
          }
          
        }
      })
    } else {
      console.error('Error: Movie ID is undefined');
    }
  }

  onEditClick(movieId: number): void{
    if(movieId != undefined){
      console.log(movieId);
      this.movieSubscription = this.movieService.editData(movieId)
      .subscribe({
        next : (data) =>{
          data.createdAt = data.createdAt?.substring(0,10);
          data.updatedAt = data.updatedAt?.substring(0,10);

          this.movieh = data;
          console.log(JSON.stringify(this.movieh));
          this.route.navigate(['/movie/update', { movieh: JSON.stringify(this.movieh) }]);
       
        }
      })
    }else{
      console.error('Error: Movie ID is undefinded');
    }
  }

  ngOnDestroy(): void {
    this.movieSubscription?.unsubscribe();
  }
}
