// import { ZappPipesGetter } from '../index';
// import { providers } from './providersList';
// import nock from 'nock';
// import { T } from 'ramda';
// import sinon from 'sinon';

// const { get } = new ZappPipesGetter();

// test('get function is defined', () => {
//   expect(() => new ZappPipesGetter()).not.toThrow();
//   expect(get).toBeDefined();
//   expect(typeof get).toBe('function');
// });

// test('get callback is being invoked', done => {
//   const callback = jest.fn(() => done());
//   get('provider://?type=foo', callback);
//   expect(callback).toHaveBeenCalled();
// });

// test('get callback is invoked with the correct response shape', done => {
//   const callback = jest.fn(response => {
//     expect(response).toHaveProperty('URL');
//     expect(response).toHaveProperty('code');
//     expect(response).toHaveProperty('response');
//     done();
//   });

//   get('provider://?type=foo', callback);
// });

// providers.forEach(provider => {
//   if (provider.name === 'youtube') {
//     return;
//   }
//   test(`testing ${provider.name} structure`, () => {
//     expect(provider).toHaveProperty('name');
//     expect(provider).toHaveProperty('manifest');
//     expect(provider.manifest).toHaveProperty('handlers');
//     expect(provider.manifest.handlers.length).toBeGreaterThan(0);
//     expect(provider).toHaveProperty('handler');
//     expect(typeof provider.handler).toBe('function');
//     expect(provider).toHaveProperty('test');
//     expect(provider.test).toHaveProperty('testCommand');
//   });

//   if (provider.test.requestMocks && provider.test.requestMocks.length) {
//     provider.test.requestMocks.forEach(requestMock => {
//       const { host, method, path, httpCode, expectedResponse } = requestMock;
//       nock(host)
//         [method](path, T)
//         .query(T)
//         .reply(httpCode || 200, expectedResponse || {});
//     });
//   }

//   test(`testing ${provider.name} response`, done => {
//     const callback = args => {
//       expect(args).toBeDefined();
//       expect(typeof args).toBe('object');
//       expect(args).toHaveProperty('URL');
//       expect(args).toHaveProperty('code');
//       expect(args).toHaveProperty('response');
//       nock.cleanAll();
//       done();
//     };

//     global.XMLHttpRequest = sinon.FakeXMLHttpRequest;

//     get(provider.test.testCommand, callback);
//   });
// });
