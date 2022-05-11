<template>
    <el-dialog
        @opened="onOpenPopup"
        destroy-on-close
        v-model="isShowCandidateFormPopup"
        @closed="closePopup"
        width="50%"
        custom-class="candidate-form-popup"
    >
        <template #title>
            <h3 class="text-left">
                {{
                    isCreate
                        ? $t('recruitment.candidate.detail.createTitle')
                        : $t('recruitment.candidate.detail.updateTitle')
                }}
            </h3>
        </template>
        <div class="container">
            <el-row gutter="20">
                <el-col :span="12">
                    <BaseUploadAvatar
                        isHorizontal="true"
                        name="avatar"
                        path="avatar"
                        :reset="isShowCandidateFormPopup"
                        :currentImageURL="avatarUrl"
                        @set-avatar-id="onChangeAvatarId"
                        @set-avatar-url="onsetAvatarUrl"
                    />
                </el-col>
                <el-col :span="12">
                    <BaseInputText
                        :label="$t('recruitment.candidate.detail.fullName')"
                        :placeholder="
                            $t('recruitment.candidate.create.fields.fullName.placeholder')
                        "
                        v-model:value="form.fullName"
                        :error="translateYupError(form.errors.fullName)"
                        :isRequired="true"
                    />
                    <BaseInputText
                        :label="$t('recruitment.candidate.detail.email')"
                        :placeholder="
                            $t('recruitment.candidate.create.fields.email.placeholder')
                        "
                        v-model:value="form.email"
                        :error="translateYupError(form.errors.email)"
                        :isRequired="true"
                    />
                </el-col>
            </el-row>
            <el-row gutter="20">
                <el-col :span="12">
                    <BaseInputNumber
                        :label="$t('recruitment.candidate.detail.phoneNumber')"
                        :placeholder="
                            $t(
                                'recruitment.candidate.create.fields.phoneNumber.placeholder',
                            )
                        "
                        v-model:value="form.phoneNumber"
                        :error="translateYupError(form.errors.phoneNumber)"
                        :isRequired="true"
                    />
                </el-col>
                <el-col :span="12">
                    <UploadCVFile
                        @completeUploadCV="completeUploadCV"
                        :cvFileErrorForm="form.errors.cvFileId"
                    />
                </el-col>
            </el-row>
            <el-row gutter="20">
                <el-col :span="12">
                    <BaseSingleSelect
                        :label="$t('recruitment.candidate.detail.level')"
                        :placeholder="
                            $t('recruitment.candidate.create.fields.level.placeholder')
                        "
                        :options="levelOptions"
                        :filterable="true"
                        v-model:value="form.level"
                        :error="translateYupError(form.errors.level)"
                    />
                </el-col>
                <el-col :span="12">
                    <BaseSingleSelect
                        v-model:value="form.appliedPosition"
                        :isRequired="true"
                        :options="appliedPositionOptions"
                        :label="$t('recruitment.candidate.detail.appliedPosition')"
                        :placeholder="
                            $t(
                                'recruitment.candidate.create.fields.appliedPosition.placeholder',
                            )
                        "
                        :filterable="true"
                        name="position"
                        :error="translateYupError(form.errors.appliedPosition)"
                    />
                </el-col>
            </el-row>
            <el-row gutter="20">
                <el-col :span="12">
                    <BaseSingleSelect
                        :label="$t('recruitment.candidate.detail.gender.label')"
                        :placeholder="
                            $t('recruitment.candidate.create.fields.gender.placeholder')
                        "
                        :options="genderOptions"
                        :isRequired="true"
                        :error="translateYupError(form.errors.gender)"
                        v-model:value="form.gender"
                        :filterable="true"
                    />
                </el-col>
                <el-col :span="12">
                    <BaseSingleSelect
                        :label="$t('recruitment.candidate.detail.resource')"
                        :placeholder="
                            $t('recruitment.candidate.create.fields.resource.placeholder')
                        "
                        :options="resourceOptions"
                        :filterable="true"
                        v-model:value="form.resource"
                        :error="translateYupError(form.errors.resource)"
                        :isRequired="true"
                    />
                </el-col>
            </el-row>
            <el-row gutter="20">
                <el-col :span="12">
                    <BaseDatePicker
                        :label="$t('recruitment.candidate.detail.birthday')"
                        :placeholder="
                            $t('recruitment.candidate.create.fields.birthday.placeholder')
                        "
                        v-model:value="form.birthday"
                        :error="translateYupError(form.errors.birthday)"
                        :maxDate="new Date()"
                        :minDate="MIN_DATE_PICKER"
                    />
                </el-col>
                <el-col :span="12">
                    <BaseInputText
                        :label="$t('recruitment.candidate.detail.note')"
                        :placeholder="
                            $t('recruitment.candidate.create.fields.note.placeholder')
                        "
                        v-model:value="form.note"
                        :error="translateYupError(form.errors.note)"
                    />
                </el-col>
            </el-row>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <div class="row justify-content-center footer">
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-end justify-content-center"
                    >
                        <el-button @click="closePopup">
                            {{ $t('recruitment.candidate.detail.btn.cancel') }}
                        </el-button>
                    </div>
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-start justify-content-center"
                    >
                        <el-button
                            type="primary"
                            @click="onClickSave"
                            :disabled="isDisabled"
                        >
                            {{ $t('recruitment.candidate.detail.btn.save') }}
                        </el-button>
                    </div>
                </div>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts">
