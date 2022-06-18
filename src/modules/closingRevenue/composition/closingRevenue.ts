import { closingRevenueModule } from './../store';
import { useField, useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { ElLoading } from 'element-plus';
import { DEFAULT_FIRST_PAGE, HttpStatus } from '@/common/constants';
import { validateClosingRevenueSchema } from '../constants';
import { IBodyResponse } from '@/common/types';
import {
    showConfirmPopUpFunction,
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import i18n from '@/plugins/vue-i18n';
import { IClosingRevenue, IClosingRevenueCreateBody } from '../types';
import { closingRevenueService } from '../services/closing-revenue.api.services';

export function initData() {
    const { t } = useI18n();
    const initValues = {
        shiftWork: undefined,
        shiftLeaderId: undefined,
        cashAtBeginningOfShift: undefined,
        cashAtEndingOfShift: undefined,
        bankingRevenue: undefined,
        differenceRevenue: 0,
        note: '',
        billingRevenue: 0,
        importMoney: 0,
        exportMoney: 0,
    };
    const isCreate = computed(() => !closingRevenueModule.selectedClosingRevenue?.id);
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: initValues,
        validationSchema: validateClosingRevenueSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        const createBody = {
            shiftWork: values.shiftWork,
            cashAtBeginningOfShift: values.cashAtBeginningOfShift,
            cashAtEndingOfShift: values.cashAtEndingOfShift,
            bankingRevenue: values.bankingRevenue,
            differenceRevenue: values.differenceRevenue,
            note: values.note,
        } as IClosingRevenueCreateBody;
        let response;
        const closingRevenueId = closingRevenueModule.selectedClosingRevenue?.id;
        const loading = ElLoading.service({
            target: '.closing-revenue-form',
        });
        if (!isCreate.value) {
            response = await closingRevenueService.update(
                closingRevenueId as number,
                createBody,
            );
        } else {
            response = await closingRevenueService.create(createBody);
        }
        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                !isCreate.value
                    ? t('menu.closingRevenue.message.update.success')
                    : (t('menu.closingRevenue.message.create.success') as string),
            );
            closingRevenueModule.setIsShowClosingRevenueFormPopUp(false);
            closingRevenueModule.setClosingRevenueQueryString({
                page: DEFAULT_FIRST_PAGE,
            });
            const loading = ElLoading.service({
                target: '.content',
            });
            await closingRevenueModule.getClosingRevenueList();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                closingRevenueModule.setIsShowClosingRevenueFormPopUp(false);
                const loading = ElLoading.service({
                    target: '.content',
                });
                await closingRevenueModule.getClosingRevenueList();
                loading.close();
            }
        }
    });
    const { value: shiftWork } = useField('shiftWork');
    const { value: shiftLeaderId } = useField('shiftLeaderId');
    const { value: cashAtBeginningOfShift } = useField('cashAtBeginningOfShift');
    const { value: cashAtEndingOfShift } = useField('cashAtEndingOfShift');
    const { value: bankingRevenue } = useField('bankingRevenue');
    const { value: differenceRevenue } = useField('differenceRevenue');
    const { value: note } = useField('note');
    const { value: billingRevenue } = useField('billingRevenue');
    const { value: importMoney } = useField('importMoney');
    const { value: exportMoney } = useField('exportMoney');

    const openPopup = async () => {
        if (!isCreate.value) {
            const loading = ElLoading.service({ target: '.closing-revenue-form-popup' });
            const closingRevenueDetail = (await closingRevenueService.getDetail(
                closingRevenueModule.selectedClosingRevenue?.id || 0,
            )) as IBodyResponse<IClosingRevenue>;
            loading.close();
            resetForm({
                values: {
                    shiftWork: closingRevenueDetail.data?.shiftWork,
                    cashAtBeginningOfShift:
                        closingRevenueDetail.data?.cashAtBeginningOfShift,
                    cashAtEndingOfShift: closingRevenueDetail.data?.cashAtEndingOfShift,
                    bankingRevenue: closingRevenueDetail.data?.bankingRevenue,
                    differenceRevenue: closingRevenueDetail.data?.differenceRevenue,
                    note: closingRevenueDetail.data?.note,
                    billingRevenue: closingRevenueDetail.data?.billingRevenue | 0,
                    importMoney: closingRevenueDetail.data?.importMoney | 0,
                    exportMoney: closingRevenueDetail.data?.exportMoney | 0,
                },
            });
        } else {
            resetForm({
                values: initValues,
            });
        }
    };
    return {
        errors,
        shiftWork,
        shiftLeaderId,
        cashAtBeginningOfShift,
        billingRevenue,
        importMoney,
        exportMoney,
        cashAtEndingOfShift,
        bankingRevenue,
        differenceRevenue,
        note,
        isCreate,
        validate,
        openPopup,
        onSubmit,
        resetForm,
    };
}

export const setupDelete = () => {
    const deleteClosingRevenue = async (id: number) => {
        const isConfirm = await showConfirmPopUpFunction(
            i18n.global.t('menu.closingRevenue.message.delete.confirmAsk') as string,
            i18n.global.t('menu.closingRevenue.message.delete.title') as string,
            {},
        );
        if (isConfirm) {
            const loading = ElLoading.service({
                target: '.content',
            });
            const response = await closingRevenueService.delete(id);
            loading.close();
            if (response.success) {
                showSuccessNotificationFunction(
                    i18n.global.t('menu.closingRevenue.message.delete.success') as string,
                );
                closingRevenueModule.setClosingRevenueQueryString({
                    page: DEFAULT_FIRST_PAGE,
                });
                const loading = ElLoading.service({
                    target: '.content',
                });
                await closingRevenueModule.getClosingRevenueList();
                loading.close();
            } else {
                showErrorNotificationFunction(response.message);
                if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                    const loading = ElLoading.service({
                        target: '.content',
                    });
                    await closingRevenueModule.getClosingRevenueList();
                    loading.close();
                }
            }
        }
    };

    return { deleteClosingRevenue };
};
