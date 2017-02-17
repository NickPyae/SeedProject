import { browser } from 'protractor';
import { AppComponentPage } from './app.po';

describe('AppComponent', function() {
  let page: AppComponentPage;

  beforeEach(() => {
    page = new AppComponentPage();
  });

  it('should display jumbotron: Fullstack Web Application', () => {
    page.navigateTo();
    expect(page.getJumbotron()).toContain('Fullstack Web Application');
  });

  it('should display login modal', () => {
    page.loginButton().click();

    expect(page.isLoginModalDisplayed()).toBeTruthy();
    expect(page.isSignupModalDisplayed()).toBeFalsy();
  });

  it('should cancel login modal', () => {
    page.cancelLoginButton().click();

    expect(page.isLoginModalDisplayed()).toBeFalsy();
    expect(page.isSignupModalDisplayed()).toBeFalsy();
  });

  it('should display signup modal', () => {
    page.signupButton().click();

    expect(page.isSignupModalDisplayed()).toBeTruthy();
    expect(page.isLoginModalDisplayed()).toBeFalsy();
  });

  it('should cancel signup modal', () => {
    page.cancelSignupButton().click();

    expect(page.isLoginModalDisplayed()).toBeFalsy();
    expect(page.isSignupModalDisplayed()).toBeFalsy();
  });
});
