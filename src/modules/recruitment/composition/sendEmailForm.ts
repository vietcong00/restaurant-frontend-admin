import { recruitmentService } from '../service/api.service';
import { useField, useForm } from 'vee-validate';
import { validateSendEmailSchema } from '../constants';
import { recruitmentModule } from '../store';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { useI18n } from 'vue-i18n';
import moment from 'moment-timezone';
import { SchemaOf } from 'yup';
import { IAppliedPosition } from '@/modules/setting/type';
import { HttpStatus, SupportLanguage } from '@/common/constants';

const initTemplateEmail = {
    to: '',
    from: '',
    note: '',
    templateId: '',
    templateType: '',
    subject: '',
    fullName: '',
    startWorkingDate: undefined,
    expiredReplyDate: null,
    appliedPosition: undefined,
    interviewAt: undefined,
    attachment: '',
    attachmentName: '',
};

export function initForm() {
    const { t } = useI18n();
    const { errors, validate, resetForm, handleSubmit } = useForm({
        validationSchema: validateSendEmailSchema as unknown as SchemaOf<
            Record<string, any>
        >,
        initialValues: {
            ...initTemplateEmail,
        },
    });

    const { value: to } = useField('to');
    const { value: from } = useField('from');
    const { value: note } = useField('note');
    const { value: templateId } = useField('templateId');
    const { value: templateType } = useField('templateType');
    const { value: subject } = useField('subject');
    const { value: fullName } = useField('fullName');
    const { value: startWorkingDate } = useField('startWorkingDate');
    const { value: expiredReplyDate } = useField('expiredReplyDate');
    const { value: appliedPosition } = useField('appliedPosition');
    const { value: interviewAt } = useField('interviewAt');
    const { value: attachment } = useField('attachment');
    const { value: attachmentName } = useField('attachmentName');

    const onSubmit = handleSubmit(async (values) => {
        const position = (
            recruitmentModule.appliedPositionList.find(
                (position) =>
                    position.code === recruitmentModule.candidate.appliedPosition,
            ) as IAppliedPosition
        ).value?.[SupportLanguage.VI];
        const loading = ElLoading.service({
            target: '.send-email-form-popup',
        });
        const response = await recruitmentService.sendEmail({
            candidateId: recruitmentModule.candidate.id,
            templateName: recruitmentModule.selectedEmailTemplate.name,
            note: values.note,
            to: values.to || '',
            from: values.from || '',
            templateType: values.templateType || '',
            dynamicTemplateData: {
                subject: values.subject || '',
                fullName: values.fullName,
                startWorkingDate: values.startWorkingDate
                    ? moment(values.startWorkingDate).utc().fmFullTimeString()
                    : '',
                expiredReplyDate: values.expiredReplyDate
                    ? moment(values.expiredReplyDate).utc().fmFullTimeString()
                    : '',
                appliedPosition: position,
                interviewAt: values.interviewAt
                    ? moment(values.interviewAt).utc().fmFullTimeString()
                    : '',
                attachment: values.attachment,
                attachmentName: values.attachmentName,
            },
        });
        if (!response.success) {
            showErrorNotificationFunction(response.message);
            if (response.code === HttpStatus.ITEM_IS_INVALID) {
                await recruitmentModule.getCandidate(recruitmentModule.candidate.id);
                recruitmentModule.setIsShowSendEmailFormPopup(false);
            }
            loading.close();
            return;
        }
        showSuccessNotificationFunction(
            t('recruitment.candidate.candidateEmail.notification.sendOk'),
        );

        await recruitmentModule.getCandidate(recruitmentModule.candidate.id);
        loading.close();
        recruitmentModule.setIsShowSendEmailFormPopup(false);
    });

    return {
        errors,
        validate,
        onSubmit,
        resetForm,
        to,
        from,
        note,
        templateId,
        subject,
        fullName,
        startWorkingDate,
        expiredReplyDate,
        appliedPosition,
        interviewAt,
        attachment,
        attachmentName,
        templateType,
    };
}
