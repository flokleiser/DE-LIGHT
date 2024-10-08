    var oldLog = console.log;
    var consoleDiv = document.getElementById('custom-console');

    console.log = function(message) {
        if (typeof message === 'object') {
            message = JSON.stringify(message);
        }

        consoleDiv.innerHTML += message + '<br>';
        consoleDiv.scrollTop = consoleDiv.scrollHeight; 
        oldLog.apply(console, arguments);
    };