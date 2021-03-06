<template>
  <div id="app">
    <Form @submitForm="onFormSubmit"/>
    <TotalBalance :total="totalBalance"/>
    <DeleteConfirm />
    <BudgetList :list="list" @deleteItem="onDeleteItem"/>
  </div>
</template>

<script>
import BudgetList from '@/components/BudgetList';
import TotalBalance from '@/components/TotalBalance';
import Form from '@/components/Form';
import DeleteConfirm from '@/components/DeleteConfirm';

export default {
  name: 'App',
  components: {
    BudgetList,
    TotalBalance,
    Form,
    DeleteConfirm

  },
  data: () => ({
    // список дохода, расходов (объект объектов)
    list: {
      1: {
        type: 'INCOME',
        value: 100,
        comment: 'Some comment',
        id: 1
      },
      2: {
        type: 'OUTCOME',
        value: -50,
        comment: 'Some outcome comment',
        id: 2
      },
    },
  }),
  computed: {
    totalBalance() {
      const res =  Object.values(this.list).reduce(
        (acc, item) => acc + item.value, 0);
      return res
    },
  },
  methods: {
    onDeleteItem(id) {
      this.$delete(this.list, id);
      const totalValueDiv = document.getElementsByClassName('total-value')[0];
      if (this.totalBalance === 0) {totalValueDiv.style="color: black"
      } else if (this.totalBalance < 0) {
        totalValueDiv.style="color: red"
        } else if (this.totalBalance > 0) {
          totalValueDiv.style="color: green"
          }
    },
    onFormSubmit(data) {
      const newObj = {
        ...data,
        id: String(Math.random())
      };
      this.$set(this.list, newObj.id, newObj);
      const totalValueDiv = document.getElementsByClassName('total-value')[0];
      if (this.totalBalance === 0) {totalValueDiv.style="color: black"
      } else if (this.totalBalance < 0) {
        totalValueDiv.style="color: red"
        } else if (this.totalBalance > 0) {
          totalValueDiv.style="color: green"
          }
    }
  }
}

</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
};

/* .red {
  color: rgb(235, 60, 60);
}

.green {
  color: green;
} */
</style>