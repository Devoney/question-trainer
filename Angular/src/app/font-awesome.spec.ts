import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { registerFontAwesomeIcons } from './font-awesome';

describe('registerFontAwesomeIcons', () => {
  it('adds expected icons to the library', () => {
    const addIcons = vi.fn();
    const library = { addIcons } as unknown as FaIconLibrary;

    registerFontAwesomeIcons(library);

    expect(addIcons).toHaveBeenCalled();
    expect(addIcons.mock.calls[0].length).toBeGreaterThan(0);
  });
});
