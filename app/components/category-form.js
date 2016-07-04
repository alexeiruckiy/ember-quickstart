import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  errors: [],
  didUpdateAttrs() {
    this._super(...arguments);
    this.set('errors', []);
  },
  didInsertElement(){
    this.$('.js-date').datepicker({
      todayHighlight: true,
      language: 'ru',
      autoclose: true,
      todayBtn: 'linked'
    });
    this.$form = this.$('.js-create-form');
  },
  validateForm(){
    let errors = this.get('errors'),
        name = this.get('name'),
        cost = this.get('cost'),
        date = this.get('date'),
        isValid = true;
    if (!name) {
      errors.set('name', true);
      isValid = false;
    } else {
      errors.set('name', false);
    }
    if (isNaN(parseFloat(cost)) || !isFinite(cost) || cost <= 0) {
      errors.set('cost', true);
      isValid = false;
    } else {
      errors.set('cost', false);
    }
    if (!date) {
      errors.set('date', true);
      isValid = false;
    } else {
      errors.set('date', false);
    }
    return isValid;
  },
  actions: {
    addCategory(){
      if (!this.validateForm())
        return;
      let store = this.get('store'),
        parent = this.get('parent'),
        form;
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
        (form = this.$form[0]) && form.reset();
      });
      this.sendAction('addCategory');
    }
  }
});
