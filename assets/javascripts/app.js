/*jslint indent:2 */
/*global Modernizr, ga */
(function (d) {
  'use strict';
  var body = d.body,
    show = function () {
      setTimeout(function () {
        body.className += ' show';
        // body.classList.add('show');
      }, 700);
    },
    hidden = Modernizr.prefixed('hidden', document, false),
    pagevisibilitychange = (hidden || '').replace('Hidden', 'visibilitychange').toLowerCase();

  d.addEventListener('DOMContentLoaded', function () {
    // iphone 5+ viewport fix
    if (window.screen.height === 568) {
      document.querySelector('meta[name=viewport]').content = 'width=320.1';
    }
    // trigger loading animation
    if (!!hidden && d[hidden]) {
      d.addEventListener(pagevisibilitychange, show, false);
    } else {
      show();
    }
  });

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-34062482-2', 'robert-fleischmann.de');
  ga('send', 'pageview');
}(document));
