import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { useField, useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { CandidateStatus, updateCandidateStatusSchema } from '../constants';
import { recruitmentService } from '../service/api.service';
import { recruitmentModule } from '../store';

const intitCandidateStatus = {
    status: CandidateStatus.CV_REVIEWING,
    note: '',
};

export function initData() {
    const { t } = useI18n();
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: { ...intitCandidateStatus },
        validationSchema: updateCandidateStatusSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        const loading = ElLoading.service({
            target: '.content',
        });
        const response = await recruitmentService.updateCandidateStatus(
            recruitmentModule.candidate?.id || 0,
            {
                status: recruitmentModule.selectedCandidateStatus,
                note: values.note,
            },
        );
        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                t('recruitment.list.updateStatus.messageSuccess') as string,
            );
            recruitmentModule.setIsShowCandidateStatusPopUp(false);
            const loading = ElLoading.service({
                target: '.content',
            });
            await recruitmentModule.getCandidates();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message);
        }
    });
    const { value: status } = useField('status');
    const { value: note } = useField('note');
    const openPopup = async () => {
        resetForm({
            values: {
                status:
                    recruitmentModule.selectedCandidateStatus ||
                    CandidateStatus.CV_REVIEWING,
                note: '',
            },
        });
    };
    return {
        errors,
        onSubmit,
        status,
        note,
        openPopup,
        resetForm,
        validate,
    };
}
