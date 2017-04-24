import { Component, Output, ViewEncapsulation, SimpleChanges, ElementRef, HostListener, EventEmitter } from '@angular/core';

@Component({
  selector: 'cv-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent {
  @Output() public close: EventEmitter<any> = new EventEmitter<any>();

  public fields: any = null;
  public data: any = null;
  public isAdding: boolean = false;
  public isOpen: boolean = false;
  public preventDelete: boolean = false;

  public openModal (fields, data, preventDelete): void {
    this.isAdding = !data;
    this.isOpen = true;
    this.preventDelete = preventDelete;

    this.fields = fields;
    this.data = data || {};
  }

  public closeModal (): void {
    this.close.emit(this.data);
    this.isOpen = false;
  }

  public submitModal ($event): void {
    $event.preventDefault();
    this.closeModal();
  }

  public cancelModal (): void {
    if (this.isAdding) {
      this.removeItem();
    } else {
      this.closeModal();
    }
  }

  public removeItem (): void {
    this.data = null;
    this.closeModal();
  }

  public onBackdropClick ($event): void {
    if ($event.target.classList.contains('modal-wrapper')) {
      this.cancelModal();
    }
  }

  @HostListener('window:keydown.escape') public onEscapeKey (): void {
    this.cancelModal();
  }
}
