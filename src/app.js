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

var getWindAtWeatherStationForCard = function(ws, card) {
  var req = new XMLHttpRequest();
  req.open('GET', 'http://api.wunderground.com/api/' + wu_key + '/conditions/q/pws:' + ws + '.json', true);
  req.onload = function(e) {
    if (req.readyState == 4 && req.status == 200) {
      if(req.status == 200) {
        var response = JSON.parse(req.responseText);
        var current = response.current_observation;
        var windString = current.wind_string;
        card.subtitle(windString);
        card.body(current.wind_mph + 'mph with ' + current.wind_gust_mph + 'mph gusts.');
        card.icon('images/really_good.png');
      } else { console.log("Error"); }
    }
  };
  req.send(null);
};

var menu = new UI.Menu({
  sections: [{
    items: locations
  }]
});
menu.on('select', function(e) {
  var loc = new UI.Card({ 
    subtitle: e.item.title,
    body: 'loading...'
  });
  loc.show();
  getWindAtLatLngForCard(e.item.stationId, loc);
});
menu.show();



