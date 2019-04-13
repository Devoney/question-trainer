export function PToBr(text: string): string {
  let returnValue = text;
  while (returnValue.indexOf('<p>') !== -1) {
    returnValue = returnValue.replace('<p>', '').replace('</p>', '<br>');
  }
  return returnValue;
}
