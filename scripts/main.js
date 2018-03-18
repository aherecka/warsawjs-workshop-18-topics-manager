require('bulma');
const GITHUB = require('./config').GITHUB;

const hello = require('hellojs');




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





