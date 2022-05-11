import {
    REGEX,
    INPUT_TEXT_MAX_LENGTH,
    TEXTAREA_MAX_LENGTH,
    INPUT_NUMBER_MAX_VALUE,
    DATE_TIME_FORMAT,
} from '@/common/constants';
import yup from '@/plugins/yup/index';
import isNull from 'lodash/isNull';
import moment from 'moment-timezone';

export enum RecruitmentOrderBy {
    CreatedAt = 'createdAt',
    FullName = 'fullName',
    Status = 'status',
}

export enum CandidateStatus {
    CV_REVIEWING = 'cv_reviewing',
    CV_APPROVED = 'cv_approved',
    WAITING_REPLY_FIRST_INTERVIEW = 'waiting_reply_first_interview',
    FIRST_INTERVIEW = 'first_interview',
    WAITING_REPLY_SECOND_INTERVIEW = 'waiting_reply_second_interview',
    SECOND_INTERVIEW = 'second_interview',
    ELECTED = 'elected',
    WAITING_REPLY_OFFER = 'waiting_reply_offer',
    CANDIDATE_AGREE = 'candidate_agree',
    ONBOARD = 'onboard',
    NOT_ONBOARD = 'not_onboard',
    CANDIDATE_REJECT = 'candidate_reject',
    CV_REJECTED = 'cv_rejected',
    INTERVIEW_FAIL = 'interview_fail',
    CANDIDATE_CANCEL = 'candidate_cancel',
}

export const CANDIDATE_INTERVIEW_ORDER = {
    FirstInterview: 1,
    SecondInterview: 2,
};

export enum CandidateLevel {
    INTERNSHIP = 'internship',
    FRESHER = 'fresher',
    MIDDLE = 'middle',
    JUNIOR = 'junior',
    SENIOR = 'senior',
    LEADER = 'leader',
    EXPERT = 'expert',
}

export enum CandidateResource {
    HumanResources = 'humanResources',
    InternalIntroduction = 'internalIntroduction',
    HeadHunter = 'headHunter',
}

export enum CandidateInterviewProgress {
    Waiting = 'waiting',
    Done = 'done',
    Cancel = 'cancel',
}

export enum CandidateGender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

export enum activeVersion {
    active = 1,
    inactive = 0,
}

export enum editorTemplate {
    Code = 'code',
    Design = 'design',
}

export enum EMAIL_TEMPLATE_TYPE {
    INVITE_INTERVIEW_LETTER = 'INVITE_INTERVIEW_LETTER',
    INTERVIEW_FAIL_LETTER = 'INTERVIEW_FAIL_LETTER',
    REJECT_CV_LETTER = 'REJECT_CV_LETTER',
    OFFER_LETTER_FOR_NONE_INTERNSHIP = 'OFFER_LETTER_FOR_NONE_INTERNSHIP',
    OFFER_LETTER_FOR_INTERNSHIP = 'OFFER_LETTER_FOR_INTERNSHIP',
}

export const LevelOptions = [
    {
        label: 'recruitment.list.filterForm.level.internship',
        value: CandidateLevel.INTERNSHIP,
    },
    {
        label: 'recruitment.list.filterForm.level.fresher',
        value: CandidateLevel.FRESHER,
    },
    {
        label: 'recruitment.list.filterForm.level.middle',
        value: CandidateLevel.MIDDLE,
    },
    {
        label: 'recruitment.list.filterForm.level.junior',
        value: CandidateLevel.JUNIOR,
    },
    {
        label: 'recruitment.list.filterForm.level.senior',
        value: CandidateLevel.SENIOR,
    },
    {
        label: 'recruitment.list.filterForm.level.leader',
        value: CandidateLevel.LEADER,
    },
    {
        label: 'recruitment.list.filterForm.level.expert',
        value: CandidateLevel.EXPERT,
    },
];

