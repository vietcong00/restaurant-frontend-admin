import { IFile, IQueryString } from '@/common/types';
import {
    CandidateLevel,
    CandidateStatus,
    CandidateResource,
    CandidateGender,
    activeVersion,
    CandidateInterviewProgress,
    EMAIL_TEMPLATE_TYPE,
} from './constants';

export interface ICandidateInterview {
    id: number;
    order: number;
    progress: CandidateInterviewProgress;
    interviewAt: Date | string;
    note: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | string | null;
    createdBy?: number | null;
    candidateId?: number | null;
}

export interface ICandidateEmail {
    id: number;
    template: string;
    note: string | null;
    dateTime: Date | null | string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    createdBy?: number | null;
}

export interface ICandidateInterviewHistories {
    id: number;
    note: string | null;
    status: CandidateStatus;
    createdAt?: Date | null;
}

export interface ICandidate {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    birthday: Date | null;
    cvFile: IFile;
    gender: CandidateGender | string;
    appliedPosition: string | null;
    level: CandidateLevel | null;
    status: CandidateStatus | null;
    resource: CandidateResource | null;
    note: string | null;
    candidateInterviews?: ICandidateInterview[];
    candidateEmails?: ICandidateEmail[];
    candidateInterviewHistories?: ICandidateInterviewHistories[];
    avatar: IFile;
}

export interface ICandidateDetail extends ICandidate {
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    createdBy?: number | null;
    updatedBy?: number | null;
}

export interface ICandidateFilterForm {
    keyword?: string | null;
    statuses?: CandidateStatus[] | null;
    positions?: string[] | null;
    referredSources?: CandidateResource[] | null;
    genders?: CandidateGender[] | null;
    interviewOrders?: number[] | null;
    interviewAt?: Date[] | string[] | null;
}

export interface IQueryStringCandidate extends IQueryString, ICandidateFilterForm {}

export interface IUpdateCandidateEmail {
    note: string | undefined;
}

interface IDynamicTemplateData {
    subject: string;
    fullName?: string;
    startWorkingDate?: string;
    expiredReplyDate?: string;
    appliedPosition?: string;
    interviewAt?: string;
    attachment?: string;
    attachmentName?: string;
    file?: string;
}

export interface ISendGridEmailTemplateBody {
    to: string;
    from: string;
    templateType: string;
    dynamicTemplateData: IDynamicTemplateData;
    candidateId: number;
    templateName: string;
    note: string;
}

export interface IEmailTemplate {
    id: string;
    templateId: string;
    active: activeVersion;
    name: string;
    htmlContent: string;
    plainContent: string;
    generatePlainContent: boolean;
    subject: string;
    updatedAt: Date | string;
    editor: string;
    thumbnailUrl: string;
    nextStatus?: CandidateStatus;
    beforeStatus?: CandidateStatus[];
    sender: string;
    templateType: EMAIL_TEMPLATE_TYPE;
}
