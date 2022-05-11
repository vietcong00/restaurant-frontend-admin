import { DEFAULT_FIRST_PAGE, HttpStatus } from '@/common/constants';
import i18n from '@/plugins/vue-i18n';
import { bookingModule } from '../store';
import {
    showConfirmPopUpFunction,
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { eventService } from '../services/api.service';

export const setupDelete = () => {
    const deleteEvent = async (id: number) => {
        const isConfirm = await showConfirmPopUpFunction(
            i18n.global.t('event.list.message.delete.confirmAsk') as string,
            i18n.global.t('event.list.message.delete.title') as string,
            {},
        );
        if (isConfirm) {
            const loading = ElLoading.service({
                target: '.content',
            });
            const response = await eventService.delete(id);
            loading.close();
            if (response.success) {
                showSuccessNotificationFunction(
                    i18n.global.t('event.list.message.delete.success') as string,
                );
                bookingModule.setBookingQueryString({
                    page: DEFAULT_FIRST_PAGE,
                });
                const loading = ElLoading.service({
                    target: '.content',
                });
                await bookingModule.getBookings();
                loading.close();
            } else {
                showErrorNotificationFunction(response.message);
                if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                    const loading = ElLoading.service({
                        target: '.content',
                    });
                    await bookingModule.getBookings();
                    loading.close();
                }
            }
        }
    };

    return { deleteEvent };
};
