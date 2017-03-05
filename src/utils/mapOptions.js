import _map from 'lodash/map';
import _flatten from 'lodash/flatten';
import _isString from 'lodash/isString';
import _memoize from 'lodash/memoize';

import isOptionGroup from './isOptionGroup';

const mapOptions = (propOptions) => {
  if (isOptionGroup(propOptions)) {
    const allOptions = _flatten(_map(propOptions, (optionGroup, groupIndex) => {
      return _map(optionGroup.options, (opt) => {
        if (_isString(opt)) return { label: opt, value: opt, groupIndex };
        return { ...opt, groupIndex };
      });
    }));

    return _map(allOptions, (opt, optionIndex) => ({ ...opt, optionIndex }));
  }

  // Not Option Group
  return _map(propOptions, (opt, index) => {
    if (_isString(opt)) return { label: opt, value: opt, optionIndex: index, groupIndex: 0 };
    return { ...opt, optionIndex: index, groupIndex: 0 };
  });
};

export default _memoize(mapOptions);
