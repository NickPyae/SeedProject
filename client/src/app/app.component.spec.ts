import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { HttpModule } from '@angular/http';

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
       imports: [ RouterTestingModule, FormsModule, HttpModule ],
       providers: [ AuthService ]
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

  describe('Function: showLoginModal', () => {
      it('should be defined', () => {
        expect(comp.showLoginModal).toBeDefined();
      });

      it('should show login modal', () => {
        comp.showLoginModal();

        expect(comp.loginModalDisplay).toBe('block');
      });
   });

  describe('Function: showSignupModal', () => {
      it('should be defined', () => {
        expect(comp.showSignupModal).toBeDefined();
      });

      it('should show signup modal', () => {
        comp.showSignupModal();
        
        expect(comp.signupModalDisplay).toBe('block');
      });
   });

  describe('Function: loginToAccount', () => {
      let fakeForm;

      beforeEach(() => {
         fakeForm = new NgForm(null, null);
      });

      it('should be defined', () => {
        expect(comp.loginToAccount).toBeDefined();
      });

      it('should be called', () => {
        spyOn(comp, 'loginToAccount').and.callThrough();

        comp.loginToAccount(fakeForm);

        expect(comp.loginToAccount).toHaveBeenCalledTimes(1);
      });
   });

  describe('Function: signup', () => {
      let fakeForm;

      beforeEach(() => {
         fakeForm = new NgForm(null, null);
      });

      it('should be defined', () => {
        expect(comp.signup).toBeDefined();
      });

      it('should be called', () => {
        spyOn(comp, 'signup').and.callThrough();
        
        comp.signup(fakeForm);

        expect(comp.signup).toHaveBeenCalledTimes(1);
      });
   });

    describe('Function: cancel', () => {
      it('should be defined', () => {
        expect(comp.cancel).toBeDefined();
      });

      it('should hide signup modal', () => {
        expect(comp.signupModalDisplay).toBe('none');
      });

       it('should hide login modal', () => {
        expect(comp.loginModalDisplay).toBe('none');
      });
   });
});

