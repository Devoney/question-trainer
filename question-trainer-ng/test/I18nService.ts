import { I18nService } from 'src/app/services/i18n.service';
import { i18n } from 'src/app/enums/i18n';

export const provideI18nServiceMock = () => {
    const mock: Partial<I18nService> = {
        getTranslation: (title: i18n) => {
            return '' + title;
        } 
    };
    return { provide: I18nService, useValue: mock };
};