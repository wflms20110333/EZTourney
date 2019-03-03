// Concatenates strings with underscores
function concatenateString(strs) {
    ret = strs[0];
    for (var i = 1; i < strs.length; i++)
        ret += "_" + strs[i];
    return ret;
}

// Displays a message with the snackbar.
function snackbar(message) {
    var data = {
        message: message,
        timeout: 2000
    };
    snackbarElement.MaterialSnackbar.showSnackbar(data);
}

// Removes an HTML element
function removeElement(element) {
    element.parentElement.removeChild(element);
}