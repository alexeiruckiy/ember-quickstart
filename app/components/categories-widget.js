import Ember from 'ember';

let buildChartData = function (categories, allCost) {
  var data = [];
  categories.forEach(function(category){
    data.push({
      name: category.name,
      y: category.cost / allCost * 100
    });
  });
  return data;
};

export default Ember.Component.extend({
  classNames: ['categories-widget'],
  categories: null,
  cost: Ember.computed('categories.@each.cost', function() {
    var categories = this.get('categories');
    var cost = 0;
    categories.forEach(function(item){
      cost += item.cost;
    });
    return cost;
  }),
  categoriesChanged: Ember.observer('cost', 'categories.[]', function() {
    Ember.run.once(this, 'renderChart');
  }),
  didInsertElement() {
    this.renderChart();
  },
  renderChart(){
    let categories = this.get('categories');
    let cost = this.get('cost');
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
        name: 'Brands',
        colorByPoint: true,
        data: buildChartData(categories, cost)
      }]
    });
  },
  actions: {
    handleFilter(from, to) {
      this.set('categories', this.get('categories').reverseObjects());
    }
  }
});
