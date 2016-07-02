import Model from 'ember-data/model';
import attr from 'ember-data/attr';
 import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr(),
  cost: attr('number'),
  date: attr('date'),
  subCategories: hasMany('category', { inverse: 'parentCategory' }),
  parentCategory: belongsTo('category', { inverse: 'subCategories' })
});
