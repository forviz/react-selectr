import _ from 'lodash';

const isOptionGroup = (options) => {
  if (_.every(options, option => option.options !== undefined)) {
    return true;
  }
  return false;
};

export default isOptionGroup;
