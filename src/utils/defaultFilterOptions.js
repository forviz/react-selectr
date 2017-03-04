import _ from 'lodash';

const createRegExp = str => str;
// regex pattern '(cat)+\\s?(mat)|(mat)+\\s?(cat)';

 /*
   isContain function to check searchValue contain in option or not ?
   Note*
     all of searchValue seperated by space (' ') should be contained
 */
const isContain = (option, searchValue) => {
  const searchCriterias = searchValue.split(' '); // split by space
  const found = _.every(searchCriterias, (searchCriteria) => {
    const regex = new RegExp(createRegExp(searchCriteria), 'gi');
    return regex.test(option.label);
  });
  return found;
};

/*
 * filter options by searchValue
 */
const defaultFilterOptions = (options, searchValue, filterOption = undefined) => {
  const filterOptionFunc = filterOption || isContain;
  return options.filter(option => filterOptionFunc(option, searchValue));
};

export default defaultFilterOptions;
