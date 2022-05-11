<template>
    <BaseSort :sort-options="sortOptions" @handleSort="handleSort" />
</template>

<script lang="ts">
import { SortOptions } from '@/modules/user/constants';
import { OrderDirection } from '@/common/constants';
import { Vue } from 'vue-class-component';
import { parseLanguageSelectOptions } from '@/utils/helper';
import { Prop } from 'vue-property-decorator';
import { recruitmentModule } from '../../store';
import { ISelectOptions } from '@/common/types';
import { ElLoading } from 'element-plus';

export default class Sort extends Vue {
    @Prop({ default: false }) readonly isToggleFilterStatus!: boolean;

    get sortOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(SortOptions);
    }

    async handleSort(orderBy: string, orderDirection: OrderDirection): Promise<void> {
        recruitmentModule.setQueryString({
            orderBy,
            orderDirection,
        });
        const loading = ElLoading.service({
            target: '.content',
        });
        recruitmentModule.getCandidates();
        loading.close();
    }
}
</script>

<style lang="scss" scoped>
.btn-sort {
    height: 40px;
    width: 100px;
    margin-top: 20px;
    margin-left: 10px;
    span {
        display: flex;
    }
}

.icon-sort-desc {
    transform: rotate(180deg);
}

:deep(.form-group) {
    margin-top: 20px;
    margin-bottom: 0px;
}

//sort
.filter-exchange {
    width: 36px;
    height: 36px;
    padding: 0;
    display: flex;
    align-items: center;
    background-position: center;
}

.toolbox {
    padding: 15px;

    .el-dropdown-menu {
        display: flex;
        padding: 0;
    }

    .el-dropdown-menu__item {
        padding: 0;

        &:hover,
        &:focus {
            background-color: transparent;
        }
    }
}
.toolbox-title {
    font-size: 13px;
    color: #7d7d7d;
    text-transform: uppercase;
}
.toolbox-inner {
    display: flex;
    align-items: center;
}
.btn-sort {
    display: flex;
    align-items: center;
    height: 40px;
    margin-left: 10px;
    padding: 12px;
    background-color: #2ea5ea;
    border-color: #2ea5ea;
    &:hover,
    &:focus {
        background-color: #2ea5ea;
        border-color: #2ea5ea;
        color: #fff;
    }
    :deep(span) {
        color: #fff;
        display: flex;
    }
}

.btn-sort-desc {
    .bar-line {
        &:nth-child(1) {
            width: 7px;
        }

        &:nth-child(2) {
            width: 11px;
        }
        &:nth-child(3) {
            width: 15px;
        }
    }
}

.bar {
    display: flex;
    flex-direction: column;
    min-width: 20px;
    margin-right: 3px;
}

.bar-line {
    display: inline-block;
    width: 15px;
    height: 2px;
    background-color: #fff;
    margin-bottom: 4px;
    transition: 0.4s all;

    &:nth-child(2) {
        width: 11px;
    }

    &:nth-child(3) {
        width: 7px;
    }
}
:deep(.form-group) {
    margin-bottom: 0 !important;
}
</style>
