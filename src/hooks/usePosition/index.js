/**
 * https://github.com/tranbathanhtung/usePosition/에서 가져온건데
 * https://github.com/tranbathanhtung/usePosition/issues/1
 * 이슈 반영한 버전임
 */
import { useState, useLayoutEffect } from 'react';

function getStyle(el, styleName) {
  return getComputedStyle(el)[styleName];
}

function getOffset(el) {
  if (!el) {
    return { top: 0, left: 0 };
  }
  const rect = el.getBoundingClientRect();
  const doc = el.ownerDocument;
  if (!doc) throw new Error('Unexpectedly missing <document>.');
  const win = doc.defaultView || doc.parentWindow;

  const winX =
    win.pageXOffset !== undefined
      ? win.pageXOffset
      : (doc.documentElement || doc.body.parentNode || doc.body).scrollLeft;
  const winY =
    win.pageYOffset !== undefined
      ? win.pageYOffset
      : (doc.documentElement || doc.body.parentNode || doc.body).scrollTop;

  return {
    top: rect.top + winY,
    left: rect.left + winX,
  };
}

function getPosition(el) {
  if (!el) {
    return { top: 0, left: 0 };
  }
  let offset = getOffset(el);
  // let parentOffset = { top: 0, left: 0 };
  // const marginTop = parseInt(getStyle(el, 'marginTop'), 10) || 0;
  // const marginLeft = parseInt(getStyle(el, 'marginLeft'), 10) || 0;

  if (getStyle(el, 'position') === 'fixed') {
    offset = el.getBoundingClientRect();
  }

  return {
    top: offset.top,
    left: offset.left,
  };
}

function usePosition(ref) {
  const { top, left } = getPosition(ref.current);
  const [ElementPosition, setElementPosition] = useState({
    top,
    left,
  });

  function handleChangePosition() {
    if (ref && ref.current) {
      setElementPosition(getPosition(ref.current));
    }
  }

  useLayoutEffect(() => {
    handleChangePosition();
    window.addEventListener('resize', handleChangePosition);

    return () => {
      window.removeEventListener('resize', handleChangePosition);
    };
  }, [ref]); // eslint-disable-line react-hooks/exhaustive-deps

  return ElementPosition;
}

export default usePosition;
