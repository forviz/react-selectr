import _ from 'lodash';
import smartFilterOptions from '../../src/utils/smartFilterOptions';
const expect = require('chai').expect;

const options = [
  {
    label: 'Mondit Thumniramon 0881859067 salary MAle japanese rice',
    value: 'pond',
  },
  {
    label: 'Natcha Wachpanich 0866609311 salary girl Thai rice',
    value: 'gade',
  },
];

describe('smartFilterOptions filter features', function() {
  describe('#filter-001 search by single character', function() {
    it('should return id === pond', function(){
      const filteredOptions = smartFilterOptions(options, 'j');
      expect(_.get(filteredOptions, '0.value')).to.equal('pond');
    });
  });
  describe('#filter-002 search by single word', function() {
    it('should return id === pond', function(){
      const filteredOptions = smartFilterOptions(options, 'japanese');
      expect(_.get(filteredOptions, '0.value')).to.equal('pond');
    });
  });
  describe('#filter-003 search by two characters', function() {
    it('should return id === pond', function(){
      const filteredOptions = smartFilterOptions(options, 'Ma');
      expect(_.get(filteredOptions, '0.value')).to.equal('pond');
    });
  });
  describe('#filter-004 search by two words', function() {
    it('should return id === pond', function(){
      const filteredOptions = smartFilterOptions(options, 'japanese salary');
      expect(_.get(filteredOptions, '0.value')).to.equal('pond');
    });
  });
});

describe('smartFilterOptions custom filter features', function() {
  // describe('#customer-filter-options', function() {
  //   describe('#customer-filter-options-001 search by single character', function() {
  //     it('should return id === pond', function(){
  //       const filteredOptions = smartFilterOptions(options, 'j');
  //       expect(_.get(filteredOptions, '0.value')).to.equal('pond');
  //     });
  //   });
  //   describe('#customer-filter-options-002 search by single word', function() {
  //   });
  //   describe('#customer-filter-options-003 search by two characters', function() {
  //   });
  //   describe('#customer-filter-options-004 search by two words', function() {
  //   });
  // });
  describe('#customer-filter-option', function() {
    describe('#customer-filter-option-001 search by single character', function() {
      it('should return id === pond', function(){
        const filteredOptions = smartFilterOptions(options, 'j', (option, searchValue) => {
          if (option.label.indexOf(searchValue) >= 0) return true;
          return false;
        });
        expect(_.get(filteredOptions, '0.value')).to.equal('pond');
      });
    });
    describe('#customer-filter-option-002 search by single word', function() {
      it('should return id === pond', function(){
        const filteredOptions = smartFilterOptions(options, 'japanese', (option, searchValue) => {
          if (option.label.indexOf(searchValue) >= 0) return true;
          return false;
        });
        expect(_.get(filteredOptions, '0.value')).to.equal('pond');
      });
    });
    describe('#customer-filter-option-003 search by two characters', function() {
      it('should return id === pond', function(){
        const filteredOptions = smartFilterOptions(options, 'Ma', (option, searchValue) => {
          if (option.label.indexOf(searchValue) >= 0) return true;
          return false;
        });
        expect(_.get(filteredOptions, '0.value')).to.equal(undefined);
      });
    });
    describe('#customer-filter-option-004 search by two words', function() {
      it('should return id === pond', function(){
        const filteredOptions = smartFilterOptions(options, 'japanese salary', (option, searchValue) => {
          if (option.label.indexOf(searchValue) >= 0) return true;
          return false;
        });
        expect(_.get(filteredOptions, '0.value')).to.equal(undefined);
      });
    });
  });
});

//
//   describe('#case001 search by single character', function() {
//     it('should return only 1 option', function(){
//       const filteredOptions = smartFilterOptions(options, 'rice girl', (option, searchValue) => {
//         console.log('test', option.label.indexOf('girl') >= 0);
//         return option.label.indexOf('girl') >= 0;
//       });
//       expect(_.size(filteredOptions)).to.equal(1);
//     });
//   });
//   describe('search by alphabet', function() {
//     it('should return only 1 option', function(){
//       const filteredOptions = smartFilterOptions(options, 'rice girl', (option, searchValue) => {
//         console.log('test', option.label.indexOf('girl') >= 0);
//         return option.label.indexOf('girl') >= 0;
//       });
//       expect(_.size(filteredOptions)).to.equal(1);
//     });
//   });
// });
