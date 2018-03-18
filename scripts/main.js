require('bulma');
const hello = require('hellojs');

const client_id = '01dc9f362f800af8f4b4';



hello.init({
    github: '01dc9f362f800af8f4b4'
});

var buttonLog = document.querySelector('#log');
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

var buttonLogOut = document.querySelector('#logOut');


function renderUserDetails(userProfile) {

    const template = `<div class="navbar-item">
                ${userProfile.login}
                <img src="${userProfile.avatar_url}" alt="avatar"/>
            </div>`;

    var user = document.querySelector('#bar');
    user.innerHTML+= template;

    console.log(template);
};





