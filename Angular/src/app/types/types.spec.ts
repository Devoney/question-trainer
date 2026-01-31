import { QuestionModalArgs } from './question-modal-args';
import { QuestionTestStatistics } from './question-test-statistics';
import { Tab } from './tab';
import { HtmlInputEvent } from './html-input-event';
import * as Types from './index';

describe('types', () => {
  it('QuestionModalArgs assigns defaults', () => {
    const args = new QuestionModalArgs('Title', 'Text', () => undefined);

    expect(args.okButtonText).toBe('Ok');
    expect(args.cancelButtonText).toBe('Cancel');
  });

  it('QuestionTestStatistics defaults to zero', () => {
    const stats = new QuestionTestStatistics();

    expect(stats.correctCount).toBe(0);
    expect(stats.wrongCount).toBe(0);
  });

  it('Tab assigns props', () => {
    const tab = new Tab('Title', 'Component', { key: 'value' });

    expect(tab.props).toEqual({ key: 'value' });
  });

  it('HtmlInputEvent typing works with input target', () => {
    const target = document.createElement('input');
    const event = { target } as HtmlInputEvent;

    expect(event.target.value).toBe('');
  });

  it('index exports expected symbols', () => {
    expect(Types.QuestionModalArgs).toBe(QuestionModalArgs);
    expect(Types.QuestionTestStatistics).toBe(QuestionTestStatistics);
    expect(Types.Tab).toBe(Tab);
  });
});
