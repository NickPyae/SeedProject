import { browser, element, by } from 'protractor';

export class Ng2testPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root')).getInnerHtml();
  }
}
