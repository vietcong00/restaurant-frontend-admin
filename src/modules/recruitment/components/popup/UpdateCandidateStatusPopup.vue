<template>
    <div>
        <el-dialog
            :title="$t(`recruitment.list.updateStatus.title`)"
            v-model="isShowCandidateStatusPopUp"
            width="450px"
            custom-class="confirm-dialog"
            @closed="closePopup"
            @open="updateCandidateStatusForm.openPopup"
        >
            <el-form>
                <div class="col-12 col-lg-12 updated-status">
                    <div class="label">
                        {{ $t('recruitment.list.updateStatus.status') }}:
                    </div>
                    {{
                        $t(
                            `recruitment.list.filterForm.status.${updateCandidateStatusForm.status}`,
                        )
                    }}
                </div>
                <div class="col-12 col-lg-12">
                    <BaseInputTextarea
                        v-model:value="updateCandidateStatusForm.note"
                        :label="$t('recruitment.list.updateStatus.note')"
                        :minRows="2"
                        :maxRows="4"
                        :error="translateYupError(updateCandidateStatusForm.errors.note)"
                    />
                </div>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closePopup()">{{
                        $t(`recruitment.list.updateStatus.button.cancel`)
                    }}</el-button>
                    <el-button
                        type="primary"
                        @click="onClickSubmitButton()"
                        :disabled="isDisabledSaveButton"
                    >
                        {{ $t(`recruitment.list.updateStatus.button.save`) }}
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { UtilMixins } from '@/mixins/utilMixins';
import { initData } from '@/modules/recruitment/composition/candidateStatusForm';
import { recruitmentModule, initCandidate } from '@/modules/recruitment/store';
import { setup } from 'vue-class-component';

export default class UpdateCandidateStatusFormPopup extends UtilMixins {
    get isDisabledSaveButton(): boolean {
        return recruitmentModule.isDisabledSaveButton;
    }

    get isShowCandidateStatusPopUp(): boolean {
        return recruitmentModule.isShowCandidateStatusPopUp || false;
    }

    set isShowCandidateStatusPopUp(val: boolean) {
        recruitmentModule.setIsShowCandidateStatusPopUp(val);
    }

    updateCandidateStatusForm = setup(() => initData());

    async onClickSubmitButton(): Promise<void> {
        recruitmentModule.setIsDisableFormButton(true);
        await this.updateCandidateStatusForm.onSubmit();
        recruitmentModule.setIsDisableFormButton(false);
    }

    closePopup(): void {
        recruitmentModule.setIsShowCandidateStatusPopUp(false);
        recruitmentModule.setSelectedCandidateStatus(null);
        recruitmentModule.setCandidate(initCandidate);
        (this.updateCandidateStatusForm.resetForm as () => void)();
    }
}
</script>
<style scoped lang="scss">
.updated-status {
    display: flex;
    justify-content: flex-start;
    .label {
        text-align: initial;
        width: 100%;
        font-weight: bold;
        margin-bottom: 6px;
        width: 220px;
    }
}
:deep(.el-dialog__title) {
    font-weight: 600;
}
</style>
