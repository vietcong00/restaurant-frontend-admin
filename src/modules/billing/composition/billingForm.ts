import { useField, useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import moment from 'moment';
import { IBilling, IBillingCreate } from '../types';
import { billingService } from '../services/api.services';
import { billingModule } from '../store';
import { validateBillingSchema } from '../constants';
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
        nameCustomer: '',
        phone: '',
        payDate: undefined,
        totalBillingPrice: undefined,
        statusBilling: undefined,
    };
    const isCreate = computed(() => !billingModule.selectedBilling?.id);
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: initValues,
        validationSchema: validateBillingSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        const createBody = {
            ...values,
            nameCustomer: values.nameCustomer?.trim(),
            phone: values.phone?.trim(),
            totalBillingPrice: values.totalBillingPrice,
            payDate: moment(values.payDate).utc().fmFullTimeString(),
            statusBilling: values.statusBilling,
        } as IBillingCreate;
        let response;
        const billingId = billingModule.selectedBilling?.id;
        const loading = ElLoading.service({
            target: '.billing-form-popup',
        });
        if (!isCreate.value) {
            response = await billingService.update(billingId as number, createBody);
        } else {
            response = await billingService.create(createBody);
        }
        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                !isCreate.value
                    ? t('billing.list.message.updateSuccess')
                    : (t('billing.list.message.createSuccess') as string),
            );
            billingModule.setIsShowBillingFormPopUp(false);
            billingModule.setBillingQueryString({ page: DEFAULT_FIRST_PAGE });
            const loading = ElLoading.service({
                target: '.content',
            });
            await billingModule.getBillingList();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                billingModule.setIsShowBillingFormPopUp(false);
                const loading = ElLoading.service({
                    target: '.content',
                });
                await billingModule.getBillingList();
                loading.close();
            }
        }
    });
    const { value: nameCustomer } = useField('nameCustomer');
    const { value: phone } = useField('phone');
    const { value: totalBillingPrice } = useField('totalBillingPrice');
    const { value: payDate } = useField('payDate');
    const { value: statusBilling } = useField('statusBilling');

    const openPopup = async () => {
        if (!isCreate.value) {
            const loading = ElLoading.service({ target: '.billing-form-popup' });
            const billingDetail = (await billingService.getDetail(
                billingModule.selectedBilling?.id || 0,
            )) as IBodyResponse<IBilling>;
            loading.close();

            resetForm({
                values: {
                    nameCustomer: billingDetail.data?.nameCustomer,
                    phone: billingDetail.data?.phone,
                    totalBillingPrice: billingDetail.data?.totalBillingPrice,
                    payDate: moment(
                        billingDetail.data?.payDate,
                    ).fmFullTimeWithoutSecond(),
                    statusBilling: billingDetail.data?.statusBilling,
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
        name,
        nameCustomer,
        phone,
        totalBillingPrice,
        payDate,
        statusBilling,
        isCreate,
        validate,
        openPopup,
        onSubmit,
        resetForm,
    };
}
