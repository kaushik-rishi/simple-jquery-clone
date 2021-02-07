function $(...args) {
    if (typeof args[0] === 'function') {
        const domReadyFn = args[0];
        document.addEventListener('DOMContentLoaded', domReadyFn);
    }

    if (typeof args[0] === 'string') {
        const selectorString = args[0];
        const collection = Array.from(document.querySelectorAll(selectorString));
        collection.text = function (newText) {
            if (!newText) {
                let previousText = "";
                collection.forEach(item => previousText += (item.innerText + '\n'));
                return previousText;
            } else {
                collection.forEach(item => item.innerText = item.innerText = newText);
            }
        }
        collection.html = function (newHTML) {
            if (!newHTML) {
                // get the previous text inside the list of items
                let previousHTML = "";
                collection.forEach(item => previousHTML += item.innerHTML);
                return previousHTML;
            } else {
                collection.forEach(item => item.innerHTML = item.innerHTML = newHTML);
            }
        }
        collection.css = function (newCssProperty, newCssValue) {
            if (!newCssProperty && !newCssValue) {
                throw new Error('format .css(<cssProperty>, <cssValue>)');
            }
            if ((newCssProperty && !typeof newCssProperty === 'string') || (newCssValue && !typeof newCssValue !== 'string')) {
                throw new Error('wrong args passed to $.css');
            }
            if (!newCssValue) {
                let previousCssValues = '';
                collection.forEach(item => previousCssValues += item.style);
                return previousCssValues;
            }
            collection.forEach(item => item.style[newCssProperty] = newCssValue);
        }
        collection.on = function (event, callback) {
            collection.forEach(item => item.addEventListener(event, callback));
        }
        return collection;
    }
}