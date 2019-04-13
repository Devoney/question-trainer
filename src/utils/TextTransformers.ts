export function PToBr(text: string): string {
  let returnValue = text;
  while (returnValue.indexOf('<p>') !== -1) {
    returnValue = returnValue.replace('<p>', '').replace('</p>', '<br>');
  }
  return returnValue;
}

export function firstLineOnly(text: string) {
  return PToBr(text).split("\n")[0].split('<br>')[0];
}

export function truncateWithDots(text: string, maxLength: number) {
  const firstLine = firstLineOnly(text);
  let lineToShow: string = '';
  if (firstLine.length - 3 > maxLength) {
    lineToShow = firstLine.substr(0, maxLength).trim();
  } else {
    lineToShow = firstLine;
  }
  if (text.replace('<br>', '').length-3 > lineToShow.length) {
    lineToShow = lineToShow + '...';
  }
  return lineToShow;
}
