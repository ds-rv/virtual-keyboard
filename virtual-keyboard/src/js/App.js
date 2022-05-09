import keysData from './data';
import Key from './Key';

class App {
  constructor(rootNode) {
    this.root = rootNode;

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

    this.keysData.forEach((keyRow) => {
      const rowBlock = document.createElement('div');
      rowBlock.classList.add('keyboard__row');
      this.keyboardBlock.append(rowBlock);

      keyRow.forEach((keyData) => {
        const key = new Key(rowBlock, keyData);
        this.keys.push(key);
      });
    });
  }
}

export default App;
