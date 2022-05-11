import { interviewService } from '../service/api.service';
import { useField, useForm } from 'vee-validate';
import { CandidateInterviewProgress, validateInterviewSchema } from '../constants';
import { recruitmentModule } from '../store';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { IBodyResponse } from '@/common/types';
import { useI18n } from 'vue-i18n';
import { ICandidateInterview } from '../types';
import moment from 'moment-timezone';

const innitCandidateInterview = {
    interviewAt: undefined,
    note: '',
    progress: CandidateInterviewProgress.Waiting,
    order: 1,
};

export function initForm() {
    const { t } = useI18n();
    const { errors, validate, resetForm, handleSubmit } = useForm({
        validationSchema: validateInterviewSchema,
        initialValues: { ...innitCandidateInterview },
    });
    const { value: interviewAt } = useField('interviewAt');
    const { value: note } = useField('note');
    const { value: progress } = useField('progress');
    const { value: order } = useField('order');

    const openPopup = async (): Promise<void> => {
        const loading = ElLoading.service({
            target: '.schedule-form-popup',
        });
        const response = (await interviewService.getDetail(
            recruitmentModule.selectedScheduleId,
        )) as IBodyResponse<ICandidateInterview>;
        loading.close();
        if (!response.success) {
            showErrorNotificationFunction(response.message);
            return;
        }
        resetForm({
            values: {
                interviewAt: moment(response.data?.interviewAt).fmFullTimeWithoutSecond(),
                note: response.data?.note || '',
                progress: response.data?.progress,
                order: response.data.order,
            },
        });
    };

    const onSubmit = handleSubmit(async (values) => {
        let response = {} as IBodyResponse;
        const data = { ...values };
        const interviewId = recruitmentModule.selectedScheduleId;
        const selectedCandidate = recruitmentModule.candidate;
        const loading = ElLoading.service({
            target: '.schedule-form-popup',
        });
        response = (await interviewService.update(interviewId, {
            interviewAt: moment(data.interviewAt).utc().fmFullTimeString(),
            note: values.note?.trim(),
        })) as IBodyResponse;

        if (!response.success) {
            showErrorNotificationFunction(response.message);
            loading.close();
            return;
        }

        const getCandidateResponse = await recruitmentModule.getCandidate(
            selectedCandidate.id,
        );
        if (!getCandidateResponse.success) {
            showErrorNotificationFunction(getCandidateResponse.message);
            loading.close();
            return;
        }

        showSuccessNotificationFunction(
            t('recruitment.candidate.interviews.notification.updateSuccess') as string,
        );
        loading.close();
        recruitmentModule.setIsShowScheduleFormPopup(false);
    });

    return {
        errors,
        validate,
        onSubmit,
        resetForm,
        openPopup,
        interviewAt,
        note,
        progress,
        order,
    };
}
