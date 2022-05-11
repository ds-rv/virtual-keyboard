import App from './js/App';

const container = document.createElement('div');
container.classList.add('container');
document.body.append(container);

const app = new App(container);

app.init();
