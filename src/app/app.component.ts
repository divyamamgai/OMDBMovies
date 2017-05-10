import {Component, OnInit} from '@angular/core';
import {MovieService} from './movie.service';
import {Movie} from './movie';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieService]
})
export class AppComponent {

  public searchTitle: string;
  public searchYear: number;
  public movies: Observable<Movie[]>;
  public pages: number[];
  public loadingElement;

  constructor(public movieService: MovieService) {
  }

  search(title: string, year: number) {
    this.searchTitle = title;
    this.searchYear = year;
    this.movies = this.movieService.getMovies(this);
  }

  onSearchButtonClick(title: string, year: number) {
    if (title.length > 0) {
      this.search(title, year);
    } else {
      alert('Please provide a Movie Title to search for.');
    }
  }

  onPageChange(page) {
    this.movies = this.movieService.getMovies(this, page);
  }

}
