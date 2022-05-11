import { recruitmentService } from '../service/api.service';
import { useField, useForm } from 'vee-validate';
import { ICandidate } from '../types';
import { CandidateSchema } from '../constants';
import { recruitmentModule } from '../store';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { IBodyResponse } from '@/common/types';
import { DEFAULT_FIRST_PAGE } from '@/common/constants';
import moment from 'moment-timezone';

const initCandidate = {
    fullName: '',
    email: '',
    phoneNumber: '',
    birthday: null,
    cvFileId: undefined,
    gender: '',
    appliedPosition: null,
    level: null,
    resource: undefined,
    avatarId: null,
    note: null,
};

export function initForm() {
    const { t } = useI18n();
    const { errors, validate, handleSubmit, resetForm } = useForm({
        validationSchema: CandidateSchema,
        initialValues: { ...initCandidate },
    });
    const isCreate = computed(() => !recruitmentModule.candidate.id);

    const { value: avatarId } = useField('avatarId');
    const { value: email } = useField('email');
    const { value: fullName } = useField('fullName');
    const { value: phoneNumber } = useField('phoneNumber');
    const { value: birthday } = useField('birthday');
    const { value: cvFileId } = useField('cvFileId');
    const { value: gender } = useField('gender');
    const { value: appliedPosition } = useField('appliedPosition');
    const { value: level } = useField('level');
    const { value: resource } = useField('resource');
    const { value: note } = useField('note');

    const openPopup = async (): Promise<void> => {
        if (!isCreate.value) {
            const loading = ElLoading.service({
                target: '.candidate-form-popup',
            });
            const response = await recruitmentModule.getCandidate(
                recruitmentModule.candidate.id,
            );
            loading.close();

            if (!response.success) {
                showErrorNotificationFunction(response?.message);
                return;
            }

            resetForm({
                values: {
                    avatarId: response.data?.avatar?.id,
                    email: response.data?.email,
                    fullName: response.data?.fullName,
                    phoneNumber: response.data?.phoneNumber,
                    birthday: response.data?.birthday
                        ? moment(response.data?.birthday).fmDayString()
                        : null,
                    cvFileId: response.data?.cvFile?.id,
                    gender: response.data?.gender,
                    appliedPosition: response.data?.appliedPosition,
                    level: response.data?.level,
                    resource: response.data?.resource,
                    note: response.data?.note,
                },
            });
        } else {
            resetForm({ values: initCandidate });
        }
    };

    const onSubmit = handleSubmit(async (values) => {
        let response = {} as IBodyResponse<ICandidate>;
        const data = {
            ...values,
            birthday: values.birthday
                ? moment(values.birthday).utc().fmFullTimeString()
                : null,
        };
        const selectedCandidate = recruitmentModule.candidate;
        const loading = ElLoading.service({
            target: '.candidate-form-popup',
        });
        if (!isCreate.value) {
            response = (await recruitmentService.update(selectedCandidate.id, {
                ...data,
            })) as unknown as IBodyResponse<ICandidate>;
        } else {
            response = (await recruitmentService.create({
                ...data,
            })) as unknown as IBodyResponse<ICandidate>;
        }
        if (!response.success) {
            loading.close();
            showErrorNotificationFunction(response.message);
            return;
        }
        if (!isCreate.value) {
            await recruitmentModule.getCandidate(recruitmentModule.candidate.id);
            showSuccessNotificationFunction(
                t('recruitment.candidate.detail.dialog.updateSuccess'),
            );
        } else {
            recruitmentModule.setQueryString({
                page: DEFAULT_FIRST_PAGE,
            });
            await recruitmentModule.getCandidates();
            showSuccessNotificationFunction(
                t('recruitment.candidate.create.notification.messageSuccess'),
            );
        }
        loading.close();
        recruitmentModule.setIsShowCandidateFormPopup(false);
    });

    return {
        errors,
        validate,
        resetForm,
        openPopup,
        onSubmit,
        email,
        fullName,
        phoneNumber,
        birthday,
        cvFileId,
        gender,
        appliedPosition,
        level,
        resource,
        avatarId,
        note,
    };
}
