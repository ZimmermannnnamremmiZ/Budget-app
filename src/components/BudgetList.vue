<template>
    <div class="budget-list-wrap">
          <!-- тег Element Ui некий шаблон одного элемента из списка, который будет выводить один расход, доход -->
        <ElCard :header="header">
            <button @click="filterBudgetList('INCOME')" class="el-icon-sort-up">Filter by income</button>
            <button @click="filterBudgetList('OUTCOME')" class="el-icon-sort-down">Filter by outcome</button>
            <button @click="filterBudgetList('ALL')" class="el-icon-sort">Dont filter</button>
            <!-- <button @click="" class="el-icon-sort-down">Sort by outcome</button> -->
              <!-- чтобы не вещать v-if в div с v-for, добавляем template -->
              <!-- создаем computed property, т.к. необходимо проверять количество расходов-доходов в списке и это объект, у которого нельзя просто так взять length-->
            <template v-if="!isEmpty">
                <!-- v-for - цикл -->
                <div id="$list" class="list-item" v-for="(item, prop) in filteredList" :key="prop">
                  <span  class="budget-comment">{{ item.comment }}</span>

                  <span v-if="item.value>0" style="color: green" class="budget-value">{{ item.value }}</span>
                  <span v-else-if="item.value<0" style="color: red" class="budget-value">{{ item.value }}</span>

                  <i v-if="item.value>0" class="el-icon-top" style="margin-right: 10px; color: green"></i>
                  <i v-else-if="item.value<0" class="el-icon-bottom"  style="margin-right: 10px; color: red"></i>

                    <!-- кнопка удаления из Element-UI-->

                    <ElButton type="danger" size="mini"  @click="centerDialogVisible = true">Delete</ElButton>

                    <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
                        <span>Are you sure you want to remove this item?</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="centerDialogVisible = false">Cancel</el-button>
                            <el-button type="danger" @click="deleteItem(item.id), centerDialogVisible = false">Confirm</el-button>
                        </span>
                    </el-dialog>
                </div>
            </template>
            <ElAlert v-else type="info" :title="emptyTitle" :closable="false"/>
        </ElCard>
    </div>
</template>

<script>
export default {
  name: "BudgetList",
  props: {
      list: {
          type: Object,
          default: () => ({}) // в default необходимо использовать функцию, если type является массивом или объектом
      },
  },
  data: () => ({
        filteredList: {},
        header: 'Budget List',
        emptyTitle: "Empty List",
        centerDialogVisible: false,
        }),
  computed: {
     isEmpty() {
         return !Object.keys(this.list).length;
     },
  },
  created() {
  this.filterBudgetList('ALL');
  },
  methods: {
      deleteItem(id) {
          this.$emit('deleteItem', id);
      },
      console() {
          console.log(this.list)
      },
      filterBudgetList(type) {
          let listArr = Object.values(this.list);
          if (type === 'ALL') {
              this.filteredList = this.list
          } else {
              this.filteredList = listArr.filter(e => e.type === type)
          }
      }
  }
}
</script>

<style scoped>
    .budget-list-wrap {
        max-width: 500px;
        margin: auto;
    }
    .list-item {
        display: flex;
        align-items: center;
        padding: 10px 15px;
    }
    .budget-value {
        font-weight: bold;
        margin-left: auto;
        margin-right: 20px;
    }
</style>