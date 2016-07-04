import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['categories-widget'],
  chartData: Ember.computed('categories.@each.cost', function () {
    let parent = this.filterParent(),
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
  didRender() {
    this.renderChart();
    this.$list = this.$('.js-list-tab');
    this.$form = this.$('.js-form-tab');
  },
  renderChart(){
    let parent = this.get('parent');
    this.$('.js-chart-container').highcharts({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: parent ? `Затраты ${parent.get('name')} на графике` : 'Затраты категорий на графике'
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
  filterParent(){
    let parent = this.get('parent');
    if (!parent)
      return null;
    return this.checkCategoryDate(parent) && parent;
  },
  checkCategoryDate(category){
    let fromDate = this.get('fromDate'),
        toDate = this.get('toDate'),
        date = category.get('date');
    return (!fromDate || date >= fromDate) && (!toDate || date <= toDate);
  },
  actions: {
    handleFilter(from, to) {
      let parent = this.get('parent'),
          store = this.get('store'),
          categories, promise;
      this.set('fromDate', from);
      this.set('toDate', to);
      if (parent) {
        promise = store.query('category', {
          parentCategory: parent.id
        });
      } else {
        promise = store.findAll('category');
      }
      promise.then((categories)=> {
        categories = categories.filter(this.checkCategoryDate.bind(this));
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
