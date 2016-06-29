import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return {
      categories: [
        {
          id: 1,
          name: 'Авто',
          cost: 200,
          date: '07/07/2015',
          categories: [
            {
              id: 3,
              name: 'Авто',
              cost: 100,
              date: '07/07/2015'
            }
          ]
        },
        {
          id: 2,
          name: 'Стиралка',
          cost: 100,
          date: '08/07/2015',
          categories: [
            {
              id: 3,
              name: 'Авто',
              cost: 100,
              date: '07/07/2015'
            }
          ]
        },
        {
          id: 3,
          name: 'Мобилка',
          cost: 150,
          date: '07/07/2015',
          categories: [
            {
              id: 3,
              name: 'Авто',
              cost: 100,
              date: '07/07/2015'
            }
          ]
        }
      ]
    };
  }
});
