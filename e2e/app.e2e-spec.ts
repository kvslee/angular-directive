import { DirectivePage } from './app.po';

describe('directive App', function() {
  let page: DirectivePage;

  beforeEach(() => {
    page = new DirectivePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
