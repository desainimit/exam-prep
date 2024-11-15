import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ConfirmComponent } from '@shared/confirm/confirm.component';
import { ModalComponent } from '@app/shared/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private toggleMenuSubject = new Subject<void>();
  toggleMenu$ = this.toggleMenuSubject.asObservable();

  constructor(private dialog: MatDialog) {}

  confirm(title: string, message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      data: { title, message },
    });

    return dialogRef.afterClosed().toPromise();
  }

  openModal(
    contentTemplate: TemplateRef<any>,
    title = '',
    width: string = '500px',
    submitText: string = 'Submit',
    submitFn: Function = () => {}
  ): void {
    this.dialog.open(ModalComponent, {
      width: width,
      data: {
        title,
        contentTemplate,
        submitText,
        submitFn,
      },
      disableClose: true,
    });
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

  toggleMenu() {
    this.toggleMenuSubject.next();
  }
}
