<template>
    <el-dialog
        v-model="isShowSendEmailFormPopup"
        destroy-on-close
        width="80%"
        height="80%"
        @opened="openDialog"
        @closed="closedPopup"
        :lock-scroll="true"
        top="10vh"
        custom-class="send-email-form-popup"
    >
        <template #title>
            <h3 class="text-left">
                {{ $t('recruitment.candidate.sendEmailDialog.title') }}
            </h3>
        </template>
        <div>
            <el-row :gutter="16">
                <el-col :span="12">
                    <BaseSingleSelect
                        :label="$t('recruitment.candidate.sendEmailDialog.template')"
                        :placeholder="
                            $t('recruitment.candidate.sendEmailDialog.placeholder')
                        "
                        v-model:value="form.templateId"
                        :error="translateYupError(form.errors.templateId)"
                        :isRequired="true"
                        :options="templateOptions"
                        size="medium"
                        @change="onChangeTemplate"
                        :filterable="true"
                    />
                </el-col>
                <el-col :span="12">
                    <BaseInputText
                        :label="$t('recruitment.candidate.sendEmailDialog.subject')"
                        v-model:value="form.subject"
                        :error="translateYupError(form.errors.subject)"
                        :placeholder="
                            $t(
                                'recruitment.candidate.sendEmailDialog.attributes.subject.placeholder',
                            )
                        "
                        :isRequired="true"
                    />
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :span="12">
                    <BaseInputText
                        :label="$t('recruitment.candidate.sendEmailDialog.sendFrom')"
                        v-model:value="form.from"
                        :error="translateYupError(form.errors.from)"
                        :isReadonly="true"
                        :isDisabled="true"
                        :isRequired="true"
                    />
                </el-col>
                <el-col :span="12">
                    <BaseInputText
                        :label="$t('recruitment.candidate.sendEmailDialog.sendTo')"
                        v-model:value="form.to"
                        :error="translateYupError(form.errors.to)"
                        :isDisabled="true"
                        :isRequired="true"
                    />
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <template
                    v-for="(value, index) in Object.keys(EMAIL_TEMPLATE_ATTRIBUTE)"
                    :key="index"
                >
                    <el-col :span="12" v-if="showAttribute(value)">
                        <div
                            v-if="
                                EMAIL_TEMPLATE_ATTRIBUTE[value]?.type ===
                                EMAIL_TEMPLATE_ATTRIBUTE_TYPE.DATE
                            "
                        >
                            <BaseDatePicker
                                :label="$t(`${EMAIL_TEMPLATE_ATTRIBUTE[value].label}`)"
                                v-model:value="form[value]"
                                :error="translateYupError(form.errors[value])"
                                :dateFormat="
                                    EMAIL_TEMPLATE_ATTRIBUTE[value].validation.dateFormat
                                "
                                :valueFormat="
                                    EMAIL_TEMPLATE_ATTRIBUTE[value]?.validation.dateFormat
                                "
                                :min-date="minDateTime"
                                :placeholder="
                                    $t(`${EMAIL_TEMPLATE_ATTRIBUTE[value].placeholder}`)
                                "
                                :is-required="
                                    EMAIL_TEMPLATE_ATTRIBUTE[value]?.validation
                                        .isRequired || false
                                "
                                type="datetime"
                                @changeValue="onChangeAttribute(value)"
                            />
                        </div>
                        <div
                            v-if="
                                EMAIL_TEMPLATE_ATTRIBUTE[value].type ===
                                EMAIL_TEMPLATE_ATTRIBUTE_TYPE.INPUT_TEXT
                            "
                        >
                            <BaseInputText
                                :label="$t(`${EMAIL_TEMPLATE_ATTRIBUTE[value].label}`)"
                                :placeholder="
                                    $t(`${EMAIL_TEMPLATE_ATTRIBUTE[value].placeholder}`)
                                "
                                v-model:value="form[value]"
                                :isRequired="
                                    EMAIL_TEMPLATE_ATTRIBUTE[value]?.validation
                                        .isRequired || false
                                "
                                :isDisabled="
                                    EMAIL_TEMPLATE_ATTRIBUTE[value]?.validation
                                        .isDisabled || false
                                "
                                :error="translateYupError(form.errors[value])"
                                @onBlur="onChangeAttribute(value)"
                            />
                        </div>
                        <div
                            class="form-group d-flex flex-column"
                            v-if="
                                EMAIL_TEMPLATE_ATTRIBUTE[value].type ===
                                EMAIL_TEMPLATE_ATTRIBUTE_TYPE.FILE
                            "
                        >
                            <label class="fw-bold text-start mb-2 label-text">
                                {{ $t(`${EMAIL_TEMPLATE_ATTRIBUTE[value].label}`) }}
                                <span
                                    v-if="
                                        EMAIL_TEMPLATE_ATTRIBUTE[value]?.validation
                                            ?.isRequired
                                    "
                                    class="mark-required"
                                    >*</span
                                ></label
                            >
                            <div class="container-btn">
                                <div class="file-upload-input">
                                    <label class="label-file" for="file">
                                        {{ fileNameUpload }}</label
                                    >
                                    <input
                                        type="file"
                                        ref="file"
                                        accept="application/pdf"
                                        @change="selectFile($event)"
                                        class="custom-file-input"
                                    />
                                    <button>+</button>
                                </div>
                            </div>
                            <div>
                                <div
                                    v-if="fileError"
                                    class="invalid-feedback text-start d-block"
                                >
                                    {{ fileError }}
                                </div>
                                <div
                                    v-if="form?.errors?.attachment && !fileError"
                                    class="invalid-feedback text-start d-block"
                                >
                                    {{ translateYupError(form?.errors?.attachment) }}
                                </div>
                            </div>
                        </div>
                    </el-col>
                </template>
                <el-col :span="12">
                    <BaseInputText
                        :label="$t('recruitment.candidate.sendEmailDialog.note')"
                        v-model:value="form.note"
                        :placeholder="
                            $t('recruitment.candidate.create.fields.note.placeholder')
                        "
                        :error="translateYupError(form.errors.note)"
                    />
                </el-col>
            </el-row>
            <el-row :gutter="16" v-if="selectedEmailTemplate?.templateId">
                <el-col :span="3"></el-col>
                <el-col :span="18" style="margin-bottom: 10px">
                    <div style="position: relative; height: 100%">
                        <el-card
                            style="height: 100%"
                            class="card"
                            :id="'card' + selectedEmailTemplate?.templateId"
                        >
                            <div>
                                <iframe
                                    :id="`frame-${selectedEmailTemplate?.templateId}`"
                                    class="template-wrapper"
                                    frameborder="0"
                                    :srcdoc="selectedEmailTemplate?.htmlContent"
                                />
                            </div>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span="3"></el-col>
            </el-row>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <div class="row justify-content-center footer">
                    <div
                        class="cancel-btn col-md-4 col-sm-6 d-flex justify-content-md-end justify-content-center"
                    >
                        <el-button @click="closedPopup">{{
                            $t('recruitment.candidate.sendEmailDialog.cancel')
                        }}</el-button>
                    </div>
                    <div
                        class="send-btn col-md-4 col-sm-6 d-flex justify-content-md-start justify-content-center"
                    >
                        <el-button type="primary" @click="form.onSubmit">{{
                            $t('recruitment.candidate.sendEmailDialog.send')
                        }}</el-button>
                    </div>
                </div>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { initForm } from '../../composition/sendEmailForm';
