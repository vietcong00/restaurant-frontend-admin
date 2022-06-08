import { getModule, VuexModule, Mutation, Action, Module } from 'vuex-module-decorators';
import store from '@/store';
import {
    DEFAULT_FIRST_PAGE,
    LIMIT_PER_PAGE,
    DEFAULT_ORDER_DIRECTION,
} from '@/common/constants';
import { IBodyResponse, IGetListResponse } from '@/common/types';
import { DEFAULT_ORDER_BY } from '../user/constants';
import { appService } from '@/utils/app';
import { PermissionResources } from '../role/constants';
import {
    ICheckInventory,
    ICheckInventoryUpdate,
    IConvertHistory,
    IExportMaterial,
    IExportMaterialDetail,
    IImportMaterial,
    IImportMaterialDetail,
    IInventoryDetail,
    IMaterial,
    IMaterialUpdate,
    IQueryStringCheckInventory,
    IQueryStringConvertHistory,
    IQueryStringExportMaterial,
    IQueryStringExportMaterialDetail,
    IQueryStringImportMaterial,
    IQueryStringImportMaterialDetail,
    IQueryStringInventoryDetail,
    IQueryStringMaterial,
    IQueryStringSupplier,
    ISelectMaterialOptions,
    ISupplier,
    ISupplierUpdate,
} from './types';
import {
    checkInventoryService,
    convertHistoryService,
    exportMaterialDetailService,
    exportMaterialService,
    importMaterialDetailService,
    importMaterialService,
    inventoryDetailService,
    materialService,
    supplierService,
} from './services/api.service';

const initQueryString = {
    page: DEFAULT_FIRST_PAGE,
    limit: LIMIT_PER_PAGE,
    orderBy: DEFAULT_ORDER_BY,
    orderDirection: DEFAULT_ORDER_DIRECTION,
    keyword: '',
};

@Module({ dynamic: true, namespaced: true, store, name: 'material' })
class StoreModule extends VuexModule {
    // Material
    materialList: Array<IMaterial> = [];
    totalMaterials = 0;
    selectedMaterial: IMaterialUpdate | null = null;
    isShowMaterialFormPopUp = false;
    queryStringMaterial: IQueryStringMaterial = initQueryString;

    // Supplier
    supplierList: Array<ISupplier> = [];
    totalSuppliers = 0;
    selectedSupplier: ISupplierUpdate | null = null;
    isShowSupplierFormPopUp = false;
    queryStringSupplier: IQueryStringSupplier = initQueryString;

    // Check Inventory
    checkInventoryList: Array<ICheckInventory> = [];
    totalCheckInventories = 0;
    selectedCheckInventory: ICheckInventoryUpdate | null = null;
    queryStringCheckInventory: IQueryStringCheckInventory = initQueryString;

    // Check Inventory Detail
    inventoryDetailList: Array<IInventoryDetail> = [];
    totalInventoryDetails = 0;
    queryStringInventoryDetail: IQueryStringInventoryDetail = initQueryString;

    // Import Material
    importMaterialList: Array<IImportMaterial> = [];
    totalImportMaterials = 0;
    queryStringImportMaterial: IQueryStringImportMaterial = initQueryString;

    // Import Material Detail
    importMaterialDetailList: Array<IImportMaterialDetail> = [];
    totalImportMaterialDetails = 0;
    queryStringImportMaterialDetail: IQueryStringImportMaterialDetail = initQueryString;

    // Export Material
    exportMaterialList: Array<IExportMaterial> = [];
    totalExportMaterials = 0;
    queryStringExportMaterial: IQueryStringExportMaterial = initQueryString;

    // Export Material Detail
    exportMaterialDetailList: Array<IExportMaterialDetail> = [];
    totalExportMaterialDetails = 0;
    queryStringExportMaterialDetail: IQueryStringExportMaterialDetail = initQueryString;

    // convert history
    convertHistoryList: Array<IConvertHistory> = [];
    totalConvertHistories = 0;
    queryStringConvertHistory: IQueryStringConvertHistory = initQueryString;
    isShowConvertHistoryFormPopUp = false;

    // convert
    isShowConvertMaterialFormPopUp = false;
    materialOptions: ISelectMaterialOptions[] = [];

    // GETTERS
    get userPermissions(): string[] {
        return appService.getUserPermissionsByResource(PermissionResources.EVENT);
    }

