import { OMDBMoviesPage } from './app.po';

describe('omdbmovies App', () => {
  let page: OMDBMoviesPage;

  beforeEach(() => {
    page = new OMDBMoviesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
