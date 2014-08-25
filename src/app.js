/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');

var main = new UI.Card({
  title: 'Colt St. Park',
  subtite: 'loading...'
});
main.show();

var wu_key = '';

var req = new XMLHttpRequest();
req.open('GET', 'http://api.wunderground.com/api/' + wu_key + '/conditions/q/pws:KCTGREEN14.json', true);
req.onload = function(e) {
  if (req.readyState == 4 && req.status == 200) {
    if(req.status == 200) {
      
      var response = JSON.parse(req.responseText);
      var current = response.current_observation;
      console.log(req.responseText);
      var windString = current.wind_string;
      var icon = current.icon_url;
      main.icon(icon);
      main.subtitle(windString);
      main.body(current.wind_mph + 'mph with ' + current.wind_gust_mph + 'mph gusts.');
    } else { console.log("Error"); }
  }
};
req.send(null);