export const StatusOptions = [
    {
        label: 'recruitment.list.filterForm.status.cv_reviewing',
        value: CandidateStatus.CV_REVIEWING,
    },
    {
        label: 'recruitment.list.filterForm.status.cv_approved',
        value: CandidateStatus.CV_APPROVED,
    },
    {
        label: 'recruitment.list.filterForm.status.waiting_reply_first_interview',
        value: CandidateStatus.WAITING_REPLY_FIRST_INTERVIEW,
    },
    {
        label: 'recruitment.list.filterForm.status.first_interview',
        value: CandidateStatus.FIRST_INTERVIEW,
    },
    {
        label: 'recruitment.list.filterForm.status.waiting_reply_second_interview',
        value: CandidateStatus.WAITING_REPLY_SECOND_INTERVIEW,
    },
    {
        label: 'recruitment.list.filterForm.status.second_interview',
        value: CandidateStatus.SECOND_INTERVIEW,
    },
    {
        label: 'recruitment.list.filterForm.status.elected',
        value: CandidateStatus.ELECTED,
    },
    {
        label: 'recruitment.list.filterForm.status.waiting_reply_offer',
        value: CandidateStatus.WAITING_REPLY_OFFER,
    },
    {
        label: 'recruitment.list.filterForm.status.candidate_agree',
        value: CandidateStatus.CANDIDATE_AGREE,
    },
    {
        label: 'recruitment.list.filterForm.status.onboard',
        value: CandidateStatus.ONBOARD,
    },
    {
        label: 'recruitment.list.filterForm.status.not_onboard',
        value: CandidateStatus.NOT_ONBOARD,
    },
    {
        label: 'recruitment.list.filterForm.status.candidate_reject',
        value: CandidateStatus.CANDIDATE_REJECT,
    },
    {
        label: 'recruitment.list.filterForm.status.cv_rejected',
        value: CandidateStatus.CV_REJECTED,
    },
    {
        label: 'recruitment.list.filterForm.status.interview_fail',
        value: CandidateStatus.INTERVIEW_FAIL,
    },
    {
        label: 'recruitment.list.filterForm.status.candidate_cancel',
        value: CandidateStatus.CANDIDATE_CANCEL,
    },
];

export const ResourceOptions = [
    {
        label: 'recruitment.list.filterForm.source.humanResources',
        value: CandidateResource.HumanResources,
    },
    {
        label: 'recruitment.list.filterForm.source.internalIntroduction',
        value: CandidateResource.InternalIntroduction,
    },
    {
        label: 'recruitment.list.filterForm.source.headHunter',
        value: CandidateResource.HeadHunter,
    },
];

export const GenderOptions = [
    {
        label: 'recruitment.list.filterForm.gender.male',
        value: CandidateGender.MALE,
    },
    {
        label: 'recruitment.list.filterForm.gender.female',
        value: CandidateGender.FEMALE,
    },
    {
        label: 'recruitment.list.filterForm.gender.other',
        value: CandidateGender.OTHER,
    },
];

export const SortOptions = [
    {
        label: 'recruitment.list.filterForm.sort.createdAt',
        value: RecruitmentOrderBy.CreatedAt,
    },
    {
        label: 'recruitment.list.filterForm.sort.fullName',
        value: RecruitmentOrderBy.FullName,
    },
    {
        label: 'recruitment.list.filterForm.sort.status',
        value: RecruitmentOrderBy.Status,
    },
];

export const ProgressOptions = [
    {
        label: 'recruitment.candidate.interviews.progress.waiting',
        value: CandidateInterviewProgress.Waiting,
    },
    {
        label: 'recruitment.candidate.interviews.progress.done',
        value: CandidateInterviewProgress.Done,
    },
    {
        label: 'recruitment.candidate.interviews.progress.cancel',
        value: CandidateInterviewProgress.Cancel,
    },
];

