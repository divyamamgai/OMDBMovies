import { FYLEMoviesPage } from './app.po';

describe('fylemovies App', () => {
  let page: FYLEMoviesPage;

  beforeEach(() => {
    page = new FYLEMoviesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
