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
    this.checkAfterUpdate();
    const welcome = document.querySelector('.welcome');
    const avatar = document.querySelector('.welcome-avatar');
    const signIn = () => {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signIn().then((googleUser) => {
        const profile = googleUser.getBasicProfile();
        this.state.name = `${profile.getName()}`;
        this.state.imgUrl = `${profile.getImageUrl}`;
        welcome.innerHTML = `Hi, dear ${profile.getName()}`;
        localStorage.setItem('name', `${profile.getName()}`);
        avatar.src = `${profile.getImageUrl()}`;
        localStorage.setItem('src', `${profile.getImageUrl()}`);
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
        welcome.classList.add('hide');
        avatar.classList.add('hide');
      });
    };

    const signInButton = document.querySelector('.signInButton');
    const signOutButton = document.querySelector('.signOutButton');
    signInButton.addEventListener('click', signIn);
    signOutButton.addEventListener('click', signOut);
  }

  checkAfterUpdate() {
    const welcome = document.querySelector('.welcome');
    const avatar = document.querySelector('.welcome-avatar');
    welcome.innerHTML = `Hi, dear ${localStorage.getItem('name')}`;
    avatar.src = localStorage.getItem('src');
  }
}
