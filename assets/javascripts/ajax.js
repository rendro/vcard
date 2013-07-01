var ajax = (function () {
  var getAjaxRequest = function (callback) {
    var ajaxRequest;
    try {
        ajaxRequest = new XMLHttpRequest();
    } catch (e) {
        try {
            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e){
                return null;
            }
        }
    }
    ajaxRequest.onreadystatechange = function() {
        if (ajaxRequest.readyState == 4) {
           // Prob want to do some error or response checking, but for
           // this example just pass the responseText to our callback function
           callback(ajaxRequest.responseText);
        }
    };
    return ajaxRequest;
  };
  return {
    get: function (url, callback) {
      var ajaxRequest = getAjaxRequest(callback);
      ajaxRequest.open("GET", url, true);
      ajaxRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      ajaxRequest.send(null);
    },
    post: function (url, data, callback) {
      var ajaxRequest = getAjaxRequest(callback);
      ajaxRequest.open("POST", url, true);
      ajaxRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      ajaxRequest.setRequestHeader("Connection", "close");
      ajaxRequest.send("data=" + encodeURIComponent(data));
    }
  };
}());
