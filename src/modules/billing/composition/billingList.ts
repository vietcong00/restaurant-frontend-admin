import { DEFAULT_FIRST_PAGE, HttpStatus } from '@/common/constants';
import i18n from '@/plugins/vue-i18n';
import { billingModule } from '../store';
import {
    showConfirmPopUpFunction,
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { billingService } from '../services/api.services';

export const setupDelete = () => {
    const deleteBilling = async (id: number) => {
        const isConfirm = await showConfirmPopUpFunction(
            i18n.global.t('billing.list.message.deleteBilling') as string,
            i18n.global.t('billing.list.message.deleteBillingTitle') as string,
            {},
        );
        if (isConfirm) {
            const loading = ElLoading.service({
                target: '.content',
            });
            const response = await billingService.delete(id);
            loading.close();
            if (response.success) {
                showSuccessNotificationFunction(
                    i18n.global.t('billing.list.message.deleteSuccess') as string,
                );
                billingModule.setBillingQueryString({
                    page: DEFAULT_FIRST_PAGE,
                });
                const loading = ElLoading.service({
                    target: '.content',
                });
                await billingModule.getBillingList();
                loading.close();
            } else {
                showErrorNotificationFunction(response.message as string);
                if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                    const loading = ElLoading.service({
                        target: '.content',
                    });
                    await billingModule.getBillingList();
                    loading.close();
                }
            }
        }
    };

    return { deleteBilling };
};
