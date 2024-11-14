import { Component, Input, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, GridOptions, RowNode } from 'ag-grid-community';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css',
})
export class DatatableComponent {
  @Input() columnDefs!: any;
  @Input() rowData!: any;
  @Input() gridOptions!: GridOptions;

  @ViewChild('datatable') datatable!: AgGridAngular<any>;

  public style: any = {
    height: '100%',
    width: '100%',
    flex: '1 1 auto',
  };
  private gridApi!: GridApi;

  public noRowsTemplate = `
    <div class="d-flex justify-content-center align-items-center h-100">
      <span class="text-muted">No data found</span>
    </div>`;

  constructor() {
    this.gridOptions = {
      domLayout: 'autoHeight',
      rowHeight: 48,
      pagination: true, // Enable pagination
      paginationAutoPageSize: true, // Auto page size
      rowDragManaged: true,
      detailRowAutoHeight: true,
      scrollbarWidth: 12,
    };
  }

  refreshDataGrid() {
    if (this.gridApi) {
      this.gridApi.refreshCells();
    }
  }

  refreshRow(id: any, newData?: any) {
    this.gridApi.forEachNode((rowNode) => {
      if (rowNode.data && rowNode.data._id === id) {
        if (newData) {
          rowNode.setData(newData);
        }
        this.gridApi.refreshCells({ rowNodes: [rowNode] });
      }
    });
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }
}
