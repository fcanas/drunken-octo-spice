var UI = require('ui');

var locations = [
{
  stationId:'KCTGREEN14',
  title:'Colt st. Park',
  icon:'images/really_good.png'
},
{
  stationId:'KRIPROVI8',
  title:'College Hill',
  icon:'images/really_good.png'
}
];

var wu_key = '96c7089c7624a1bb';

var menu = new UI.Menu({
  sections: [{
    items: locations
  }]
});
menu.on('select', function(e) {
  var loc = new UI.Card({ 
    title: e.item.title,
    subtitle: 'loading...'
  });
  loc.show();
  
  var req = new XMLHttpRequest();
  req.open('GET', 'http://api.wunderground.com/api/' + wu_key + '/conditions/q/pws:' + e.item.stationId + '.json', true);
  req.onload = function(e) {
    if (req.readyState == 4 && req.status == 200) {
      if(req.status == 200) {
        var response = JSON.parse(req.responseText);
        var current = response.current_observation;
        console.log(req.responseText);
        var windString = current.wind_string;
        loc.title(windString);
        loc.body(current.wind_mph + 'mph with ' + current.wind_gust_mph + 'mph gusts.');
        loc.icon('images/really_good.png');
      } else { console.log("Error"); }
    }
  };
  req.send(null);});
menu.show();