import { ISelectOptions } from '@/common/types';
import { ElLoading } from 'element-plus';
import { mixins } from 'vue-property-decorator';
import {
    DEFAULT_SENDGRID_SENDER_EMAIL,
    CandidateStatus,
    templateAttributeConfig,
    EMAIL_TEMPLATE_ATTRIBUTE,
    EMAIL_TEMPLATE_TYPE,
    CandidateInterviewProgress,
    EMAIL_TEMPLATE_ATTRIBUTE_TYPE,
} from '../../constants';
import { recruitmentService } from '../../service/api.service';
import { recruitmentModule, initEmailTemplate } from '../../store';
import { ICandidateDetail, IEmailTemplate } from '../../types';
import { setup } from 'vue-class-component';
import moment from 'moment';
import {
    DATE_TIME_FORMAT,
    MAX_FILE_SIZE_IN_BYTE,
    SupportLanguage,
} from '@/common/constants';
import { RecruitmentMixins } from '../../mixins';
import { get } from 'lodash';

export default class SendEmailFormPopup extends mixins(RecruitmentMixins) {
    form = setup(() => initForm());

    templates: IEmailTemplate[] = [];

    fileError = '';
    fileNameUpload = '';

    selectedEmailTemplateContent = '';

    get selectedEmailTemplate(): IEmailTemplate | undefined {
        return recruitmentModule.selectedEmailTemplate;
    }

    get isShowSendEmailFormPopup(): boolean {
        return recruitmentModule.isShowSendEmailFormPopup;
    }

    set isShowSendEmailFormPopup(isShow: boolean) {
        recruitmentModule.setIsShowSendEmailFormPopup(isShow);
    }

