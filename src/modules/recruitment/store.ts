import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import {
    OrderDirection,
    DEFAULT_FIRST_PAGE,
    DEFAULT_SIZE_PER_PAGE,
} from '@/common/constants';
import {
    RecruitmentOrderBy,
    CandidateStatus,
    activeVersion,
    EMAIL_TEMPLATE_TYPE,
} from './constants';
import {
    ICandidate,
    ICandidateDetail,
    ICandidateFilterForm,
    IQueryStringCandidate,
    IEmailTemplate,
} from './types';
import store from '@/store';
import { recruitmentService } from './service/api.service';
import { IBodyResponse, IGetListResponse } from '@/common/types';
import { appService } from '@/utils/app';
import { PermissionResources } from '../role/constants';
import { IAppliedPosition } from '../setting/type';

export const initCandidate: ICandidateDetail = {
    id: NaN,
    fullName: '',
    email: '',
    phoneNumber: '',
    cvFile: {
        fileName: '',
        id: 0,
        url: '',
    },
    appliedPosition: null,
    level: null,
    status: null,
    resource: null,
    gender: '',
    birthday: null,
    candidateInterviews: [],
    candidateEmails: [],
    candidateInterviewHistories: [],
    note: null,
    avatar: {
        fileName: '',
        id: 0,
        url: '',
    },
};

export const initQueryString: IQueryStringCandidate = {
    page: DEFAULT_FIRST_PAGE,
    limit: DEFAULT_SIZE_PER_PAGE,
    orderBy: RecruitmentOrderBy.CreatedAt,
    orderDirection: OrderDirection.DESC,
    keyword: '',
    statuses: [],
    positions: [],
    referredSources: [],
    genders: [],
    interviewAt: [],
    interviewOrders: [],
};

export const initEmailTemplate: IEmailTemplate = {
    id: '',
    templateId: '',
    active: activeVersion.active,
    name: '',
    htmlContent: '',
    plainContent: '',
    generatePlainContent: true,
    subject: '',
    updatedAt: '',
    editor: '',
    thumbnailUrl: '',
    sender: '',
    templateType: EMAIL_TEMPLATE_TYPE.INTERVIEW_FAIL_LETTER,
};

@Module({
    name: 'recruitment',
    dynamic: true,
    namespaced: true,
    store,
})
class RecruitmentModule extends VuexModule {
    candidates: ICandidate[] = [];
    totalCandidates = 0;
    queryString = initQueryString;

    candidate: ICandidateDetail = initCandidate;
    isShowPagination = false;
    selectedScheduleId = NaN;
    isShowScheduleFormPopup = false;
    isShowCandidateFormPopup = false;
    isShowSendEmailFormPopup = false;
    selectedEmailTemplate = initEmailTemplate;
    isDisabledSaveButton = false;
    selectedCandidateStatus: CandidateStatus | null = null;
    isShowCandidateStatusPopUp = false;
    appliedPositionList: IAppliedPosition[] = [];

    // GETTERS
    get userPermissions(): string[] {
        return appService.getUserPermissionsByResource(PermissionResources.RECRUITMENT);
    }

    // ACTIONS
    @Action
    async getCandidates() {
        const response = (await recruitmentService.getList({
            ...this.queryString,
            page:
                (this.queryString.page || DEFAULT_FIRST_PAGE) > -1
                    ? this.queryString.page
                    : DEFAULT_FIRST_PAGE,
            limit: this.queryString.limit,
        })) as IBodyResponse<IGetListResponse<ICandidate>>;
        if (response.success) {
            if (response?.data?.totalItems && response.data.totalItems > 0) {
                this.SET_IS_SHOW_PAGINATION(true);
            }
            this.MUTATE_CANDIDATES(response.data.items);
            this.MUTATE_TOTAL_CANDIDATES(response.data.totalItems);
        } else {
            this.MUTATE_CANDIDATES([]);
            this.MUTATE_TOTAL_CANDIDATES(0);
        }
        return response;
    }

    @Action
    async getCandidate(id: number): Promise<IBodyResponse<ICandidate>> {
        const response = (await recruitmentService.getDetail(
            id,
        )) as IBodyResponse<ICandidateDetail>;
        if (response?.success) {
            this.MUTATE_CANDIDATE(response.data);
        }
        return response;
    }

    @Action
    async deleteCandidate(id: number) {
        const response = await recruitmentService.delete(id);
        return response;
    }

    @Action
    async setAppliedPositionList(appliedPositionList: IAppliedPosition[]) {
        this.MUTATE_APPLIED_POSITION_LIST(appliedPositionList);
    }

    @Action
    setQueryString(query: IQueryStringCandidate) {
        this.MUTATE_QUERY_STRING(query);
    }

    @Action
    setFilterForm(filter: ICandidateFilterForm) {
        this.MUTATE_FILTER_FORM(filter);
    }

