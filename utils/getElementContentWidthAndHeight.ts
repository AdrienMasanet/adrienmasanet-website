/**
 * Get the width and height of an element minus padding and border
 * @param element The element to get the width and height of
 * @returns An object containing the width and height of the element
 */
export default function getElementContentWidthAndHeight(element: HTMLElement): {
  width: number;
  height: number;
} {
  var computedStyle = getComputedStyle(element);

  var paddingX =
    parseFloat(computedStyle.paddingLeft) +
    parseFloat(computedStyle.paddingRight);
  var paddingY =
    parseFloat(computedStyle.paddingTop) +
    parseFloat(computedStyle.paddingBottom);

  var borderX =
    parseFloat(computedStyle.borderLeftWidth) +
    parseFloat(computedStyle.borderRightWidth);
  var borderY =
    parseFloat(computedStyle.borderTopWidth) +
    parseFloat(computedStyle.borderBottomWidth);

  return {
    width: element.offsetWidth - paddingX - borderX,
    height: element.offsetHeight - paddingY - borderY,
  };
}
