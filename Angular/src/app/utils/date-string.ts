export function dateString(date: Date): string {
  const curDate = new Date();
  return (
    curDate.getFullYear() +
    addLeadingZero(curDate.getMonth() + 1) +
    addLeadingZero(curDate.getDate()) +
    addLeadingZero(curDate.getHours()) +
    addLeadingZero(curDate.getMinutes()) +
    addLeadingZero(curDate.getSeconds())
  );
}

function addLeadingZero(value: number, maxDigits: number = 2): string {
  return ('0' + value).slice(-maxDigits);
}