// to validate candidate's form
export const CandidateSchema = yup.object({
    email: yup
        .string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .matches(REGEX.EMAIL, 'recruitment.candidate.create.fields.email.invalid')
        .required()
        .label('email'),
    fullName: yup.string().trim().max(INPUT_TEXT_MAX_LENGTH).required().label('fullName'),
    phoneNumber: yup
        .string()
        .matches(
            REGEX.PHONE_NUMBER,
            'recruitment.candidate.create.fields.phoneNumber.invalid',
        )
        .trim()
        .required()
        .label('phoneNumber'),
    birthday: yup
        .string()
        .matches(REGEX.YYYY_MM_DD_HYPHEN)
        .nullable()
        .optional()
        .label('birthday'),
    cvFileId: yup.number().required().max(INPUT_NUMBER_MAX_VALUE).label('cv'),
    gender: yup
        .string()
        .oneOf([...Object.values(CandidateGender)])
        .required()
        .label('gender'),
    appliedPosition: yup
        .string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .nullable()
        .required()
        .trim()
        .label('appliedPosition'),
    level: yup
        .string()
        .oneOf([...Object.values(CandidateLevel)])
        .nullable()
        .optional()
        .transform((val) => (isNull(val) ? CandidateLevel.INTERNSHIP : val)),
    resource: yup
        .string()
        .oneOf([...Object.values(CandidateResource)])
        .nullable()
        .required()
        .label('resource'),
    note: yup.string().nullable().optional().max(INPUT_TEXT_MAX_LENGTH).label('note'),
    avatarId: yup.number().positive().max(INPUT_NUMBER_MAX_VALUE).optional().nullable(),
});

export const validateInterviewSchema = yup.object({
    note: yup.string().max(TEXTAREA_MAX_LENGTH).trim().optional(),
    interviewAt: yup
        .string()
        .matches(REGEX.YYYY_MM_DD_HYPHEN_HH_MM_COLON)
        .nullable()
        .required(),
    progress: yup.string().oneOf(Object.values(CandidateInterviewProgress)),
    order: yup.number().positive().nullable(),
});

export const validateSendEmailSchema = yup.lazy((template) => {
    return templateAttributeConfig[
        (template.templateType ||
            EMAIL_TEMPLATE_TYPE.INVITE_INTERVIEW_LETTER) as EMAIL_TEMPLATE_TYPE
    ].validationSchema;
});

export const updateCandidateStatusSchema = yup.object({
    status: yup.string().oneOf([...Object.values(CandidateStatus)]),
    note: yup.string().max(TEXTAREA_MAX_LENGTH).optional(),
});

export const CANDIDATE_STATUS_CHANGING_FLOW = {
    [CandidateStatus.CV_REVIEWING]: [CandidateStatus.CV_APPROVED],
    [CandidateStatus.CV_APPROVED]: [CandidateStatus.CANDIDATE_REJECT],
    [CandidateStatus.WAITING_REPLY_FIRST_INTERVIEW]: [
        CandidateStatus.FIRST_INTERVIEW,
        CandidateStatus.CANDIDATE_REJECT,
    ],
    [CandidateStatus.FIRST_INTERVIEW]: [
        CandidateStatus.ELECTED,
        CandidateStatus.CANDIDATE_CANCEL,
    ],
    [CandidateStatus.WAITING_REPLY_SECOND_INTERVIEW]: [
        CandidateStatus.SECOND_INTERVIEW,
        CandidateStatus.CANDIDATE_REJECT,
    ],
    [CandidateStatus.SECOND_INTERVIEW]: [
        CandidateStatus.ELECTED,
        CandidateStatus.CANDIDATE_CANCEL,
    ],
    [CandidateStatus.ELECTED]: [],
    [CandidateStatus.WAITING_REPLY_OFFER]: [
        CandidateStatus.CANDIDATE_AGREE,
        CandidateStatus.CANDIDATE_REJECT,
    ],
    [CandidateStatus.CANDIDATE_AGREE]: [
        CandidateStatus.ONBOARD,
        CandidateStatus.NOT_ONBOARD,
    ],
    [CandidateStatus.CANDIDATE_REJECT]: [],
    [CandidateStatus.CV_REJECTED]: [],
    [CandidateStatus.INTERVIEW_FAIL]: [],
    [CandidateStatus.ONBOARD]: [],
    [CandidateStatus.NOT_ONBOARD]: [],
    [CandidateStatus.CANDIDATE_CANCEL]: [],
};

