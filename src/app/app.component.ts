import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { TYPES } from './types';
import { MIN_FONT_SIZE, MAX_FONT_SIZE, FONT_SIZE_CHANGE_STEP } from './constants/constants';

import { DataService } from './services/data.service';
import { restrictRange } from './helpers/math.helpers';
import { ModalComponent } from './modal/modal.component';

// TODO: edit special field: percentage, links
// TODO: rename/abstract list-types
// TODO: remove items
// TODO: deal with blank fields

@Component({
  selector: 'cv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public TYPES = TYPES;
  public MIN_FONT_SIZE = MIN_FONT_SIZE;
  public MAX_FONT_SIZE = MAX_FONT_SIZE;

  @ViewChild('inputWrapperRef') public inputWrapperRef: ElementRef;
  @ViewChild('inputRef') public inputRef: ElementRef;
  @ViewChild('modal') public modal: ModalComponent;

  public data: any = null;

  public theme: any = null;
  public details: any = null;
  public items: any = null;

  private editing: any = null;
  private modalEditingReference: any = null;

  public fontSize: number = null;
  public fontFamily: string = null;

  constructor (
    private _dataService: DataService,
    private _af: AngularFire
  ) {}

  public ngOnInit (): void {
    this._dataService
      .getData()
      .subscribe(data => this.data = data);

    this.theme = this._af.database.object('/cvs/one/theme');

    this.theme.subscribe(theme => {
      this.fontSize = theme.fontSize || 1;
      this.fontFamily = theme.fontFamily || null;
      console.warn('select active font family');
    });

    this.details = this._af.database.object('/cvs/one/details');
    this.items = this._af.database.list('/cvs/one/items');
  }

  public decreaseFontSize (): void {
    this.fontSize = restrictRange(this.fontSize - FONT_SIZE_CHANGE_STEP, MIN_FONT_SIZE, MAX_FONT_SIZE);
    this.updateTheme();
  }

  public increaseFontSize (): void {
    this.fontSize = restrictRange(this.fontSize + FONT_SIZE_CHANGE_STEP, MIN_FONT_SIZE, MAX_FONT_SIZE);
    this.updateTheme();
  }

  public changeFontFamily ($event): void {
    this.fontFamily = $event.target.value || null;
    this.updateTheme();
  }

  private updateTheme (): void {
    this.theme.update({
      fontSize: this.fontSize,
      fontFamily: this.fontFamily
    });
  }

  public openModal ($event, type, data, parent, index): void {
    // const fieldsClone = type.fields.map(a => Object.assign({}, a));
    // const dataClone = data ? Object.assign({}, data) : null;
    // const preventDelete = (type === this.TYPES.DETAILS);
    // this.modalEditingReference = { parent, index };
    // this.modal.openModal(fieldsClone, dataClone, preventDelete);
  }

  public onModalClose (data): void {
    // if (this.modalEditingReference) {
    //   if (data) {
    //     this.modalEditingReference.parent[this.modalEditingReference.index] = data;
    //   } else {
    //     this.modalEditingReference.parent.splice(this.modalEditingReference.index, 1);
    //   }
    // }

    // this.modalEditingReference = null;
  }

  public addFirstChild ($event, parent, field, type): void {
    $event.preventDefault();
    $event.stopPropagation();

    parent[field] = [
      Object.assign({}, type.model),
      ...parent[field]
    ];

    this.updateEditBoxPosition();
  }

  public addLastChild ($event, parent, field, type): void {
    $event.preventDefault();
    $event.stopPropagation();

    parent[field].push(Object.assign({}, type.model));
    this.updateEditBoxPosition();
  }

  public editField ($event, parent, field): void {
    this.modal.closeModal();

    if (this.editing) {
      this.saveChanges();
    }

    $event.preventDefault();
    $event.stopPropagation();

    const target = $event.target;
    let value = parent[field];

    this.editing = { parent, field, target };

    if (typeof value === 'string') {
      value = value.trim();
    }

    this.inputRef.nativeElement.value = value;
    this.updateEditBoxPosition();
  }

  @HostListener('window:resize') public updateEditBoxPosition (): void {
    if (!this.editing) {
      return;
    }

    const boundingBox = this.editing.target.getBoundingClientRect();
    const offsetTop = this.editing.target.offsetTop;
    const styleElement = window.getComputedStyle(this.editing.target);

    this.editing.target.style.opacity = '0';

    this.inputWrapperRef.nativeElement.style.position = 'absolute';
    this.inputWrapperRef.nativeElement.style.top = `${ offsetTop }px`;
    this.inputWrapperRef.nativeElement.style.left = `${ boundingBox.left }px`;
    this.inputWrapperRef.nativeElement.style.right = `0px`;
    this.inputWrapperRef.nativeElement.classList.add('active');

    this.inputRef.nativeElement.style.fontSize = styleElement.fontSize;
    this.inputRef.nativeElement.style.fontWeight = styleElement.fontWeight;
    this.inputRef.nativeElement.style.lineHeight = styleElement.lineHeight;
    this.inputRef.nativeElement.style.letterSpacing = styleElement.letterSpacing;
    this.inputRef.nativeElement.style.fontFamily = styleElement.fontFamily;
    this.inputRef.nativeElement.style.textTransform = styleElement.textTransform;

    this.inputRef.nativeElement.focus();
  }

  @HostListener('window:click', ['$event']) public onClick ($event): void {
    if (!this.inputRef.nativeElement.contains($event.target)) {
      this.saveChanges();
    }
  }

  public cancelEdit (): void {
    if (!this.editing) {
      return;
    }

    this.inputWrapperRef.nativeElement.classList.remove('active');
    this.editing.target.style.opacity = '1';
    this.editing = null;
  }

  public saveChanges (): void {
    if (!this.editing) {
      return;
    }

    const newValue = this.inputRef.nativeElement.value.trim();

    if (newValue.length) {
      // TODO: newValue = newValue.replace('\n', '<br>');
      this.editing.parent[this.editing.field] = newValue;
    }

    this.cancelEdit();
  }
}
