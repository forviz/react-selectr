import _ from 'lodash';
import filterOptions from '../../src/utils/filterOptions';
const expect = require('chai').expect;

const options = [
  {
    label: 'Mondit Thumniramon 0881859067 salary MAle japanese rice',
    value: 1,
  },
  {
    label: 'Natcha Wachpanich 0866609311 salary girl Thai rice',
    value: 2,
  },
];

describe('filterOptions function', function() {
  describe('search by alphabet', function() {
    it('should return only 1 option', function(){
      const filteredOptions = filterOptions(options, 'rice girl');
      expect(_.size(filteredOptions)).to.equal(1);
    });
  });
});
