import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['categories-list'],
  actions: {
    precessRemove(category){
      this.get('remove')(category);
    }
  }
});
