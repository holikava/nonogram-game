import { createElement } from "./createElement";

export const playSound = (src) => {
    const audio = createElement('audio', 'audio');
    audio.setAttribute('src', `${src}`);
    audio.setAttribute('autoplay', 'true');
    audio.play();
  };