import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Movie} from './movie';

@Injectable()
export class MovieService {

  private omdbAPI: string = 'http://www.omdbapi.com/';

  constructor(private http: Http) {
  }

  getMovies(that: any, page: number = 1): Observable<Movie[]> {
    document.querySelector('#loading').classList.add('show');
    return this.http
      .get(`${this.omdbAPI}?s=${that.searchTitle}&y=${that.searchYear}&page=${page}`)
      .map(function (response) {
        const jsonResponse = response.json();
        if (page == 1) {
          const totalPages: number = Math.ceil(parseInt(jsonResponse.totalResults) / jsonResponse.Search.length);
          that.pages = Array.apply(null, {length: totalPages}).map(Number.call, Number);
        }
        document.querySelector('#loading').classList.remove('show');
        return jsonResponse.Search as Movie[];
      });
  }

}
