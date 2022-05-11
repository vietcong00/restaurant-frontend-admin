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
        name: '',
        description: '',
        url: '',
        payerId: undefined,
        payDate: undefined,
    };
    const isCreate = computed(() => !billingModule.selectedBilling?.id);
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: initValues,
        validationSchema: validateBillingSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        const createBody = {
            ...values,
            name: values.name?.trim(),
            description: values.description?.trim(),
            url: values.url?.trim(),
            payerId: values.payerId,
            payDate: moment(values.payDate).utc().fmFullTimeString(),
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
    const { value: name } = useField('name');
    const { value: description } = useField('description');
    const { value: url } = useField('url');
    const { value: payerId } = useField('payerId');
    const { value: payDate } = useField('payDate');

    const openPopup = async () => {
        if (!isCreate.value) {
            const loading = ElLoading.service({ target: '.billing-form-popup' });
            const billingDetail = (await billingService.getDetail(
                billingModule.selectedBilling?.id || 0,
            )) as IBodyResponse<IBilling>;
            loading.close();

            resetForm({
                values: {
                    description: billingDetail.data?.description,
                    url: billingDetail.data?.url,
                    name: billingDetail.data?.name,
                    payerId: billingDetail.data?.payerId,
                    payDate: moment(billingDetail.data?.payDate).fmDayString(),
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
        description,
        url,
        payerId,
        payDate,
        isCreate,
        validate,
        openPopup,
        onSubmit,
        resetForm,
    };
}
