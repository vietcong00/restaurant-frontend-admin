import { IBodyResponse } from '@/common/types';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { useField, useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { approveQuantitySchema, RequestAssetStatus } from '../constants';
import { requestAssetService } from '../services/request-asset-api.services';
import { assetModule } from '../store/asset.store';
import { requestAssetModule } from '../store/requestAsset.store';
import { IRequestAsset } from '../types';

export function initData() {
    const { t } = useI18n();
    const initValues = {
        approveQuantity: 1,
        requestQuantity: 0,
    };
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: initValues,
        validationSchema: approveQuantitySchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        const loading = ElLoading.service({
            target: '.content',
        });
        const response = await requestAssetService.updateStatus(
            requestAssetModule.selectedRequestAsset?.id || 0,
            {
                approveQuantity: values.approveQuantity,
                status: RequestAssetStatus.APPROVED,
            },
        );
        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                t('asset.list.confirmApprove.message.approvedSuccess') as string,
            );
            requestAssetModule.setIsShowApprovePopUp(false);
            const loading = ElLoading.service({
                target: '.content',
            });
            await requestAssetModule.getRequestAssets();
            await assetModule.getRequestAssets();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message);
        }
    });
    const { value: requestQuantity } = useField('requestQuantity');
    const { value: approveQuantity } = useField('approveQuantity');
    const openPopup = async () => {
        const response = (await requestAssetService.getDetail(
            requestAssetModule.selectedRequestAsset?.id || 0,
        )) as IBodyResponse<IRequestAsset>;
        resetForm({
            values: {
                requestQuantity: response?.data?.requestQuantity || 0,
                approveQuantity: 1,
            },
        });
    };
    return {
        errors,
        onSubmit,
        requestQuantity,
        approveQuantity,
        openPopup,
        resetForm,
        validate,
    };
}
