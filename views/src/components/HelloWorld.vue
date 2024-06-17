<template>
  <div class="chat">
    <div class="chat-header">
      <span>Nest Chat App</span>
    </div>
    <div class="chat-message-list">
      <div
        v-for="(message, idx) in messages"
        :key="idx"
        :class="['chat-message', { outgoing: currentUser === message.author }]"
      >
        <div class="chat-message-wrapper">
          <span class="chat-message-author">{{ message.author }}</span>
          <div class="chat-message-bubble">
            <span class="chat-message-body">{{ message.body }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-composer">
      <input
        class="chat-composer-input"
        placeholder="Type message here"
        v-model="inputValue"
        @keydown="handleSendMessage"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

const SystemMessage = {
  id: 1,
  body: 'Welcome to the Nest Chat app',
  author: 'Bot',
};

const socket = new WebSocket('http://127.0.0.1:8081');

export default {
  props: {
    currentUser: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const inputValue = ref('');
    const messages = ref([SystemMessage]);

    onMounted(() => {
      socket.onopen = () => {
        console.log('Connected');
        socket.send(
          JSON.stringify({
            event: 'init',
            data: 'from browser',
          }),
        );
      };
      socket.onmessage = (event) => {
        const parsed = JSON.parse(event.data);
        messages.value = [...messages.value, parsed.data.message];
      };
    });

    const handleSendMessage = (e) => {
      if (e.key !== 'Enter' || inputValue.value.trim().length === 0) return;
      socket.send(
        JSON.stringify({
          event: 'chat',
          data: {
            id: Math.random(),
            author: props.currentUser,
            body: inputValue.value,
          },
        }),
      );
      inputValue.value = '';
    };

    return {
      inputValue,
      messages,
      handleSendMessage,
    };
  },
};
</script>

<style>
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

.login {
  display: flex;
  flex-direction: column;
  width: 320px;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e3e0e0;
}

.login-title {
  font-size: 2rem;
  color: #445263;
  font-weight: 500;
  margin-bottom: 2rem;
}

.login .input {
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
}

.button {
  color: #fff;
  font-size: 1rem;
  background-color: #007bff;
  border-color: #007bff;
  border-radius: 0.2rem;
  text-align: center;
  border: 1px solid transparent;
  padding: 0.35rem 0.5rem;
  cursor: pointer;
}

.chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 60%;
  border-left: 1px solid #d1dbe3;
  border-right: 1px solid #d1dbe3;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6fbff;
  font-size: 1em;
  border: solid #d1dbe3;
  border-width: 0 0 1px;
  padding: 0.9em 0.9em;
}

.chat-header span {
  font-weight: 700;
  color: rgba(0, 0, 0, 0.87);
}

.chat-message-list {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 48px);
  width: auto;
  overflow: auto;
  color: rgba(0, 0, 0, 0.87);
  background-color: #fff;
  padding: 12px 8px;
}

.chat-message {
  display: block;
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.91em;
  margin: 0.4em 0 0;
  width: 50%;
}

.chat-message-wrapper {
  display: flex;
  flex-direction: column;
}

.chat-message-bubble {
  width: fit-content;
  border-radius: 0 0.7em 0.7em 0;
  background-color: #c6e3fa;
  padding: 0.6em 0.9em;
}

.chat-message-body {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.chat-message-author {
  font-size: 0.81em;
  font-weight: 600;
  margin-bottom: 2px;
}

.outgoing {
  margin-left: auto;
}

.outgoing .chat-message-wrapper {
  align-items: end;
}

.outgoing .chat-message-bubble {
  background-color: #6bb9f2;
  border-radius: 0.7em 0 0 0.7em;
}

.outgoing .chat-message-author {
  display: none;
}

.chat-composer {
  display: flex;
  padding: 0.5em;
  border-top: 1px solid #d1dbe3;
}

.chat-composer-input {
  width: 100%;
  border: 0;
  background-color: #c6e3fa;
  padding: 0.8em 0.9em;
  border-radius: 0.7em;
  color: rgba(0, 0, 0, 0.87);
  font-size: 15px;
}
</style>
