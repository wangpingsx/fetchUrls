const requestMultipleUrls = require('./load');
const nock = require('nock')

describe('Load', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('Load should run ok when url returns 200', async () => {
        nock('http://fake.com')
        .get('/')
        .reply(200, '{"a":"b"}');
        const result = await requestMultipleUrls(['http://fake.com']);
        expect(result).toEqual([{'url' : "http://fake.com", 'data': {'a':'b'} }]);
    });

    it('Load should return null when url replies with error', async () => {
        nock('http://fake.com')
        .get('/1')
        .reply(200, '{"a":"b"}');

        nock('http://fake.com')
        .get('/2')
        .reply(200, '{"a2":"b2"}');

        nock('http://fake.com')
        .get('/3')
        .replyWithError({ message: 'something awful happened', code: 'AWFUL_ERROR' });
        
        const result = await requestMultipleUrls(['http://fake.com/1', 'http://fake.com/2', 'http://fake.com/3']);
        expect(result).toEqual([
            {'url' : "http://fake.com/1", 'data': {'a':'b'} },
            {'url' : "http://fake.com/2", 'data': {'a2':'b2'} },
            {'url' : "http://fake.com/3", 'data': null }]);
    });

    it('Load should return null when urls response is not 200', async () => {
        nock('http://fake.com')
        .get('/4')
        .reply(400);
        const result = await requestMultipleUrls(['http://fake.com/4']);
        expect(result).toEqual([
            {'url' : "http://fake.com/4", 'data': null }]);
    });

    it('Load should return null when urls response is not 200', async () => {
        nock('http://fake.com')
        .get('/4')
        .reply(400);
        const result = await requestMultipleUrls([]);
        expect(result).toEqual([]);
    });

    it('Load should return one result when two same urls appeared in the input', async () => {
        nock('http://fake.com')
        .get('/')
        .reply(200, '{"a":"b"}');
        const result = await requestMultipleUrls(['http://fake.com', 'http://fake.com']);
        expect(result).toEqual([{'url' : "http://fake.com", 'data': {'a':'b'} }]);
    });

  });
