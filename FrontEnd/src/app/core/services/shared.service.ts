import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ConfirmComponent } from '@shared/confirm/confirm.component';

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

  toggleMenu() {
    this.toggleMenuSubject.next();
  }
}
