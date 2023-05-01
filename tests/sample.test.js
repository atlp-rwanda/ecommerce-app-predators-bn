import calculator from './sample.js';
import chai from 'chai';

const expect = chai.expect;

describe('Calculator', () => {
  it('should add 1 + 2 to equal 3', () => {
    expect(calculator.sum(1, 2)).to.equal(3);
  });

  it('should subtract 10 - 6 to equal 4', () => {
    expect(calculator.subtract(10, 6)).to.equal(4);
  });
});
