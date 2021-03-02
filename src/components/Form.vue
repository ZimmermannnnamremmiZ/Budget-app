<template>
    <ElCard class="form-card">
      <ElForm :model="formData" :rules="rules" lable-position="top">
          <ElFormItem label="Type" prop="type">
            <ElSelect class="type-select" v-model="formData.type" placeholder="Choose type...">
              <ElOption label="Income" value="INCOME" />
              <ElOption label="Outcome" value="OUTCOME" />
            </ElSelect>
          </ElFormItem>

          <ElFormItem label="Comments" prop="comment">
            <ElInput v-model="formData.comment"/>
          </ElFormItem>

          <ElFormItem label="Value" prop="value">
            <ElInput v-model="formData.value"/>
          </ElFormItem>

          <ElButton @click="onSubmit" type="primary">Submit</ElButton>

        </ElForm>
    </ElCard>
</template>

<script>
export default {
  name: "Form",
  data: () => ({
    formData: {
      type: "INCOME",
      comment: "",
      value: 0
    },

    //необходимо создать правила (это относится к Element Ui, т.к. так работают их формы)
    rules: {
      // мы должны объявить такие же ключи как в formData
      // далее массив с условиями
      type: [
        { required: true, message: 'Please select type', triger: 'blur' }
      ],
      comment: [
        { required: true, message: 'Please input comment', triger: 'change' }
      ],
      value: [
        { required: true, message: 'Please input comment', triger: 'change' },
        { type: 'number', message: 'Value must be a number', triger: 'change' }
      ]
    }

  }),
  methods: {
    onSubmit() {

    }
  }
}
</script>

<style scoped>
.form-card {
  max-width: 500px;
  margin: auto;
}

.type-select {
  width: 100%;
}

</style>