    @Action
    setIsDisableFormButton(isDisabledSaveButton: boolean) {
        this.MUTATE_IS_DISABLED_BUTTON(isDisabledSaveButton);
    }

    @Action
    SET_IS_SHOW_PAGINATION(isShowPagination: boolean) {
        this.MUTATE_IS_SHOW_PAGINATION(isShowPagination);
    }

    @Action
    clearFilter() {
        this.MUTATE_FILTER_FORM({ ...initQueryString });
    }

    @Action
    setSelectedScheduleId(id: number) {
        this.MUTATE_SELECTED_SCHEDULE_ID(id);
    }

    @Action
    setIsShowScheduleFormPopup(isShow: boolean) {
        this.MUTATE_IS_SHOW_SCHEDULE_FORM_POPUP(isShow);
    }

    @Action
    setIsShowCandidateFormPopup(isShow: boolean) {
        this.MUTATE_IS_SHOW_CANDIDATE_FORM_POPUP(isShow);
    }

    @Action
    setCandidate(candidate: ICandidate) {
        this.MUTATE_CANDIDATE(candidate);
    }

    @Action
    setIsShowSendEmailFormPopup(isShow: boolean) {
        this.MUTATE_IS_SHOW_SEND_EMAIL_FORM_POPUP(isShow);
    }

    @Action
    setSelectedEmailTemplate(template: IEmailTemplate) {
        this.MUTATE_SELECTED_EMAIL_TEMPLATE(template);
    }

    @Action
    setSelectedCandidateStatus(status: CandidateStatus | null) {
        this.MUTATE_SELECTED_CANDIDATE_STATUS(status);
    }

    @Action
    setIsShowCandidateStatusPopUp(isShow: boolean) {
        this.MUTATE_IS_SHOW_CANDIDATE_STATUS_POP_UP(isShow);
    }

    // MUTATIONS
    @Mutation
    MUTATE_IS_SHOW_PAGINATION(value: boolean) {
        this.isShowPagination = value;
    }

    @Mutation
    MUTATE_IS_DISABLED_BUTTON(value: boolean) {
        this.isDisabledSaveButton = value;
    }

    @Mutation
    MUTATE_CANDIDATES(candidates: ICandidate[]) {
        this.candidates = candidates;
    }

    @Mutation
    MUTATE_TOTAL_CANDIDATES(total: number) {
        this.totalCandidates = total;
    }

    @Mutation
    MUTATE_CANDIDATE(candidate: ICandidateDetail) {
        this.candidate = candidate || initCandidate;
    }

    @Mutation
    MUTATE_QUERY_STRING(query: IQueryStringCandidate) {
        this.queryString = {
            ...this.queryString,
            ...query,
        };
    }

    @Mutation
    MUTATE_FILTER_FORM(filter: ICandidateFilterForm) {
        this.queryString.keyword = filter.keyword || null;
        this.queryString.statuses = filter.statuses || null;
        this.queryString.positions = filter.positions || null;
        this.queryString.referredSources = filter.referredSources || null;
        this.queryString.genders = filter.genders || null;
        this.queryString.interviewOrders = filter.interviewOrders || null;
        this.queryString.interviewAt = filter.interviewAt || null;
    }

    @Mutation
    MUTATE_CLEAR_QUERY_STRING() {
        this.queryString = {
            page: DEFAULT_FIRST_PAGE,
            limit: DEFAULT_SIZE_PER_PAGE,
            orderBy: RecruitmentOrderBy.CreatedAt,
            orderDirection: OrderDirection.DESC,
        };
    }

    @Mutation
    MUTATE_SELECTED_SCHEDULE_ID(id: number) {
        this.selectedScheduleId = id;
    }

    @Mutation
    MUTATE_IS_SHOW_SCHEDULE_FORM_POPUP(isShow: boolean) {
        this.isShowScheduleFormPopup = isShow;
    }

    @Mutation
    MUTATE_IS_SHOW_CANDIDATE_FORM_POPUP(isShow: boolean) {
        this.isShowCandidateFormPopup = isShow;
    }

    @Mutation
    MUTATE_IS_SHOW_SEND_EMAIL_FORM_POPUP(isShow: boolean) {
        this.isShowSendEmailFormPopup = isShow;
    }

    @Mutation
    MUTATE_SELECTED_EMAIL_TEMPLATE(template: IEmailTemplate) {
        this.selectedEmailTemplate = template;
    }

    @Mutation
    MUTATE_SELECTED_CANDIDATE_STATUS(status: CandidateStatus | null) {
        this.selectedCandidateStatus = status;
    }

    @Mutation
    MUTATE_IS_SHOW_CANDIDATE_STATUS_POP_UP(isShow: boolean) {
        this.isShowCandidateStatusPopUp = isShow;
    }

    @Mutation
    MUTATE_APPLIED_POSITION_LIST(appliedPositionList: IAppliedPosition[]) {
        this.appliedPositionList = appliedPositionList;
    }
}
export const recruitmentModule = getModule(RecruitmentModule);
