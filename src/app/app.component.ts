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

  @ViewChild('inputWrapper') public inputWrapper: ElementRef;
  @ViewChild('textarea') public textarea: ElementRef;

  public data: any = null;
  public fontSize: number = 1;
  public fontFamily: string = null;

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

    this.textarea.nativeElement.value = value;
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

    this.inputWrapper.nativeElement.style.position = 'absolute';
    this.inputWrapper.nativeElement.style.top = `${ offsetTop }px`;
    this.inputWrapper.nativeElement.style.left = `${ boundingBox.left }px`;
    this.inputWrapper.nativeElement.style.right = `0px`;
    this.inputWrapper.nativeElement.classList.add('active');

    this.textarea.nativeElement.style.fontSize = styleElement.fontSize;
    this.textarea.nativeElement.style.fontWeight = styleElement.fontWeight;
    this.textarea.nativeElement.style.lineHeight = styleElement.lineHeight;
    this.textarea.nativeElement.style.letterSpacing = styleElement.letterSpacing;
    this.textarea.nativeElement.style.fontFamily = styleElement.fontFamily;
    this.textarea.nativeElement.style.textTransform = styleElement.textTransform;

    this.textarea.nativeElement.focus();
    this.updateTextAreaHeight();
  }

  @HostListener('document:click', ['$event']) public onClick ($event): void {
    if (!this.textarea.nativeElement.contains($event.target)) {
      this.saveChanges();
    }
  }

  public updateTextAreaHeight = (): void => {
    this.textarea.nativeElement.style.height = `auto`;
    this.textarea.nativeElement.style.height = `${ this.textarea.nativeElement.scrollHeight }px`;
  }

  public delayedUpdateTextAreaHeight (): void {
      setTimeout(() => {
        this.updateTextAreaHeight();
      }, 0);
  }

  public cancelEdit (): void {
    if (!this.editing) {
      return;
    }

    this.inputWrapper.nativeElement.classList.remove('active');
    this.editing.target.style.opacity = '1';
    this.editing = null;
  }

  public saveChanges (): void {
    if (!this.editing) {
      return;
    }

    let newValue = this.textarea.nativeElement.value.trim();

    if (newValue.length) {
      // TODO: newValue = newValue.replace('\n', '<br>');
      this.editing.parent[this.editing.field] = newValue;
    }

    console.debug(this.data);
    this.cancelEdit();
  }
}
