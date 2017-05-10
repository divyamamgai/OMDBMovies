import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Movie} from './movie';

@Injectable()
export class MovieService {

  private omdbAPI: string = 'http://www.omdbapi.com/';

  public pages: Observable<number[]>;

  constructor(private http: Http) {
  }

  getMovies(title: string, year: number, page: number = 1): Observable<Movie[]> {
    return this.http
      .get(`${this.omdbAPI}?s=${title}&y=${year}&page=${page}`)
      .map(function (response) {
        const jsonResponse = response.json();
        const totalPages: number = Math.ceil(parseInt(jsonResponse.totalResults) / jsonResponse.Search.length);
        this.pages = Array.apply(null, {length: totalPages}).map(Number.call, Number);
        return jsonResponse.Search as Movie[];
      });
  }

}