    get candidate(): ICandidateDetail {
        return recruitmentModule.candidate;
    }

    get templateOptions(): ISelectOptions[] {
        const templateList = this.templates.filter(
            (template) =>
                template.beforeStatus?.includes(
                    this.candidate.status as CandidateStatus,
                ) &&
                !(
                    recruitmentModule.candidate.candidateInterviews?.find(
                        (candidateInterview) =>
                            candidateInterview.progress ===
                            CandidateInterviewProgress.Waiting,
                    ) &&
                    template.templateType === EMAIL_TEMPLATE_TYPE.INVITE_INTERVIEW_LETTER
                ),
        );
        return templateList.map((template) => ({
            value: template.templateId,
            label: template.name,
        }));
    }

    get minDateTime(): string | null {
        return moment().subtract(1, 'days').fmDayString();
    }

    get appliedPositionInDefaultLanguage(): string {
        const position = recruitmentModule.appliedPositionList.find(
            (position) => position.code === this.candidate.appliedPosition,
        );
        return position ? position.value?.[SupportLanguage.VI] : '';
    }

    async openDialog(): Promise<void> {
        const loading = ElLoading.service({
            target: '.send-email-form-popup',
        });
        const response = await recruitmentService.getEmailTemplates();
        this.form.to = this.candidate.email;
        this.form.fullName = this.candidate.fullName;
        this.form.appliedPosition = this.getNamePosition(
            recruitmentModule.candidate.appliedPosition as string,
        );
        this.templates = response || [];
        recruitmentModule.setSelectedEmailTemplate(initEmailTemplate);
        recruitmentModule.getCandidate(recruitmentModule.candidate.id);
        loading.close();
    }

    selectFile(event: Event): void {
        const target = event.target;
        const file = get(target, 'files[0]', '') as File;
        const reader = new FileReader();

        if (file?.size) {
            this.onBeforeUpload(file);
            if (!this.fileError) {
                reader.readAsDataURL(file);
                this.fileNameUpload = file.name;
                this.handleFileUpload(file);
            }
        }
    }

    onBeforeUpload(file: File): boolean {
        if (file.type !== 'application/pdf') {
            this.fileError = this.$t(
                'common.common.uploadFile.rules.invalidType',
            ) as string;
            return false;
        }
        const isOverMaxSize = file.size < MAX_FILE_SIZE_IN_BYTE;
        if (!isOverMaxSize) {
            this.fileError = this.$t('common.common.uploadFile.rules.tooBig') as string;
            return false;
        }
        this.fileError = '';
        return isOverMaxSize;
    }

