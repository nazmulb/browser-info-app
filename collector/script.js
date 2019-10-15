(function(){
    var Collector = function() {
        this.getUserAgent = function() {
            return navigator.userAgent;
        };

        this.getPublicIP = function(callback) {
            request("http://api.ipify.org", "GET", null, callback);
        }

        this.getLocalIP = function(callback) {
            var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
        
            if (!RTCPeerConnection) {
              return 'Your browser does not support this API';
            }
            
            var rtc = new RTCPeerConnection({iceServers:[]});
            var addrs = {};
            addrs["0.0.0.0"] = false;
            
            function grepSDP(sdp) {
                var hosts = [];
                var finalIP = '';
                sdp.split('\r\n').forEach(function (line) {
                    if (~line.indexOf("a=candidate")) {
                        var parts = line.split(' '),
                            addr = parts[4],
                            type = parts[7];
                        if (type === 'host') {
                            finalIP = addr;
                        }
                    } else if (~line.indexOf("c=")) {
                        var parts = line.split(' '),
                            addr = parts[2];
                        finalIP = addr;
                    }
                });
                return finalIP;
            }
            
            if (1 || window.mozRTCPeerConnection) {
                rtc.createDataChannel('', {reliable:false});
            };
            
            rtc.onicecandidate = function (evt) {
                if (evt.candidate) {
                  var addr = grepSDP("a="+evt.candidate.candidate);
                  callback(addr);
                }
            };
            rtc.createOffer(function (offerDesc) {
                rtc.setLocalDescription(offerDesc);
            }, function (e) { console.warn("offer failed", e); });
        }
    }

    var request = function(url, method, data, callback) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(data);
        } catch (e){
            console.error("error: " + e.message);
        }
        
        xhr.onload = function() {
            if (xhr.readyState === xhr.DONE) {
                console.log("Loaded: " + xhr.status + " " + xhr.response);
                if(callback) callback(xhr.status, xhr.response);
            }
        };

        xhr.onerror = function() {
            console.error("Network Error");
        };
    }
    
    var pushUrl = "http://localhost:8082/push";
    var collector = new Collector();
    var userAgent = collector.getUserAgent();
    var isChrome = userAgent.indexOf("Chrome") !== -1;
    var isFirefox = userAgent.indexOf("Firefox") !== -1;
    var ipAddresses;
    var i = 0;

    if(isChrome || isFirefox) {
        collector.getLocalIP(function(localIP) {
            collector.getPublicIP(function(status, response) {
                i = i + 1;

                if(localIP) ipAddresses = localIP;
                if(status === 200 && localIP) ipAddresses += "," + response;
                if(status === 200 && !localIP) ipAddresses = response;
                
                var data = JSON.stringify({
                    userAgent: userAgent,
                    ipAddresses: ipAddresses
                });
                
                if(i === 1) request(pushUrl, "POST", data);
            });
        });
    } else {
        collector.getPublicIP(function(status, response) {
            if(status === 200) ipAddresses = response;
            
            var data = JSON.stringify({
                userAgent: userAgent,
                ipAddresses: ipAddresses
            });
            
            request(pushUrl, "POST", data);
        });
    }
    
    /*
    window.addEventListener("beforeunload", function(e) {
    });

    window.onbeforeunload = function (e) {}
    };*/
})();
