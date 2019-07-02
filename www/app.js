window.fn = {};

window.fn.open = function() {
  //id menu is in index.html, the side splitter
  var menu = document.getElementById('menu');
  menu.open();
};

document.addEventListener('init', function(event) {
  var page = event.target;
  if (page.id === 'result.html') {
    console.log('...loaded" ' + movieData.Plot);
    var content =
      'Title: ' +
      movieData.Title +
      '<br>' +
      'Year: ' +
      movieData.Year +
      '<br>' +
      'Plot: ' +
      movieData.Plot;
    console.log('...content: ' + content);
    //document.getElementById('result').innerHTML = content;
    $('#result').html(content);
    $('#movieposter').attr('src', movieData.Poster);
  }
});

// window.fn.load = function(page) {
//   var content = document.getElementById('content');
//   var menu = document.getElementById('menu');
//   content.load(page).then(menu.close.bind(menu));
// };

document.addEventListener('init', function(event) {
  var page = event.target;

  if (page.id === 'tabbardemo.html') {
    page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
  }
});

window.fn.load = function(page, mytitle) {
  var navigator = document.getElementById('myNavigator');
  var menu = document.getElementById('menu');
  data = { data: { title: mytitle }, animation: 'slide' };
  navigator.pushPage(page, data).then(menu.close.bind(menu));
};

function stopProgressCirle() {
  var progressCircle = document.getElementById('progress-circle');
  progressCircle.style.display = 'none';
  //$('.progress-circle').css('display', 'none');
}

var movieData;
function searchMovie() {
  var name = document.getElementById('moviename').value;
  var url = 'http://www.omdbapi.com/?t=' + name + '&apikey=84fcccc4';

  $.ajax(url)
    .done(function(data) {
      if (!data.Title) {
        ons.notification.toast('Movie not found', { timeout: 2000 });
        return;
      }
      movieData = data;
      console.log(
        'Source: ' +
          data.Ratings[0].Source +
          ', Value: ' +
          data.Ratings[0].Value
      );
      // $('#result').html(
      //   'Title: ' +
      //     data.Title +
      //     '<br>' +
      //     'Year: ' +
      //     data.Year +
      //     '<br>' +
      //     'Plot: ' +
      //     data.Plot
      // );
      // $('#movieposter').attr('src', data.Poster);
      var navigator = document.getElementById('myNavigator');
      var menu = document.getElementById('menu');
      data = { data: { title: 'Search result' }, animation: 'slide' };
      navigator.pushPage('result.html', data).then(menu.close.bind(menu));
    })
    .fail(function() {
      console.log('...movie not found....');
      //$('#result').html(name + ' not found!');
    });
}

function clearInput() {
  document.getElementById('moviename').value = '';
}
