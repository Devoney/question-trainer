import { assert } from 'chai';
import { PToBr } from '@/utils/TextTransformers';

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
});
