import _map from 'lodash/map';
import _memoize from 'lodash/memoize';

import isOptionGroup from './isOptionGroup';

const mapOptionGroups = (propOptions) => {
  if (isOptionGroup(propOptions)) {
    // isOptionGroup
    return _map(propOptions, optionGroup => optionGroup.label);
  }

  // isNot optionGroups
  return [''];
};

export default _memoize(mapOptionGroups);