    handleFileUpload(file: File): void {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.form.attachment = reader.result as string;
            this.form.attachmentName = EMAIL_TEMPLATE_ATTRIBUTE.file.fileName;
        };
    }

    showAttribute(varName: string): boolean {
        if (!this.selectedEmailTemplate?.id) {
            return false;
        }
        const keys =
            templateAttributeConfig[this.form.templateType as EMAIL_TEMPLATE_TYPE]
                ?.attribute;
        if (keys.includes(varName)) {
            return true;
        }
        return false;
    }

    closedPopup(): void {
        recruitmentModule.setIsShowSendEmailFormPopup(false);
        (this.form.resetForm as () => void)();
        recruitmentModule.setSelectedEmailTemplate(initEmailTemplate);
        if (this.form.attachment) {
            (this.$refs.upload as HTMLFormElement).clearFiles();
        }
    }

    onChangeTemplate(): void {
        const template: IEmailTemplate | undefined = this.templates.find(
            (t) => t.templateId === this.form.templateId,
        );
        if (template) {
            recruitmentModule.setSelectedEmailTemplate(template);
            this.form.subject = `${template.subject.toUpperCase()}_${(
                this.form.appliedPosition as string
            ).toUpperCase()}`;
            this.form.templateType = template.templateType;
            this.form.from = template?.sender || DEFAULT_SENDGRID_SENDER_EMAIL;
            this.selectedEmailTemplateContent =
                recruitmentModule.selectedEmailTemplate.htmlContent;
        }
        if (this.selectedEmailTemplate) {
            this.selectedEmailTemplate.htmlContent =
                this.selectedEmailTemplate?.htmlContent.replace(
                    '{{fullName}}',
                    this.candidate.fullName,
                ) as string;
            this.selectedEmailTemplate.htmlContent =
                this.selectedEmailTemplate?.htmlContent.replaceAll(
                    '{{appliedPosition}}',
                    this.appliedPositionInDefaultLanguage,
                ) as string;
            this.selectedEmailTemplate.htmlContent =
                this.selectedEmailTemplate?.htmlContent.replaceAll(
                    '{{gender}}',
                    this.$t(
                        `recruitment.candidate.sendEmailDialog.attributes.gender.${this.candidate.gender}`,
                    ),
                ) as string;
        }
    }

    onChangeAttribute(): void {
        if (this.selectedEmailTemplate) {
            this.selectedEmailTemplate.htmlContent = this.selectedEmailTemplateContent;
            Object.keys(EMAIL_TEMPLATE_ATTRIBUTE).forEach((value) => {
                if (
                    this.selectedEmailTemplate &&
                    (this.form as unknown as Record<string, string | number>)[value]
                ) {
                    if (
                        (
                            EMAIL_TEMPLATE_ATTRIBUTE as unknown as Record<
                                string,
                                Record<string, string>
                            >
                        )[value].type === EMAIL_TEMPLATE_ATTRIBUTE_TYPE.DATE
                    ) {
                        this.selectedEmailTemplate.htmlContent =
                            this.selectedEmailTemplate?.htmlContent.replaceAll(
                                `{{${value}}}`,
                                moment(
                                    (
                                        this.form as unknown as Record<
                                            string,
                                            string | number
                                        >
                                    )[value],
                                ).format(DATE_TIME_FORMAT.SENDGRID_DATE_FORMAT),
                            ) as string;
                    } else {
                        this.selectedEmailTemplate.htmlContent =
                            this.selectedEmailTemplate?.htmlContent.replaceAll(
                                `{{${value}}}`,
                                (this.form as unknown as Record<string, string | number>)[
                                    value
                                ] as string,
                            ) as string;
                    }
                }
            });
            this.selectedEmailTemplate.htmlContent =
                this.selectedEmailTemplate?.htmlContent.replaceAll(
                    '{{gender}}',
                    this.$t(
                        `recruitment.candidate.sendEmailDialog.attributes.gender.${this.candidate.gender}`,
                    ),
                ) as string;
        }
    }
}
</script>

<style scoped lang="scss">
.mark-required {
    color: red;
}

.template-wrapper {
    overflow: auto;
    height: 600px;
    width: 100%;
    margin-bottom: 15px;
}

.card {
    margin-bottom: 15px;
}

.iframeWrapper {
    display: inline-block;
    position: relative;
    width: 100%;
}
.iframeWrapper:after {
    content: '';
    position: absolute;
    z-index: map-get($map: $zIndex, $key: zIndexBase);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}

.iframeWrapper iframe {
    vertical-align: top;
}
:deep(#_no-clickjacking-0) {
    overflow: auto !important;
}
</style>
<style scoped lang="scss">
.el-dialog__body {
    overflow-x: hidden !important;
    max-height: 60vh;
    overflow: auto;
    /* width */
    &::-webkit-scrollbar {
        width: 10px;
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
}
.cancel-btn {
    padding-right: 9px;
}
.send-btn {
    padding-left: 9px;
}
.container-btn {
    background: white;
}
.file-upload-input {
    display: grid;
    grid-gap: 10px;
    position: relative;
    z-index: map-get($map: $zIndex, $key: fileUploadInput);
    label {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 0 0 15px;
        font-size: 14px !important;
    }
}
.custom-file-input {
    &:hover {
        cursor: pointer;
    }
}
.file-upload-input label {
    display: flex;
    align-items: center;
    color: setColor(primary, 0.5);
    background: setColor(white);
    transition: 0.4s ease;
    font-family: arial, sans-serif;
    font-size: 0.75em;
    font-weight: regular;
}

.file-upload-input input {
    position: relative;
    z-index: map-get($map: $zIndex, $key: fileUploadInput);
    padding: 0 gap(m);
    width: 100%;
    height: 34px;
    border: 1px solid #dcdfe6;
    border-radius: 8px;
    font-family: arial, sans-serif;
    font-size: 1rem;
    font-weight: regular;
}
.file-upload-input input[type='file'] {
    padding: 0 gap(m);
    color: transparent;
}
.file-upload-input input[type='file']::-webkit-file-upload-button {
    visibility: hidden;
    margin-left: 10px;
    padding: 0;
    height: 50px;
    width: 0;
}

.file-upload-input button {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50px;
    height: 34px;
    line-height: 0;
    user-select: none;
    color: white;
    background-color: #3c61e0;
    border-radius: 0 8px 8px 0;
    border: 1px solid #b1c0f3;
    font-family: arial, sans-serif;
    font-size: 1rem;
    font-weight: 800;
}
</style>