    // MUTATION
    // list
    @Mutation
    MUTATE_MATERIAL_LIST(data: Array<IMaterial>) {
        this.materialList = data;
    }

    @Mutation
    MUTATE_SUPPLIER_LIST(data: Array<ISupplier>) {
        this.supplierList = data;
    }

    @Mutation
    MUTATE_CHECK_INVENTORY_LIST(data: Array<ICheckInventory>) {
        this.checkInventoryList = data;
    }

    @Mutation
    MUTATE_INVENTORY_DETAIL_LIST(data: Array<IInventoryDetail>) {
        this.inventoryDetailList = data;
    }

    @Mutation
    MUTATE_IMPORT_MATERIAL_LIST(data: Array<IImportMaterial>) {
        this.importMaterialList = data;
    }

    @Mutation
    MUTATE_EXPORT_MATERIAL_DETAIL_LIST(data: Array<IExportMaterialDetail>) {
        this.exportMaterialDetailList = data;
    }

    @Mutation
    MUTATE_EXPORT_MATERIAL_LIST(data: Array<IExportMaterial>) {
        this.exportMaterialList = data;
    }

    @Mutation
    MUTATE_IMPORT_MATERIAL_DETAIL_LIST(data: Array<IImportMaterialDetail>) {
        this.importMaterialDetailList = data;
    }

    @Mutation
    MUTATE_CONVERT_HISTORY_LIST(data: Array<IConvertHistory>) {
        this.convertHistoryList = data;
    }

    // total
    @Mutation
    MUTATE_TOTAL_MATERIALS(total: number) {
        this.totalMaterials = total;
    }

    @Mutation
    MUTATE_TOTAL_SUPPLIERS(total: number) {
        this.totalSuppliers = total;
    }

    @Mutation
    MUTATE_TOTAL_CHECK_INVENTORIES(total: number) {
        this.totalCheckInventories = total;
    }

    @Mutation
    MUTATE_TOTAL_INVENTORY_DETAILS(total: number) {
        this.totalInventoryDetails = total;
    }

    @Mutation
    MUTATE_TOTAL_IMPORT_MATERIALS(total: number) {
        this.totalImportMaterials = total;
    }

    @Mutation
    MUTATE_TOTAL_IMPORT_MATERIAL_DETAILS(total: number) {
        this.totalImportMaterialDetails = total;
    }

    @Mutation
    MUTATE_TOTAL_EXPORT_MATERIALS(total: number) {
        this.totalExportMaterials = total;
    }

    @Mutation
    MUTATE_TOTAL_EXPORT_MATERIAL_DETAILS(total: number) {
        this.totalExportMaterialDetails = total;
    }

    @Mutation
    MUTATE_TOTAL_CONVERT_HISTORIES(total: number) {
        this.totalConvertHistories = total;
    }

    // query string
    @Mutation
    MUTATE_QUERY_STRING_MATERIAL(query: IQueryStringMaterial) {
        this.queryStringMaterial = {
            ...this.queryStringMaterial,
            ...query,
        };
    }

    @Mutation
    MUTATE_QUERY_STRING_SUPPLIER(query: IQueryStringSupplier) {
        this.queryStringMaterial = {
            ...this.queryStringMaterial,
            ...query,
        };
    }

    @Mutation
    MUTATE_QUERY_STRING_CHECK_INVENTORY(query: IQueryStringCheckInventory) {
        this.queryStringCheckInventory = {
            ...this.queryStringCheckInventory,
            ...query,
        };
    }

    @Mutation
    MUTATE_QUERY_STRING_INVENTORY_DETAIL(query: IQueryStringInventoryDetail) {
        this.queryStringInventoryDetail = {
            ...this.queryStringInventoryDetail,
            ...query,
        };
    }

    @Mutation
    MUTATE_QUERY_STRING_IMPORT_MATERIAL(query: IQueryStringImportMaterial) {
        this.queryStringImportMaterial = {
            ...this.queryStringImportMaterial,
            ...query,
        };
    }

    @Mutation
    MUTATE_QUERY_STRING_IMPORT_MATERIAL_DETAIL(query: IQueryStringImportMaterialDetail) {
        this.queryStringImportMaterialDetail = {
            ...this.queryStringImportMaterialDetail,
            ...query,
        };
    }

