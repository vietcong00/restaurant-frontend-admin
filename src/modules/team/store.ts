import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators';
import { DEFAULT_FIRST_PAGE } from '@/common/constants';
import { ITeam, IQueryStringTeam, ITableOptions } from './types';
import { teamService } from './services/team-api.services';
import store from '@/store';
import { IQueryStringUser, IUser } from '../user/types';
import { userApiService } from '../user/services/api.service';
import { USERS_SIZE_PER_PAGE } from '../user/constants';
import { parseTableMembers } from './helper';
import { appService } from '@/utils/app';
import { PermissionResources } from '../role/constants';
import uniqBy from 'lodash/uniqBy';
import { IBodyResponse, IGetListResponse } from '@/common/types';

export const initQueryString = {
    page: DEFAULT_FIRST_PAGE,
    limit: USERS_SIZE_PER_PAGE,
};
@Module({ dynamic: true, namespaced: true, store, name: 'team' })
class TeamModule extends VuexModule {
    teams: ITeam[] = [];
    members: IUser[] = [];
    selectedTeam: ITeam | null = null;
    selectedTeamMembers: ITableOptions[] = [];
    showMembers: ITableOptions[] = [];

    totalTeams = 0;
    totalMembers = 0;
    teamQueryString: IQueryStringTeam = initQueryString;

    isDisabledSaveButton = false;

    memberQueryString: IQueryStringUser = initQueryString;

    isShowPagination = false;

    // GETTERS
    get userPermissions(): string[] {
        return appService.getUserPermissionsByResource(PermissionResources.TEAM);
    }

    // ACTION
    @Action
    async getTeams(): Promise<IBodyResponse<IGetListResponse<ITeam>>> {
        const response = (await teamService.getList({
            ...this.teamQueryString,
        })) as IBodyResponse<IGetListResponse<ITeam>>;
        if (response.success) {
            const teams: ITeam[] = response?.data?.items || [];
            teams.forEach((e) => {
                e.name = e.name[0].toUpperCase() + e.name.slice(1);
                if (e.totalMembers === undefined) {
                    e.totalMembers = 0;
                }
            });
            this.MUTATE_TEAMS(teams);
            this.MUTATE_TOTAL_TEAMS(response?.data?.totalItems || 0);
        } else {
            this.MUTATE_TEAMS([]);
            this.MUTATE_TOTAL_TEAMS(0);
        }
        return response;
    }

    @Action
    async getMembers(): Promise<IBodyResponse<IGetListResponse<IUser>>> {
        const response = (await userApiService.getList({
            ...this.memberQueryString,
        })) as IBodyResponse<IGetListResponse<IUser>>;
        if (response.success) {
            this.MUTATE_MEMBER_LIST(response?.data?.items || []);
            this.MUTATE_TOTAL_MEMBERS(response?.data?.totalItems || 0);
        } else {
            this.MUTATE_MEMBER_LIST([]);
            this.MUTATE_TOTAL_MEMBERS(0);
        }
        return response;
    }

    @Action
    async loadMoreData() {
        await this.getMembers();
        const temp = this.showMembers.concat(parseTableMembers(this.members));
        this.MUTATE_SHOW_MEMBERS(uniqBy(temp, 'userId'));
        this.setMemberQueryString({
            ...this.memberQueryString,
            page: this.memberQueryString.page ? this.memberQueryString.page + 1 : 0,
        });
    }

    @Action
    clearQueryString() {
        this.MUTATE_TEAM_QUERY_STRING(initQueryString);
    }

    @Action
    setTeamQueryString(query: IQueryStringTeam) {
        this.MUTATE_TEAM_QUERY_STRING(query);
    }

    @Action
    setIsDisabledSaveButton(value: boolean) {
        this.MUTATE_IS_DISABLED_SAVE_BUTTON(value);
    }

    @Action
    deleteASelectedTeamMember(member: ITableOptions) {
        const index = this.selectedTeamMembers.findIndex(
            (mem: { userId: number | undefined }) => mem.userId === member.userId,
        );
        this.selectedTeamMembers.splice(index, 1);
    }

    @Action
    addASelectedTeamMember(member: ITableOptions) {
        const index = this.selectedTeamMembers.findIndex(
            (mem: { userId: number | undefined }) => mem.userId === member.userId,
        );
        if (index === -1) {
            this.selectedTeamMembers.push(member);
        } else {
            this.selectedTeamMembers[index] = member;
        }
    }

    @Action
    setSelectedTeam(team: ITeam | null) {
        this.MUTATE_SELECTED_TEAM(team);
    }

    @Action
    setShowMembers(members: ITableOptions[]) {
        this.MUTATE_SHOW_MEMBERS(members);
    }

    @Action
    setSelectedTeamMembers(members: ITableOptions[]) {
        this.MUTATE_SELECTED_TEAM_MEMBERS(members);
    }

    @Action
    setMemberQueryString(query: IQueryStringUser) {
        this.MUTATE_MEMBER_QUERY_STRING(query);
    }

    // MUTATIONS
    @Mutation
    MUTATE_IS_DISABLED_SAVE_BUTTON(value: boolean) {
        this.isDisabledSaveButton = value;
    }

    @Mutation
    MUTATE_MEMBER_LIST(members: IUser[]) {
        this.members = members;
    }

    @Mutation
    MUTATE_TOTAL_MEMBERS(totalMembers: number) {
        this.totalMembers = totalMembers;
    }

    @Mutation
    MUTATE_SELECTED_TEAM_MEMBERS(members: ITableOptions[]) {
        this.selectedTeamMembers = members;
    }

    @Mutation
    MUTATE_SHOW_MEMBERS(members: ITableOptions[]) {
        this.showMembers = members;
    }

    @Mutation
    MUTATE_TEAMS(teams: ITeam[]) {
        this.teams = teams;
    }

    @Mutation
    MUTATE_TOTAL_TEAMS(totalTeams: number) {
        this.totalTeams = totalTeams;
    }

    @Mutation
    MUTATE_TEAM_QUERY_STRING(query: IQueryStringTeam) {
        this.teamQueryString = {
            ...this.teamQueryString,
            ...query,
        };
    }

    @Mutation
    MUTATE_SELECTED_TEAM(team: ITeam | null) {
        this.selectedTeam = team;
    }

    @Mutation
    MUTATE_MEMBER_QUERY_STRING(query: IQueryStringUser) {
        this.memberQueryString = query;
    }
}

export const teamModule = getModule(TeamModule);
