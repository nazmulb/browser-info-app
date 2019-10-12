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

    var request = function(url, method, data) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(data);
        
        xhr.onload = function() {
            console.log(`Loaded: ${xhr.status} ${xhr.response}`);
        };

        xhr.onerror = function() {
            console.log(`Network Error`);
        };
    }

    var collector = new Collector();

    var data = JSON.stringify({
        userAgent: collector.getUserAgent(),
        publicIP: collector.getPublicIP(),
        localIP: collector.getLocalIP()
    });
    
    request(pushUrl, "POST", data);

})("http://localhost:8082/api/push");
