import _find from 'lodash/find';

export default (options, value) => {
  return _find(options, option => option.value === value)
}
