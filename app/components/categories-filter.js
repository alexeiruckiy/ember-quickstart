import Ember from 'ember';

const today = 'today';
const week = 'week';
const allTime = 'all_time';

const selectOptions = {};
selectOptions[today] = 'Сегодня';
selectOptions[week] = 'За неделю';
selectOptions[allTime] = 'За все время';

export default Ember.Component.extend({
  classNames: ['categories-filter'],
  from: null,
  to: null,

  selectOptions: selectOptions,
  current: allTime,
  currentTitle: selectOptions[allTime],

  actions: {
    select(date) {
      let from;
      let to;
      switch (date) {
        case today:
          from = to = new Date();
          this.set('current', today);
          this.set('currentTitle', selectOptions[today]);
          break;
        case week:
          to = new Date();
          from = (new Date()).setDate(to.getDate() - 7);
          this.set('current', week);
          this.set('currentTitle', selectOptions[week]);
          break;
        case allTime:
        default:
          from = to = null;
          this.set('current', allTime);
          this.set('currentTitle', selectOptions[allTime]);
          break;
      }
      this.set('from', from);
      this.set('to', to);

      this.get('filter')(from, to);
    }
  }
});
