<template>
  <div class="hello">
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  data() {
    return {
      message: '',
    };
  },
  mounted() {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      console.log('Connected');
      socket.send(
        JSON.stringify({
          event: 'events',
          data: 'from browser',
        }),
      );
    };
    socket.onmessage = (event) => {
      this.message = event.data;
    };
  },
});
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
