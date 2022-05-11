<template>
    <div>
        <BaseListPageHeader
            :isShowSearchBox="isShowSearchBox"
            :pageTitle="$t('team.list.pageName')"
            :createButtonText="$t('team.list.filterForm.createTeam')"
            :isShowCreateButton="isCanCreate"
            :hasFilterForm="false"
            :pageLimit="pageLimit"
            v-model:page="selectedPage"
            v-model:keyword="name"
            @create="goToCreatePage"
            @onPaginate="handlePaginate"
            @toggle-search-box="toggleSearchBox"
            @search="handleFilter"
            :hasSortBox="true"
            :totalItems="totalTeams"
        >
            <template #sort-box-content>
                <Sort />
            </template>
        </BaseListPageHeader>
        <BaseEmptyBox
            v-if="totalTeams === 0 && !loading"
            styleContainer="style-empty"
            :message="$t('team.list.filterForm.emptyMessage')"
        />
        <TeamGrid v-else-if="!loading && totalTeams > 0" />
    </div>
</template>

<script lang="ts">
import { mixins } from 'vue-property-decorator';
import Sort from '../components/Sort.vue';
import TeamGrid from '../components/TeamGrid.vue';
import { Options } from 'vue-class-component';
import { ElLoading } from 'element-plus';
import { teamModule } from '../store';
import router from '@/router';
import { DEFAULT_FIRST_PAGE, PageName } from '@/common/constants';
import { USERS_SIZE_PER_PAGE } from '@/modules/user/constants';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { TeamMixins } from '../mixins';

@Options({
    components: { Sort, TeamGrid },
})
export default class TeamListPage extends mixins(TeamMixins) {
    loading = false;
    isShowSearchBox = true;
    name = '';

    goToCreatePage(): void {
        router.push({
            name: PageName.CREATE_TEAM_PAGE,
        });
    }

    toggleSearchBox(): void {
        this.isShowSearchBox = !this.isShowSearchBox;
    }

    // check permission
    get isCanCreate(): boolean {
        return checkUserHasPermission(teamModule.userPermissions, [
            `${PermissionResources.TEAM}_${PermissionActions.CREATE}`,
        ]);
    }

    get totalTeams(): number {
        return teamModule.totalTeams;
    }

    get selectedPage(): number {
        return teamModule.teamQueryString?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        teamModule.teamQueryString.page = value;
    }

    created(): void {
        teamModule.clearQueryString();
        this.getTeams();
    }

    async getTeams(): Promise<void> {
        this.loading = true;
        const loading = ElLoading.service({
            target: '.content',
        });
        const response = await teamModule.getTeams();
        loading.close();

        if (!response?.success) {
            this.showErrorNotification(response.message as string);
        }

        loading.close();
        this.loading = false;
    }

    async handleFilter(): Promise<void> {
        teamModule.setTeamQueryString({
            name: this.name.trim(),
            limit: USERS_SIZE_PER_PAGE,
            page: DEFAULT_FIRST_PAGE,
        });
        this.getTeams();
    }

    async handlePaginate(): Promise<void> {
        teamModule.setTeamQueryString({ page: this.selectedPage });
        this.getTeams();
    }
}
</script>
<style lang="scss" scoped>
.style-empty {
    margin: 150px;
}
.empty-ctn {
    height: 50vh;
}
</style>
