import React from 'react';
import CarouselHTML from './carousel.js';

const Debug = false;
const Slides = 3;
const MiddleIndex = 1; // (Slides - 1) / 2
const AnimationTime = 400;
const DragAnimationTime = 20;
const AutoSlideTime = 5000;
const ButtonIds = ['lookbook-close', 'slick-prev-arrow', 'slick-next-arrow'];

// returns a set of offsets for the index
const offsets = (count, columns) => {
	const array = [];
	for (let i = 0; i < count; i++) {
		if (columns) {
			for (let j = 0; j < columns; j++) {
				const index = i - (count - 1) / 2;
				const offset = (index * columns) + j;
				array.push(offset);
			}
		} else {
			const offset = i - (count - 1) / 2;
			array.push(offset);
		}
	}
	if (Debug) console.log(`|Carousel| offsets: |${array}|`);
	return array;
};

// returns wrapped offset if initial index is out of bounds
const wrapOffset = (offsets, i, index, length) => {
	let offset = offsets[index] + i;
	if (offset < 0) offset = (length) + offset;
	else if (offset > length - 1) offset = offset - (length);
	return offset;
};

// returns a subarray (Slides) from array given an index (i)
const getSubArray = (i, array, columns) => {
	const a = array == null ? [] : array;
	const _offsets = offsets(Slides, columns);
	const subArray = [];
	const indexes = [];
	if (columns) {
		let columnArray = null;
		for (let index = 0; index < Slides * columns; index++) {
			const isColumnStart = index % columns === 0;
			if (isColumnStart && columnArray != null) subArray.push(columnArray);
			if (isColumnStart) columnArray = [];
			const offset = wrapOffset(_offsets, i, index, array.length);
			columnArray.push(a[offset]);
			indexes.push(offset);
		}
		if (columnArray && columnArray.length > 0) {
			const leftOvers = columns - columnArray.length;
			for (i = 0; i < leftOvers; i++) columnArray.push(null);
			subArray.push(columnArray);
		}
	} else {
		for (let index = 0; index < Slides; index++) {
			const offset = wrapOffset(_offsets, i, index, array.length);
			subArray.push(a[offset]);
			indexes.push(offset);
		}
	}
	if (Debug) console.log(`|Carousel| subArrayLength: |${subArray.length}|`);
	if (Debug) console.log(`|Carousel| index: |${i}| indexes: |${indexes}|`);
	return subArray;
};

const relMouseCoords = (e, element) => {
	let totalOffsetX = 0;
	let totalOffsetY = 0;
	let canvasX = 0;
	let canvasY = 0;
	do { // eslint-disable-line
		totalOffsetX += element.offsetLeft - element.scrollLeft;
		totalOffsetY += element.offsetTop - element.scrollTop;
	} while ((element = element.offsetParent));
	canvasX = e.pageX - totalOffsetX;
	canvasY = e.pageY - totalOffsetY;
	return {x: canvasX, y: canvasY};
};

const setAnimation = (index, stateIndex, lastIndex) => {
	const didLoop = (index < 0 || index > lastIndex);
	if (index < 0) index = lastIndex + index + 1;
	else if (index > lastIndex) index = index - lastIndex - 1;
	const diff = Math.abs(stateIndex - index);
	const direction = index > stateIndex ? "next" : "prev";
	const newDiff = Math.min(MiddleIndex, diff);
	const outOfBounds = newDiff > diff;
	let animationIndex = MiddleIndex;
	if (direction === "prev") animationIndex = didLoop ? MiddleIndex + 1 : MiddleIndex - newDiff;
	else if (direction === "next") animationIndex = didLoop ? MiddleIndex - 1 : MiddleIndex + newDiff;
	return {
		didLoop,
		outOfBounds,
		index,
		animationIndex
	};
};

const infoFromStatePropsActions = (state, props, actions) => {
	const data = props.data || {};
	const index = state.index;
	const slides = Slides;
	const theme = data.carouselTheme || 'default';
	const hasColumns = theme.includes('columns');
	const stripped = Number(theme.replace('columns', ''));
	const columns = isNaN(stripped) ? null : Math.max(1, stripped);
	const isMobile = props.isMobile || false;
	const allObjects = data.imageOptions || data.components || [];
	const compInfo = theme === 'lookback' ? {} : data;
	const isImageOption = data.imageOptions != null;
	const count = columns ? Math.ceil(allObjects.length / columns) : allObjects.length;
	const multiplier = columns || 1;
	const objects = getSubArray(index * multiplier, allObjects, columns);
	const showButtons = !state.hidden && theme !== 'default';
	const focus = state.focus ? ' focus' : '';
	const pageText = `${index + 1}/${count}`;
	const title = `Look ${index + 1}`;
	const percentage = (state.animationIndex / slides) * 100;
	const transform = `translate(-${percentage}%, 0%)`;
	const transition = `transform ${state.animationTime}ms ease 0s`;
	const hasDots = (theme === 'default' || theme === 'columns4');
	const loop = (theme === 'default' || theme === 'columns4');
	const close = actions.close;
	const prev = (loop || index !== 0) ? actions.prev : null;
	const next = (loop || index !== count - 1) ? actions.next : null;
	const moveto = actions.moveTo;
	const mousedown = actions.mouseDown == null ? null : e => actions.mouseDown(e);
	const mousemove = actions.mouseMove == null ? null : e => actions.mouseMove(e);
	const mouseout = actions.mouseOut == null ? null : e => actions.mouseOut(e);
	const mouseup = actions.mouseUp == null ? null : e => actions.mouseUp(e);
	const a = {
		close,
		prev,
		next,
		moveto,
		mousedown,
		mousemove,
		mouseout,
		mouseup
	};
  return {
		actions: a,
		compInfo,
		count,
		focus,
		hasColumns,
		hasDots,
		index,
		isImageOption,
		isMobile,
		objects,
		pageText,
		showButtons,
		slides,
		theme,
		title,
		transition,
		transform
  };
};

