import keysData from './data';
import Key from './Key';

class App {
  constructor(rootNode) {
    this.root = rootNode;

    this.curLang = 'en';
    this.curCase = 'Lower';

    this.keysData = keysData;
    this.keys = [];
  }

  init() {
    // const keyboardBlock = document.createElement('div');
    // keyboardBlock.classList.add('keyboard-block');
    // this.root.append(keyboardBlock);
    // this.keyboardBlock = keyboardBlock;

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
      emulateBackspace: this.emulateBackspace.bind(this),
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
  }

  addSymbol(symbol) {
    this.textarea.value += symbol;
  }

  changeLang(lang) {
    this.curLang = lang;
    this.update();
  }

  emulateBackspace() {
    const inputLength = this.textarea.value.length;
    this.textarea.value = this.textarea.value.slice(0, inputLength - 1);
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
