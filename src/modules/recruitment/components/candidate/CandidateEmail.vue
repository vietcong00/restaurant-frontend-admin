<template>
    <div class="card profile-box flex-fill">
        <div class="card-body">
            <div class="row">
                <h3 class="col-6 card-title cp-page-title">
                    {{ $t('recruitment.candidate.candidateEmail.title') }}
                </h3>
                <div class="col-6 text-end">
                    <el-button type="primary" v-if="isCanSendEmail" @click="onClickSend">
                        {{ $t('recruitment.candidate.info.sendEmail.label') }}
                    </el-button>
                </div>
            </div>
            <div class="mt-3">
                <BaseTableLayout :data="candidateEmailHistories">
                    <template #table-columns>
                        <el-table-column
                            :label="$t('recruitment.candidate.candidateEmail.table.date')"
                        >
                            <template #default="scope">
                                {{ parseDateTimeTime(scope.row.dateTime) }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="template"
                            :label="
                                $t('recruitment.candidate.candidateEmail.table.template')
                            "
                        >
                        </el-table-column>
                        <el-table-column
                            prop="note"
                            header-align="left"
                            :label="$t('recruitment.candidate.candidateEmail.table.note')"
                        >
                            <template #default="scope">
                                <el-input
                                    type="textarea"
                                    :maxlength="INPUT_TEXT_MAX_LENGTH"
                                    v-model="scope.row.note"
                                    @blur="onChangeNoteCandidateEmail(scope.row.id)"
                                    :autosize="{ minRows: 1, maxRows: 2 }"
                                    @change="noteChange"
                                    class="note-email"
                                />
                            </template>
                        </el-table-column>
                    </template>
                </BaseTableLayout>
            </div>
        </div>

        <SendEmailFormPopup />
    </div>
</template>

<script lang="ts">
import { Options } from 'vue-class-component';
import { recruitmentModule } from '../../store';
import { recruitmentService } from '../../service/api.service';
import { ICandidateDetail, ICandidateEmail, IUpdateCandidateEmail } from '../../types';
import SendEmailFormPopup from '../popup/SendEmailFormPopup.vue';
import { mixins } from 'vue-property-decorator';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
import { ElLoading } from 'element-plus';
import { checkUserHasPermission } from '@/utils/helper';
import { RecruitmentMixins } from '../../mixins';
import { CandidateStatus } from '../../constants';

const StatusWhichCanSendEmail = [
    CandidateStatus.CV_REVIEWING,
    CandidateStatus.CV_APPROVED,
    CandidateStatus.FIRST_INTERVIEW,
    CandidateStatus.SECOND_INTERVIEW,
    CandidateStatus.ELECTED,
];

@Options({
    components: {
        SendEmailFormPopup,
    },
})
export default class CandidateEmail extends mixins(RecruitmentMixins) {
    get candidateEmailHistories(): ICandidateEmail[] {
        return this.candidate.candidateEmails || [];
    }

    get candidate(): ICandidateDetail {
        return recruitmentModule.candidate as ICandidateDetail;
    }

    get isCanSendEmail(): boolean {
        return (
            checkUserHasPermission(recruitmentModule.userPermissions, [
                `${PermissionResources.RECRUITMENT}_${PermissionActions.HR_ROLE}`,
            ]) &&
            StatusWhichCanSendEmail.includes(this.candidate.status as CandidateStatus)
        );
    }

    created(): void {
        const collectionElement = Array.from(
            document.getElementsByClassName('note-email'),
        );
        collectionElement.forEach((element) => {
            (
                element.getElementsByTagName('textarea').item(0) as HTMLTextAreaElement
            ).setAttribute(
                'style',
                'height:' + element.scrollHeight + 'px;overflow-y:hidden;',
            );
            (
                element.getElementsByTagName('textarea').item(0) as HTMLTextAreaElement
            ).addEventListener('textarea', this.noteChange, false);
        });
    }

    async onClickSend(): Promise<void> {
        recruitmentModule.setIsShowSendEmailFormPopup(true);
    }

    noteChange(): void {
        const collectionElement = Array.from(
            document.getElementsByClassName('note-email'),
        );
        collectionElement.forEach((element) => {
            (
                element.getElementsByTagName('textarea').item(0) as HTMLTextAreaElement
            ).setAttribute(
                'style',
                'height:' + element.scrollHeight + 'px;overflow-y:hidden;',
            );
        });
    }

    async onChangeNoteCandidateEmail(id: number): Promise<void> {
        const candidateEmailHistory = this.candidateEmailHistories.find(
            (candidateEmailHistory) => candidateEmailHistory.id === id,
        ) as ICandidateEmail;
        const bodyRequest = {
            note: candidateEmailHistory.note,
        };
        const loading = ElLoading.service({
            target: '.content',
        });
        const response = await recruitmentService.updateCandidateEmail(
            id,
            bodyRequest as IUpdateCandidateEmail,
        );
        loading.close();
        if (!response.success) {
            this.showErrorNotification(response.message);
            return;
        }

        this.showSuccessNotification(
            this.$t(
                'recruitment.candidate.candidateEmail.notification.updateSuccessfull',
            ) as string,
        );
    }
}
</script>

<style lang="scss" scoped>
.mh-22 {
    min-height: 22px;
}

.card {
    border-radius: 15px;
}

.cp-page-title {
    font-size: 20px;
    color: #212121;
    font-weight: 400;
    margin: 0;
}

:deep(.note-email) {
    textarea:not(:focus) {
        border: none;
        font-family: inherit;
        font-size: inherit;
        padding: none;
        background-color: inherit;
    }
}
</style>
