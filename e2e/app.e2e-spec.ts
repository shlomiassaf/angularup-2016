import { AngularUpDynamicContentPage } from './app.po';

describe('angular-up-dynamic-content App', function() {
  let page: AngularUpDynamicContentPage;

  beforeEach(() => {
    page = new AngularUpDynamicContentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
