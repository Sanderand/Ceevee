import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';

class DataServiceMock {
  public getData (): Observable<any> {
    return Observable.of({});
  }
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: DataService, useClass: DataServiceMock }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
