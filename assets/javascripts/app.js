(function (d) {
    var head = d.getElementsByTagName('head')[0],
        body = d.body,
        show = function () {
            setTimeout(function () {
                body.classList.add('show');
            }, 700);
        },
        hidden = Modernizr.prefixed("hidden", document, false),
        pagevisibilitychange = (hidden || "").replace('Hidden', 'visibilitychange').toLowerCase();

    d.addEventListener('DOMContentLoaded', function () {
        // iphone 5+ viewport fix
        if (window.screen.height === 568) {
            document.querySelector("meta[name=viewport]").content = "width=320.1";
        }
        // trigger loading animation
        if (!!hidden && d[hidden]) {
            d.addEventListener(pagevisibilitychange, show, false);
        } else {
            show();
        }
    });
}(document));