/*
	Carousel Class Controller used for Image16x9 and Text slide display
	properties:	[default] [description]
	data.carouselIndex:		0					initial index of the carousel
	data.carouselTheme: 	default		default, columns[number], lookback
	isMobile:							false			will render view for mobile if true
	actions:							null			handles actions.didHideModal, will call when closed
*/
class Carousel extends React.Component {
	constructor(props) {
		super(props);
		const data = this.props.data || {};
		const index = data.startIndex || 0;
        this.state = {
			index,
			animationIndex: MiddleIndex,
			animationTime: 0,
            hidden: this.props.hidden,
			focus: false
        };
        this.actions = {
			close: this.close.bind(this),
			prev: this.prev.bind(this),
			next: this.next.bind(this),
			moveTo: this.startAnimation.bind(this),
			mouseDown: this.mouseDown.bind(this),
			mouseUp: this.mouseUp.bind(this),
			mouseMove: this.mouseMove.bind(this),
			mouseOut: this.mouseOut.bind(this)
        };
		this.setPrivateVariables(data);
		if (this.keyboard) this.keyup = this.keyup.bind(this);
		if (this.keyboard) this.keydown = this.keydown.bind(this);
		if (this.tabonly) this.focus = this.focus.bind(this);
		this.slidetimer = null;
	}

	componentDidMount() {
		if (Debug) console.log(`|Carousel| did mount`);
    if (this.keyboard) document.addEventListener("keydown", this.keydown);
		if (this.keyboard) document.addEventListener("keyup", this.keyup);
		if (this.tabonly) document.addEventListener("focus", this.focus, true);
		if (this.auto) this.slidetimer = setInterval(() => this.next(), AutoSlideTime);
  }

  componentWillUnmount() {
		if (Debug) console.log(`|Carousel| will unmount`);
		document.removeEventListener("keydown", this.keydown);
		document.removeEventListener("keyup", this.keyup);
		document.removeEventListener("focus", this.focus, true);
		if (this.slidetimer) clearInterval(this.slidetimer);
  }

	// Public Methods

	// will show the carousel at a specific index
	show(index) {  // eslint-disable-line
		if (Debug) console.log(`|Carousel| show called`);
		if (this.auto) this.slidetimer = setInterval(() => this.next(), AutoSlideTime);
		const i = index == null ? 0 : index;
		this.setState({
      index: i,
			animationIndex: MiddleIndex,
			animationTime: 0,
      hidden: false
    });
  }

	// will hide the carousel
	close() {
		if (Debug) console.log(`|Carousel| close called`);
		if (this.slidetimer) clearInterval(this.slidetimer);
		this.shiftPressed = false;
		const data = this.props.data || {};
		const actions = data.actions || {};
    if (actions.closeModal) {
      actions.closeModal();
    }
		this.setState({
			index: 0,
			animationIndex: MiddleIndex,
			animationTime: 0,
			hidden: true,
			focus: false
		});
	}

	// will animate to next slide on the carousel
	next() {
		if (Debug) console.log(`|Carousel| next called`);
		if (this.tabonly && this.state.focus) this.setState({focus: false});
		if (!this.loop && this.state.index === this.lastIndex) return;
		this.startAnimation(this.state.index + 1);
	}

	// will animate to previous slide on the carousel
	prev() {
		if (Debug) console.log(`|Carousel| prev called`);
		if (this.tabonly && this.state.focus) this.setState({focus: false});
		if (!this.loop && this.state.index === 0) return;
		this.startAnimation(this.state.index - 1);
	}

	// Private Methods, do not call with another controller

	setPrivateVariables(data) {
		const theme = data.carouselTheme || 'default';
		this.lastIndex = Math.max(0, (data.imageOptions || data.components || []).length - 1);
		this.draggingStartX = 0;
		this.dragging = false;
		this.animating = false;
		this.shiftPressed = false;
		this.keyboard = true;
		this.tabonly = theme !== 'default' || theme !== 'columns4';
		this.auto = theme === 'default' || theme === 'columns4';
		this.loop = theme === 'default' || theme === 'columns4';
	}

