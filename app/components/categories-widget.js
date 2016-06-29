import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['categories-widget'],
  categories: null,
  chartData: Ember.computed.map('categories.@each.cost', function(category) {
    let allCost = 0;
    this.get('categories').forEach(function(item){
      allCost += item.cost;
    });
    return {
      name: category.name,
      y: category.cost / allCost * 100
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
    handleFilter() {
      let categories = this.get('categories');
      categories.popObject();
      this.set('categories', categories);
    }
  }
});
