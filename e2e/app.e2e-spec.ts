import { CeeveePage } from './app.po';

describe('ceevee App', () => {
  let page: CeeveePage;

  beforeEach(() => {
    page = new CeeveePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
