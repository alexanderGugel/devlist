var hogan = require('hogan.js'),
    Router = require('director').Router;

////////////////////////////////////////////////////////////////////////////////
// TEMPLATING ENGINE INTEGRATION (HOGAN.JS)                                   //
////////////////////////////////////////////////////////////////////////////////

// Turn all templates defined as <script type="text/template" id="..."> into
// Hogan Templates. The id on each script tag specifies the name of the template
// (= key on templates-object).
var templates = (function () {
  var templates = {};
  $('[type="text/template"]').each(function () {
    templates[this.className] = hogan.compile($(this).text());
  });
  return templates;
})();

////////////////////////////////////////////////////////////////////////////////
// HELPERS                                                                    //
////////////////////////////////////////////////////////////////////////////////

var setTitle = function (newTitle) {
  $('title').text(newTitle);
};

var supportsHTML5Storage = function () {
  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch (e) {
    return false;
  }
};

////////////////////////////////////////////////////////////////////////////////
// ROUTING                                                                    //
////////////////////////////////////////////////////////////////////////////////

// Don't refresh page on internal link click.
$('a[data-internal]').click(function (event) {
  event.preventDefault();
  router.setRoute($(this).attr('href'));
  return false;
});

var displayList = function () {
  $('.state.list').show();
  setTitle('List of awesome coupons for developers - devlist');
  $.getJSON('/api/coupons', function (coupons) {
    console.log(coupons);
    var html = templates.coupons.render({
      coupons: coupons
    });
    $('.list ul').html(html);
  });
};

var displaySubmit = function () {
  $('.state.submit').show();
  setTitle('Submit an awesome coupon for developers - devlist');

};

var routes = {
  '/': displayList,
  '/submit': displaySubmit
};

var router = Router(routes);

router.configure({
  notfound: function () {
    router.init('/');
  },
  before: function () {
    $('.state').hide();
  },
  html5history: true
});

router.init();



////////////////////////////////////////////////////////////////////////////////
// FAKE IT TILL YOU MAKE IT                                                   //
////////////////////////////////////////////////////////////////////////////////

var fake = function () {
  for (var i = 0; i < 100; i++) {

  }
};
fake();
