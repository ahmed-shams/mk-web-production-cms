

class FocusManager {

  constructor() {
    this.debug = false;
    this.outline = "5px auto -webkit-focus-ring-color";
    this.dottedOutline = "1px dotted #212121";
    this.justClicked = false;
    this.holdingShift = false;
    this.date = new Date();
    this.subscribedClasses = new Set;
    this.subscribedIdSets = new Set;
    this.status = this.status.bind(this);
    this.blur = this.blur.bind(this);
    this.focus = this.focus.bind(this);
    this.mousedown = this.mousedown.bind(this);
    this.mouseup = this.mouseup.bind(this);
    this.keydown = this.keydown.bind(this);
    this.keyup = this.keyup.bind(this);
    document.addEventListener("mouseup", this.mouseup);
    document.addEventListener("keydown", this.keydown);
		document.addEventListener("keyup", this.keyup);
  }

  subscribe(classNameOrIds, focusOnClick) {
    if (this.debug) console.log(`|FM| subscribing to ${classNameOrIds}`);
    if (typeof classNameOrIds === 'string') this.addClassName(classNameOrIds, focusOnClick);
    else if (Array.isArray(classNameOrIds)) this.addIds(classNameOrIds, focusOnClick);
    else console.log(`|FM error| unable to subscribe to ${classNameOrIds}`);
  }

  unsubscribe(classNameOrIds) {
    if (this.debug) console.log(`|FM| unsubscribing to ${classNameOrIds}`);
    if (typeof classNameOrIds === 'string') this.removeClassName(classNameOrIds);
    else if (Array.isArray(classNameOrIds)) this.removeIds(classNameOrIds);
    else console.log(`|FM error| unable to unsubscribe to ${classNameOrIds}`);
  }

  status() {
    const classes = this.subscribedClasses.size;
    const ids = this.subscribedIdSets.size;
    console.log(`|FM STATUS| init date: |${this.date}| milliseconds: |${this.date.getMilliseconds()}|`);
    console.log(`|FM STATUS| subscribed classes: |${classes}|`);
    if (classes !== 0) console.log(this.subscribedClasses);
    console.log(`|FM STATUS| subscribed ids: |${ids}|`);
    if (ids !== 0) console.log(this.subscribedIdSets);
  }

  addClassName(className, focusOnClick) {
    if (this.subscribedClasses.has(className)) {
      console.log(`|FM error| className: |${className}| already subscribed`);
      return;
    }
    const dict = this.findElementsByClassName(className);
    if (dict.count === 0) {
      console.log(`|FM error| did not find elements for className: |${className}|`);
      return;
    }
    this.listenToElements(dict, focusOnClick);
    this.subscribedClasses.add(className);
    if (this.debug) this.status();
  }

  addIds(ids, focusOnClick) {
    const dict = this.findElementsByIds(ids);
    if (this.subscribedIdSets.has(dict.set)) {
      console.log(`|FM error| ids: |${dict.set}| already subscribed`);
      console.log(dict.set);
      return;
    }
    if (dict.count === 0) {
      console.log(`|FM error| did not find elements for ids: |${dict.set}|`);
      console.log(dict.set);
      return;
    }
    this.listenToElements(dict, focusOnClick);
    this.subscribedIdSets.add(dict.set);
    if (this.debug) this.status();
  }

  removeClassName(className) {
    if (!this.subscribedClasses.has(className)) {
      console.log(`|FM error| className: |${className}| is not subscribed`);
      return;
    }
    const dict = this.findElementsByClassName(className);
    this.unlistenToElements(dict);
    this.subscribedClasses.delete(className);
  }

  removeIds(ids) {
    if (!this.subscribedIdSets.has(ids)) {
      console.log(`|FM error| ids: |${ids}| is not subscribed`);
      console.log(ids);
      return;
    }
    const dict = this.findElementsByIds(ids);
    this.unlistenToElements(dict);
    this.subscribedIdSets.delete(ids);
  }

  listenToElements(dict, focusOnClick) {
    const foc = (typeof focusOnClick === 'boolean') ? focusOnClick : false;
    const reg = dict.reg;
    const dot = dict.dot;
    Object.keys(reg).forEach((index) => {
      const element = reg[index];
      if (this.debug) console.log(`|FM| adding type: |${element.tagName}| className: |${element.className}| id: |${element.id}|`);
      element.addEventListener("focus", this.focus);
      element.addEventListener("blur", this.blur);
      element.focusOnClick = foc;
      element.focusDotted = false;
      if (!focusOnClick) element.addEventListener("mousedown", this.mousedown);
    });
    Object.keys(dot).forEach((index) => {
      const element = dot[index];
      if (this.debug) console.log(`|FM| adding type: |${element.tagName}| className: |${element.className}| id: |${element.id}|`);
      element.addEventListener("focus", this.focus);
      element.addEventListener("blur", this.blur);
      element.focusOnClick = foc;
      element.focusDotted = true;
      if (!focusOnClick) element.addEventListener("mousedown", this.mousedown);
    });
  }

