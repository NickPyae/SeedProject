import { TestBed, async, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpModule, Response } from '@angular/http';
import { User } from './user.model';

describe('AuthService', () => {
  let mockValidUser;
  let mockInvalidUser;
  let mockValidUserId;
  let mockInvalidUserId;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AuthService
      ]
    });

    mockValidUser = new User('pyaephyokyaw009', 'pyaephyokyaw009@gmail.com', 'ppK12345');
    mockInvalidUser =  new User('pyaephyokyaw009', 'pyaephyokyaw009@gmail.com', '');
    mockValidUserId = '58ad1443c3ddf822cbab02e4';
    mockInvalidUserId = '58ad09bbd9';
  });

  it('should be instantiated', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  describe('Function: signup', () => {
    it('should be defined', inject([AuthService], (service: AuthService) => {
      expect(service.signup).toBeDefined();
    }));

    it('should be able to signup if userName, password and email are provided', async(inject([AuthService], (service: AuthService) => {
      service.signup(mockValidUser).subscribe((response) => {
        expect(Object.keys(response)).toContain('user');
      });

    })));

    xit('should not be able to signup if user exists', async(inject([AuthService], (service: AuthService) => {
      service.signup(mockValidUser).subscribe((response) => { }, (error) => {
        expect(Object.keys(error)).toContain('error');
      });

    })));

    it('should not be able to signup if one of the userName, password and email is empty', async(inject([AuthService], (service: AuthService) => {
      service.signup(mockInvalidUser).subscribe((response) => { }, (error) => {
        expect(Object.keys(error)).toContain('error');
      });
    })));
  });

  describe('Function: deleteUser', () => {
    it('should be defined', inject([AuthService], (service: AuthService) => {
      expect(service.deleteUser).toBeDefined();
    }));

    xit('should delete user by id', async(inject([AuthService], (service: AuthService) => {
      service.deleteUser(mockValidUserId).subscribe((response) => {
        expect(Object.keys(response)).toContain('userId');
      });
    })));

    xit('should not delete user if id is not correct', async(inject([AuthService], (service: AuthService) => {
      service.deleteUser(mockInvalidUserId).subscribe((response) => { }, (error) => {
        expect(Object.keys(error)).toContain('error');
      });
    })));
  });

  describe('Function: authenticate', () => {
    xit('should be defined', inject([AuthService], (service: AuthService) => {
      expect(service.authenticate).toBeDefined();
    }));

    xit('should be able to authenticate', async(inject([AuthService], (service: AuthService) => {
      spyOn(localStorage, 'setItem').and.callThrough();

      service.authenticate(mockValidUser).subscribe((response) => {
        expect(Object.keys(response)).toContain('token');

        expect(localStorage.setItem).toHaveBeenCalled();
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      });
    })));
  });


  describe('Function: isAuthorized', () => {
    it('should be defined', inject([AuthService], (service: AuthService) => {
      expect(service.isAuthorized).toBeDefined();
    }));

    xit('should be able to access authorized endpoint if the token is valid', async(inject([AuthService], (service: AuthService) => {
      spyOn(localStorage, 'getItem').and.callThrough();

      service.isAuthorized().subscribe((response) => {
        expect(Object.keys(response)).toContain('userId');

        expect(localStorage.getItem).toHaveBeenCalled();
        expect(localStorage.getItem).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem).toHaveBeenCalledWith(service.TOKEN_KEY);
      });
    })));

    xit('should not be able to access authorized endpoint if the token is invalid', async(inject([AuthService], (service: AuthService) => {
      service.isAuthorized().subscribe((response) => {}, (error) => {
        expect(error.status).toBe(401);
      });
    })));
  });
});
