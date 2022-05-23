import { closingRevenueService } from '../services/closing-revenue.api.services';
import { IClosingRevenue, IClosingRevenueCreate } from '../types';
import { validateClosingRevenueSchema } from '../constants';
import { reportModule } from '../store';
import { useField, useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import moment from 'moment';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { DEFAULT_FIRST_PAGE, HttpStatus } from '@/common/constants';
import { IBodyResponse } from '@/common/types';

export function initData() {
    const { t } = useI18n();
    const initValues = {
        date: '',
        shiftWork: '',
        cashier: undefined,
        cashAtBeginningOfShift: NaN,
        billingRevenue: NaN,
        importMoney: NaN,
        cashAtEndOfShift: NaN,
        bankingRevenue: NaN,
        differenceRevenue: NaN,
        note: '',
    };
    const isCreate = computed(() => !reportModule.selectedClosingRevenue?.id);
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: initValues,
        validationSchema: validateClosingRevenueSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        const createBody = {
            ...values,
            date: moment(values.date).utc().fmFullTimeString(),
            shiftWork: values.shiftWork,
            cashier: values.cashier?.trim(),
            cashAtBeginningOfShift: values.cashAtBeginningOfShift,
            billingRevenue: values.billingRevenue,
            importMoney: values.importMoney,
            cashAtEndOfShift: values.cashAtEndOfShift,
            bankingRevenue: values.bankingRevenue,
            differenceRevenue: values.differenceRevenue,
            note: values.note?.trim(),
        } as IClosingRevenueCreate;
        let response;
        const closingRevenueId = reportModule.selectedClosingRevenue?.id;
        const loading = ElLoading.service({
            target: '.billing-form-popup',
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
                    ? t('billing.list.message.updateSuccess')
                    : (t('billing.list.message.createSuccess') as string),
            );
            reportModule.setIsShowClosingRevenueFormPopUp(false);
            reportModule.setClosingRevenueQueryString({ page: DEFAULT_FIRST_PAGE });
            const loading = ElLoading.service({
                target: '.content',
            });
            await reportModule.getClosingRevenueList();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                reportModule.setIsShowClosingRevenueFormPopUp(false);
                const loading = ElLoading.service({
                    target: '.content',
                });
                await reportModule.getClosingRevenueList();
                loading.close();
            }
        }
    });
    const { value: date } = useField('date');
    const { value: shiftWork } = useField('shiftWork');
    const { value: cashier } = useField('cashier');
    const { value: cashAtBeginningOfShift } = useField('cashAtBeginningOfShift');
    const { value: billingRevenue } = useField('billingRevenue');
    const { value: importMoney } = useField('importMoney');
    const { value: cashAtEndOfShift } = useField('cashAtEndOfShift');
    const { value: bankingRevenue } = useField('bankingRevenue');
    const { value: differenceRevenue } = useField('differenceRevenue');
    const { value: note } = useField('note');

    const openPopup = async () => {
        if (!isCreate.value) {
            const loading = ElLoading.service({ target: '.closing-revenues-form-popup' });
            const closingRevenueDetail = (await closingRevenueService.getDetail(
                reportModule.selectedClosingRevenue?.id || 0,
            )) as IBodyResponse<IClosingRevenue>;
            loading.close();

            resetForm({
                values: {
                    date: moment(closingRevenueDetail.data?.date).fmDayString(),
                    shiftWork: closingRevenueDetail.data?.shiftWork,
                    cashier: closingRevenueDetail.data?.cashier?.name,
                    cashAtBeginningOfShift:
                        closingRevenueDetail.data?.cashAtBeginningOfShift,
                    billingRevenue: closingRevenueDetail.data?.billingRevenue,
                    importMoney: closingRevenueDetail.data?.importMoney,
                    cashAtEndOfShift: closingRevenueDetail.data?.cashAtEndOfShift,
                    bankingRevenue: closingRevenueDetail.data?.bankingRevenue,
                    differenceRevenue: closingRevenueDetail.data?.differenceRevenue,
                    note: closingRevenueDetail.data?.note,
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
        date,
        shiftWork,
        cashier,
        cashAtBeginningOfShift,
        billingRevenue,
        importMoney,
        cashAtEndOfShift,
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
