import puppeteer from 'puppeteer';

// import Item from './components/MarkersList/Item';

describe('e2e test', async () => {
  let page = null;

  beforeAll(async () => {
    const browser = await puppeteer.launch();
    const _page = await browser.newPage();
    await _page.goto('http://localhost:3000', {waitUntil: 'networkidle2'});
    page = _page;
    return true;
  }, 16000);

  test('should create correct marker', async () => {
    const inputValue = await page.evaluate(() => {
      const inputMarker = window.el.findWhere(c => c.name() === 'InputMarker');
      inputMarker.find('input').instance().value = 'test marker';
      inputMarker.simulate('keyDown', {keyCode: 13, key: 'Enter'});
      return inputMarker.find('input').instance().value;
    });
    expect(inputValue).toEqual('');
    const {newMarker, markersLength} = await page.evaluate(() => {
      const markersList = window.el.findWhere(c => c.name() === 'MarkersList');
      const marker = markersList.instance().props.markers[0];
      const length = markersList.instance().props.markers.length;
      return {
        newMarker: marker,
        markersLength: length
      };
    });
    expect(newMarker.name).toEqual('test marker');
    expect(markersLength).toEqual(1);
    expect(newMarker.id.length > 0).toEqual(true);
    const mapCenter = await page.evaluate(() => {
      const map = window.el.findWhere(c => c.name() === 'Map');
      return map.instance().center;
    });
    expect(newMarker.position).toEqual(mapCenter);
  }, 16000);

  test('remove marker', async () => {
    const markersLength = await page.evaluate(() => {
      document.querySelectorAll('.markers-list .markers-list__item .item__delete')[0].click();
      const markersList = window.el.findWhere(c => c.name() === 'MarkersList');
      const length = markersList.instance().props.markers.length;
      return length;
    });
    expect(markersLength).toEqual(0);
  });

});
