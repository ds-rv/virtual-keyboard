class Key {
  constructor(container, keyData) {
    const key = document.createElement('div');
    key.classList.add('key');
    keyData.classes.forEach((className) => {
      key.classList.add(className);
    });

    const enBlock = document.createElement('div');
    enBlock.classList.add('key__en');

    const enLower = document.createElement('div');
    enLower.classList.add('key__lowercase');
    enLower.innerText = keyData.en_lower;

    const enUpper = document.createElement('div');
    enUpper.classList.add('key__uppercase');
    enUpper.innerText = keyData.en_upper;

    enBlock.append(enLower, enUpper);

    const ruBlock = document.createElement('div');
    ruBlock.classList.add('key__ru');

    const ruLower = document.createElement('div');
    ruLower.classList.add('key__lowercase');
    ruLower.innerText = keyData.ru_lower;

    const ruUpper = document.createElement('div');
    ruUpper.classList.add('key__uppercase');
    ruUpper.innerText = keyData.ru_upper;

    enBlock.append(ruLower, ruUpper);

    key.append(enBlock, ruBlock);

    container.append(key);
    this.root = key;

    this.code = keyData.code;
    this.enUpper = enUpper;
    this.enLower = enLower;
    this.ruUpper = ruUpper;
    this.ruLower = ruLower;

    this.curLang = 'en';
    this.curCase = 'Lower';

    this.changeLayout();
  }

  changeLayout() {
    this.enUpper.classList.add('hidden');
    this.enLower.classList.add('hidden');
    this.ruUpper.classList.add('hidden');
    this.ruLower.classList.add('hidden');

    this[this.curLang + this.curCase].classList.remove('hidden');
  }
}

export default Key;
