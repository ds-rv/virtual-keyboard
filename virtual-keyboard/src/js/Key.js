class Key {
  constructor(container, keyData, callbacks) {
    const key = document.createElement('div');
    key.classList.add('key');
    keyData.classes.forEach((className) => {
      key.classList.add(className);
    });

    const enBlock = document.createElement('div');
    enBlock.classList.add('key__en');

    const enLower = document.createElement('div');
    enLower.classList.add('key__lowercase');
    enLower.innerText = keyData.enLower;

    const enUpper = document.createElement('div');
    enUpper.classList.add('key__uppercase');
    enUpper.innerText = keyData.enUpper;

    enBlock.append(enLower, enUpper);

    const ruBlock = document.createElement('div');
    ruBlock.classList.add('key__ru');

    const ruLower = document.createElement('div');
    ruLower.classList.add('key__lowercase');
    ruLower.innerText = keyData.ruLower;

    const ruUpper = document.createElement('div');
    ruUpper.classList.add('key__uppercase');
    ruUpper.innerText = keyData.ruUpper;

    enBlock.append(ruLower, ruUpper);

    key.append(enBlock, ruBlock);

    container.append(key);
    this.root = key;
    this.callbacks = callbacks;

    this.code = keyData.code;
    this.enUpper = enUpper;
    this.enLower = enLower;
    this.ruUpper = ruUpper;
    this.ruLower = ruLower;

    this.enUpperSymbol = keyData.enUpper;
    this.enLowerSymbol = keyData.enLower;
    this.ruUpperSymbol = keyData.ruUpper;
    this.ruLowerSymbol = keyData.ruLower;

    this.curLang = 'en';
    this.curCase = 'Lower';

    this.changeLayout();
    this.addEventListeners();
  }

  addEventListeners() {
    this.root.addEventListener('mousedown', (e) => {
      e.currentTarget.classList.add('active');
    });

    this.root.addEventListener('mouseup', (e) => {
      e.currentTarget.classList.remove('active');
    });

    const noSymbolButtons = ['Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter',
      'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'MetaLeft',
      'AltLeft', 'AltRight', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

    const arrowSymbols = {
      ArrowUp: '↑',
      ArrowLeft: '←',
      ArrowDown: '↓',
      ArrowRight: '→',
    };

    let onKeyDown = () => {};
    let onKeyUp = (e) => {
      if (e.code === this.code) {
        this.root.classList.remove('active');
      }
    };

    let onMouseDown = () => {};
    let onMouseUp = () => {
      this.root.classList.remove('active');
    };

    if (!noSymbolButtons.includes(this.code)) {
      onKeyDown = (e) => {
        e.preventDefault();
        if (e.code === this.code) {
          this.callbacks.addSymbol(this[`${this.curLang + this.curCase}Symbol`]);
          this.root.classList.add('active');
        }
      };

      onMouseDown = () => {
        this.callbacks.addSymbol(this[`${this.curLang + this.curCase}Symbol`]);
        this.root.classList.add('active');
      };
    } else if (this.code === 'Tab') {
      onKeyDown = (e) => {
        e.preventDefault();
        if (e.code === this.code) {
          this.callbacks.addSymbol('\t');
          this.root.classList.add('active');
        }
      };

      onMouseDown = () => {
        this.callbacks.addSymbol('\t');
        this.root.classList.add('active');
      };
    } else if (this.code === 'Backspace') {
      onKeyDown = (e) => {
        e.preventDefault();
        if (e.code === this.code) {
          this.callbacks.emulateBackspace();
          this.root.classList.add('active');
        }
      };

      onMouseDown = () => {
        this.callbacks.emulateBackspace();
        this.root.classList.add('active');
      };
    } else if (this.code === 'Delete') {
      onKeyDown = (e) => {
        e.preventDefault();
        if (e.code === this.code) {
          this.callbacks.emulateDelete();
          this.root.classList.add('active');
        }
      };

      onKeyDown = () => {
        this.callbacks.emulateDelete();
        this.root.classList.add('active');
      };
    } else if (this.code === 'Enter') {
      onKeyDown = (e) => {
        e.preventDefault();
        if (e.code === this.code) {
          this.callbacks.addSymbol('\n');
          this.root.classList.add('active');
        }
      };

      onMouseDown = () => {
        this.callbacks.addSymbol('\n');
        this.root.classList.add('active');
      };
    } else if (this.code === 'ShiftLeft' || this.code === 'ShiftRight') {
      onKeyDown = (e) => {
        e.preventDefault();
        if (e.code === this.code) {
          this.root.classList.add('active');
        }
        if (e.code === this.code && !e.altKey) {
          this.callbacks.switchToUppercase();
        }
      };
      onKeyUp = (e) => {
        e.preventDefault();

        if (e.code === this.code) {
          this.root.classList.remove('active');
        }
        if (e.code === this.code && e.altKey) {
          this.callbacks.changeLang();
        }
        if (e.code === this.code && !e.altKey) {
          this.callbacks.switchToLowercase();
        }
      };

      onMouseDown = () => {
        this.root.classList.add('active');
        this.callbacks.switchToUppercase();
      };
      onMouseUp = () => {
        this.root.classList.remove('active');
        this.callbacks.switchToLowercase();
      };
    } else if (this.code === 'AltLeft' || this.code === 'AltRight') {
      onKeyDown = (e) => {
        e.preventDefault();
        if (e.code === this.code) {
          this.root.classList.add('active');
        }
      };
      onKeyUp = (e) => {
        e.preventDefault();

        if (e.code === this.code) {
          this.root.classList.remove('active');
        }
        if (e.code === this.code && e.shiftKey) {
          this.callbacks.changeLang();
        }
      };

      onMouseDown = () => {
        this.root.classList.add('active');
      };
      onKeyUp = () => {
        this.root.classList.remove('active');
      };
    } else if (Object.keys(arrowSymbols).includes(this.code)) {
      onKeyDown = (e) => {
        e.preventDefault();
        if (e.code === this.code) {
          this.callbacks.addSymbol(arrowSymbols[this.code]);
          this.root.classList.add('active');
        }
      };

      onMouseDown = () => {
        this.callbacks.addSymbol(arrowSymbols[this.code]);
        this.root.classList.add('active');
      };
    } else if (this.code === 'CapsLock') {
      onKeyDown = (e) => {
        e.preventDefault();
        if (e.code === this.code) {
          this.root.classList.add('active');
        }
      };
      onKeyUp = (e) => {
        e.preventDefault();

        if (e.code === this.code) {
          this.root.classList.remove('active');
          this.callbacks.changeCase();
        }
      };

      onMouseDown = () => {
        this.root.classList.add('active');
      };
      onKeyUp = () => {
        this.root.classList.remove('active');
        this.callbacks.changeCase();
      };
    } else {
      onKeyDown = (e) => {
        e.preventDefault();
        if (e.code === this.code) {
          this.root.classList.add('active');
        }
      };

      onMouseDown = () => {
        this.root.classList.add('active');
      };
    }

    document.addEventListener('keydown', onKeyDown.bind(this));
    document.addEventListener('keyup', onKeyUp.bind(this));

    this.root.addEventListener('mousedown', onMouseDown.bind(this));
    this.root.addEventListener('mouseup', onMouseUp.bind(this));
  }

  changeLayout() {
    this.enUpper.classList.add('hidden');
    this.enLower.classList.add('hidden');
    this.ruUpper.classList.add('hidden');
    this.ruLower.classList.add('hidden');

    this[this.curLang + this.curCase].classList.remove('hidden');
  }

  updateParams(params) {
    Object.keys(params).forEach((key) => {
      this[key] = params[key];
    });
  }
}

export default Key;
