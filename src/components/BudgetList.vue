<template>
    <div class="budget-list-wrap">
          <!-- тег Element Ui некий шаблон одного элемента из списка, который будет выводить один расход, доход -->
          <ElCard :header="header">
              <!-- чтобы не вещать v-if в div с v-for, добавляем template -->
              <!-- создаем computed property, т.к. необходимо проверять количество расходов-доходов в списке и это объект, у которого нельзя просто так взять length-->
              <template v-if="!isEmpty">
                <!-- v-for - цикл -->
                <div class="list-item" v-for="(item, prop) in list" :key="prop">
                  <span class="budget-comment">{{ item.comment }}</span>
                  <span class="budget-value">{{ item.value }}</span>
                     <!-- кнопка удаления из Element-UI-->
                    <ElButton type="danger" size="mini" @click="deleteItem(item.id)">Delete</ElButton>
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
        header: 'Budget List',
        emptyTitle: "Empty List"
  }),
  computed: {
     isEmpty() {
         return !Object.keys(this.list).length;
     }
  },
  methods: {
      deleteItem(id) {
          this.$emit('deleteItem', id);
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