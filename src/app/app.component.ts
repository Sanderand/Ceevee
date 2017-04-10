import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, HostListener } from '@angular/core';

import { TYPES } from './types';
import { MIN_FONT_SIZE, MAX_FONT_SIZE, FONT_SIZE_CHANGE_STEP } from './constants/constants';

import { DataService } from './services/data.service';
import { restrictRange } from './helpers/math.helpers';

// TODO: edit special field: percentage, links
// TODO: rename/abstract list-types
// TODO: remove items
// TODO: deal with blank fields

@Component({
  selector: 'app-root',
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

  public data: any = null;
  public fontSize: number = 1;
  public fontFamily: string = null;

  public modal: any = null;

  private editing: any = null;

  constructor (
    private _dataService: DataService
  ) {}

  public ngOnInit (): void {
    this._dataService
      .getData()
      .subscribe(data => this.data = data);
  }

  public decreaseFontSize (): void {
    this.data.theme.fontSize = restrictRange(this.data.theme.fontSize - FONT_SIZE_CHANGE_STEP, MIN_FONT_SIZE, MAX_FONT_SIZE);
  }

  public increaseFontSize (): void {
    this.data.theme.fontSize = restrictRange(this.data.theme.fontSize + FONT_SIZE_CHANGE_STEP, MIN_FONT_SIZE, MAX_FONT_SIZE);
  }

  public changeFontFamily ($event): void {
    this.data.theme.fontFamily = $event.target.value || null;
  }

  public openModal ($event, parent, field, type, index): void {
    this.cancelEdit();

    $event.preventDefault();
    $event.stopPropagation();

    let isAdding = (index === undefined || index === null);

    this.modal = {
      editTarget: { parent, field, index },
      isEditing: !isAdding,
      isAdding: isAdding,
      typeName: type.name,
      fields: type.fields.map(a => Object.assign({}, a))
    };

    if (!isAdding) {
      Object.keys(parent[field][index]).forEach(key => {
        this.modal.fields.forEach(f => {
          if (f.key === key) {
            f.value = parent[field][index][key];
          }
        });
      });
    }
  }

  @HostListener('window:keydown.escape') public clearModal (): void {
    this.modal = null;
  }

  public submitModal ($event): void {
    $event.preventDefault();

    let newItem = {};
    let hasNoIndex = (this.modal.editTarget.index === undefined || this.modal.editTarget.index === null);

    this.modal.fields.forEach(field => {
      newItem[field.key] = field.value;
    });

    if (hasNoIndex) {
      this.modal.editTarget.parent[this.modal.editTarget.field].push(newItem);
    } else {
      this.modal.editTarget.parent[this.modal.editTarget.field][this.modal.editTarget.index] = newItem;
    }

    this.clearModal();
  }

  public backdropClose ($event): void {
    if ($event.target.classList.contains('modal-wrapper')) {
      this.clearModal();
    }
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
    this.clearModal();

    if (this.editing) {
      this.saveChanges();
    }

    $event.preventDefault();
    $event.stopPropagation();

    let target = $event.target;
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

    let boundingBox = this.editing.target.getBoundingClientRect();
    let offsetTop = this.editing.target.offsetTop;
    let styleElement = window.getComputedStyle(this.editing.target);

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

    let newValue = this.inputRef.nativeElement.value.trim();

    if (newValue.length) {
      // TODO: newValue = newValue.replace('\n', '<br>');
      this.editing.parent[this.editing.field] = newValue;
    }

    this.cancelEdit();
  }
}
