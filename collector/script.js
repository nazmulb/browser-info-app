(function () {
    var Collector = function () {
        this.getUserAgent = function () {
            return navigator.userAgent;
        };

        this.getLocalIP = function (callback) {
            var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

            if (!RTCPeerConnection) {
                callback(0);
                console.warn("Your browser does not support this API");
                return;
            }

            var rtc = new RTCPeerConnection({ iceServers: [] });
            var addrs = {};
            addrs["0.0.0.0"] = false;

            function grepSDP(sdp) {
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
                rtc.createDataChannel('', { reliable: false });
            };

            rtc.onicecandidate = function (evt) {
                if (evt.candidate) {
                    var addr = grepSDP("a=" + evt.candidate.candidate);
                    callback(addr);
                }
            };
            rtc.createOffer(function (offerDesc) {
                rtc.setLocalDescription(offerDesc);
            }, function (e) { console.warn("offer failed", e); });
        }
    }

    var request = function (url, method, data, callback) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(data);
        } catch (e) {
            console.error("error: " + e.message);
        }

        if (xhr.readyState === 4) {
            console.log("Loaded: " + xhr.status + " " + xhr.response);
            if (callback) callback(xhr.status, xhr.response);
        }
    }

    var pushUrl = "http://localhost:8082/push";
    var collector = new Collector();
    var userAgent = collector.getUserAgent();
    var isChrome = userAgent.indexOf("Chrome") !== -1;
    var isFirefox = userAgent.indexOf("Firefox") !== -1;
    var isSentCollectorData = false;

    function sentCollectorData(withoutPayload) {
        if (withoutPayload) {
            request(pushUrl, "POST");
            isSentCollectorData = true;
            return;
        }

        var i = 0;
        if (isChrome || isFirefox) {
            collector.getLocalIP(function (localIP) {
                i = i + 1;
                if (i === 1) {
                    request(pushUrl, "POST", JSON.stringify({ userAgent: userAgent, ipAddresses: localIP }), function (status, response) {
                        isSentCollectorData = true;
                    });
                }
            });
        } else {
            request(pushUrl, "POST", JSON.stringify({ userAgent: userAgent }), function (status, response) {
                isSentCollectorData = true;
            });
        }
    }

    window.onbeforeunload = function (e) {
        if (!isSentCollectorData) {
            sentCollectorData(true);
            e.preventDefault();
            e.returnValue = "";
            return true;
        }
    };

    sentCollectorData();
})();
