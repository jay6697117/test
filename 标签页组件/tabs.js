Vue.component(
  'tabs',
  Vue.extend({
    template: `
      <div class="tabs">
        <div class="tabs-bar"></div>
        <div class="tabs-content">
          <slot></slot>
        </div>
      </div>
    `,
    data: function() {
      return {
        //用户渲染tabs的标题
        navList: []
      };
    },
    methods: {
      getTabs() {
        //通过遍历子组件, 得到所有的pane组件
        return this.$children.filter(item => {
          return item.$options.name === 'pane';
        });
      },
      updateNav() {
        this.navList = [];
        this.getTabs().forEach((pane, index) => {
          this.navList.push({
            label: pane.label,
            name: pane.name || index
          });
          //如果没有给pane设置name，默认设置它的索引
          if (!pane.name) {
            pane.name = index;
          }

          if (index === 0) {
            if (!this.currentValue) {
              this.currentValue = pane.name || index;
            }
          }
        });
        this.updateStatus();
      },
      updateStatus() {
        this.getTabs().forEach(tab => {
          return (tab.show = tab.name === this.currentValue);
        });
      }
    }
  })
);