    @Mutation
    MUTATE_QUERY_STRING_EXPORT_MATERIAL(query: IQueryStringExportMaterial) {
        this.queryStringExportMaterial = {
            ...this.queryStringExportMaterial,
            ...query,
        };
    }

    @Mutation
    MUTATE_QUERY_STRING_EXPORT_MATERIAL_DETAIL(query: IQueryStringExportMaterialDetail) {
        this.queryStringExportMaterialDetail = {
            ...this.queryStringExportMaterialDetail,
            ...query,
        };
    }

    @Mutation
    MUTATE_QUERY_STRING_CONVERT_HISTORY(query: IQueryStringConvertHistory) {
        this.queryStringConvertHistory = {
            ...this.queryStringConvertHistory,
            ...query,
        };
    }

    // is show form popup
    @Mutation
    MUTATE_IS_SHOW_MATERIAL_FORM_POP_UP(value: boolean) {
        this.isShowMaterialFormPopUp = value;
    }

    @Mutation
    MUTATE_IS_SHOW_SUPPLIER_FORM_POP_UP(value: boolean) {
        this.isShowSupplierFormPopUp = value;
    }

    @Mutation
    MUTATE_IS_SHOW_CONVERT_HISTORY_FORM_POP_UP(value: boolean) {
        this.isShowConvertHistoryFormPopUp = value;
    }

    @Mutation
    MUTATE_IS_SHOW_CONVERT_MATERIAL_FORM_POP_UP(value: boolean) {
        this.isShowConvertMaterialFormPopUp = value;
    }

    // selected
    @Mutation
    MUTATE_SELECTED_MATERIAL(material: IMaterialUpdate | null) {
        this.selectedMaterial = material;
    }

    @Mutation
    MUTATE_SELECTED_SUPPLIER(selectedSupplier: ISupplierUpdate | null) {
        this.selectedSupplier = selectedSupplier;
    }

    @Mutation
    MUTATE_SELECTED_CHECK_INVENTORY(
        selectedCheckInventory: ICheckInventoryUpdate | null,
    ) {
        this.selectedCheckInventory = selectedCheckInventory;
    }

    // Other
    @Mutation
    MUTATE_MATERIAL_OPTIONS(materialOptions: ISelectMaterialOptions[]) {
        this.materialOptions = materialOptions;
    }

    // ACTION

    // clear query string
    @Action
    clearQueryStringMaterial() {
        this.MUTATE_QUERY_STRING_MATERIAL(initQueryString);
    }

    @Action
    clearQueryStringSupplier() {
        this.MUTATE_QUERY_STRING_SUPPLIER(initQueryString);
    }

    @Action
    clearQueryStringCheckInventory() {
        this.MUTATE_QUERY_STRING_CHECK_INVENTORY(initQueryString);
    }

    @Action
    clearQueryStringInventoryDetail() {
        this.MUTATE_QUERY_STRING_INVENTORY_DETAIL(initQueryString);
    }

    @Action
    clearQueryStringImportMaterial() {
        this.MUTATE_QUERY_STRING_IMPORT_MATERIAL(initQueryString);
    }

    @Action
    clearQueryStringImportMaterialDetail() {
        this.MUTATE_QUERY_STRING_IMPORT_MATERIAL_DETAIL(initQueryString);
    }

    @Action
    clearQueryStringExportMaterial() {
        this.MUTATE_QUERY_STRING_EXPORT_MATERIAL(initQueryString);
    }

    @Action
    clearQueryStringExportMaterialDetail() {
        this.MUTATE_QUERY_STRING_EXPORT_MATERIAL_DETAIL(initQueryString);
    }

    @Action
    clearQueryStringConvertHistory() {
        this.MUTATE_QUERY_STRING_CONVERT_HISTORY(initQueryString);
    }

    // query string
    @Action
    setQueryStringMaterial(query: IQueryStringMaterial) {
        this.MUTATE_QUERY_STRING_MATERIAL(query);
    }

    @Action
    setQueryStringSupplier(query: IQueryStringSupplier) {
        this.MUTATE_QUERY_STRING_SUPPLIER(query);
    }

    @Action
    setQueryStringCheckInventory(query: IQueryStringCheckInventory) {
        this.MUTATE_QUERY_STRING_CHECK_INVENTORY(query);
    }

