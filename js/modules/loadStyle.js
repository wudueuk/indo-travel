const style = new Map();

const loadStyle = (url) => {
  if (style.has(url)) {
    return style.get(url);
  }

  const stylePromise = new Promise(resolve => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.addEventListener('load', () => {
      resolve();
    });
    document.head.append(link);
  });

  style.set(url, stylePromise);

  return stylePromise;
};

export default loadStyle;
