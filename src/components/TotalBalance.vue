<template>
  <div class="total-value" :class="[red]">Balance: {{ total }}</div>
</template>

<script>
export default {
    name: "TotalBalance",
    props: {
      total: {
        type: Number,
        default: 0
      }
    },
    // data: () => ({

    // })
}
</script>

<style scoped>
.total-value {
  font-style: 26px;
  text-transform: uppercase;
  padding: 20px;
  text-align: center;
};

.red {
  color: red;
}
</style>