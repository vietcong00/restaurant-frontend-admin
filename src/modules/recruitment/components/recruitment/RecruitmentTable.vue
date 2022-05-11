<template>
    <BaseTableLayout :data="candidates">
        <template #table-columns>
            <el-table-column
                fixed
                prop="fullName"
                :label="$t('recruitment.list.table.header.fullName')"
                width="220"
            >
                <template #default="scope">
                    <div class="col-fullName">
                        <img
                            :src="getFileUrl(scope.row.avatar)"
                            height="30"
                            width="30"
                            style="border-radius: 50%"
                            class="me-1"
                        />
                        <router-link :to="`/recruitment/${scope.row.id}`">
                            <p>{{ scope.row.fullName }}</p>
                        </router-link>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('recruitment.list.table.header.cv')" width="180">
                <template #default="scope">
                    <div v-if="scope.row?.cvFile?.url">
                        <a
                            class="click-here"
                            target="_blank"
                            rel="noopener noreferrer"
                            :href="scope.row?.cvFile?.url"
                            ><u>{{ $t('recruitment.list.table.content.linkCV') }}</u></a
                        >
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="email"
                :label="$t('recruitment.list.table.header.email')"
                min-width="250"
            />
            <el-table-column
                prop="phoneNumber"
                width="150"
                :label="$t('recruitment.list.table.header.phone')"
            ></el-table-column>
            <el-table-column
                prop="status"
                :label="$t('recruitment.list.table.header.status')"
                width="320"
                align="center"
            >
                <template #default="scope">
                    <el-dropdown
                        v-if="isCanUpdateStatus(scope.row.status)"
                        @command="(command) => onChangeStatus(command, scope.row.id)"
                    >
                        <div
                            :class="`candidate-status candidate-status-dropdown candidate-${getStatusColor(
                                scope.row.status,
                            )}`"
                        >
                            <span v-if="scope.row.status">
                                {{
                                    $t(
                                        `recruitment.list.filterForm.status.${scope.row.status}`,
                                    )
                                }}
                            </span>
                            <span class="icon-direction"></span>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item
                                    v-for="(
                                        status, index
                                    ) in CANDIDATE_STATUS_CHANGING_FLOW[scope.row.status]"
                                    :key="index"
                                    :command="status"
                                    >{{
                                        $t(`recruitment.list.filterForm.status.${status}`)
                                    }}</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <div
                        :class="`candidate-status candidate-${getStatusColor(
                            scope.row.status,
                        )}`"
                        v-else
                        style="line-height: 1"
                    >
                        <span v-if="scope.row.status">
                            {{
                                $t(
                                    `recruitment.list.filterForm.status.${scope.row.status}`,
                                )
                            }}
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                width="200"
                :label="$t('recruitment.list.table.header.appliedPosition')"
            >
                <template #default="scope">
                    {{ getNamePosition(scope.row.appliedPosition) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="level"
                width="200"
                :label="$t('recruitment.list.table.header.level')"
            >
                <template #default="scope">
                    <span v-if="scope.row.level">
                        {{ $t(`recruitment.list.filterForm.level.${scope.row.level}`) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                width="200"
                prop="resource"
                :label="$t('recruitment.list.table.header.resource')"
            >
                <template #default="scope">
                    <span v-if="scope.row.resource">
                        {{
                            $t(`recruitment.list.filterForm.source.${scope.row.resource}`)
                        }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                width="200"
                prop="note"
                :label="$t('recruitment.list.table.header.note')"
            >
                <template #default="scope">
                    <span class="note-text">{{ scope.row.note }}</span>
                </template>
            </el-table-column>
            <el-table-column
                width="250"
                :label="$t('recruitment.list.table.header.firstInterview')"
            >
                <template #default="scope">
                    <span>{{
                        getInterviewTime(
                            scope.row.id,
                            CANDIDATE_INTERVIEW_ORDER.FirstInterview,
                        )
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column
                width="250"
                :label="$t('recruitment.list.table.header.secondInterview')"
            >
                <template #default="scope">
                    <span>{{
                        getInterviewTime(
                            scope.row.id,
                            CANDIDATE_INTERVIEW_ORDER.SecondInterview,
                        )
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                :width="150"
                :label="$t('recruitment.list.table.header.actions')"
                align="center"
            >
                <template #default="scope">
                    <div
                        class="button-group"
                        :class="checkFullPermissionActions() ? 'group-left' : ''"
                    >
                        <el-tooltip
                            effect="dark"
                            :content="
                                $t('recruitment.list.table.tooltip.updateCandidate')
                            "
                            placement="top"
                        >
                            <el-button
                                @click="onClickUpdateCandidate(scope.row.id)"
                                type="warning"
                                size="mini"
                            >
                                <EditIcon class="action-icon" />
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            v-if="isCandidateCanDelete(scope.row.status)"
                            effect="dark"
                            :content="
                                $t('recruitment.list.table.tooltip.deleteCandidate')
                            "
                            placement="top"
                        >
                            <el-button
                                @click="deleteCandidate(scope.row.id)"
                                type="danger"
                                size="mini"
                            >
                                <DeleteIcon class="action-icon" />
                            </el-button>
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
        </template>
    </BaseTableLayout>
</template>

<script lang="ts">
import {
    checkUserHasPermission,
    showConfirmPopUpFunction,
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { Options } from 'vue-class-component';
import { mixins } from 'vue-property-decorator';
import { CandidateStatus } from '../../constants';
import { recruitmentModule, initCandidate } from '../../store';
import { ICandidate } from '../../types';
import { IFile } from '@/common/types';
import { ElLoading } from 'element-plus';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
import { RecruitmentMixins } from '../../mixins';
import { DEFAULT_FIRST_PAGE } from '@/common/constants';

@Options({
    components: {
        DeleteIcon,
        EditIcon,
    },
})
export default class RecruitmentTable extends mixins(RecruitmentMixins) {
    visible = false;
    getFileUrl(file: IFile): string {
        return file?.url || require('@/assets/icons/avatar-default.png');
    }

    get candidates(): ICandidate[] {
        return recruitmentModule.candidates;
    }

    isCanUpdateStatus(status: CandidateStatus): boolean {
        return (
            this.CANDIDATE_STATUS_CHANGING_FLOW[status]?.length > 0 &&
            checkUserHasPermission(recruitmentModule.userPermissions, [
                `${PermissionResources.RECRUITMENT}_${PermissionActions.UPDATE}`,
            ])
        );
    }

    isCandidateCanDelete(status: CandidateStatus): boolean {
        return (
            status === CandidateStatus.CV_REVIEWING &&
            checkUserHasPermission(recruitmentModule.userPermissions, [
                `${PermissionResources.RECRUITMENT}_${PermissionActions.DELETE}`,
            ])
        );
    }

    getInterviewTime(candidateId: number, order: number): string {
        const interviews = recruitmentModule.candidates.find(
            (candidate) => candidate.id === candidateId,
        )?.candidateInterviews;
        if (interviews) {
            const interview = interviews.find((it) => it.order === order);
            if (interview) {
                return this.parseDateTimeTime(interview.interviewAt as string);
            }
            return '';
        }
        return '';
    }

    async deleteCandidate(id: number): Promise<void> {
        const result = await showConfirmPopUpFunction(
            this.$t('recruitment.list.deleteCandidate.confirmPopup.message'),
            this.$t('recruitment.list.deleteCandidate.confirmPopup.title'),
            {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
        );

        if (result) {
            const loading = ElLoading.service({
                target: '.content',
            });
            const response = await recruitmentModule.deleteCandidate(id);
            if (!response.success) {
                showErrorNotificationFunction(response.message as string);
                return;
            }
            showSuccessNotificationFunction(
                this.$t(
                    'recruitment.list.deleteCandidate.notification.messageSuccess',
                ) as string,
            );
            recruitmentModule.setQueryString({
                page: DEFAULT_FIRST_PAGE,
            });
            await recruitmentModule.getCandidates();
            loading.close();
        }
    }

    onClickUpdateCandidate(id: number): void {
        this.$router.push(`/recruitment/${id}`);
    }

    async onChangeStatus(status: CandidateStatus, id: number): Promise<void> {
        recruitmentModule.setCandidate(
            recruitmentModule.candidates.find((cd) => cd.id === id) || initCandidate,
        );
        recruitmentModule.setSelectedCandidateStatus(status);
        recruitmentModule.setIsShowCandidateStatusPopUp(true);
    }

    checkFullPermissionActions(): boolean {
        return checkUserHasPermission(recruitmentModule.userPermissions, [
            `${PermissionResources.RECRUITMENT}_${PermissionActions.DELETE}`,
        ]);
    }
}
</script>

<style lang="scss" scoped>
.el-dropdown-menu {
    padding: 0 !important;
}
:deep(.el-icon-sort) {
    transform: rotate(90deg);
}

.active {
    color: rgb(0, 60, 255) !important;
}

.candidate-status {
    border-radius: 10px;
    text-align: center;
    padding: 5px 0 5px 0;
    font-size: 14px;
    font-weight: 700;
    width: 275px;
    color: #fff;
    span:first-child {
        margin-right: 15px;
    }
}

.candidate-status-dropdown {
    margin-right: 27px;
}

.col-fullName {
    display: flex;
    p {
        word-wrap: break-word;
        margin: auto;
    }
    align-items: center;
}
.button-group {
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
}
.group-left {
    justify-content: space-between;
}
.note-text {
    overflow: hidden;
}

.action-icon {
    height: 1em;
    width: 1em;
}
.icon-direction {
    right: 40px;
    width: 7px;
    height: 7px;
    border: 1px solid;
    border-bottom: 1px solid black;
    position: relative;
    position: absolute;
    top: calc(50%);
    transform: translateY(-6px) rotate(135deg);
    border-bottom: hidden;
    border-left: hidden;
    transition: transform 0.5s;
    position: absolute;
    color: #fff;
}

:deep(.el-dropdown__popper) {
    width: 220px !important;
}

.candidate-yellow {
    background-color: #fccf0a;
}

.candidate-green {
    background-color: rgb(25, 135, 84);
}

.candidate-light-orange {
    background-color: #f89a4d;
}

.candidate-dark-orange {
    background-color: #f87509;
}

.candidate-greyish {
    background-color: #aca1a1;
}

.candidate-grey {
    background-color: #81888f;
}

.candidate-dark-gray {
    background-color: #5a6168;
}
</style>

function RecruitmentMixins(RecruitmentMixins: any) { throw new Error('Function not
implemented.'); } function RecruitmentMixins(RecruitmentMixins: any) { throw new
Error('Function not implemented.'); } function RecruitmentMixins(RecruitmentMixins: any) {
throw new Error('Function not implemented.'); }
