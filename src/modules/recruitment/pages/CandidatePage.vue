<template>
    <div class="text-start d-flex flex-column">
        <BaseFormPageHeader
            :pageTitle="$t('recruitment.candidate.title')"
            @on-click-back-button="onBack"
            :hasBtnSubmit="false"
            :hasBtnReset="false"
        />
        <div class="content-wrapper">
            <div class="row" style="margin: 0px">
                <CandidateDetail />
            </div>
            <div class="row candidate-data-table sending-email">
                <div class="col-md-12 d-flex" style="padding: 0px 0px">
                    <CandidateEmail />
                </div>
            </div>
            <div class="row candidate-data-table schedules">
                <div class="col-md-12 d-flex sending-email" style="padding: 0px 0px">
                    <CandidateInterview />
                </div>
            </div>

            <div class="histories">
                <div class="col-md-12 d-flex" style="padding: 0px 0px">
                    <CandidateInterviewHistories />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { UtilMixins } from '@/mixins/utilMixins';
import { ElLoading } from 'element-plus';
import { Options } from 'vue-class-component';
import CandidateDetail from '../components/candidate/CandidateDetail.vue';
import CandidateEmail from '../components/candidate/CandidateEmail.vue';
import CandidateInterview from '../components/candidate/CandidateInterview.vue';
import CandidateInterviewHistories from '../components/candidate/CandidateInterviewHistories.vue';
import { recruitmentModule } from '../store';
import { ICandidateDetail } from '../types';
import { mixins, Prop } from 'vue-property-decorator';
import { PageName } from '@/common/constants';
import { SettingKey } from '@/modules/setting/constant';
import { generalSettingApiService } from '@/modules/setting/services/settingService';

@Options({
    components: {
        CandidateDetail,
        CandidateEmail,
        CandidateInterview,
        CandidateInterviewHistories,
    },
})
export default class CandidatePage extends mixins(UtilMixins) {
    @Prop({ required: true, type: Number }) readonly id!: number;

    get backImagePath(): void {
        return require('@/assets/icons/btn.Back.svg');
    }

    get candidateStore(): ICandidateDetail {
        return recruitmentModule.candidate;
    }

    created(): void {
        this.getCandidate();
        this.getPositions();
    }

    async getCandidate(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        const response = await recruitmentModule.getCandidate(this.id);
        loading.close();
        if (!response.success) {
            this.showErrorNotification(response?.message);
        }
    }

    onBack(): void {
        this.$router.push({ name: PageName.CANDIDATE_LIST_PAGE });
    }

    async getPositions(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        const response = await generalSettingApiService.getGeneralSetting({
            key: SettingKey.APPLIED_POSITION,
        });
        loading.close();
        if (response?.success) {
            recruitmentModule.setAppliedPositionList(response?.data?.values || []);
        }
    }
}
</script>

<style scoped>
.mb-4 {
    padding: 18px 20px;
    background-color: white;
    margin-bottom: 0px !important;
    font-weight: 400;
    font-size: 25px;
}

.candidate-data-table {
    max-height: 400px;
    overflow-x: hidden;
    margin-top: 20px;
    margin-right: 0px;
    margin-left: 0px;
}

.histories {
    margin: 20px 0px 0px;
}

.footer {
    display: flex;
    justify-content: center;
    margin: 10px;
}

.content-wrapper {
    overflow: auto;
    padding: 0px 20px 20px 20px;
}
</style>
