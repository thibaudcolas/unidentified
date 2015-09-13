import { expect } from 'chai';
import routes from '../routes';

describe('example', () => {
    it('runs', () => {
        expect(parseInt('100', 10)).to.equal(100);
    });

    it('routes exists', () => {
        expect(routes).to.be.an('array');
    });
});
