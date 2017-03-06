// Extract value to Array

/**
 * @return array = ['a', 'b', 'c']
 */
export default (value) => {

  if (Array.isArray(value)) {
    return value.map(v => v.value);
  }

  const typeOfValue = typeof value;

  switch (typeOfValue) {
    case 'object' : {
      return [value.value];
    }
    case 'string' : {
      return value === '' ? [] : value.split(',');
    }
    default : break;
  }
  return value;
}
