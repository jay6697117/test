Vue.component(
  'pane',
  Vue.extend({
    name: 'pane',
    template: `
      <div class="pane" v-show="show">
        <slot></slot>
      </div>
    `,
    data: function() {
      return {
        show: true
      };
    },
    props: {
      name: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      }
    },
    methods: {
      updateNav: function() {
        this.$parent.updateNav();
      }
    },
    watch: {
      //监控label
      label: function() {
        this.updateNav();
      }
    },
    mounted: function() {
      // 初始化
      this.updateNav();
    }
  })
);