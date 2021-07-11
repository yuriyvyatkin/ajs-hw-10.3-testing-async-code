import read from '../read';
import GameSavingLoader from '../GameSavingLoader';

test('class "GameSavingLoader" exists and has "load" method', () => {
  expect(GameSavingLoader).toBeDefined();
  expect(GameSavingLoader.load).toBeDefined();
});

const data = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
const buffer = new ArrayBuffer(data.length * 2);
const bufferView = new Uint16Array(buffer);
bufferView.forEach((_, i) => {
  bufferView[i] = data.charCodeAt(i);
});

jest.mock('../read');

test('resolved case of the "read" function is passing correctly', async () => {
  read.mockReturnValue(buffer);

  const expectation = {
    id: 9,
    created: 1546300800,
    userInfo: {
      id: 1,
      name: 'Hitman',
      level: 10,
      points: 2000,
    },
  };

  await expect(GameSavingLoader.load()).resolves.toEqual(expectation);
});

test('rejected case of the "read" function is passing correctly', async () => {
  expect.assertions(1);
  read.mockReturnValue(new Error());
  await expect(GameSavingLoader.load()).rejects.toBeInstanceOf(Error);
});
