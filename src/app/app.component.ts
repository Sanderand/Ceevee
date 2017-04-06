import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataService } from './services/data.service';
import { TYPES } from './services/types';

// TODO: edit special field: percentage, links
// TODO: rename/abstract list-types

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public data: any = null;
  public TYPES = TYPES;
  public CONSTANTS: any = {
    UNTIL_NOW: 'present'
  };

  @ViewChild('inputWrapper') public inputWrapper: ElementRef;
  @ViewChild('textarea') public textarea: ElementRef;
  public editing: any;

  constructor (
    private _dataService: DataService
  ) {}

  public ngOnInit (): void {
    this._dataService
      .getData()
      .subscribe(data => this.data = data);
  }

  public editField ($event, parent, field): void {
    if (this.editing) {
      this.saveChanges();
    }

    let target = $event.target;
    let value = target.innerHTML;

    this.editing = { parent, field, target };
    this.textarea.nativeElement.value = value.trim();

    $event.preventDefault();
    $event.stopPropagation();

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
    this.inputWrapper.nativeElement.style.height = styleElement.lineHeight;//`${ boundingBox.height }px`;
    this.inputWrapper.nativeElement.classList.add('active');

    this.textarea.nativeElement.style.fontSize = styleElement.fontSize;
    this.textarea.nativeElement.style.fontWeight = styleElement.fontWeight;
    this.textarea.nativeElement.style.color = styleElement.color;
    this.textarea.nativeElement.style.lineHeight = styleElement.lineHeight;
    this.textarea.nativeElement.style.letterSpacing = styleElement.letterSpacing;
    this.textarea.nativeElement.style.fontFamily = styleElement.fontFamily;
    this.textarea.nativeElement.style.textTransform = styleElement.textTransform;

    this.textarea.nativeElement.focus();
    this.updateTextAreaHeight();
  }

  @HostListener('document:click', ['$event']) public onClick ($event): void {
    if (!this.inputWrapper.nativeElement.contains($event.target)) {
      this.saveChanges();
    }
  }

  public updateTextAreaHeight = (): void => {
      if (this.textarea.nativeElement.value.length) {
          this.textarea.nativeElement.style.height = `auto`;
          this.textarea.nativeElement.style.height = `${ this.textarea.nativeElement.scrollHeight }px`;
      }
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
      this.editing.parent[this.editing.field] = newValue;
    }

    this.cancelEdit();
  }
}
