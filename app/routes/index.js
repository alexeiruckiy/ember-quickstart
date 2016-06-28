import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return [
      {
        name: 'Авто',
        cost: 200,
        date: '2015-07-07'
      },
      {
        name: 'Стиралка',
        cost: 100,
        date: '2015-07-08'
      },
      {
        name: 'Мобилка',
        cost: 150,
        date: '2015-07-07'
      }
    ];
  }
});
