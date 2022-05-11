import { useField, useForm } from 'vee-validate';
import { IAsset, ICreateAsset, IUpdateAsset } from '../types';
import { useI18n } from 'vue-i18n';
import { assetService } from '../services/asset-api.services';
import { UsingStatus, CreateAssetSchema } from '../constants';
import { computed } from 'vue';
import { assetModule } from '../store/asset.store';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { IBodyResponse } from '@/common/types';
import moment from 'moment-timezone';
import { requestAssetModule } from '../store/requestAsset.store';
import { DEFAULT_FIRST_PAGE } from '@/common/constants';

export const initData = () => {
    const { t } = useI18n();
    const isCreate = computed(() => !assetModule.selectedAsset?.id);
    const initValues = {
        name: '',
        type: '',
        category: '',
        description: '',
        price: null,
        assigneeId: undefined,
        code: '',
        usingStatus: UsingStatus.USING,
        isAutoGenerateCode: false,
        requestAssetId: undefined,
        purchaseDate: undefined,
    };
    const { handleSubmit, errors, validate, resetForm, setErrors } = useForm({
        initialValues: initValues,
        validationSchema: CreateAssetSchema,
    });
    const onSubmit = handleSubmit(async (values: any) => {
        let response;
        const assetId = assetModule.selectedAsset?.id;
        if (!isCreate.value) {
            const updateBody = {
                name: values.name?.trim(),
                type: values.type?.trim(),
                category: values.category?.trim(),
                usingStatus: values.usingStatus?.trim(),
                description: values.description?.trim(),
                price: +values.price,
                assigneeId: values.assigneeId,
                purchaseDate: moment(values.purchaseDate).utc().fmFullTimeString(),
            } as unknown as IUpdateAsset;
            const loading = ElLoading.service({
                target: '.content',
            });
            response = await assetService.update(assetId as number, updateBody);
            loading.close();
        } else {
            const createBody = {
                name: values.name?.trim(),
                type: values.type?.trim(),
                category: values.category?.trim(),
                usingStatus: values.usingStatus?.trim(),
                description: values.description?.trim(),
                price: +values.price,
                code: values.code?.trim(),
                assigneeId: values.assigneeId,
                requestAssetId: values.requestAssetId || undefined,
                purchaseDate: moment(values.purchaseDate).utc().fmFullTimeString(),
                isAutoGenerateCode: values.isAutoGenerateCode,
            } as ICreateAsset;
            const loading = ElLoading.service({
                target: '.content',
            });
            response = await assetService.create(createBody);
            loading.close();
        }
        if (response?.success) {
            showSuccessNotificationFunction(
                !isCreate.value
                    ? t('asset.form.message.updateSuccess')
                    : (t('asset.form.message.createSuccess') as string),
            );
            assetModule.setIsShowAssetFormPopUp(false);
            assetModule.setAssetQueryString({
                page: DEFAULT_FIRST_PAGE,
            });
            requestAssetModule.setRequestAssetQueryString({
                page: DEFAULT_FIRST_PAGE,
            });
            const loading = ElLoading.service({
                target: '.content',
            });
            await assetModule.getRequestAssets();
            await assetModule.getAssets();
            await requestAssetModule.getRequestAssets();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
        }
        assetModule.setSelectedAsset(null);
    });
    const { value: name } = useField('name');
    const { value: type } = useField('type');
    const { value: category } = useField('category');
    const { value: usingStatus } = useField('usingStatus');
    const { value: assigneeId } = useField('assigneeId');
    const { value: description } = useField('description');
    const { value: price } = useField('price');
    const { value: code } = useField('code');
    const { value: isAutoGenerateCode } = useField('isAutoGenerateCode');
    const { value: purchaseDate } = useField('purchaseDate');
    const { value: requestAssetId, setValue: setRequestAssetId } =
        useField('requestAssetId');
    const openPopup = async () => {
        if (!isCreate.value) {
            const assetDetail = (await assetService.getDetail(
                assetModule.selectedAsset?.id || 0,
            )) as IBodyResponse<IAsset>;
            resetForm({
                values: {
                    name: assetDetail.data?.name,
                    description: assetDetail.data?.description,
                    price: assetDetail.data?.price,
                    assigneeId: assetDetail.data?.assignee?.id,
                    usingStatus: assetDetail.data?.usingStatus,
                    type: assetDetail.data?.type,
                    code: assetDetail.data?.code,
                    category: assetDetail.data?.category,
                    isAutoGenerateCode: assetDetail?.data?.isAutoGenerateCode || true,
                    requestAssetId: undefined,
                    purchaseDate: moment(assetDetail.data?.purchaseDate).fmDayString(),
                },
            });
        } else {
            const selectedRequestAsset = assetModule.requestAssets.find(
                (requestAsset) =>
                    requestAsset.id === assetModule.selectedAsset?.requestAssetId,
            );
            resetForm({
                values: {
                    ...initValues,
                    name: selectedRequestAsset?.name || initValues.name,
                    description:
                        selectedRequestAsset?.description || initValues.description,
                    price: selectedRequestAsset?.price || initValues.price,
                    type: selectedRequestAsset?.type || initValues.type,
                    category: selectedRequestAsset?.category || initValues.category,
                    requestAssetId: selectedRequestAsset?.id || initValues.requestAssetId,
                },
            });
        }
    };
    const onChangeRequestAsset = async () => {
        const selectedRequestAsset = assetModule.requestAssets.find(
            (requestAsset) => requestAsset.id === (requestAssetId.value as number),
        );
        resetForm({
            values: {
                ...initValues,
                name: selectedRequestAsset?.name,
                description: selectedRequestAsset?.description,
                price: selectedRequestAsset?.price,
                type: selectedRequestAsset?.type,
                category: selectedRequestAsset?.category || undefined,
                requestAssetId: selectedRequestAsset?.id,
            },
        });
    };

    return {
        errors,
        onSubmit,
        name,
        type,
        assigneeId,
        category,
        code,
        description,
        price,
        usingStatus,
        isCreate,
        isAutoGenerateCode,
        requestAssetId,
        purchaseDate,
        onChangeRequestAsset,
        openPopup,
        setErrors,
        resetForm,
        validate,
        setRequestAssetId,
    };
};
