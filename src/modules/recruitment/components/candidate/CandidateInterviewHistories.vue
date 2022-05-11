<template>
    <el-scrollbar class="card profile-box flex-fill">
        <div class="card-body">
            <div class="row">
                <h3 class="col-6 card-title cp-page-title">
                    {{ $t('recruitment.candidate.history.title') }}
                </h3>
            </div>
            <div class="mt-3">
                <el-timeline>
                    <el-timeline-item
                        v-for="history in candidateInterviewHistories"
                        :key="history.id"
                        hide-timestamp="true"
                        placement="top"
                        :class="`candidate-status candidate-${getStatusColor(
                            history.status,
                        )}`"
                    >
                        <div
                            :class="`candidate-status candidate-${getStatusColor(
                                history.status,
                            )}`"
                        >
                            <h3>
                                {{
                                    history.status
                                        ? $t(
                                              `recruitment.candidate.history.status.${history.status}`,
                                          )
                                        : ''
                                }}
                            </h3>
                            <p class="time-interview">
                                {{ parseDateTimeTime(history.createdAt) }}
                            </p>
                            <p>{{ history.note }}</p>
                        </div>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
    </el-scrollbar>
</template>

<script lang="ts">
import { Options } from 'vue-class-component';
import { recruitmentModule } from '../../store';
import { mixins } from 'vue-property-decorator';
import { Edit as EditIcon } from '@element-plus/icons-vue';
import { ICandidateInterviewHistories } from '../../types';
import { RecruitmentMixins } from '../../mixins';
@Options({
    components: {
        EditIcon,
    },
})
export default class CandidateInterviewHistories extends mixins(RecruitmentMixins) {
    get candidateInterviewHistories(): ICandidateInterviewHistories[] {
        return recruitmentModule.candidate.candidateInterviewHistories || [];
    }
}
</script>

<style scoped lang="scss">
.profile-box {
    max-height: 500px;
}
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
    padding: 5px;
    border-radius: 10px;
    line-height: 1;
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
:deep(.note-interview) {
    textarea:not(:focus) {
        border: none;
        font-family: inherit;
        font-size: inherit;
        padding: none;
        background-color: inherit;
    }
}

.candidate-yellow {
    :deep(.el-timeline-item__node) {
        background-color: #fccf0a;
    }
}

.candidate-green {
    :deep(.el-timeline-item__node) {
        background-color: rgb(25, 135, 84);
    }
}

.candidate-light-orange {
    :deep(.el-timeline-item__node) {
        background-color: #f89a4d;
    }
}

.candidate-dark-orange {
    :deep(.el-timeline-item__node) {
        background-color: #f87509;
    }
}

.candidate-greyish {
    :deep(.el-timeline-item__node) {
        background-color: #aca1a1;
    }
}

.candidate-grey {
    :deep(.el-timeline-item__node) {
        background-color: #81888f;
    }
}

.candidate-dark-gray {
    :deep(.el-timeline-item__node) {
        background-color: #5a6168;
    }
}

.time-interview {
    color: #adb5bd;
}

:deep(.el-timeline-item__wrapper) {
    top: -13px;
}
</style>
