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
    const signIn = () => {
      const test = document.querySelector('.test');
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

        // токен
        const { id_token } = googleUser.getAuthResponse();
        console.log(`ID Token: ${id_token}`);
        test.innerHTML = `Full Name: ${profile.getName()}`;
        this.state.name = profile.getName();
        this.state.imgUrl = profile.getImageUrl;
      });
    };
    const signOut = () => {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        console.log('User signed out.');
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
