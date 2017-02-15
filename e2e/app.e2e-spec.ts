import { Ng2testPage } from './app.po';

describe('ng2test App', function() {
  let page: Ng2testPage;

  beforeEach(() => {
    page = new Ng2testPage();
  });

  it('should display jumbotron: Fullstack Web Application', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Fullstack Web Application');
  });
});
