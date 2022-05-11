<template>
    <div>
        <BaseFormPageHeader
            :pageTitle="$t('team.form.createTitle')"
            @on-click-back-button="onClickBackButton"
            @on-reset="onReset"
            @on-submit="onSubmit()"
            :isDisabled="isDisabledSaveButton"
        />
        <div class="card mt-4">
            <div class="card-body">
                <div class="row">
                    <div class="row form-group d-flex team-name">
                        <BaseInputText
                            :label="$t('team.form.teamName')"
                            :isRequired="true"
                            :isHorizontal="true"
                            v-model:value="form.name"
                            name="teamName"
                            :placeholder="$t('team.list.placeholder.name')"
                            :error="translateYupError(form.errors.name)"
                        />
                    </div>
                    <div class="row form-group d-flex">
                        <BaseInputTextarea
                            v-model:value="form.description"
                            :label="$t('team.form.desc')"
                            :isHorizontal="true"
                            :placeholder="$t('team.list.placeholder.description')"
                            :error="translateYupError(form.errors.description)"
                            type="textarea"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="cp-right">
            <div class="search-box">
                <el-input
                    v-model="keyword"
                    :placeholder="$t('team.form.placeholder.search')"
                    @keyup.enter="onClickSearchButton"
                >
                    <template #suffix>
                        <el-icon class="el-input__icon" @click="onClickSearchButton">
                            <SearchIcon />
                        </el-icon>
                    </template>
                </el-input>
            </div>
        </div>
        <div class="table-data">
            <el-table
                :data="memberTable"
                ref="multipleTable"
                @selection-change="changeMember"
                max-height="412px"
                :cell-class-name="classTable"
                :header-cell-style="headerStyle"
            >
                <el-table-column width="100" fixed="left">
                    <template v-slot="scope">
                        <el-checkbox
                            v-model="scope.row.ticked"
                            :label="null"
                            @change="changeRoleMember(scope.row, scope.$index)"
                        ></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="user.fullName"
                    :label="$t('team.form.name')"
                    width="250px"
                />
                <el-table-column
                    prop="user.email"
                    :label="$t('team.form.email')"
                    min-width="250px"
                />
                <el-table-column
                    prop="userRole"
                    :label="$t('team.list.filterForm.position.label')"
                    align="center"
                    min-width="250px"
                >
                    <template #default="scope">
                        <div class="member-position position-relative">
                            <BaseSingleSelect
                                v-model:value="scope.row.userRole"
                                :options="positionsOptions"
                                :is-required="true"
                                :label="'team'"
                                :id="`row${scope.$index}`"
                                @change="changeRoleMember(scope.row, scope.$index)"
                                :placeholder="
                                    $t('team.list.filterForm.position.placeholder')
                                "
                            />
                            <div
                                v-if="scope.row.userRole === '' && scope.row.ticked"
                                class="invalid-feedback text-start error-message"
                            >
                                {{ $t('team.list.message.create.fail.mess') }}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="order"
                    :label="$t('team.form.order')"
                    width="150px"
                    align="center"
                    class-name="order"
                >
                    <template #default="scope">
                        <BaseInputNumber
                            v-model:value="scope.row.order"
                            :min="minOrder"
                            @change="validateOrder(scope.row)"
                            :placeholder="$t('team.list.placeholder.order')"
                        />
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, setup } from 'vue-class-component';
import { mixins } from 'vue-property-decorator';

import { initData } from '../composition/createTeam';
import { PageName, INPUT_NUMBER_MAX_VALUE, DEFAULT_FIRST_PAGE } from '@/common/constants';
import router from '@/router';
import { initQueryString, teamModule } from '../store';
import { ISelectOptions } from '@/common/types';
import { parseLanguageSelectOptions } from '@/utils/helper';
import { MIN_MEMBER_ORDER, RoleOptions, USERS_SIZE_TEAM } from '../constants';
import { ITableOptions } from '../types';
import { ElLoading } from 'element-plus';
import { Search as SearchIcon } from '@element-plus/icons-vue';
import { vietnameseStringInclude } from '@/utils/commonFunction';
import { orderBy } from 'lodash';
import { TeamMixins } from '../mixins';

@Options({
    components: {
        SearchIcon,
    },
})
export default class CreateTeamForm extends mixins(TeamMixins) {
    form = setup(() => initData());

    keyword = '';

    get headerStyle(): Record<string, string> {
        return { fontWeight: '600', backgroundColor: '#f5f5f5' };
    }

    get memberTable(): ITableOptions[] {
        return teamModule.showMembers;
    }

    get totalMembers(): number {
        return teamModule.totalMembers;
    }

