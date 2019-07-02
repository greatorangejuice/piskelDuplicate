export default class Notification {
  init() {
    const removeButton = document.getElementsByClassName('remove-button')[0];
    const notification = document.getElementById('notification');
    const checkBox = document.getElementById('disable-checkbox');
    checkBox.addEventListener('change', () => {
      if (checkBox.checked) {
        localStorage.setItem('checked', 'true');
      } else {
        localStorage.removeItem('checked');
      }
    });

    removeButton.addEventListener('click', () => {
      notification.classList.add('hide');
    });
    const notificate = () => {
      if (localStorage.checked === 'false' || !localStorage.checked) {
        setTimeout(() => notification.classList.remove('hide'), 1000);
      }
    };
    notificate();
  }
}