import { initForm } from '../../composition/candidateForm';
import { UtilMixins } from '@/mixins/utilMixins';
import { GenderOptions } from '@/modules/auth/constants';
import { parseLanguageSelectOptions } from '@/utils/helper';
import { LevelOptions, ResourceOptions } from '../../constants';
import { recruitmentModule } from '../../store';
import { Options, setup } from 'vue-class-component';
import { mixins } from 'vue-property-decorator';
import { ISelectOptions } from '@/common/types';
import UploadCVFile from '../candidate/UploadCVFile.vue';

@Options({
    components: {
        UploadCVFile,
    },
})
export default class CandidateFormPopup extends mixins(UtilMixins) {
    form = setup(() => initForm());

    isDisabled = false;
    avatarUrl = '';

    get resourceOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(ResourceOptions);
    }

    get genderOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(GenderOptions);
    }

    get levelOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(LevelOptions);
    }

    get appliedPositionOptions(): ISelectOptions[] {
        return this.getPositionOptions(recruitmentModule.appliedPositionList);
    }

    get isCreate(): boolean {
        return !recruitmentModule.candidate.id;
    }

    get isShowCandidateFormPopup(): boolean {
        return recruitmentModule.isShowCandidateFormPopup;
    }

    set isShowCandidateFormPopup(isShow: boolean) {
        recruitmentModule.setIsShowCandidateFormPopup(isShow);
    }

    onChangeAvatarId(fileId: number): void {
        this.form.avatarId = fileId;
    }

    onsetAvatarUrl(value: string): void {
        this.avatarUrl = value;
    }

    async onOpenPopup(): Promise<void> {
        await this.form.openPopup();
        if (!this.isCreate) {
            this.avatarUrl = recruitmentModule.candidate.avatar?.url;
        }
    }

    async onClickSave(): Promise<void> {
        await this.form.onSubmit();
    }

    closePopup(): void {
        this.avatarUrl = '';
        recruitmentModule.setIsShowCandidateFormPopup(false);
        (this.form.resetForm as () => void)();
    }

    completeUploadCV(id: number): void {
        this.form.cvFileId = id;
    }
}
</script>

<style lang="scss" scoped>
.text-left {
    text-align: left;
}
.container {
    text-align: center;
}
.mark-required {
    color: red;
}
</style>