    @Action
    setQueryStringInventoryDetail(query: IQueryStringInventoryDetail) {
        this.MUTATE_QUERY_STRING_INVENTORY_DETAIL(query);
    }

    @Action
    setQueryStringImportMaterial(query: IQueryStringImportMaterial) {
        this.MUTATE_QUERY_STRING_IMPORT_MATERIAL(query);
    }

    @Action
    setQueryStringImportMaterialDetail(query: IQueryStringImportMaterialDetail) {
        this.MUTATE_QUERY_STRING_IMPORT_MATERIAL_DETAIL(query);
    }

    @Action
    setQueryStringExportMaterial(query: IQueryStringExportMaterial) {
        this.MUTATE_QUERY_STRING_EXPORT_MATERIAL(query);
    }

    @Action
    setQueryStringExportMaterialDetail(query: IQueryStringExportMaterialDetail) {
        this.MUTATE_QUERY_STRING_EXPORT_MATERIAL_DETAIL(query);
    }

    @Action
    setQueryStringConvertHistory(query: IQueryStringConvertHistory) {
        this.MUTATE_QUERY_STRING_CONVERT_HISTORY(query);
    }

    // is show form popup
    @Action
    setIsShowMaterialFormPopUp(value: boolean) {
        this.MUTATE_IS_SHOW_MATERIAL_FORM_POP_UP(value);
    }

    @Action
    setIsShowSupplierFormPopUp(value: boolean) {
        this.MUTATE_IS_SHOW_SUPPLIER_FORM_POP_UP(value);
    }

    @Action
    setIsShowConvertHistoryFormPopUp(value: boolean) {
        this.MUTATE_IS_SHOW_CONVERT_HISTORY_FORM_POP_UP(value);
    }

    @Action
    setIsShowConvertMaterialFormPopUp(value: boolean) {
        this.MUTATE_IS_SHOW_CONVERT_MATERIAL_FORM_POP_UP(value);
    }

    // selected
    @Action
    setSelectedMaterial(material: IMaterialUpdate | null) {
        this.MUTATE_SELECTED_MATERIAL(material);
    }

    @Action
    setSelectedSupplier(supplier: ISupplierUpdate | null) {
        this.MUTATE_SELECTED_SUPPLIER(supplier);
    }

    @Action
    setSelectedCheckInventory(checkInventory: ICheckInventoryUpdate | null) {
        this.MUTATE_SELECTED_CHECK_INVENTORY(checkInventory);
    }

    // Other
    @Action
    setMaterialOptions(materialOptions: ISelectMaterialOptions[]) {
        this.MUTATE_MATERIAL_OPTIONS(materialOptions);
    }

    // API Table
    @Action
    async getMaterials() {
        const response = (await materialService.getList({
            ...this.queryStringMaterial,
        })) as IBodyResponse<IGetListResponse<IMaterial>>;
        if (response.success) {
            this.MUTATE_MATERIAL_LIST(response?.data?.items || []);
            this.MUTATE_TOTAL_MATERIALS(response?.data?.totalItems || 0);
            const materialOptions = (response?.data?.items || []).map(
                (option: IMaterial) => ({
                    label: `${option.material} (${option.unit})`,
                    value: option.id,
                    quantity: option.quantity,
                }),
            );
            this.MUTATE_MATERIAL_OPTIONS(materialOptions);
        } else {
            this.MUTATE_MATERIAL_LIST([]);
            this.MUTATE_TOTAL_MATERIALS(0);
        }
        return response;
    }

    @Action
    async getSuppliers() {
        const response = (await supplierService.getList({
            ...this.queryStringSupplier,
        })) as IBodyResponse<IGetListResponse<ISupplier>>;
        if (response.success) {
            this.MUTATE_SUPPLIER_LIST(response?.data?.items || []);
            this.MUTATE_TOTAL_SUPPLIERS(response?.data?.totalItems || 0);
        } else {
            this.MUTATE_SUPPLIER_LIST([]);
            this.MUTATE_TOTAL_SUPPLIERS(0);
        }
        return response;
    }

