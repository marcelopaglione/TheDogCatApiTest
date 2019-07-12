
import { fakeAsync, tick } from '@angular/core/testing';

describe('Hello world', () => {
  beforeAll(() => {});

  beforeEach(() => {});

  afterEach(() => {});

  afterAll(() => {});

  it('test name F', () => {});

  xit('test name X', () => {});

  it('test name', () => {
    pending();
  });
});

describe('this test', () => {

  it('Im a fakeAsync test', fakeAsync(() => {
    let flag = false;

    setTimeout(() => {
      flag = true;
      setTimeout(() => {
        flag = false;
      }, 100);
    }, 100);

    tick(100);
    expect(flag).toBe(true);
    tick(100);
    expect(flag).toBe(false);

  }));

  it('hello wordl', () => {
    const a = 'hello world!';
    expect(a).toContain('hello world');
  });

  it('hello word2', () => {
    const a = 'hello world!';
    expect(a).toBe('hello world');
  });

});

describe('to be versus to equal', () => {

  it('to be or not to be', () => {

    const var1 = {id: 1, nome: 'A', endereco: {rua: 'A', numero: '1'} };
    const var2 = {id: 1, nome: 'A', endereco: {rua: 'A', numero: '1'} };

    expect(var1).toEqual(var2, 'expect 1');
    expect(var1).toBe(var2, 'expect 2');

  });

});
