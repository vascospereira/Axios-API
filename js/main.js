/**
 * The Module Pattern approach.
 * We can namespace related methods and properties, organizing entire modules
 * of code in a way that both minimizes global scope pollution and creates privacy.
 *
 * @type {{fetchJSON, fetchImage, fetchText, headRequest, getRequest, postRequest}}
 */

const app = (function () {
    'use strict';

    function logResult(result) {
        console.log(result.data);
    }

    function logError(error) {
        console.log('Looks like there was a problem: \n', error);
    }

    function getJSON() {
        axios('examples/players.json').then(logResult).catch(logError);
    }

    function showImage(response) {

        const container = document.getElementById('container');
        const imgElem = document.createElement('img');
        container.appendChild(imgElem);

        const reader = new window.FileReader();
        reader.readAsDataURL(response.data);
        reader.onload = () => {
            const imgUrl = reader.result;
            imgElem.src = imgUrl;
        }

    }

    function getImage() {
        axios('examples/leopard.jpg', {responseType: 'blob'}).then(showImage).catch(logError);
    }

    function showText(responseAsText) {
        let message = document.getElementById('message');
        logResult(responseAsText);
        //console.log(responseAsText);
        message.textContent = responseAsText.data;
    }

    function getText() {
        axios('examples/words.txt').then(showText).catch(logError);
    }

    function headRequest() {

        axios({
            method: 'head',
            url: 'examples/words.txt'
        }).then(logSize).then(logResult).catch(logError);

    }

    function logSize(response) {
        console.log(response.headers['content-length']);
        return response;
    }

    function getRequest() {
        axios('http://ron-swanson-quotes.herokuapp.com/v2/quotes').then(showText).catch(logResult);
    }

    /* NOTE: Never send unencrypted user credentials in production! */
    function postRequest() {

        // var formData = new FormData(document.getElementById('myForm'));
        // 'https://jsonplaceholder.typicode.com/todos'
        // JSON.stringify({name:name,msg:msg})
        // `name=${name}&message=${msg}`
        let name = document.getElementById('name').value;
        let msg = document.getElementById('msg').value;

        axios({
            method: 'post',
            url: 'https://jsonplaceholder.typicode.com/posts',
            data: `name=${name}&message=${msg}`
        }).then(logResult).catch(logError);

    }

    // We are using the JavaScript Module Pattern to enable unit testing of our functions.
    return {
        getJSON: (getJSON),
        getImage: (getImage),
        getText: (getText),
        headRequest: (headRequest),
        getRequest: (getRequest),
        postRequest: (postRequest)
    };

})();