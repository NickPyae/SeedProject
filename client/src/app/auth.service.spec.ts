import { TestBed, async, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpModule, Response } from '@angular/http';
import { User } from './user.model';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
     imports: [ HttpModule ],
     providers: [
        AuthService
      ]
    });
  });

  it('should be instantiated', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  describe('Function: signup', () => {
    it('should be defined', inject([AuthService], (service: AuthService) => {
      expect(service.signup).toBeDefined();
    }));

    it('should be able to signup if userName, password and email are provided', async(inject([AuthService], (service: AuthService) => {
      let mockUser = new User('pyaephyokyaw009', 'pyaephyokyaw009@gmail.com', 'ppK12345');

      service.signup(mockUser).subscribe((response) => {
        expect(Object.keys(response)).toContain('user');
      });

    })));

    it('should not be able to signup if userName, password and email exist', async(inject([AuthService], (service: AuthService) => {
      let mockUser = new User('pyaephyokyaw009', 'pyaephyokyaw009@gmail.com', 'ppK12345');

      service.signup(mockUser).subscribe((response) => {}, (error) => {
        expect(Object.keys(error)).toContain('error');
      });

    })));

    it('should not be able to signup if userName, password and email are empty', async(inject([AuthService], (service: AuthService) => {
      let mockUser = new User('pyaephyokyaw009', 'pyaephyokyaw009@gmail.com', '');

      service.signup(mockUser).subscribe((response) => {}, (error) => {
        expect(Object.keys(error)).toContain('error');
      });
    })));
  });
});
