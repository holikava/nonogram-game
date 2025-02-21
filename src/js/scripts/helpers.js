export const createElement = (tagName, className, text) => {
    const elem = document.createElement(tagName);
    elem.className = className;
    elem.textContent = text;
    return elem;
};

export const playSound = (src) => {
    const audio = createElement('audio', 'audio');
    audio.setAttribute('src', `${src}`);
    audio.setAttribute('autoplay', 'true');
    audio.play();
  };