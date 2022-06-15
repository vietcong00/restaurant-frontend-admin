import { IPopupAttributes, ISelectOptions } from '@/common/types';
import { MessageBoxData } from 'element-plus';
import {
    showConfirmPopUpFunction,
    showSuccessNotificationFunction,
    showErrorNotificationFunction,
    showAlertMessageFunction,
    parseSelectOptions,
} from '@/utils/helper';
import { Vue } from 'vue-class-component';
import {
    DATE_TIME_FORMAT,
    DEFAULT_MIN_DATE,
    INPUT_TEXT_MAX_LENGTH,
    INPUT_URL_MAX_LENGTH,
    MIN_DATE_PICKER,
    SupportLanguage,
} from '@/common/constants';
import { appModule } from '@/store/app';
import moment from 'moment';
import { AcceptStatus } from '@/modules/store/constants';
import { IUserPosition } from '@/modules/user/types';

export class UtilMixins extends Vue {
    // Common variable
    MIN_DATE_PICKER = MIN_DATE_PICKER;
    DATE_TIME_FORMAT = DATE_TIME_FORMAT;
    DEFAULT_MIN_DATE = new Date(DEFAULT_MIN_DATE);

    INPUT_URL_MAX_LENGTH = INPUT_URL_MAX_LENGTH;
    INPUT_TEXT_MAX_LENGTH = INPUT_TEXT_MAX_LENGTH;
    YYYY_MM_DD_HYPHEN_HH_MM_COLON = DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_COLON;
    AcceptStatus = AcceptStatus;

    // Common function
    async showConfirmPopup(
        message: string,
        title: string,
        options: IPopupAttributes,
    ): Promise<void | MessageBoxData> {
        return showConfirmPopUpFunction(message, title, options);
    }

    showSuccessNotification(message: string, title?: string): void {
        showSuccessNotificationFunction(message, title);
    }

    showErrorNotification(message?: string, title?: string): void {
        showErrorNotificationFunction(message, title);
    }

    showAlertPopup(message: string, title?: string): void {
        showAlertMessageFunction(message, title);
    }

    translateYupError(
        yupError:
            | {
                  i18nKey: string;
                  params?: Record<string, string>;
              }
            | string,
    ): string {
        if (typeof yupError === 'string') {
            return this.$t(yupError);
        }
        if (!yupError?.i18nKey) return '';
        return this.$t(yupError?.i18nKey, { ...yupError?.params });
    }

    parseMoney(money: number): string {
        return money || money === 0
            ? new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'VND',
              }).format(money)
            : '';
    }

    parseDateTime(dateTime: Date | string, dateTimeFormat = 'YYYY-MM-DD'): string {
        if (!moment(dateTime).isValid) {
            return '';
        }
        const currentLanguage = appModule.selectedLanguage as SupportLanguage;
        return moment(dateTime).locale(currentLanguage).format(dateTimeFormat);
    }

    getPositionOptions(userPositionList: IUserPosition[]): ISelectOptions[] {
        const currentLanguage = appModule.selectedLanguage as SupportLanguage;
        return parseSelectOptions(
            userPositionList.map((pos) => ({
                value: pos.code,
                label: pos.value?.[currentLanguage],
            })),
        );
    }
}
