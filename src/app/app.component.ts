import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataService } from './services/data.service';
import { TYPES } from './services/types';

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

  @ViewChild('input') public input: ElementRef;
  @ViewChild('inputWrapper') public inputWrapper: ElementRef;
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
    let target = $event.target;
    let value = target.innerHTML;

    this.editing = { parent, field, target };
    this.input.nativeElement.value = value;
    this.input.nativeElement.focus();

    $event.preventDefault();
    $event.stopPropagation();

    this.updateEditBoxPosition();
  }

  @HostListener('window:resize') public updateEditBoxPosition (): void {
    let boundingBox = this.editing.target.getBoundingClientRect();
    let offsetTop = this.editing.target.offsetTop;
    let styleElement = window.getComputedStyle(this.editing.target);

    this.inputWrapper.nativeElement.style.position = 'absolute';
    this.inputWrapper.nativeElement.style.top = `${ offsetTop }px`;
    this.inputWrapper.nativeElement.style.left = `${ boundingBox.left }px`;
    this.inputWrapper.nativeElement.style.right = `32px`;
    this.inputWrapper.nativeElement.style.height = `${ boundingBox.height }px`;
    this.inputWrapper.nativeElement.classList.add('active');

    this.input.nativeElement.style.fontSize = styleElement.fontSize;
    this.input.nativeElement.style.fontWeight = styleElement.fontWeight;
    this.input.nativeElement.style.color = styleElement.color;
    this.input.nativeElement.style.lineHeight = styleElement.lineHeight;
    this.input.nativeElement.style.letterSpacing = styleElement.letterSpacing;
    this.input.nativeElement.style.fontFamily = styleElement.fontFamily;
    this.input.nativeElement.style.textTransform = styleElement.textTransform;
  }

  @HostListener('document:click', ['$event']) public onClick ($event): void {
    if (!this.inputWrapper.nativeElement.contains($event.target)) {
      this.saveChanges();
    }
  }

  public cancelEdit (): void {
    this.inputWrapper.nativeElement.classList.remove('active');
  }

  public saveChanges (): void {
    let newValue = this.input.nativeElement.value.trim();

    if (newValue.length) {
      this.editing.parent[this.editing.field] = newValue;
    }

    this.cancelEdit();
  }
}
