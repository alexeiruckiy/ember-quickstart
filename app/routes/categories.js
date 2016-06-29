import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return {
      categories: [
        {
          id: 3,
          name: 'Авто',
          cost: 100,
          date: '07/07/2015'
        },
        {
          id: 5,
          name: 'Стиралка',
          cost: 125,
          date: '08/07/2015'
        },
        {
          id: 1,
          name: 'Мобилка',
          cost: 250,
          date: '07/07/2015'
        },
        {
          id: 7,
          name: 'Мобилка',
          cost: 350,
          date: '07/07/2015'
        }
      ]
    };
  }
});
