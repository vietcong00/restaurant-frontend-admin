<template>
    <div class="form-group d-flex flex-column text-left position-relative">
        <label class="fw-bold text-start mb-2 label-text w-100 w-30">
            {{ $t('recruitment.candidate.detail.cv') }}
            <span class="mark-required">*</span></label
        >
        <div class="container-btn">
            <div class="file-upload-input">
                <label class="label-file" for="file"> {{ cvNameUpload }}</label>
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
        <div class="position-relative">
            <div v-if="cvUploadError" class="invalid-feedback text-start d-block">
                <span>{{ cvUploadError }}</span>
            </div>
            <div
                v-if="!cvUploadError && cvFileErrorForm"
                class="invalid-feedback text-start d-block"
            >
                <span>{{ translateYupError(cvFileErrorForm) }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { MAX_FILE_SIZE_IN_BYTE } from '@/common/constants';
import { fileService, uploadFileToS3 } from '@/common/services/file.service';
import { UtilMixins } from '@/mixins/utilMixins';
import { ElLoading } from 'element-plus';
import get from 'lodash/get';
import { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class UploadCVFile extends mixins(UtilMixins) {
    @Prop({ default: '' }) cvFileErrorForm: string | undefined;

    cvUploadError = '';
    cvNameUpload = '';

    cvFile!: File;

    onBeforeUploadCv(cv: File): boolean {
        if (cv.type !== 'application/pdf') {
            this.cvUploadError = this.$t(
                'common.common.uploadFile.rules.invalidType',
            ) as string;
            return false;
        }
        const isValidFileSize = cv.size < MAX_FILE_SIZE_IN_BYTE;
        if (!isValidFileSize) {
            this.cvUploadError = this.$t(
                'common.common.uploadFile.rules.tooBig',
            ) as string;
            return false;
        }
        this.cvUploadError = '';
        return isValidFileSize;
    }

    selectFile(event: Event): void {
        const target = event.target;
        const file = get(target, 'files[0]', '') as File;
        const reader = new FileReader();

        if (file?.size) {
            this.onBeforeUploadCv(file);
            if (!this.cvUploadError) {
                reader.readAsDataURL(file);
                this.cvFile = file;
                this.cvNameUpload = file.name;
                this.handleCvUpload();
            }
        }
    }

    async handleCvUpload(): Promise<unknown> {
        if (!this.cvFile) {
            return;
        }
        const loading = ElLoading.service({
            target: '.candidate-form-popup',
        });
        const data = await fileService.getPreSignedUrl('CV', this.cvFile?.name);
        const { path, fileName, presignedUrl } = data.data;
        const uploadToS3Response = await uploadFileToS3(this.cvFile, presignedUrl);
        if (!uploadToS3Response?.success) {
            loading.close();
            return uploadToS3Response;
        }
        const extensionIndex = this.cvFile.name.lastIndexOf('.');
        const registerFileResponse = await fileService.registerFile({
            path,
            originalName: this.cvFile.name,
            fileName,
            size: this.cvFile.size,
            extension: this.cvFile.name.substr(extensionIndex + 1),
            mimetype: this.cvFile.type,
        });
        loading.close();
        if (!registerFileResponse?.success) {
            return {
                ...registerFileResponse,
            };
        }
        this.$emit('completeUploadCV', registerFileResponse?.data?.id);
    }
}
</script>

<style lang="scss" scoped>
.mark-required {
    color: red;
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
