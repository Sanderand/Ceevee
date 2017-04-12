import { Component, Output, ViewEncapsulation, SimpleChanges, ElementRef, HostListener, EventEmitter } from '@angular/core';

@Component({
  selector: 'cv-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent {
  @Output('close') public closeEmitter: EventEmitter<any> = new EventEmitter<any>();

  public fields: any = null;
  public data: any = null;
  public isAdding: boolean = false;
  public isOpen: boolean = false;

  public open (fields, data): void {
    this.isAdding = !data;
    this.isOpen = true;

    this.fields = fields;
    this.data = data || {};
  }

  public close (): void {
    this.closeEmitter.emit(this.data);
    this.isOpen = false;
  }

  public submit ($event): void {
    $event.preventDefault();
    this.close();
  }

  public cancel (): void {
    if (this.isAdding) {
      this.remove();
    } else {
      this.close();
    }
  }

  public remove (): void {
    this.data = null;
    this.close();
  }

  public onBackdropClick ($event): void {
    if ($event.target.classList.contains('modal-wrapper')) {
      this.cancel();
    }
  }

  @HostListener('window:keydown.escape') public onEscapeKey (): void {
    this.cancel();
  }
}
