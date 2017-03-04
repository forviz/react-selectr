// Extract string value from either Objet or String
// { value: '', label: ''} or 'value'
import _ from 'lodash';

const getOptionValue = option => _.get(option, 'value', option);

export default getOptionValue;
