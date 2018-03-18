require('bulma');
const GITHUB = require('./config').GITHUB;

const hello = require('hellojs');

const topics = new Set();



hello.init({
    github: GITHUB.CLIENT_ID
});


if (hello('github').getAuthResponse())
{
    hello('github').api('/me')
    .then(function (userProfile) {

            renderUserDetails(userProfile);

        });

}

var buttonLog = document.querySelector('#log');
const $buttonLogOut = document.querySelector('#logOut');

buttonLog.addEventListener('click', (evt) => {
    evt.preventDefault();

    hello('github').login()
        .then(function () {
            return hello('github').api('/me');
        })
        .then(function (userProfile) {
            
            renderUserDetails(userProfile);

        });
});


$buttonLogOut.addEventListener('click', (evt) => {
    console.log('logged out!!!!!');

    hello.logout('github')
        .then(() => location.reload());


});


function renderUserDetails(userProfile) {

    const template = `
                        ${userProfile.login}
                        <img src="${userProfile.avatar_url}" alt="avatar"/>
                       `;

    var userData = document.querySelector('#userData');
    userData.innerHTML= template;

    console.log(template);
};

const $form = document.querySelector('.js-form-add-topic');
$form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const data = new FormData($form);
    const map = new Map(data.entries());
    console.log(map);

    topics.add(map)

    $form.reset();

    renderTopics();
});

$form.addEventListener('reset', (evt) => {



})

function renderTopics() {
    var all = '';

    topics.forEach((topic) => {
        const topicTemplate = ` <div class="column is-3">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            ${topic.get('topic')}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            ${topic.get('description')}
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item">Zagłosuj</a>
                        <a href="#" class="card-footer-item">Chcę być trenerem</a>
                    </footer>
                </div>
            </div>`;


        all += topicTemplate;

    });

    console.log(all);

    var dataAll = document.querySelector('#topicsAll');
    dataAll.innerHTML = all;

}