export const templateAttributeConfig = {
    [EMAIL_TEMPLATE_TYPE.OFFER_LETTER_FOR_NONE_INTERNSHIP]: {
        attribute: ['fullName', 'file'],
        validationSchema: yup.object({
            to: yup.string().email().required(),
            from: yup.string().email().required(),
            note: yup.string().max(INPUT_TEXT_MAX_LENGTH).nullable().trim(),
            templateId: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .required()
                .label('template'),
            subject: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .trim()
                .required()
                .label('subject'),
            fullName: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .required()
                .label('fullName'),
            // result attachedFile (base64)
            attachment: yup.string().required().label('attachment'),
            attachmentName: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .label('attachmentName'),
        }),
    },
    [EMAIL_TEMPLATE_TYPE.REJECT_CV_LETTER]: {
        attribute: ['fullName', 'appliedPosition'],
        validationSchema: yup.object({
            to: yup.string().email().required(),
            from: yup.string().email().required(),
            note: yup.string().max(INPUT_TEXT_MAX_LENGTH).trim().nullable(),
            templateId: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .required()
                .label('template'),
            subject: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .trim()
                .required()
                .label('subject'),
            fullName: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .required()
                .label('fullName'),
            appliedPosition: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .required()
                .trim()
                .label('expiredReplyDate'),
        }),
    },
    [EMAIL_TEMPLATE_TYPE.INTERVIEW_FAIL_LETTER]: {
        attribute: ['fullName'],
        validationSchema: yup.object({
            to: yup.string().email().required(),
            from: yup.string().email().required(),
            note: yup.string().max(INPUT_TEXT_MAX_LENGTH).nullable(),
            templateId: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .required()
                .label('template'),
            subject: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .trim()
                .required()
                .label('subject'),
            fullName: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .required()
                .label('fullName'),
        }),
    },
    [EMAIL_TEMPLATE_TYPE.OFFER_LETTER_FOR_INTERNSHIP]: {
        attribute: [
            'fullName',
            'appliedPosition',
            'startWorkingDate',
            'expiredReplyDate',
        ],
        validationSchema: yup.object({
            to: yup.string().email().required(),
            from: yup.string().email().required(),
            note: yup.string().max(INPUT_TEXT_MAX_LENGTH).nullable(),
            templateId: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .required()
                .label('template'),
            subject: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .trim()
                .required()
                .label('subject'),
            fullName: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .required()
                .label('fullName'),
            appliedPosition: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .required()
                .trim()
                .label('expiredReplyDate'),
            startWorkingDate: yup
                .date()
                .nullable()
                .required()
                .when('expiredReplyDate', {
                    is: null,
                    then: yup
                        .date()
                        .nullable()
                        .min(
                            new Date(),
                            'recruitment.candidate.sendEmailDialog.error.minStartWorkingDateWithoutExpiredReplyDate',
                        ),
                    otherwise: yup
                        .date()
                        .nullable()
                        .min(
                            yup.ref('expiredReplyDate'),
                            'recruitment.candidate.sendEmailDialog.error.minStartWorkingDateWithExpiredReplyDate',
                        )
                        .test({
                            name: 'same',
                            exclusive: false,
                            params: {},
                            message:
                                'recruitment.candidate.sendEmailDialog.error.minStartWorkingDateWithExpiredReplyDate',

                            test: function (value) {
                                const expiredReplyDate = moment(
                                    this.parent.expiredReplyDate,
                                ).format(DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_COLON);
                                const startWorkingDate = moment(value).format(
                                    DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_COLON,
                                );
                                return !moment(expiredReplyDate).isSame(
                                    moment(startWorkingDate),
                                );
                            },
                        }),
                }),
            expiredReplyDate: yup
                .date()
                .nullable()
                .required()
                .min(
                    new Date(),
                    'recruitment.candidate.sendEmailDialog.error.minExpiredReplyDate',
                ),
        }),
    },
    [EMAIL_TEMPLATE_TYPE.INVITE_INTERVIEW_LETTER]: {
        attribute: ['fullName', 'appliedPosition', 'interviewAt', 'expiredReplyDate'],
        validationSchema: yup.object({
            to: yup.string().email().required(),
            from: yup.string().email().required(),
            note: yup.string().max(INPUT_TEXT_MAX_LENGTH).nullable(),
            templateId: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .required()
                .label('template'),
            subject: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .trim()
                .required()
                .label('subject'),
            fullName: yup
                .string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .required()
                .label('fullName'),
            appliedPosition: yup.string().max(INPUT_TEXT_MAX_LENGTH).required().trim(),
            interviewAt: yup
                .date()
                .nullable()
                .when('expiredReplyDate', {
                    is: null,
                    then: yup
                        .date()
                        .nullable()
                        .min(
                            new Date(),
                            'recruitment.candidate.sendEmailDialog.error.minInterviewAtWithoutExpiredReplyDate',
                        ),
                    otherwise: yup
                        .date()
                        .nullable()
                        .min(
                            yup.ref('expiredReplyDate'),
                            'recruitment.candidate.sendEmailDialog.error.minInterviewAtWithExpiredReplyDate',
                        )
                        .test({
                            name: 'same',
                            exclusive: false,
                            params: {},
                            message:
                                'recruitment.candidate.sendEmailDialog.error.minInterviewAtWithExpiredReplyDate',
                            test: function (value) {
                                const expiredReplyDate = moment(
                                    this.parent.expiredReplyDate,
                                ).format(DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_COLON);
                                const interviewAt = moment(value).format(
                                    DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_COLON,
                                );
                                return !moment(expiredReplyDate).isSame(
                                    moment(interviewAt),
                                );
                            },
                        }),
                })

                .required()
                .label('interviewAt'),
            expiredReplyDate: yup
                .date()
                .nullable()
                .required()
                .min(
                    new Date(),
                    'recruitment.candidate.sendEmailDialog.error.minExpiredReplyDate',
                ),
        }),
    },
};

