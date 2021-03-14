<template>
    <ElCard class="form-card">
      <!--атрибут ref нужен для доступа к объекту компоненты ElForm-->
      <ElForm :model="formData" status-icon ref="addItemForm" :rules="rules" lable-position="top">
          <ElFormItem label="Type" prop="type">
            <ElSelect class="type-select" v-model="formData.type" placeholder="Choose type...">
              <ElOption label="Income" value="INCOME" />
              <ElOption label="Outcome" value="OUTCOME" />
            </ElSelect>
          </ElFormItem>

          <ElFormItem label="Comments" prop="comment">
            <ElInput v-model="formData.comment" />
          </ElFormItem>

          <ElFormItem label="Value" prop="value">
            <ElInput v-model.number="formData.value" />
          </ElFormItem>

          <ElButton @click="onSubmit" type="primary">Submit</ElButton>

        </ElForm>
    </ElCard>
</template>

<script>
export default {
  name: "Form",
  data() {
      let checkValue = (rule, value, callback) => {
        if (value === 0) {
          return callback(new Error('Value cannot equiel zero'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'));
          } else {
            callback();
          }
        }, 1000);
      };

      return {
        formData: {
        type: "INCOME",
        comment: "",
        value: 0
       },

    //необходимо создать правила (это относится к Element Ui, так работают их формы)
    rules: {
      // мы должны объявить такие же ключи как в formData
      // далее массив с условиями
      type: [
        { required: true, message: 'Please select type', trigger: 'blur' }
      ],
      comment: [
        { required: true, message: 'Please input comment', trigger: 'change' }
      ],
      value: [
        { required: true, message: 'Please input value', trigger: 'change' },
        { type: 'number', message: 'Value must be a number', trigger: 'change' },
        { validator: checkValue, triger: 'blur' }
      ]
    }



  }},
    methods: {
      onSubmit() {
        this.$refs.addItemForm.validate((valid) => {
          if (this.formData.type === "OUTCOME") {if (this.formData.value > 0) {this.formData.value *= -1}} // сделал так, что отнимается в любом случае

          if (valid) {
            this.$emit('submitForm', { ...this.formData }); //оператором spread копировали объект из formData
            this.$refs.addItemForm.resetFields(); // сброс полей, есть в документации про формы
          } else {
            console.log('error submit!!');
            return false;
          }
        })
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