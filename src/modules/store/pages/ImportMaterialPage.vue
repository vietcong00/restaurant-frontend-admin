<template>
    <div class="import-material-list">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('store.importMaterial.pageName')"
            :hasSortBox="true"
            v-model:page="selectedPage"
            :totalItems="totalImportMaterials"
            @onPaginate="handlePaginate"
        >
            <template #sort-box-content>
                <Sort />
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <ImportMaterialTable />
    </div>
</template>

<script lang="ts">
import { DEFAULT_FIRST_PAGE } from '@/common/constants';
import { Options, Vue } from 'vue-class-component';
import FilterForm from '../components/importMaterial/FilterForm.vue';
import { storeModule } from '../store';
import ImportMaterialTable from '../components/importMaterial/ImportMaterialTable.vue';

@Options({
    components: {
        ImportMaterialTable,
        FilterForm,
    },
})
export default class ImportMaterialPage extends Vue {
    isToggleFilterForm = true;

    get totalImportMaterials(): number {
        return storeModule.totalImportMaterials;
    }

    // check permission

    get selectedPage(): number {
        return storeModule.queryStringImportMaterial?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        storeModule.queryStringImportMaterial.page = value;
    }

    created(): void {
        storeModule.clearQueryStringImportMaterial();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }
}
</script>

<style lang="scss" scoped>
.img-item {
    width: 75px;
    height: 75px;
    margin: 20px auto;
}

.list-note-diagram {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    .note-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        .note-color {
            width: 30px;
            height: 30px;
            margin-right: 20px;
            border-radius: 5px;
        }

        .booked {
            background: #ebff78;
        }

        .used {
            background: #9eb3fa;
        }

        .not-enough {
            opacity: 0.2;
        }

        .selected {
            border: 1px solid #ff0000;
        }
    }
}

.list-table {
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    border-top: 1px solid #bebebe;
    border-bottom: 1px solid #bebebe;
}
</style>
