(function(){
    console.log(navigator.userAgent);
    var url = "http://localhost:8082/push";

    var xhr = new XMLHttpRequest();
    var json = JSON.stringify({
        userAgent: navigator.userAgent
    });

    xhr.open("POST", url)
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

    xhr.send(json);
})();