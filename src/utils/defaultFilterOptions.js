const createRegExp = str => str;
// regex pattern '(cat)+\\s?(mat)|(mat)+\\s?(cat)';


 /*
   isContain function to check searchValue contain in option or not ?
   Note*
     all of searchValue seperated by space (' ') should be contained
 */
const isContain = (option, searchValue, filterOption = undefined) => {
  const searchCriterias = searchValue.split(' '); // split by space
  let found = true;
  for (const i in searchCriterias) {
    const searchCriteria = searchCriterias[i];
    if (filterOption) {
      found = filterOption(option, searchValue);
    } else {
      const regex = new RegExp(createRegExp(searchCriteria), 'gi');
      found = regex.test(option.label);
    }
    if (!found) return false;
  }
  return true;
};

/*
 * filter options by searchValue then return
 */
const defaultFilterOptions = (options, searchValue, filterOption) =>
  options.filter(option => isContain(option, searchValue, filterOption));

export default defaultFilterOptions;
