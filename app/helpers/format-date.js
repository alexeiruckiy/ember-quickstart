import Ember from 'ember';

export function formatDate(params/*, hash*/) {
  let date = params[0];
  if (!date){
    return date;
  }
  let year = date.getFullYear(),
    month = date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1),
    day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();

  return `${month}/${day}/${year}`;
}

export default Ember.Helper.helper(formatDate);
