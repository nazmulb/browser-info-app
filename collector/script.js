(function(pushUrl){
    var Collector = function() {
        this.getUserAgent = function() {
            return navigator.userAgent;
        };

        this.getPublicIP = function() {
            return "162.158.62.75";
        }

        this.getLocalIP = function() {
            return "192.168.0.10";
        }
    }

    var request = function(url, method, data, contentType) {
        var xhr = new XMLHttpRequest();
        var cType = "application/json; charset=utf-8";
        if(contentType) cType = contentType;
        xhr.open(method, url);
        xhr.setRequestHeader("Content-type", cType);
        xhr.send(data);
    }

    var c1 = new Collector();

    var data = JSON.stringify({
        userAgent: c1.getUserAgent(),
        publicIP: c1.getPublicIP(),
        localIP: c1.getLocalIP()
    });

    request(pushUrl, "POST", "name=Nazmul&age=38", "application/x-www-form-urlencoded");

})("http://localhost:8082/api/push");