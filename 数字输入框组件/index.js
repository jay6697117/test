//index.js
const vm = new Vue({
  el: '#app',
  data: {
    num_parent: 20,
    step_parent: 1,
    max_num_parent: 100,
    min_num_parent: 0,
    steps: [1, 2, 3, 5, 10, 15, 20]
  },
  methods: {
    handleInput(value) {
      console.log('子组件事件传值:', value); //测试
      console.log('-----------------------------------');
      this.num_parent = value;
    },
    selectChange(event) {
      console.log('selectChange event:', event); //测试
      this.step_parent = Number(event.target.value);
    }
  }
});
