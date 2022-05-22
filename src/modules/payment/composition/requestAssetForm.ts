import { useField, useForm } from 'vee-validate';
import { ICreateRequestAsset, IRequestAsset } from '../types';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { requestAssetService } from '../services/request-asset-api.services';
import { CreateRequestAssetSchema } from '../constants';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { requestAssetModule } from '../store/requestAsset.store';
import { DEFAULT_FIRST_PAGE, HttpStatus } from '@/common/constants';
import { IBodyResponse } from '@/common/types';

export const initData = () => {
    const { t } = useI18n();
    const initValues = {
        name: '',
        type: '',
        category: '',
        requestQuantity: 1,
        description: '',
        price: null,
    };
    const isCreate = computed(() => !requestAssetModule.selectedRequestAsset?.id);
    const { handleSubmit, errors, validate, resetForm } = useForm({
        initialValues: initValues,
        validationSchema: CreateRequestAssetSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        const createBody = {
            ...values,
            name: values.name?.trim(),
            type: values.type?.trim(),
            category: values.category?.trim(),
            description: values.description?.trim(),
            requestQuantity: values.requestQuantity,
            price: values.price,
        } as unknown as ICreateRequestAsset;
        let response;
        const requestAssetId = requestAssetModule.selectedRequestAsset?.id;
        const loading = ElLoading.service({
            target: '.content',
        });
        if (!isCreate.value) {
            response = await requestAssetService.update(
                requestAssetId as number,
                createBody,
            );
        } else {
            response = await requestAssetService.create(createBody);
        }
        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                !isCreate.value
                    ? t('asset.form.message.updateRequestSuccess')
                    : (t('asset.form.message.createRequestSuccess') as string),
            );
            requestAssetModule.setIsShowRequestAssetFormPopUp(false);
            requestAssetModule.setRequestAssetQueryString({
                page: DEFAULT_FIRST_PAGE,
            });
            const loading = ElLoading.service({
                target: '.content',
            });
            await requestAssetModule.getRequestAssets();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                requestAssetModule.setIsShowRequestAssetFormPopUp(false);
                const loading = ElLoading.service({
                    target: '.content',
                });
                await requestAssetModule.getRequestAssets();
                loading.close();
            }
        }
        requestAssetModule.setSelectedRequestAsset(null);
    });
    const { value: name } = useField('name');
    const { value: type } = useField('type');
    const { value: category } = useField('category');
    const { value: requestQuantity } = useField('requestQuantity');
    const { value: description } = useField('description');
    const { value: price } = useField('price');
    const openPopup = async () => {
        if (!isCreate.value) {
            const requestAssetDetail = (await requestAssetService.getDetail(
                requestAssetModule.selectedRequestAsset?.id || 0,
            )) as IBodyResponse<IRequestAsset>;
            resetForm({
                values: {
                    name: requestAssetDetail.data?.name,
                    description: requestAssetDetail.data?.description,
                    price: requestAssetDetail.data?.price,
                    requestQuantity: requestAssetDetail.data?.requestQuantity,
                    type: requestAssetDetail.data?.type,
                    category: requestAssetDetail.data?.category || undefined,
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
        onSubmit,
        name,
        type,
        category,
        requestQuantity,
        description,
        price,
        openPopup,
        resetForm,
        validate,
        isCreate,
    };
};
