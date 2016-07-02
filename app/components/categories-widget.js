import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['categories-widget'],
  categories: null,
  chartData: Ember.computed('categories.@each.cost', function () {
    let parent = this.get('parent'),
      allCost = 0,
      chartData;
    if (parent) {
      allCost += parent.get('cost');
    }
    this.get('categories').forEach(function (item) {
      allCost += item.get('cost');
    });
    chartData = this.get('categories').map(function (category) {
      return {
        name: category.get('name'),
        y: category.get('cost') / allCost * 100
      };
    });
    if (parent) {
      chartData.push({
        name: parent.get('name'),
        y: parent.get('cost') / allCost * 100
      });
    }
    return chartData;
  }),
  categoriesChanged: Ember.observer('chartData', function () {
    Ember.run.once(this, 'renderChart');
  }),
  didInsertElement() {
    this.renderChart();
    this.$list = this.$('.js-list-tab');
    this.$form = this.$('.js-form-tab');
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
      let parent = this.get('parent'),
        store = this.get('store'),
        categories, promise;
      if (parent) {
        promise = store.query('category', {
          parentCategory: parent.id
        });
      } else {
        promise = store.findAll('category');
      }
      promise.then((categories)=> {
        categories = categories.filter(function (item) {
          let date = item.get('date');
          return (!from || date >= from) && (!to || date <= to);
        });
        this.set('categories', categories);
      });
    },
    handleRemove(category) {
      category.get('parentCategory').then(function(parent){
        if(parent) {
          parent.get('subCategories').removeObject(category);
          parent.save().then(()=>{
            category.destroyRecord();
          });
        } else {
          category.destroyRecord();
        }
      });
    },
    handleAdd() {
      this.$list.tab('show');
    }
  }
});
