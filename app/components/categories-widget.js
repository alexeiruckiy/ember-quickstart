import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['categories-widget'],
  categories: null,
  chartData: Ember.computed.map('categories.@each.cost', function(category) {
    let allCost = 0;
    this.get('categories').forEach(function(item){
      allCost += item.get('cost');
    });
    return {
      name: category.get('name'),
      y: category.get('cost') / allCost * 100
    };
  }),
  categoriesChanged: Ember.observer('chartData', function() {
    Ember.run.once(this, 'renderChart');
  }),
  didInsertElement() {
    this.renderChart();
  },
  renderChart(){
    this.$('.js-chart-container').highcharts({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Затраты категорий на графике'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: 'Чё по чем',
        colorByPoint: true,
        data: this.get('chartData')
      }]
    });
  },
  actions: {
    handleFilter(from, to) {
      let parent = this.get('parent');
      this.get('store').query('category', {
        parentCategory: parent && parent.id
      }).then((categories)=>{
        categories = categories.filter(function(item){
          var date = item.get('date');
          return (!from || date >= from) && (!to || date <= to);
        });
        this.set('categories', categories);
      });
    }
  }
});