  unlistenToElements(dict) {
    const reg = dict.reg;
    const dot = dict.dot;
    Object.keys(reg).forEach((index) => {
      const element = reg[index];
      if (this.debug) console.log(`|FM| removing type: |${element.tagName}| className: |${element.className}| id: |${element.id}|`);
      element.removeEventListener("focus", this.focus);
      element.removeEventListener("blur", this.blur);
      element.removeEventListener("mousedown", this.mousedown);
    });
    Object.keys(dot).forEach((index) => {
      const element = dot[index];
      if (this.debug) console.log(`|FM| removing type: |${element.tagName}| className: |${element.className}| id: |${element.id}|`);
      element.removeEventListener("focus", this.focus);
      element.removeEventListener("blur", this.blur);
      element.removeEventListener("mousedown", this.mousedown);
    });
  }

  findElementsByClassName(className) {
    const dotted = className + "_dotted";
    const reg = document.getElementsByClassName(className);
    const dot = document.getElementsByClassName(dotted);
    const count = reg.length + dot.length;
    if (this.debug) console.log(`|FM| found all: |${count}| regular: |${reg.length}| dotted: |${dot.length}| for className: |${className}|`);
    return {
      reg,
      dot,
      count
    };
  }

  findElementsByIds(ids) {
    const set = new Set(ids);
    if (set.size !== ids.length) {
      console.log(`|FM error| duplicate ids: |${ids}| found`);
      console.log(ids);
    }
    const reg = [];
    const dot = [];
    const addElement = (value) => {
      if (typeof value !== 'string') console.log(`|FM error| id: ${value} not string`);
      else {
        const element = document.getElementById(value);
        if (element == null) console.log(`|FM error| id: ${value} not found`);
        else {
          if (value.includes('_dotted')) dot.push(element);
          else reg.push(element);
        }
      }
    };
    set.forEach(addElement);
    const count = reg.length + dot.length;
    if (this.debug) console.log(`|FM| found all: |${count}| regular: |${reg.length}| dotted: |${dot.length}| for set: |${set}|`);
    return {
      reg,
      dot,
      count,
      set
    };
  }

  setActiveFocus() {
    if (this.subscribedIdSets.size === 0) return;
    let topIdSet = null;
    const activeElementId = document.activeElement.id;
    for (topIdSet of this.subscribedIdSets);
    const topIdArray = [...topIdSet];
    if (!topIdSet.has(activeElementId)) {
      const firstId = topIdArray[0];
      const nextElement = document.getElementById(firstId);
      // nextElement.focus();
      if (this.debug) console.log(`|FM| setting focus activeElement: |${activeElementId}| nextElement: |${nextElement.id}|`);
    } else {
      if (this.debug) console.log(`|FM| not setting focus activeElement: ${activeElementId}`);
    }
  }

  keydown(e) {
		const k = e.keyCode;
		if (k === 16 && !this.holdingShift) this.holdingShift = true; // shift key
		else if (k === 9) { // tab key
      console.log('');
			if (this.subscribedIdSets.size !== 0) this.setActiveFocus();
		}
  }

	keyup(e) {
		if (e.keyCode === 16 && this.holdingShift) this.holdingShift = false; // shift key
  }

  mouseup() {
    if (this.debug) console.log(`|FM| mouse up`);
    if (this.justClicked) this.justClicked = false;
  }

  mousedown(e) {
    if (this.debug) console.log(`|FM| down type: |${e.currentTarget.tagName}| className: |${e.currentTarget.className}| id: |${e.currentTarget.id}|`);
    if (!this.justClicked) this.justClicked = true;
  }

  blur(e) {
    if (this.debug) console.log(`|FM| blur type: |${e.currentTarget.tagName}| className: |${e.currentTarget.className}| id: |${e.currentTarget.id}|`);
    e.target.style.outline = null;
  }

  focus(e) {
    if (this.debug) console.log(`|FM| focus onClick: |${e.currentTarget.focusOnClick}| type: |${e.currentTarget.tagName}| className: |${e.currentTarget.className}| id: |${e.currentTarget.id}|`);
    if (this.justClicked && !e.currentTarget.focusOnClick) return;
    if (this.debug) console.log(`|FM| will focus`);
    if (e.currentTarget.focusDotted) e.target.style.outline = this.dottedOutline;
    else e.target.style.outline = this.outline;
  }
}

export default FocusManager;
