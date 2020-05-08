import { element } from 'protractor';

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
