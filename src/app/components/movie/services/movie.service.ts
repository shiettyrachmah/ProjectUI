import { Injectable } from '@angular/core';
import { AddMovieRequest } from '../models/movie-add-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie-list.model';
import { ResponseData } from '../models/response-data.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  addMovie(model:  AddMovieRequest): Observable<void> {

    console.log(model);

    let jsonData = {
      "id":model.id,
      "title":model.title,
      "description": model.description,
      "rating":model.rating,
      "image":model.image,
      "createdAt":model.createdAt,
      "updatedAt":model.updatedAt
    }
    
    const formData = new FormData();
    formData.append('jsonData', JSON.stringify(jsonData));
   
    return this.http.post<void>('https://localhost:7270/Movie', formData);
  }

  listMovie():Observable<Movie[]>{
    return this.http.get<Movie[]>('https://localhost:7270/Movie');
  }

  delMovie(movieID: number) : Observable<ResponseData>{
    return this.http.delete<ResponseData>(`https://localhost:7270/${movieID}`);
  }

  editData(movieID : Number):Observable<Movie>{
    return this.http.get<Movie>(`https://localhost:7270/${movieID}`);
  }

  updateMovie(movie: Movie) : Observable<Movie>{
    const updateUrl = `https://localhost:7270/${movie.id}`;
    const patchDocument = [
      { path: 'title', op: 'replace', value: movie.title },
      { path: 'description', op: 'replace', value: movie.description },
      { path: 'rating', op: 'replace', value: movie.rating },
      { path: 'image', op: 'replace', value: movie.image },
      { path: 'createdAt', op: 'replace', value: movie.createdAt },
      { path: 'updatedAt', op: 'replace', value: movie.updatedAt }
    ];

    return this.http.patch<any>(updateUrl, patchDocument);
  }
}
