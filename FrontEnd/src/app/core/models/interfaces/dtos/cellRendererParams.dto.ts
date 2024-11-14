import { ICellRendererParams } from 'ag-grid-community';

export interface CustomCellRendererParams extends ICellRendererParams {
  showViewButton: boolean;
  showEditButton: boolean;
  showDeleteButton: boolean;
}
