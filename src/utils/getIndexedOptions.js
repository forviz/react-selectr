/*
 * Convert options and optgroup into one array with indexed
 * for handling when using arrow keyboard up / down to navigate through option.
 */
import _ from 'lodash';
import isOptionGroup from './isOptionGroup';

const getIndexedOptions = (options) => {
  // If normal options, return them;
  if (!isOptionGroup(options)) return options;

  // If OptionGroup
  // Extract optionGroup.options from each optionGroup, and then flatten them into single array.
  return _.flatten(_.map(options, optionGroup => optionGroup.options));
};

export default getIndexedOptions;
