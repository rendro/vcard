var jsonp = function(repo) {
    var el = d.createElement('script');
    el.src = ['https://api.github.com/repos/rendro/', repo, '?callback=callback'].join('');
    head.insertBefore(el, head.firstChild);
};

var callback = function(response) {
    console.log('Stars:', response.data.watchers);
    console.log('Forks:', response.data.forks);
};
