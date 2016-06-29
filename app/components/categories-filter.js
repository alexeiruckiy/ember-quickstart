import Ember from 'ember';

const today = 'today';
const week = 'week';
const allTime = 'all_time';
const interval = 'interval';

const selectOptions = {};
selectOptions[today] = 'Сегодня';
selectOptions[week] = 'За неделю';
selectOptions[allTime] = 'За все время';
selectOptions[interval] = 'Промежуток';

export default Ember.Component.extend({
  classNames: ['categories-filter'],

  selectOptions: selectOptions,
  current: allTime,
  currentTitle: selectOptions[allTime],

  isShowInterval: Ember.computed.equal('current', interval),

  actions: {
    select(date) {
      let from, to;
      switch (date) {
        case today:
          from = to = new Date();
          this.set('current', today);
          this.set('currentTitle', selectOptions[today]);
          this.get('filter')(from, to);
          break;
        case week:
          to = new Date();
          from = (new Date()).setDate(to.getDate() - 7);
          this.set('current', week);
          this.set('currentTitle', selectOptions[week]);
          this.get('filter')(from, to);
          break;
        case interval:
          this.set('current', interval);
          this.set('currentTitle', selectOptions[interval]);
          break;
        case allTime:
        default:
          from = to = null;
          this.set('current', allTime);
          this.set('currentTitle', selectOptions[allTime]);
          this.get('filter')(from, to);
          break;
      }
    },
    processInterval(from, to){
      this.get('filter')(from, to);
    }
  }
});
