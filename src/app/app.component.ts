import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

  constructor (
    private _dataService: DataService
  ) {}

  public ngOnInit (): void {
    this._dataService
      .getData()
      .subscribe(data => this.data = data);
  }
}
