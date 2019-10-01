if (typeof jQuery === 'function') {
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

    $.get('http://0.0.0.0:5001/api/v1/status/', function (resp) {
      $('DIV#api_status').toggle(resp.status === 'OK', 'available');
    }).fail(function () {
      console.error('Error with Connection');
      $('DIV#api_status').removeClass('available');
    });
  });
}