export const DEFAULT_SENDGRID_SENDER_EMAIL = 'hr@tokyotechlab.com';

export const EMAIL_TEMPLATE_ATTRIBUTE = {
    fullName: {
        type: 'input_text',
        label: 'recruitment.candidate.sendEmailDialog.attributes.fullName.label',
        placeholder:
            'recruitment.candidate.sendEmailDialog.attributes.fullName.placeholder',
        validation: {
            isRequired: true,
            isDisabled: true,
        },
    },
    appliedPosition: {
        type: 'input_text',
        label: 'recruitment.candidate.sendEmailDialog.attributes.appliedPosition.label',
        placeholder:
            'recruitment.candidate.sendEmailDialog.attributes.appliedPosition.placeholder',
        validation: {
            isRequired: true,
            isDisabled: true,
        },
    },
    startWorkingDate: {
        type: 'date',
        label: 'recruitment.candidate.sendEmailDialog.attributes.startWorkingDate.label',
        placeholder:
            'recruitment.candidate.sendEmailDialog.attributes.startWorkingDate.placeholder',
        validation: {
            isRequired: true,
            dateFormat: DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_COLON,
        },
    },
    interviewAt: {
        type: 'date',
        label: 'recruitment.candidate.sendEmailDialog.attributes.interviewAt.label',
        placeholder:
            'recruitment.candidate.sendEmailDialog.attributes.interviewAt.placeholder',
        validation: {
            isRequired: true,
            dateFormat: DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_COLON,
        },
    },
    expiredReplyDate: {
        type: 'date',
        label: 'recruitment.candidate.sendEmailDialog.attributes.expiredReplyDate.label',
        placeholder:
            'recruitment.candidate.sendEmailDialog.attributes.expiredReplyDate.placeholder',
        validation: {
            isRequired: true,
            dateFormat: DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_COLON,
        },
    },
    file: {
        type: 'file',
        label: 'recruitment.candidate.sendEmailDialog.attributes.attachment.label',
        fileName: 'Offer letter',
        validation: {
            isRequired: true,
        },
    },
};

export enum EMAIL_TEMPLATE_ATTRIBUTE_TYPE {
    INPUT_TEXT = 'input_text',
    DATE = 'date',
    FILE = 'file',
}
