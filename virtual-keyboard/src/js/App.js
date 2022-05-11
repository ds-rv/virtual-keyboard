import keysData from './data';
import Key from './Key';

class App {
  constructor(rootNode) {
    this.root = rootNode;

    if (!localStorage.getItem('ds_rv_virtual_keyboard_lang')) {
      localStorage.setItem('ds_rv_virtual_keyboard_lang', 'en');
    }
    this.curLang = localStorage.getItem('ds_rv_virtual_keyboard_lang');
    this.curCase = 'Lower';
    this.capsOn = false;

    this.keysData = keysData;
    this.keys = [];
  }

  init() {
    const textarea = document.createElement('textarea');
    textarea.classList.add('keyboard-block');
    this.root.append(textarea);
    this.textarea = textarea;

    const keyboardBlock = document.createElement('div');
    keyboardBlock.classList.add('keyboard');
    this.root.append(keyboardBlock);
    this.keyboardBlock = keyboardBlock;

    const callbacks = {
      addSymbol: this.addSymbol.bind(this),
      changeLang: this.changeLang.bind(this),
      changeCase: this.changeCase.bind(this),
      switchToUppercase: this.switchToUppercase.bind(this),
      switchToLowercase: this.switchToLowercase.bind(this),
      // getCapsStatus: this.getCapsStatus.bind(this),
      emulateBackspace: this.emulateBackspace.bind(this),
      emulateDelete: this.emulateDelete.bind(this),
    };

    this.keysData.forEach((keyRow) => {
      const rowBlock = document.createElement('div');
      rowBlock.classList.add('keyboard__row');
      this.keyboardBlock.append(rowBlock);

      keyRow.forEach((keyData) => {
        const key = new Key(rowBlock, keyData, callbacks);
        this.keys.push(key);
      });
    });

    const notificationBlock = document.createElement('div');
    notificationBlock.classList.add('notification');
    notificationBlock.innerText = 'Для смены раскладки клавиатуры нажмите Shift + Alt';
    this.root.append(notificationBlock);

    this.update();
  }

  addSymbol(symbol) {
    const pos = this.getCursorPosition();
    const curInput = this.textarea.value;
    this.textarea.value = curInput.slice(0, pos) + symbol + curInput.slice(pos);
    this.setCursorPosition(pos + 1);
  }

  changeLang() {
    this.curLang = (this.curLang === 'en') ? 'ru' : 'en';
    localStorage.setItem('ds_rv_virtual_keyboard_lang', this.curLang);
    this.update();
  }

  changeCase() {
    this.curCase = (this.curCase === 'Lower') ? 'Upper' : 'Lower';
    this.capsOn = this.curCase === 'Upper';
    this.update();
  }

  switchToUppercase() {
    if (!this.capsOn && this.curCase !== 'Upper') {
      this.curCase = 'Upper';
      this.update();
    }
  }

  switchToLowercase() {
    if (!this.capsOn && this.curCase !== 'Lower') {
      this.curCase = 'Lower';
      this.update();
    }
  }

  emulateBackspace() {
    const pos = this.getCursorPosition();
    const curInput = this.textarea.value;
    this.textarea.value = curInput.slice(0, pos - 1) + curInput.slice(pos);
    this.setCursorPosition(pos - 1);
  }

  emulateDelete() {
    const pos = this.getCursorPosition();
    const curInput = this.textarea.value;
    this.textarea.value = curInput.slice(0, pos) + curInput.slice(pos + 1);
    this.setCursorPosition(pos);
  }

  getCursorPosition() {
    let position = 0;

    if (this.textarea.selectionStart || this.textarea.selectionStart === 0) {
      position = this.textarea.selectionStart;
    } else if (document.selection) {
      this.textarea.focus();
      const sel = document.selection.createRange();
      sel.moveStart('character', -this.textarea.value.length);
      position = sel.text.length;
    }

    return position;
  }

  setCursorPosition(position) {
    this.textarea.setSelectionRange(position, position);
  }

  update() {
    this.keys.forEach((key) => {
      key.updateParams({
        curLang: this.curLang,
        curCase: this.curCase,
      });
      key.changeLayout();
    });
  }
}

export default App;
