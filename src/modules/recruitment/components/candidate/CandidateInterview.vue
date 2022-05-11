<template>
    <div class="card profile-box flex-fill">
        <div class="card-body">
            <div class="row">
                <h3 class="col-6 card-title cp-page-title">
                    {{ $t('recruitment.candidate.interviews.title') }}
                </h3>
            </div>
            <div class="mt-3">
                <BaseTableLayout :data="interviewHistory">
                    <template #table-columns>
                        <el-table-column
                            :label="$t('recruitment.candidate.interviews.table.date')"
                            width="240"
                        >
                            <template #default="scope">
                                {{ parseDateTimeTime(scope.row.interviewAt) }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('recruitment.candidate.interviews.table.order')"
                            width="200"
                        >
                            <template #default="scope">
                                {{
                                    scope.row.order
                                        ? $t(
                                              `recruitment.candidate.interviews.order.order${scope.row.order}`,
                                          )
                                        : ''
                                }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="progress"
                            :label="$t('recruitment.candidate.interviews.table.progress')"
                            align="center"
                            width="200"
                        >
                            <template #default="scope">
                                <el-dropdown
                                    v-if="canUpdateProgress(scope.row.progress)"
                                    @command="
                                        (command) =>
                                            onChangeProgress(command, scope.row.id)
                                    "
                                >
                                    <div
                                        :class="`badge badge-md candidate-status candidate-${scope.row.progress}`"
                                    >
                                        {{
                                            scope.row.progress
                                                ? $t(
                                                      `recruitment.candidate.interviews.progress.${scope.row.progress}`,
                                                  )
                                                : ''
                                        }}
                                    </div>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item
                                                :key="index"
                                                :command="cancelProgress.value"
                                                >{{
                                                    $t(cancelProgress?.label)
                                                }}</el-dropdown-item
                                            >
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                                <div
                                    v-else
                                    style="line-height: 1; width: fit-content"
                                    :class="`badge badge-md candidate-status candidate-${scope.row.progress}`"
                                >
                                    {{
                                        scope.row.progress
                                            ? $t(
                                                  `recruitment.candidate.interviews.progress.${scope.row.progress}`,
                                              )
                                            : ''
                                    }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('recruitment.candidate.interviews.table.note')"
                        >
                            <template #default="scope">
                                <div class="note-interview">
                                    {{ scope.row.note }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            v-if="isCanUpdateSchedule"
                            :label="$t('recruitment.candidate.interviews.table.action')"
                            filter-placement="bottom-end"
                            width="150"
                            align="center"
                        >
                            <template #default="scope">
                                <el-button
                                    v-if="isCanUpdateSchedule"
                                    @click="editInterview(scope.row.id)"
                                    type="primary"
                                    circle
                                    size="mini"
                                >
                                    <EditIcon class="action-icon" />
                                </el-button>
                            </template>
                        </el-table-column>
                    </template>
                </BaseTableLayout>
            </div>
        </div>
        <ScheduleFormPopup v-model:visible="isShowInterviewFormPopup" />
    </div>
</template>

<script lang="ts">
import { Options } from 'vue-class-component';
import { recruitmentModule } from '../../store';
import { recruitmentService } from '../../service/api.service';
import { ElLoading } from 'element-plus';
import { ICandidateInterview } from '../../types';
import { CandidateInterviewProgress, ProgressOptions } from '../../constants';
import { mixins } from 'vue-property-decorator';
import ScheduleFormPopup from '../popup/ScheduleFormPopup.vue';
import { Edit as EditIcon } from '@element-plus/icons-vue';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { RecruitmentMixins } from '../../mixins';

@Options({
    components: {
        ScheduleFormPopup,
        EditIcon,
    },
})
export default class CandidateInterview extends mixins(RecruitmentMixins) {
    isDisabledSaveButton = false;

    cancelProgress = ProgressOptions[2];

    get isShowInterviewFormPopup(): boolean {
        return recruitmentModule.isShowScheduleFormPopup;
    }

    set isShowInterviewFormPopup(isShow: boolean) {
        recruitmentModule.setIsShowScheduleFormPopup(isShow);
    }

    get interviewHistory(): ICandidateInterview[] {
        return recruitmentModule.candidate.candidateInterviews as ICandidateInterview[];
    }

    get isCanUpdateSchedule(): boolean {
        return checkUserHasPermission(recruitmentModule.userPermissions, [
            `${PermissionResources.RECRUITMENT}_${PermissionActions.HR_ROLE}`,
        ]);
    }

    canUpdateProgress(progress: CandidateInterviewProgress): boolean {
        return (
            progress === CandidateInterviewProgress.Waiting ||
            progress === CandidateInterviewProgress.Done
        );
    }

    editInterview(id: number): void {
        recruitmentModule.setSelectedScheduleId(id);
        this.isShowInterviewFormPopup = true;
    }

    async onChangeProgress(
        progress: CandidateInterviewProgress,
        id: number,
    ): Promise<void> {
        const requestData: Record<string, string | number | Date> = {
            progress,
        };
        let loading = ElLoading.service({
            target: '.content',
        });
        const response = await recruitmentService.updateInterview(id, requestData);
        loading.close();
        if (!response.success) {
            this.showErrorNotification(response.message);
        }
        loading = ElLoading.service({
            target: '.content',
        });
        await recruitmentModule.getCandidate(+this.$route.params.id);
        loading.close();
    }
}
</script>

<style scoped lang="scss">
.el-dropdown-menu {
    padding: 0 !important;
}
.mh-22 {
    min-height: 22px;
}

.hidden-overflow-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.el-form-item {
    margin-bottom: 0px;
}

.candidate-status {
    text-align: center;
    color: #fff;
    padding: 5px;
    width: 95px !important;
}
.badge {
    font-size: 100%;
    color: #fff;
}
.card {
    border-radius: 15px;
}

.candidate-waiting {
    background-color: $candidate-waiting;
}
.candidate-done {
    background-color: $candidate-done;
}
.candidate-cancel {
    background-color: $candidate-cancel;
}
.cp-page-title {
    font-size: 20px;
    color: #212121;
    font-weight: 400;
    margin: 0;
}
.action-icon {
    height: 1em;
    width: 1em;
}
.note-interview {
    max-height: 200px;
    overflow-y: scroll;
}
:deep(.note-interview) {
    textarea:not(:focus) {
        border: none;
        font-family: inherit;
        font-size: inherit;
        padding: none;
        background-color: inherit;
    }
}
</style>
