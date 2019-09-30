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
    $.get('http://localhost:5001/api/v1/status/', function (data) {
      console.log(data.status)
      if (data.status === 'OK') {
        $('#api_status').addClass('available')
      } else {
        $('#api_status').remove('available')
      }
    });
  });
};
