// const createRegExp = (str) => {
//   const arrayOfWords = str.split(' ');
//   console.log('arrayOfWords', arrayOfWords);
//   let pattern = '';
//   for (const word in arrayOfWords) {
//     pattern += `${word}+\\s?`
//   }
//
//   '(cat)+\\s?(mat)|(mat)+\\s?(cat)';
//   return pattern;
// };

const createRegExp = str => str;

 /*
   searchValue = Mondit Pond
   then find option that
     1. has mondit and Pond
 */
 const isContain = (option, searchValue, filterOption) => {
   const searchCriterias = searchValue.split(' '); // split by space
   let found = true;
   for (const i in searchCriterias) {
     const searchCriteria = searchCriterias[i];
     if (!filterOption) {
      //  console.log('filterOption by default', option, searchValue);
       const regex = new RegExp(createRegExp(searchCriteria), 'gi');
       found = regex.test(option.label);
        //  console.log('================');
        //  console.log('label', option.label);
        //  console.log('regex', regex);
        //  console.log('isContain', found);
        //  console.log('================');
     } else {
      //  console.log('filterOption by props', option, searchValue, filterOption);
       found = filterOption(option, searchValue);
       //  console.log('================');
       //  console.log('label', option.label);
       //  console.log('regex', regex);
       //  console.log('isContain', found);
       //  console.log('================');
     }
     if (!found) return found;
   }
   return found;
 };

 /*
  * filter options by searchValue then return
  */

const smartFilterOptions = (options, searchValue, filterOption) => {
  return options.filter(option => isContain(option, searchValue, filterOption));
};

export default smartFilterOptions;
