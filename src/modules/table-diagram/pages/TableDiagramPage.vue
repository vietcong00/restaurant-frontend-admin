<template>
    <table-diagram />
</template>

<script lang="ts">
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import TableDiagram from '../components/TableDiagram.vue';
import { tableDiagramModule } from '../store';
import { ITable } from '../types';

@Options({
    name: 'table-diagram-component',
    components: {
        TableDiagram,
    },
})
export default class TableDiagramPage extends Vue {
    get tableList(): ITable[] {
        return tableDiagramModule.tableList || [];
    }

    created(): void {
        tableDiagramModule.clearQueryString();
        this.getTableList();
    }

    async getTableList(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await tableDiagramModule.getTables();
        loading.close();
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
