import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  didInsertElement(){
    this.$('.js-date').datepicker({
      todayHighlight: true,
      language: 'ru',
      autoclose: true,
      todayBtn: 'linked'
    });
  },
  actions: {
    addCategory(){
      let store = this.get('store'),
        parent = this.get('parent');
      let category = store.createRecord('category', {
        name: this.get('name'),
        cost: this.get('cost'),
        date: new Date(this.get('date')),
        parentCategory: parent || null
      });
      category.save().then(()=>{
        if (parent){
          parent.get('subCategories').pushObject(category);
          parent.save();
        }
      });
      this.sendAction('addCategory');
    }
  }
});
