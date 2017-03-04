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
 const isContain = (option, searchValue) => {
   const searchCriterias = searchValue.split(' '); // split by space
   let found = true;
   for (const i in searchCriterias) {
     const searchCriteria = searchCriterias[i];
     const regex = new RegExp(createRegExp(searchCriteria), 'gi');
     found = regex.test(option.label);
    //  console.log('================');
    //  console.log('label', option.label);
    //  console.log('regex', regex);
    //  console.log('isContain', found);
    //  console.log('================');
     if (!found) return found;
   }
   return found;
 };

 /*
  * filter options by searchValue then return
  */

const filterOptions = (options, searchValue) => {
  return options.filter(option => isContain(option, searchValue));
};

export default filterOptions;
