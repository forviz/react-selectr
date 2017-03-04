const expect = require('chai').expect;
import mapOptions from '../../src/utils/mapOptions';

describe('mapOptions', () => {
  describe('Scenario: options', () => {
    const options = ['M', 'F'];
    const optionGroups = mapOptions(options);
    it('should return array of option with value/label/groupIndex', () => {
      expect(optionGroups[0].label).to.equal('M');
      expect(optionGroups[0].value).to.equal('M');
      expect(optionGroups[0].groupIndex).to.equal(0);

      expect(optionGroups[1].label).to.equal('F');
      expect(optionGroups[1].value).to.equal('F');
      expect(optionGroups[1].groupIndex).to.equal(0);
    });

    const options2 = [
      { value: 'M', label: 'MALE' },
      { value: 'F', label: 'FEMALE' },
    ];
    const optionGroups2 = mapOptions(options2);
    it('should return array of value:value / label:label in', () => {
      expect(optionGroups2[0].label).to.equal('MALE');
      expect(optionGroups2[0].value).to.equal('M');
      expect(optionGroups2[0].groupIndex).to.equal(0);

      expect(optionGroups2[1].label).to.equal('FEMALE');
      expect(optionGroups2[1].value).to.equal('F');
      expect(optionGroups2[1].groupIndex).to.equal(0);
    });
  });

  describe('Scenario: optionGroups', () => {
    const options = [
      {
        label: 'Asia',
        options: [
          { value: 1, label: 'Thailand' },
          { value: 2, label: 'Laos' },
          { value: 3, label: 'Vietnam' },
        ],
      },
      {
        label: 'Europe',
        options: [
          { value: 4, label: 'France' },
          { value: 5, label: 'Germany' },
          { value: 6, label: 'England' },
        ],
      },
    ];
    const optionGroups = mapOptions(options);
    it('should return array of label', () => {
      expect(optionGroups).to.have.lengthOf(6);
      expect(optionGroups[0].label).to.equal('Thailand');
      expect(optionGroups[0].value).to.equal(1);
      expect(optionGroups[0].optionIndex).to.equal(0);
      expect(optionGroups[0].groupIndex).to.equal(0);

      expect(optionGroups[3].label).to.equal('France');
      expect(optionGroups[3].value).to.equal(4);
      expect(optionGroups[3].optionIndex).to.equal(3);
      expect(optionGroups[3].groupIndex).to.equal(1);
    });

  });
});
