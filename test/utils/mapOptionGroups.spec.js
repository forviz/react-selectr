const expect = require('chai').expect;
import mapOptionGroups from '../../src/utils/mapOptionGroups';

describe('mapOptionGroups', () => {
  describe('Scenario: options', () => {
    const options = ['M', 'F'];
    const optionGroups = mapOptionGroups(options);
    it('should return array of empty string in', () => {
      expect(optionGroups).to.deep.equal(['']);
    });

    const options2 = [
      { value: 'M', label: 'MALE' },
      { value: 'F', label: 'FEMALE' },
    ];
    const optionGroups2 = mapOptionGroups(options2);
    it('should return array of empty string in', () => {
      expect(optionGroups2).to.deep.equal(['']);
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
        ]
      },
      {
        label: 'Europe',
        options: [
          { value: 4, label: 'France' },
          { value: 5, label: 'Germany' },
          { value: 6, label: 'England' },
        ]
      }
    ];
    const optionGroups = mapOptionGroups(options);
    it('should return array of label', () => {
      expect(optionGroups).to.deep.equal(['Asia', 'Europe']);
    });

  });
});
