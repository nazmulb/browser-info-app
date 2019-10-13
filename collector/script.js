(function(){
    var Collector = function() {
        this.getUserAgent = function() {
            return navigator.userAgent;
        };

        this.getPublicIP = function() {
            return "162.158.62.75";
        }

        this.getLocalIP = function() {
            return "192.168.0.5";
        }
    }

    var request = function(url, method, data) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(data);
        } catch (e){
            console.error("error: " + e.message);
        }
        
        xhr.onload = function() {
            console.log("Loaded: " + xhr.status + " " + xhr.response);
        };

        xhr.onerror = function() {
            console.error("Network Error");
        };
    }
    
    var pushUrl = "http://localhost:8082/push";
    var collector = new Collector();

    var data = JSON.stringify({
        userAgent: collector.getUserAgent(),
        ipAddresses: collector.getPublicIP() + "," + collector.getLocalIP()
    });
    
    request(pushUrl, "POST", data);
    
    /*
    window.addEventListener("beforeunload", function(e) {
    });

    window.onbeforeunload = function (e) {}
    };*/
})();
