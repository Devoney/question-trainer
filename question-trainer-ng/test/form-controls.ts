export const setSelectValue = (select: HTMLSelectElement, value: string): void => {
  let valueToSet: string;
  const nrOfOptions = select.options.length;
  for (let i = 0; i < nrOfOptions; i++) {
    const option = select.options[i];
    if (option.value.endsWith(value)) {
      valueToSet = option.value;
      break;
    }
  }

  select.value = valueToSet;
  select.dispatchEvent(new Event('change'));
};

export const setTextInput = (nativeElement: HTMLElement, query: string, value: string): void => {
  const inputControl = nativeElement.querySelector(query) as HTMLInputElement;
  inputControl.value = value;
  inputControl.dispatchEvent(new Event('input'));
};

export const getTitleOfElement = (nativeElement: HTMLElement, query: string): string => {
  const element = nativeElement.querySelector(query) as HTMLElement;
  if (!element) {
    throw new Error('No element was found by the the following query:\r\n' + query);
  }
  return element.title;
};