    @Action
    async getCheckInventories() {
        const response = (await checkInventoryService.getList({
            ...this.queryStringCheckInventory,
        })) as IBodyResponse<IGetListResponse<ICheckInventory>>;
        if (response.success) {
            this.MUTATE_CHECK_INVENTORY_LIST(response?.data?.items || []);
            this.MUTATE_TOTAL_CHECK_INVENTORIES(response?.data?.totalItems || 0);
        } else {
            this.MUTATE_CHECK_INVENTORY_LIST([]);
            this.MUTATE_TOTAL_CHECK_INVENTORIES(0);
        }
        return response;
    }

    @Action
    async getInventoryDetails() {
        const response = (await inventoryDetailService.getList({
            ...this.queryStringInventoryDetail,
        })) as IBodyResponse<IGetListResponse<IInventoryDetail>>;
        if (response.success) {
            this.MUTATE_INVENTORY_DETAIL_LIST(response?.data?.items || []);
            this.MUTATE_TOTAL_INVENTORY_DETAILS(response?.data?.totalItems || 0);
        } else {
            this.MUTATE_INVENTORY_DETAIL_LIST([]);
            this.MUTATE_TOTAL_INVENTORY_DETAILS(0);
        }
        return response;
    }

    @Action
    async getImportMaterials() {
        const response = (await importMaterialService.getList({
            ...this.queryStringImportMaterial,
        })) as IBodyResponse<IGetListResponse<IImportMaterial>>;
        if (response.success) {
            this.MUTATE_IMPORT_MATERIAL_LIST(response?.data?.items || []);
            this.MUTATE_TOTAL_IMPORT_MATERIALS(response?.data?.totalItems || 0);
        } else {
            this.MUTATE_IMPORT_MATERIAL_LIST([]);
            this.MUTATE_TOTAL_IMPORT_MATERIALS(0);
        }
        return response;
    }

    @Action
    async getImportMaterialDetails() {
        const response = (await importMaterialDetailService.getList({
            ...this.queryStringImportMaterialDetail,
        })) as IBodyResponse<IGetListResponse<IImportMaterialDetail>>;
        if (response.success) {
            this.MUTATE_IMPORT_MATERIAL_DETAIL_LIST(response?.data?.items || []);
            this.MUTATE_TOTAL_IMPORT_MATERIAL_DETAILS(response?.data?.totalItems || 0);
        } else {
            this.MUTATE_IMPORT_MATERIAL_DETAIL_LIST([]);
            this.MUTATE_TOTAL_IMPORT_MATERIAL_DETAILS(0);
        }
        return response;
    }

    @Action
    async getExportMaterials() {
        const response = (await exportMaterialService.getList({
            ...this.queryStringExportMaterial,
        })) as IBodyResponse<IGetListResponse<IExportMaterial>>;
        if (response.success) {
            this.MUTATE_EXPORT_MATERIAL_LIST(response?.data?.items || []);
            this.MUTATE_TOTAL_EXPORT_MATERIALS(response?.data?.totalItems || 0);
        } else {
            this.MUTATE_EXPORT_MATERIAL_LIST([]);
            this.MUTATE_TOTAL_EXPORT_MATERIALS(0);
        }
        return response;
    }

    @Action
    async getExportMaterialDetails() {
        const response = (await exportMaterialDetailService.getList({
            ...this.queryStringExportMaterialDetail,
        })) as IBodyResponse<IGetListResponse<IExportMaterialDetail>>;
        if (response.success) {
            this.MUTATE_EXPORT_MATERIAL_DETAIL_LIST(response?.data?.items || []);
            this.MUTATE_TOTAL_EXPORT_MATERIAL_DETAILS(response?.data?.totalItems || 0);
        } else {
            this.MUTATE_EXPORT_MATERIAL_DETAIL_LIST([]);
            this.MUTATE_TOTAL_EXPORT_MATERIAL_DETAILS(0);
        }
        return response;
    }

    @Action
    async getConvertHistories() {
        const response = (await convertHistoryService.getList({
            ...this.queryStringConvertHistory,
        })) as IBodyResponse<IGetListResponse<IConvertHistory>>;
        if (response.success) {
            this.MUTATE_CONVERT_HISTORY_LIST(response?.data?.items || []);
            this.MUTATE_TOTAL_CONVERT_HISTORIES(response?.data?.totalItems || 0);
        } else {
            this.MUTATE_CONVERT_HISTORY_LIST([]);
            this.MUTATE_TOTAL_CONVERT_HISTORIES(0);
        }
        return response;
    }
}
export const storeModule = getModule(StoreModule);
