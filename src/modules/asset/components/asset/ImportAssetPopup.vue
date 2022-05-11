<template>
    <BaseImportFile
        :isShowUploadForm="isShowImportAssetFilePopup"
        @handleSave="onClickButtonImport"
        @changeFile="handleChangeFile"
        @resetUpload="closePopup"
        @download="handleDownloadImportAssetFile"
        :title="$t('asset.form.title.importAsset')"
        :error="$t(`${importErrorMessage}`)"
    />
</template>

<script lang="ts">
import { UtilMixins } from '@/mixins/utilMixins';
import { mixins } from 'vue-property-decorator';
import { Options } from 'vue-class-component';
import { assetModule } from '../../store/asset.store';
import { IImportAsset } from '../../types';
import * as XLSX from 'xlsx';
import { downloadFile } from '@/utils/commonFunction';
import { EXCEL_ACCEPTED_FILE_TYPES, MAX_FILE_SIZE_IN_BYTE } from '@/common/constants';

@Options({})
export default class ImportAssetPopup extends mixins(UtilMixins) {
    importErrorMessage = '';
    get isShowImportAssetFilePopup(): boolean {
        return assetModule.isShowImportAssetFilePopup;
    }

    async validateFileData(file: File): Promise<boolean> {
        const isValidFileSize = file?.size < MAX_FILE_SIZE_IN_BYTE;
        if (!file) {
            this.importErrorMessage = this.$t(
                'common.common.uploadFile.rules.empty',
            ) as string;
            return false;
        }
        if (file.name) {
            const finalFileName = file.name.split('.');
            if (
                !EXCEL_ACCEPTED_FILE_TYPES.includes(
                    finalFileName[finalFileName.length - 1],
                )
            ) {
                this.importErrorMessage = this.$t(
                    'common.common.uploadFile.rules.invalidType',
                ) as string;
                return false;
            }
        }
        if (!isValidFileSize) {
            this.importErrorMessage = this.$t(
                'common.common.uploadFile.rules.tooBig',
            ) as string;
            return false;
        }
        return true;
    }

    async onClickButtonImport(file: File): Promise<void> {
        if (await this.validateFileData(file)) {
            const fileText = await file.arrayBuffer();
            const workbook = XLSX.read(fileText);
            const assetList = XLSX.utils.sheet_to_json(
                workbook.Sheets[workbook.SheetNames[0]],
            ) as IImportAsset[];
            assetModule.setImportAssets(assetList);
            assetModule.setIsShowImportAssetResultPopup(true);
            assetModule.setIsOpenImportAssetFilePopup(false);
        }
    }

    handleChangeFile(): void {
        this.importErrorMessage = '';
    }

    handleDownloadImportAssetFile(): void {
        downloadFile(
            'import_asset_template.xlsx',
            `${window.location.origin}/templates/import_asset_template.xlsx`,
        );
    }

    closePopup(): void {
        this.importErrorMessage = '';
        assetModule.setIsOpenImportAssetFilePopup(false);
    }
}
</script>

<style lang="scss" scoped></style>
