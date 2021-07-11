import read from './read';
import json from './json';

export default class GameSavingLoader {
  static async load() {
    const data = await read();
    const value = await json(data);
    return JSON.parse(value);
  }
}
