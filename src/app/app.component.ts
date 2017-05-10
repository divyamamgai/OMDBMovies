import {Component} from '@angular/core';
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

  movies: Observable<Movie[]>;

  constructor(public movieService: MovieService) {
  }

  search(title: string, year: number) {
    this.movies = this.movieService.getMovies(title, year);
  }

  onSearchButtonClick(title: string, year: number) {
    if (title.length > 0) {
      this.search(title, year);
    } else {
      alert('Please provide a Movie Title to search for.');
    }
  }

}
