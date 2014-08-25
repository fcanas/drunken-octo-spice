var UI = require('ui');

var main = new UI.Card({
  title: 'Colt St. Park',
  subtite: 'loading...'
});


var wu_key = '96c7089c7624a1bb';

var menu = new UI.Menu({
  sections: [{
    items: [{
      title: 'Colt State Park',
      icon: 'images/really_good.png',
      subtitle: '...'
    }, {
      title: 'Second Item',
      subtitle: 'Subtitle Text'
    }]
  }]
});
menu.on('select', function(e) {
  main.show();

  console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
  console.log('The item is titled "' + e.item.title + '"');
});
menu.show();

var req = new XMLHttpRequest();
req.open('GET', 'http://api.wunderground.com/api/' + wu_key + '/conditions/q/pws:KCTGREEN14.json', true);
req.onload = function(e) {
  if (req.readyState == 4 && req.status == 200) {
    if(req.status == 200) {
      var response = JSON.parse(req.responseText);
      var current = response.current_observation;
      console.log(req.responseText);
      var windString = current.wind_string;

      main.subtitle(windString);
      main.body(current.wind_mph + 'mph with ' + current.wind_gust_mph + 'mph gusts.');
      main.icon('images/really_good.png');
    } else { console.log("Error"); }
  }
};
req.send(null);
