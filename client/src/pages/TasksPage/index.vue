<template>
  <div id="propagation-container" class="page-wrapper">
    <TaskGrid />
  </div>
</template>

<script>
import TaskGrid from '../../components/task/TaskGrid';

export default {
  components: {
    TaskGrid,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
#propagation-container {
  background-image: url('../../assets/plants-background.jpeg');
}
</style>
