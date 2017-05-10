(function ($, d, w, undefined) {

    /**
     * @type jQuery
     */
    var $movieTitle,
        $movieYear,
        $searchButton,
        $movieContainer,
        $pagination,
        $loading,
        $movieCache = $('<div class="movie col-xs-12 col-sm-6 col-md-6 col-lg-4">\n    <img class="movie-poster" title="Movie Poster" alt="Movie Poster">\n    <h1 title="Movie Title" class="movie-title"></h1>\n    <a class="movie-link">\n        <span class="glyphicon glyphicon-share"></span>\n        View in IMDB\n    </a>\n    <br>\n    <span title="Movie Year" class="movie-year"></span>\n</div>');

    /**
     * @type Folio
     */
    var paginationTopFolio,
        paginationBottomFolio;

    var movieTitle,
        movieYear,
        totalResults,
        totalPages,
        pageLength;

    function generateMovieContainer(movies) {
        $movieContainer.empty();
        var movie,
            $movie,
            moviesLength = movies.length;
        for (var i = 0; i < moviesLength; i++) {
            movie = movies[i];
            $movie = $movieCache.clone();
            $('.movie-poster', $movie)
                .attr('src', movie.Poster);
            $('.movie-title', $movie)
                .html(movie.Title);
            $('.movie-link', $movie)
                .attr('href', 'http://www.imdb.com/title/' + movie.imdbID);
            $('.movie-year', $movie)
                .html(movie.Year);
            $movieContainer.append($movie);
        }
    }

    w.getPage = function (page) {
        $.ajax({
            url: 'http://www.omdbapi.com',
            type: 'GET',
            data: {
                s: movieTitle,
                type: 'movie',
                y: movieYear,
                page: page
            },
            beforeSend: function () {
                $loading.addClass('show');
            },
            success: function (response) {
                response = $.extend({
                    Response: false,
                    Search: [],
                    totalResults: 0
                }, response);
                totalResults = parseInt(response.totalResults);
                if (response.Response && !isNaN(totalResults) && totalResults > 0) {
                    generateMovieContainer(response.Search);
                }
            },
            error: function () {
                alert('Error Occurred!');
            },
            complete: function () {
                $loading.removeClass('show');
            }
        });
    };

    function searchButtonOnClick() {
        $.ajax({
            url: 'http://www.omdbapi.com',
            type: 'GET',
            data: {
                s: movieTitle = $movieTitle.val(),
                type: 'movie',
                y: movieYear = $movieYear.val()
            },
            beforeSend: function () {
                $loading.addClass('show');
            },
            success: function (response) {
                response = $.extend({
                    Response: false,
                    Search: [],
                    totalResults: 0
                }, response);
                totalResults = parseInt(response.totalResults);
                if (response.Response && !isNaN(totalResults) && totalResults > 0) {
                    pageLength = response.Search.length;
                    totalPages = Math.ceil(totalResults / pageLength);
                    paginationTopFolio
                        .setOptions({
                            totalPages: totalPages,
                            activePage: 1
                        })
                        .generate();
                    paginationBottomFolio
                        .setOptions({
                            totalPages: totalPages,
                            activePage: 1
                        })
                        .generate()
                        .update(true);
                    $pagination.addClass('show');
                    generateMovieContainer(response.Search);
                } else {
                    $pagination.removeClass('show');
                    $movieContainer
                        .empty()
                        .html('<h1 class="text-center text-danger">No Search Results!</h1>');
                }
            },
            error: function () {
                alert('Error Occurred!');
            },
            complete: function () {
                $loading.removeClass('show');
            }
        });
    }

    $(function () {
        $movieTitle = $('#movie-title', d);
        $movieYear = $('#movie-year', d);
        $searchButton = $('#search-button', d)
            .on('click', searchButtonOnClick);
        $movieContainer = $('#movie-container', d);
        $pagination = $('.pagination', d);
        $loading = $('#loading', d);
        paginationTopFolio = $($pagination.get(0)).GetFolio();
        paginationBottomFolio = $($pagination.get(1)).GetFolio();
        paginationTopFolio.link(paginationBottomFolio);
    });

})(jQuery, document, window);