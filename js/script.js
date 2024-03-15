$(document).ready(function () {
  $.ajax({
    url: 'https://lk21-api.cyclic.app/movies',
    method: 'GET',
    success: function (data) {
      data.forEach(function (movie) {
        var $movieItem = $('<div class="movie-item">')
          .html('<img src="' + movie.posterImg + '">' + '<div class="movie-title"><p>' + movie.title + '</p>')
          .click(function () {
            showModal(movie._id);
          });
        $('#movie-list').append($movieItem);
      });
    }
  });

  function showModal(movieId) {
    $.ajax({
      url: 'https://lk21-api.cyclic.app/movies/' + movieId,
      method: 'GET',
      success: function (movie) {
        var modal = $('#movie-modal');
        var modalContent = modal.find("#movie-details");
        modalContent.empty();

        modalContent
          .append('<h2 style="text-align: center;">' + movie.title + '</h2>')
          .append('<p>Rating: ' + movie.rating + '</p>')
          .append('<p>Quality: ' + movie.quality + '</p>')
          .append('<p>Duration: ' + movie.duration + '</p>')
          .append('<p>Genres: ' + movie.genres.join(', ') + '</p>')
          .append('<p>Directors: ' + movie.directors.join(', ') + '</p>')
          .append('<p>Cast: ' + movie.casts.join(', ') + '</p>')
          .append('<p>Synopsis: ' + movie.synopsis + '</p>')
          .append('<a href="' + movie.trailerUrl + '" target="_blank">Watch Trailer</a>');

        modal.css("display", "block");

        $(window).click(function (event) {
          if (event.target == modal[0]) {
            modal.css("display", "none");
          }
        });

        modal.find(".close").click(function () {
          modal.css("display", "none");
        });
      }
    });
  }
});
