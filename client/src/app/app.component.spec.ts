import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let comp:    AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AppComponent
      ],
       imports: [ RouterTestingModule ]
    });

    TestBed.compileComponents();
    fixture = TestBed.createComponent(AppComponent);

    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('should render its template', async(() => {
      fixture.detectChanges();
      expect(el.innerHTML).toContain('nav');
  }));
});

