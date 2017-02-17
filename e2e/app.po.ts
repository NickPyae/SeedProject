import { browser, element, by } from 'protractor';

export class AppComponentPage {
  navigateTo() {
    return browser.get('/');
  }

  getJumbotron() {
    return element(by.css('app-root')).getInnerHtml();
  }

  signupButton() {
    return element(by.className('glyphicon-user'));
  }

  loginButton() {
    return element(by.className('glyphicon-log-in'));
  }

  cancelLoginButton() {
    return element.all(by.className('loginmodal-cancel')).get(0);
  }

  cancelSignupButton() {
    return element.all(by.className('loginmodal-cancel')).get(1);
  }

  isLoginModalDisplayed() {
    return element.all(by.css('.modal')).get(0).isDisplayed();
  }

   isSignupModalDisplayed() {
    return element.all(by.css('.modal')).get(1).isDisplayed();
  }
}
