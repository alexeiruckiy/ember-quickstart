import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-group'],
  start: '',
  end: '',

  startChanged: Ember.observer('start', function(){
    let startDate = new Date(this.get('start'));
    this.set('startDate', startDate);
    this.$end.datepicker('setStartDate', startDate);
  }),
  endChanged: Ember.observer('end', function(){
    let endDate = new Date(this.get('end'));
    this.set('endDate', endDate);
    this.$start.datepicker('setEndDate', endDate);
  }),
  
  intervalChanged: Ember.observer('startDate', 'endDate', function(){
    let startDate = this.get('startDate');
    let endDate = this.get('endDate');
    if (startDate && endDate) {
      this.get('select')(startDate, endDate);
    }
  }),
  didInsertElement(){
    this.$start = this.$('.js-start').datepicker({
      todayHighlight: true,
      language: 'ru',
      autoclose: true,
      todayBtn: 'linked'
    });
    this.$end = this.$('.js-end').datepicker({
      todayHighlight: true,
      language: 'ru',
      autoclose: true,
      todayBtn: 'linked'
    });
  }
});
