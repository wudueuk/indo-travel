const docElem = document.documentElement;
let prevPos = 0;

const fly = document.createElement('div');
fly.style.cssText = `
  position: fixed;
  width: 50px;
  height: 50px;
  bottom: 0px;
  right: 0px;
  background: url('../img/airplane.svg') center/contain no-repeat;
  transition: all 0.15s ease-out;
`;

document.body.append(fly);

const debounce = (cb) => {
  let raf = NaN;
  return () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      cb();
      raf = NaN;
    });
  };
};

const calcPositionFly = () => {
  if (docElem.clientWidth >= 758) {
    const pageHeight = docElem.clientHeight - fly.clientHeight;
    const maxScrollY = docElem.scrollHeight - pageHeight;
    const percentScroll = (window.pageYOffset * 100) / maxScrollY;
    const moveUp = pageHeight * (percentScroll / 100);

    if (prevPos <= window.pageYOffset) {
      fly.style.transform = `translateY(${-moveUp}px) rotate(0)`;
    } else fly.style.transform = `translateY(${-moveUp}px) rotate(180deg)`;

    prevPos = window.pageYOffset;
  }
};

const debounceFly = debounce(calcPositionFly);

window.addEventListener('scroll', debounceFly);

window.addEventListener('resize', () => {
  if (docElem.clientWidth >= 758) {
    fly.style.opacity = 1;
  } else fly.style.opacity = 0;
});

calcPositionFly();
