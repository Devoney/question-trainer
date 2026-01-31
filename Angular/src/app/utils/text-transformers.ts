export function pToBr(text: string): string {
  let returnValue = text;
  while (returnValue.indexOf('<p>') !== -1) {
    returnValue = returnValue.replace('<p>', '').replace('</p>', '<br>');
  }
  return returnValue;
}

export function firstLineOnly(text: string): string {
  return pToBr(text).split('\n')[0].split('<br>')[0];
}

export function truncateWithDots(text: string, maxLength: number): string {
  const firstLine = firstLineOnly(text);
  let lineToShow = '';
  if (firstLine.length - 3 > maxLength) {
    lineToShow = firstLine.substring(0, maxLength).trim();
  } else {
    lineToShow = firstLine;
  }
  if (text.replace('<br>', '').length - 3 > lineToShow.length && text.length > maxLength) {
    lineToShow = `${lineToShow}...`;
  }
  return lineToShow;
}
