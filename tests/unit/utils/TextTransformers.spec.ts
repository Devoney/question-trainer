import { assert } from 'chai';
import { firstLineOnly, PToBr, truncateWithDots } from '@/utils/TextTransformers';

describe('TextTransformers', () => {
  it('Paragraph is replaced with linebreak.', () => {
    // Given
    const inputStr: string = '<p>My text</p>';
    const expectedStr: string = 'My text<br>';

    // When
    const actualStr = PToBr(inputStr);

    // Then
    assert.equal(actualStr, expectedStr, 'Replacement of <p> with <br> was unsuccessful.');
  });

  it('All paragraphs are replaced with linebreaks.', () => {
    // Given
    const inputStr: string = '<p>My text</p><p>Second paragraph</p>';
    const expectedStr: string = 'My text<br>Second paragraph<br>';

    // When
    const actualStr = PToBr(inputStr);

    // Then
    assert.equal(actualStr, expectedStr, 'Replacement of <p> with <br> was unsuccessful.');
  });

  it('Only first line of text is returned if text contains break lines.', () => {
    // Given
    const expectedText: string = 'My text';
    const text: string = expectedText + '<br>Second text.<br>Third text.';

    // When
    const actualText = firstLineOnly(text);

    // Then
    assert.equal(actualText, expectedText, 'Only the first line of the text should be shown.');
  });

  it('Line is truncated with dots', () => {
    // Given
    const sentence = 'This is my to long text';
    const expectedText: string = sentence + '...';
    const text: string = sentence + ' that needs to be truncated.<br>And some more';

    // When
    const actualText = truncateWithDots(text, 24);

    // Then
    assert.equal(actualText, expectedText);
  });

  it('Line is not truncated with dots', () => {
    // Given
    const text = 'This is my to long text';

    // When
    const actualText = truncateWithDots(text, 20);

    // Then
    assert.equal(actualText, text);
  });
});
