export const createElement = (tagName, className, text) => {
    const elem = document.createElement(tagName);
    elem.className = className;
    elem.textContent = text;
    return elem;
  };