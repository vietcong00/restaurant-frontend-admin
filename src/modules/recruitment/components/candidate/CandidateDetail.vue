<template>
    <div class="card mb-0 p-0">
        <div
            style="width: 100%; padding: 12px 18px"
            class="text-end"
            v-if="isCanUpdateCandidate"
        >
            <el-button type="primary" @click="onClickEditCandidate">{{
                $t('common.app.action.edit')
            }}</el-button>
        </div>
        <div class="card-body h-230">
            <div class="d-flex justify-content-around">
                <div class="p1">
                    <img class="avatar" alt="" :src="avatarUrl()" />
                    <h3 class="mt-3 mb-2">
                        {{ candidate.fullName }}
                    </h3>
                    <div>
                        {{ getNamePosition(candidate?.appliedPosition) }}
                    </div>
                    <div>
                        <span v-if="candidate.level">
                            {{
                                $t(`recruitment.list.filterForm.level.${candidate.level}`)
                            }}
                        </span>
                    </div>
                </div>
                <div class="p2">
                    <div class="d-flex mb-3">
                        <div class="title col-5 fw-bold">
                            {{ $t('recruitment.candidate.detail.email') }}:
                        </div>
                        <div class="text col-7 mh-22">
                            {{ candidate.email }}
                        </div>
                    </div>
                    <div class="d-flex mb-3">
                        <div class="title col-5 fw-bold">
                            {{ $t('recruitment.candidate.detail.phoneNumber') }}:
                        </div>
                        <div class="text col-7 mh-22">
                            {{ candidate.phoneNumber }}
                        </div>
                    </div>
                    <div class="d-flex mb-3">
                        <div class="title col-5 fw-bold">
                            {{ $t('recruitment.candidate.detail.birthday') }}:
                        </div>
                        <div class="text col-7 mh-22">
                            {{ formatBirthdayDate(candidate.birthday) }}
                        </div>
                    </div>
                    <div class="d-flex mb-3" style="align-items: center">
                        <div class="title col-5 fw-bold">
                            {{ $t('recruitment.candidate.info.status') }}:
                        </div>
                        <div
                            :class="`text mh-22 col-7 candidate-status candidate-${candidate.status?.toLowerCase()}`"
                        >
                            <span v-if="candidate.status">
                                {{
                                    $t(
                                        `recruitment.list.filterForm.status.${candidate.status}`,
                                    )
                                }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="p3">
                    <div class="row mb-3">
                        <div class="title col-5 fw-bold">
                            {{ $t('recruitment.candidate.detail.gender.label') }}:
                        </div>
                        <div class="text col-7 mh-22">
                            <span v-if="candidate.gender">
                                {{
                                    $t(
                                        `recruitment.candidate.detail.gender.${candidate.gender}`,
                                    )
                                }}
                            </span>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="title col-5 fw-bold">
                            {{ $t('recruitment.candidate.info.referredSource.label') }}:
                        </div>
                        <div class="text mh-22 col-7">
                            <span v-if="candidate.resource">
                                {{
                                    $t(
                                        `recruitment.list.filterForm.source.${candidate.resource}`,
                                    )
                                }}
                            </span>
                        </div>
                    </div>
                    <div class="w-100 mb-3 link-cv row">
                        <div class="title col-5 fw-bold">
                            {{ $t('recruitment.candidate.info.linkCV') }}:
                        </div>
                        <div class="col-7 mh-22" style="padding-left: 20px">
                            <a
                                v-if="candidate.cvFile?.url"
                                class="click-here"
                                target="_blank"
                                rel="noopener noreferrer"
                                :href="candidate.cvFile?.url"
                            >
                                <u> {{ $t('recruitment.list.table.content.linkCV') }} </u>
                            </a>
                        </div>
                    </div>
                    <div class="row mb-3 note">
                        <div class="title col-5 fw-bold">
                            {{ $t('recruitment.candidate.info.note') }}:
                        </div>
                        <div class="text mh-22 col-7">
                            <p>{{ candidate.note }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <CandidateFormPopup v-if="isCanUpdateCandidate" />
    </div>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-class-component';
import { recruitmentModule } from '../../store';
import { ICandidateDetail } from '../../types';
import CandidateFormPopup from '../popup/CandidateFormPopup.vue';
import { checkUserHasPermission } from '@/utils/helper';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
import moment from 'moment';
import { RecruitmentMixins } from '../../mixins';

@Options({
    components: {
        CandidateFormPopup,
    },
})
export default class CandidateDetail extends mixins(RecruitmentMixins) {
    get candidate(): ICandidateDetail {
        return recruitmentModule.candidate;
    }

    get isCanUpdateCandidate(): boolean {
        return checkUserHasPermission(recruitmentModule.userPermissions, [
            `${PermissionResources.RECRUITMENT}_${PermissionActions.UPDATE}`,
        ]);
    }

    avatarUrl(): string {
        return (
            recruitmentModule.candidate?.avatar?.url ||
            require('@/assets/icons/avatar-default.png')
        );
    }

    onClickEditCandidate(): void {
        recruitmentModule.setIsShowCandidateFormPopup(true);
    }

    formatBirthdayDate(birthday: string): string {
        return birthday ? moment(birthday).fmDayString() : '';
    }
}
</script>

<style scoped lang="scss">
.mh-22 {
    min-height: 22px;
}
.h-230 {
    height: 230px;
}
.card-body {
    padding: 16px 4px;
    height: fit-content;
}
.link-cv {
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: center;
}

.card {
    border-radius: 15px;
}

.avatar {
    width: 130px;
    height: 130px;
    border-radius: 50%;
}

.note p {
    overflow: auto;
    max-height: 70px;
}

.p1 {
    width: 20%;
    text-align: center;
}
.p2 {
    width: 38%;
}
.p3 {
    width: 38%;
}

.candidate-status {
    border-radius: 10px;
    text-align: start;
    padding: 5px 0 5px 0;
    font-size: 14px;
}
</style>
