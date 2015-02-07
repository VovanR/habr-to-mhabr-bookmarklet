(function (wind) {

    var loc = wind.location;
    loc.href = loc.protocol + '//m.' + loc.host + loc.pathname;

}(window));
