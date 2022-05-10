import App from './js/App';

alert('Здравствуйте! Буду очень признателен, если проверите работу днем позже. Заранее спасибо!');

const container = document.createElement('div');
container.classList.add('container');
document.body.append(container);

const app = new App(container);

app.init();
