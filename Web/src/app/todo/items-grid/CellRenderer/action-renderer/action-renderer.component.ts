import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ICellRendererAngularComp } from 'ag-grid-angular';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-action',
  standalone: true,
  imports: [ MatIconModule ],
  templateUrl: './action-renderer.component.html',
  styleUrl: './action-renderer.component.scss',
})
export class ActionRendererComponent implements ICellRendererAngularComp {
  private params: any;
  actionEvent!: (key: string) => void;
  
  constructor(
      private dialog: MatDialog,
  ) { }

  agInit(params: any): void {
    this.params = params;
    this.actionEvent = params.actionEvent;
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.actionEvent(this.params.data.todokey);
      }
    });
  }

  refresh(): boolean {
      return false;
  }
}

@Component({
  selector: 'confirm-delete-dialog',
  standalone: true,
  template: `
    <mat-dialog-content>
      <p>Are your sure you want to detele this item?</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button [mat-dialog-close]="true">Yes, Delete</button>
    </mat-dialog-actions>
    `,
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class ConfirmDeleteDialog {
  readonly dialogRef = inject(MatDialogRef<ConfirmDeleteDialog>);
}
