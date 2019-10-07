$(document).ready(function () {
  let checkers = [];
  function saveCheck (opt1) {
    let del = 0;
    checkers = checkers.reduce(function (a, f) { if (f !== $(opt1.target).attr('data-id')) { a.push(f); } else { del = 1; } return a; }, []);
    if (del === 0) checkers.push($(opt1.target).attr('data-id'));
    console.log('veriicated var checkers');
    console.log(checkers);
  }
  $('.amenities ul li input[type=checkbox]').bind('click', saveCheck);
  $.get('http://localhost:5001/api/v1/status/', function (data) {
    console.log(data.status);
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').remove('available');
    }
  });
  $('button').click(function () {
    $('article').remove();
    $.post({
      url: 'http://localhost:5001/api/v1/places_search/',
      data: JSON.stringify({amenities: checkers}),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        filtAmenity(data);
      }
    });
  });
});

const filtAmenity = function (data) {
  const lista = [];
  for (const places of data) {
    lista.push(places.name.toLowerCase());
  }
  lista.sort();
  const object = data.sort((x, y) => lista.indexOf(x.name.toLowerCase()) - lista.indexOf(y.name.toLowerCase()));
  for (const places of object) {
    $(  `
      <article>
      <div class="title">
      <h2>${places.name}</h2>
      <div class="price_by_night">${places.price_by_night}</div>
      </div>
      <div class="information">
      <div class="max_guest">
      <i class="fa fa-users fa-3x" aria-hidden="true"></i>
      <br />
      ${places.max_guest} Guests
      </div>
      <div class="number_rooms">
      <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
      <br />
      ${places.number_rooms} Bedrooms
      </div>
      <div class="number_bathrooms">
      <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
      <br />
      ${places.number_bathrooms} Bathroom
      </div>
      </div>
      <!-- **********************
      USER
      **********************  -->
      <div class="description">
      <p>${places.description}</p>
      </div>
      </article> <!-- End 1 PLACE Article -->
      `).appendTo('section.places');
  }
};
