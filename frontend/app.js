'use strict';

const SERVICE_BASE_URL = '/api/paste/';

var container = document.getElementById('app');
var createElement = document.getElementById('paste-contents');
var viewDisplayElement = document.getElementById('paste-display');
var createLinks = document.querySelectorAll('[data-create]');

setupListeners();

processState();

function processState() {
    var view = getLocation();

    if (view.page === 'create') {
        container.classList.add('create');
        container.classList.remove('view');
        createElement.value = '';
    } else if (view.page === 'view') {
        container.classList.add('view');
        container.classList.remove('create');
        fetchContents(view.id);
    }
}

function fetchContents(id) {
    viewDisplayElement.innerText = '';
    fetch(SERVICE_BASE_URL + id)
        .then(function(response) {
            response.json().then(function(json) {
                viewDisplayElement.innerText = json.paste;
            });
        });
}

function createPaste() {
    var contents = createElement.value;

    fetch(SERVICE_BASE_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content: contents})
        })
        .then(function(response) {
            response.json().then(function (json) {
                navigateTo({page:'view', id: json.id});
            });
        });
}

function navigateTo(view) {
    var newUrl = '/create',
        title = 'Create New Paste';

    if (view.page === 'view') {
        newUrl = '/view/' + view.id;
        title = 'View Paste: ' + view.id;
    }

    history.pushState(view, title, newUrl);
    processState();
}

function getLocation() {
    var path = document.location.pathname;
    var result = {page: 'create'};
    if (startsWith(path, '/view/')) {
        var id = path.substr(6);
        result = {page: 'view', id: id};
    }

    return result;
}

function startsWith(subject, test) {
    return subject.indexOf(test) === 0;
}

function setupListeners() {
    container.addEventListener('click', function (event) {
        if (event.target.getAttribute('data-goto-create') === '') {
            navigateTo({page: 'create'});
        } else if (event.target.getAttribute('data-create') === '') {
            createPaste();
        }
    });
}
