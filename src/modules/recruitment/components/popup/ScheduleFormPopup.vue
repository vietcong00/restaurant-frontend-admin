<template>
    <el-dialog
        v-model="visibleDialog"
        width="35%"
        @closed="closeDialog"
        @open="form.openPopup"
        class="schedule-form-popup"
    >
        <template #title>
            <h3 class="text-left">
                {{ $t('recruitment.candidate.interviews.dialogUpdate.title') }}
            </h3>
        </template>
        <el-form :model="form">
            <el-row :gutter="20">
                <el-col :span="12">
                    <BaseInputText
                        :label="$t('recruitment.candidate.interviews.dialogUpdate.order')"
                        size="medium"
                        :value="
                            form.order
                                ? $t(
                                      `recruitment.candidate.interviews.order.order${form.order}`,
                                  )
                                : ''
                        "
                        :isDisabled="true"
                    />
                </el-col>
                <el-col :span="12">
                    <BaseDatePicker
                        :label="
                            $t('recruitment.candidate.interviews.dialogUpdate.date.label')
                        "
                        :error="translateYupError(form.errors.interviewAt)"
                        :placeholder="
                            $t(
                                'recruitment.candidate.interviews.dialogUpdate.date.placeholder',
                            )
                        "
                        v-model:value="form.interviewAt"
                        :isRequired="true"
                        :dateFormat="interviewAtFormat"
                        :valueFormat="DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_COLON"
                        type="datetime"
                        :minDate="minInterviewAtDate"
                    />
                </el-col>
            </el-row>
            <el-form-item>
                <BaseInputTextarea
                    v-model:value="form.note"
                    :label="
                        $t('recruitment.candidate.interviews.dialogUpdate.note.label')
                    "
                    :minRows="2"
                    :maxRows="4"
                    :error="translateYupError(form.errors.note)"
                    :placeholder="
                        $t(
                            'recruitment.candidate.interviews.dialogUpdate.note.placeholder',
                        )
                    "
                    class="w-100"
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <div class="row justify-content-center footer">
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-end justify-content-center"
                    >
                        <el-button @click="closeDialog">
                            {{
                                $t('recruitment.candidate.interviews.dialogUpdate.cancel')
                            }}
                        </el-button>
                    </div>
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-start justify-content-center"
                    >
                        <el-button
                            :disabled="isDisabledSaveButton"
                            type="primary"
                            @click="onClickSubmit()"
                            >{{
                                $t('recruitment.candidate.interviews.dialogUpdate.update')
                            }}
                        </el-button>
                    </div>
                </div>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { initForm } from '../../composition/scheduleForm';
import { UtilMixins } from '@/mixins/utilMixins';
import { Model, mixins } from 'vue-property-decorator';
import { recruitmentModule } from '../../store';
import { ICandidateDetail } from '../../types';
import { setup } from 'vue-class-component';
import moment from 'moment';

export default class ScheduleFormPopup extends mixins(UtilMixins) {
    @Model('visible', { type: Boolean })
    readonly visibleDialog!: boolean;

    form = setup(() => initForm());

    get isDisabledSaveButton(): boolean {
        return recruitmentModule.isDisabledSaveButton;
    }

    get interviewAtFormat(): string {
        return this.DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_COLON;
    }

    get minInterviewAtDate(): string | null {
        return moment().subtract(1, 'days').fmDayString();
    }

    get candidate(): ICandidateDetail {
        return recruitmentModule.candidate;
    }

    async onClickSubmit(): Promise<void> {
        recruitmentModule.setIsDisableFormButton(true);
        await this.form.onSubmit();
        recruitmentModule.setIsDisableFormButton(false);
    }

    closeDialog(): void {
        (this.form.resetForm as () => void)();
        recruitmentModule.setIsShowScheduleFormPopup(false);
        recruitmentModule.setSelectedScheduleId(NaN);
    }
}
</script>
<style lang="scss" scoped>
:deep(.el-dialog) {
    .el-dialog__body {
        padding-bottom: 0px !important;
    }
}
.w-100 {
    width: 100%;
}
</style>
