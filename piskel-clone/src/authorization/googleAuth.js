// import { sign } from 'crypto';

/* eslint-disable no-undef */
/* eslint-disable camelcase */

export default class GoogleAuth {
  constructor() {
    this.state = {
      name: null,
      imgUrl: null,
    };
  }


  init() {
    console.log();
    const welcome = document.querySelector('.welcome');
    const avatar = document.querySelector('.welcome-avatar');
    const signIn = () => {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signIn().then((googleUser) => {
        // метод возвращает объект пользователя
        // где есть все необходимые нам поля
        const profile = googleUser.getBasicProfile();
        console.log(`ID: ${profile.getId()}`); // не посылайте подобную информацию напрямую, на ваш сервер!
        console.log(`Full Name: ${profile.getName()}`);
        console.log(`Given Name: ${profile.getGivenName()}`);
        console.log(`Family Name: ${profile.getFamilyName()}`);
        console.log(`Image URL: ${profile.getImageUrl()}`);
        console.log(`Email: ${profile.getEmail()}`);
        console.log(`localStorage: ${localStorage}`);
        console.log(`item: ${localStorage.getItem('stateInJSON')}`);
        // токен
        this.state.name = `${profile.getName()}`;
        this.state.imgUrl = `${profile.getImageUrl}`;
        const { id_token } = googleUser.getAuthResponse();
        console.log(`ID Token: ${id_token}`);
        welcome.innerHTML = `Hi, dear ${profile.getName()}`;
        avatar.src = `${profile.getImageUrl()}`;
        // const signIn = document.querySelector('.signIn');
        // console.log(singIn);
        // signIn.classList.add = 'hide';
        this.state.name = `${profile.getName()}`;
        this.state.imgUrl = `${profile.getImageUrl()}`;
        welcome.classList.remove('hide');
        avatar.classList.remove('hide');

        const stateInJSON = JSON.stringify(this.state);
        localStorage.setItem('appState', stateInJSON);
      });
    };
    const signOut = () => {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        console.log('User signed out.');
        welcome.classList.add('hide');
        avatar.classList.add('hide');
      });
    };

    const signInButton = document.querySelector('.signInButton');
    const signOutButton = document.querySelector('.signOutButton');

    signInButton.addEventListener('click', signIn);
    signOutButton.addEventListener('click', signOut);
  }

  // getCurrentUser() {
  //   const func = () => {
  //     const auth2 = window.gapi.auth2.getAuthInstance();
  //     auth2.signIn().then((googleUser) => {
  //       const profile = googleUser.getBasicProfile();
  //       console.log(`NAME: ${profile.getName}`);
  //     });
  //   };
  //   func();
  // }
}