    get positionsOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(RoleOptions);
    }

    get isDisabledSaveButton(): boolean {
        return teamModule.isDisabledSaveButton;
    }

    async created(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await teamModule.getMembers();
        loading.close();
        teamModule.setSelectedTeamMembers([]);
        teamModule.setMemberQueryString(initQueryString);
        teamModule.setShowMembers([]);
        this.loadMoreDataOnScroll();
        // Detect when scrolled to bottom.
        const listElm = document.querySelector('.el-scrollbar__wrap') as HTMLElement;
        listElm.addEventListener('scroll', () => {
            if (
                listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight &&
                this.memberTable.length < this.totalMembers
            ) {
                this.loadMoreDataOnScroll();
            }
        });
        teamModule.setIsDisabledSaveButton(false);
    }

    beforeUnmount(): void {
        const listElm = document.querySelector('.el-scrollbar__wrap') as HTMLElement;
        listElm.removeEventListener('scroll', () => {
            this.loadMoreDataOnScroll();
        });
    }

    onClickBackButton(): void {
        router.push({
            name: PageName.TEAM_PAGE,
        });
    }

    classTable({ column }: any): string {
        if (column.property === 'userRole') {
            return 'cell-member';
        }
        if (column.property === 'order') {
            return 'cell-order';
        }
        return '';
    }

    async onClickSearchButton(): Promise<void> {
        const memberList: ITableOptions[] = [];
        teamModule.selectedTeamMembers.forEach((ele) => {
            if (
                vietnameseStringInclude(ele.user.email, this.keyword) ||
                vietnameseStringInclude(ele.user.fullName, this.keyword)
            ) {
                memberList.push(ele);
            }
        });
        teamModule.setShowMembers(orderBy(memberList, ['ticked'], ['desc']));
        teamModule.setMemberQueryString({
            page: DEFAULT_FIRST_PAGE,
            limit: USERS_SIZE_TEAM,
            keyword: this.keyword,
        });
        this.loadMoreDataOnScroll();
    }

    changeMember(val: ITableOptions): void {
        if (val.ticked === false) {
            const index = this.form.usersInfo.findIndex(
                (mem: { userId: number | undefined }) => mem.userId === val.userId,
            );
            if (index > -1) {
                this.form.usersInfo.splice(index, 1);
                teamModule.deleteASelectedTeamMember(val);
            }
        } else {
            let change = 0;
            this.form.usersInfo.forEach((ele) => {
                if (ele.userId === val.userId) {
                    change = 1;
                    ele.userRole = val.userRole;
                    ele.order = val.order;
                    teamModule.addASelectedTeamMember(val);
                }
            });
            if (change === 0) {
                this.form.usersInfo.push({
                    userId: val.userId,
                    userRole: val.userRole,
                    order: val.order,
                });
                teamModule.addASelectedTeamMember(val);
            }
        }
    }

    changeRoleMember(val: ITableOptions, index: number): void {
        const cell = document.getElementById(`row${index}`) as HTMLElement;
        if (val.ticked === true && val.userRole === '') {
            cell.className = 'form-group d-flex flex-column warning-field';
        } else {
            cell.className = 'form-group d-flex flex-column';
        }
        this.changeMember(val);
    }

    validateOrder(data: ITableOptions): void {
        if (!data.order) {
            data.order = 0;
            this.changeMember(data);
        } else if (
            data.order >= MIN_MEMBER_ORDER &&
            data.order <= INPUT_NUMBER_MAX_VALUE
        ) {
            this.changeMember(data);
        }
    }

    async onReset(): Promise<void> {
        this.form.resetForm({
            values: {
                name: '',
                description: '',
                usersInfo: [],
            },
        });
        teamModule.setMemberQueryString(initQueryString);
        teamModule.setShowMembers([]);
        this.loadMoreDataOnScroll();
        const collection = document.querySelectorAll('.warning-field');
        collection.forEach((cell) => {
            cell.className = 'form-group d-flex flex-column';
        });
    }

    async loadMoreDataOnScroll(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await teamModule.loadMoreData();
        loading.close();
    }

    async onSubmit(): Promise<void> {
        teamModule.setIsDisabledSaveButton(true);
        await this.form.onSubmit();
        teamModule.setIsDisabledSaveButton(false);
    }
}
</script>

<style lang="scss" scoped>
:deep(.el-table) {
    word-break: keep-all !important;
    .cell {
        word-break: keep-all !important;
    }
}
:deep(.el-input__inner) {
    height: 36px;
}
:deep(.el-select-dropdown__item) {
    text-align: left !important;
}
:deep(.el-table__fixed) {
    bottom: 0px !important;
}
.table-data {
    border-top-color: #e0e0e0;
}
:deep(.el-table__body-wrapper) {
    /* width */
    &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: rgb(180, 179, 179);
        border-radius: 10px;
    }
    .el-table__body {
        width: 100% !important;
    }
}
.cp-right {
    padding: 20px 15px 0 0;
    display: flex;
    align-items: center;
    margin-left: auto;
    float: right;
}
.cp-search {
    display: flex;
}
.search-box {
    .el-input {
        width: 300px;
        transition: all 0.3s;
        text-align: center;
        &.is-focus {
            margin: 0;
            text-align: center;
        }
    }
    .el-input__inner {
        margin-left: 20px;
        border-color: #e0e0e0;
        color: #212121;
        height: 36px;
        padding: 0 8px;
        &:focus {
            border-color: #3c61e0;
        }
    }
}
.card {
    background: #eeeeee;
    border-radius: 8px;
    border: none;
}
:deep(.col-lg-3) {
    padding-top: 10px;
    text-align: right !important;
    @media (max-width: 992px) {
        text-align: left !important;
    }
}
:deep(.label-input) {
    word-break: break-word;
}
:deep(.el-input-number) {
    .el-input {
        padding-top: 5px;
    }
}
:deep(.warning-field) {
    .el-input__inner {
        border-color: rgb(255, 88, 88);
    }
}
.mark-required {
    color: red;
}
:deep(.form-group) {
    .text-start {
        padding-right: 50px;
    }
    .w-70 {
        max-width: 45vw !important;
    }
}
:deep(.order .el-input__inner) {
    margin-top: 15px;
    text-align: center !important;
}

.member-position {
    margin-top: 20px;
    position: relative;
    .error-message {
        position: absolute;
        top: 35px;
        left: 0px;
        display: initial !important;
        text-align: left;
    }
}

.team-name {
    height: 50px;
}
</style>
