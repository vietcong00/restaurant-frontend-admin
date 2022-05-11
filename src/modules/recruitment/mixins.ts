import { DATE_TIME_FORMAT, SupportLanguage } from '@/common/constants';
import { UtilMixins } from '@/mixins/utilMixins';
import { mixins } from 'vue-property-decorator';
import i18n from '@/plugins/vue-i18n';
import { appModule } from '@/store/app';
import moment from 'moment';
import {
    CANDIDATE_INTERVIEW_ORDER,
    CandidateStatus,
    CANDIDATE_STATUS_CHANGING_FLOW,
    EMAIL_TEMPLATE_ATTRIBUTE,
    EMAIL_TEMPLATE_ATTRIBUTE_TYPE,
} from './constants';
import { recruitmentModule } from './store';

export class RecruitmentMixins extends mixins(UtilMixins) {
    EMAIL_TEMPLATE_ATTRIBUTE_TYPE = EMAIL_TEMPLATE_ATTRIBUTE_TYPE;
    EMAIL_TEMPLATE_ATTRIBUTE = EMAIL_TEMPLATE_ATTRIBUTE;
    CANDIDATE_INTERVIEW_ORDER = CANDIDATE_INTERVIEW_ORDER;
    CANDIDATE_STATUS_CHANGING_FLOW = CANDIDATE_STATUS_CHANGING_FLOW;
    YYYY_MM_DD_HYPHEN_HH_MM_COLON = DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_COLON;

    getNamePosition(positionCode: string): string {
        const currentLanguage = appModule.selectedLanguage as SupportLanguage;
        const position = recruitmentModule.appliedPositionList.find(
            (position) => position.code === positionCode,
        );
        return position ? position.value?.[currentLanguage] : '';
    }

    parseDateTimeTime = (date: string): string => {
        if (!date) {
            return '';
        }
        return `${moment(date).fmHourMinuteString()} ${i18n.global.t(
            'recruitment.candidate.info.at',
        )} ${moment(date).fmDayString()}`;
    };

    getStatusColor(status: CandidateStatus): string {
        switch (status) {
            case CandidateStatus.CV_REVIEWING:
            case CandidateStatus.CV_APPROVED:
            case CandidateStatus.WAITING_REPLY_FIRST_INTERVIEW:
            case CandidateStatus.WAITING_REPLY_SECOND_INTERVIEW:
            case CandidateStatus.WAITING_REPLY_OFFER:
                return 'yellow';
            case CandidateStatus.ELECTED:
            case CandidateStatus.CANDIDATE_AGREE:
            case CandidateStatus.ONBOARD:
                return 'green';
            case CandidateStatus.FIRST_INTERVIEW:
                return 'light-orange';
            case CandidateStatus.SECOND_INTERVIEW:
                return 'dark-orange';
            case CandidateStatus.CANDIDATE_CANCEL:
                return 'greyish';
            case CandidateStatus.CV_REJECTED:
            case CandidateStatus.INTERVIEW_FAIL:
                return 'grey';
            case CandidateStatus.CANDIDATE_REJECT:
            case CandidateStatus.NOT_ONBOARD:
                return 'dark-gray';
            default:
                return '';
        }
    }
}