	focus() {
		if (this.state.hidden) return;
		const id = document.activeElement.id;
		if (!ButtonIds.includes(id)) {
			if (this.shiftPressed) {
				const id = ButtonIds[ButtonIds.length - 1];
				const element = document.getElementById(id);
				if (element) element.focus();
				if (Debug) console.log(`|Carousel| shift focus on id: ${id} element: ${element}`);
			} else {
				const id = ButtonIds[0];
				const element = document.getElementById(id);
				if (element) element.focus();
				if (Debug) console.log(`|Carousel| focus on id: ${id} element: ${element}`);
			}
		}
	}

	keydown(e) {
    if (this.state.hidden) return;
		const k = e.keyCode;
		if (k === 39) this.next(); // right arrow key
		else if (k === 37) this.prev(); // left arrow key
		else if (k === 27) this.close(); // escape key
		else if (!this.tabonly) return; // we can tab outside window
		else if (k === 9 && this.tabonly && !this.state.focus) this.setState({ focus: true }); // tab key
		else if (k === 16) this.shiftPressed = true; // shift key
		if (Debug) console.log(`|Carousel| key down: ${k}`);
  }

	keyup(e) {
		if (this.state.hidden || !this.tabonly) return;
		const k = e.keyCode;
		if (Debug) console.log(`|Carousel| key up: ${k}`);
		if (k === 16) this.shiftPressed = false; // shift key
  }

	shouldDrag(animationIndex) {
		if (animationIndex === this.state.animationIndex) return false;
		if (!this.loop) {
			if (this.state.index === 0 && animationIndex < MiddleIndex) return false;
			if (this.state.index === this.lastIndex && animationIndex > MiddleIndex) return false;
		}
		return true;
	}

	updateDrag(e) {
		const width = e.currentTarget.offsetWidth;
		const difference = this.draggingStartX - e.screenX;
		const indexChange = difference / width;
		const animationIndex = MiddleIndex + indexChange;
		if (this.dragging) {
			if (this.shouldDrag(animationIndex)) {
				this.setState({
					animationIndex,
					animationTime: DragAnimationTime
				});
			}
		} else {
			if (indexChange === 0) {
				const current = e.currentTarget;
				const {x, y} = relMouseCoords(e, current);
				current.style.display = "none";
				const next = document.elementFromPoint(x, y);
				current.style.display = "block";
				if (next) {
					next.click();
					if (Debug) console.log(`|Carousel| propogate touch x: |${x}| y: |${y}| to tag: |${next.tagName}| id: |${next.id}|`);
				}
			} else {
				if (Debug) console.log(`|Carousel| finish drag indexChange: |${indexChange}| index: |${this.state.index}| animationIndex: |${animationIndex}| width: |${width}|`);
				const changeThreshold = 0.25;
				const tryPrev = (indexChange < 0);
				const goPrev = (tryPrev && indexChange < -changeThreshold);
				const goNext = (!tryPrev && indexChange > changeThreshold);
				if (goPrev) this.prev();
				else if (goNext) this.next();
				else this.startAnimation(this.state.index);
			}
		}
	}

	startAnimation(i) {
		if (this.animating || this.dragging) return;
		if (this.slidetimer) {
			clearInterval(this.slidetimer);
			this.slidetimer = setInterval(() => this.next(), AutoSlideTime);
		}
		this.animating = true;
		const {index, animationIndex, didLoop, outOfBounds} = setAnimation(i, this.state.index, this.lastIndex);
		if (Debug) console.log(`|Carousel| startAnimation stateIndex: ${this.state.index} index: ${index} animationIndex: ${animationIndex} didLoop: ${didLoop} outOfBounds: ${outOfBounds}`);
		this.setState({
			animationIndex,
			animationTime: AnimationTime
		});
		setTimeout(() => this.endAnimation(index), AnimationTime);
	}

	endAnimation(i) {
		if (Debug) console.log(`|Carousel| endAnimation index: ${i}`);
		this.animating = false;
		this.setState({
			index: i,
			animationIndex: MiddleIndex,
			animationTime: 0
		});
	}

	mouseDown(e) {
		this.draggingStartX = e.screenX;
		this.dragging = true;
	}

	mouseUp(e) {
		this.dragging = false;
		this.updateDrag(e);
	}

	mouseMove(e) {
		if (this.dragging) this.updateDrag(e);
	}

	mouseOut(e) {
		if (this.dragging) {
			this.dragging = false;
			this.updateDrag(e);
		}
	}
   render() {
		const info = infoFromStatePropsActions(this.state, this.props, this.actions);
		const html = <CarouselHTML info={info} />;
		if (Debug) console.log(`|Carousel| render index: |${this.state.index}|`);
		return html;
	}
}

export default Carousel;
