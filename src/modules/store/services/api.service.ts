import service from '@/plugins/axios';
import { BaseService } from '@/utils/api';

class MaterialService extends BaseService {}
export const materialService = new MaterialService({ baseUrl: 'material' }, service);

class SupplierService extends BaseService {}
export const supplierService = new SupplierService({ baseUrl: 'supplier' }, service);

class CheckInventoryService extends BaseService {}
export const checkInventoryService = new CheckInventoryService(
    { baseUrl: 'check-inventory' },
    service,
);

class InventoryDetailService extends BaseService {}
export const inventoryDetailService = new InventoryDetailService(
    { baseUrl: 'inventory-detail' },
    service,
);

class ImportMaterialService extends BaseService {}
export const importMaterialService = new ImportMaterialService(
    { baseUrl: 'import-material' },
    service,
);

class ImportMaterialDetailService extends BaseService {}
export const importMaterialDetailService = new ImportMaterialDetailService(
    { baseUrl: 'import-material-detail' },
    service,
);

class ExportMaterialService extends BaseService {}
export const exportMaterialService = new ExportMaterialService(
    { baseUrl: 'emport-material' },
    service,
);

class ExportMaterialDetailService extends BaseService {}
export const exportMaterialDetailService = new ExportMaterialDetailService(
    { baseUrl: 'export-material-detail' },
    service,
);

class ConvertHistoryService extends BaseService {}
export const convertHistoryService = new ConvertHistoryService(
    { baseUrl: 'convert-history' },
    service,
);
