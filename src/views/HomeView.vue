<!-- 
  * delete this file *
  This is a sample file with sample code of how to use $bridge and $fetch methods.
-->

<template>
  <div class="container">
    <div class="action-menu">
      <div class="title">
        <h3>Mini App</h3>
      </div>
      <ul>
        <li>
          <div class="submenu">Example Actions</div>
          <ul class="sub">
            <li @click="getUsers()">GET Users</li>
            <li @click="postUser()">POST Users</li>
            <li @click="errorPost()">POST Error</li>
            <li @click="registerBridge()">Register Bridge</li>
            <li @click="callBridge()">Call Bridge</li>
          </ul>
        </li>
        <li style="margin-top: 20px">
          <div class="submenu">Resources</div>
          <ul class="sub">
            <li>
              <a
                href="https://www.npmjs.com/package/vue-bridge-gateway"
                target="_blank"
              >
                Vue Bridge Gateway
              </a>
            </li>
            <li>
              <a
                href="https://github.com/ABA-Bank/mini-app-boilerplate"
                target="_blank"
              >
                Boilerplate Github
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <footer>
        <div class="reset" @click="displayJson = null">Clear Results</div>
      </footer>
    </div>
    <div class="display-result">
      <pre v-if="displayJson">
       {{ displayJson }}
      </pre>
      <div class="info-text">$bridge does not work outside the native app</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue'
import { useUserStore } from '../store/user'

const displayJson = ref()

const $fetch = inject('$fetch')
const $bridge = inject('$bridge')
const store = useUserStore()

// here we call $fetch from Pinia action name 'fetchUsers' and show result in displayJson
// if you use Vuex, you can find example in the readme file at https://www.npmjs.com/package/vue-bridge-gateway
const getUsers = () => {
  displayJson.value = 'Loading...'
  store.fetchUsers().then(() => {
    displayJson.value = store.users
  })
}

// here we use $fetch directly which we've injected and post user to the server
// change to invalid URL to see error handling
const postUser = () => {
  displayJson.value = 'Loading...'
  $fetch
    .post('https://jsonplaceholder.typicode.com/posts', {
      // set custom headers
      headers: {
        'Content-Type': 'application/json',
      },

      // payload
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
    })
    .then((res) => {
      displayJson.value = res.data
    })
    .catch((error) => {
      displayJson.value = { error }
    })
}

// here we use $fetch directly which we've injected and post user to the server
// change to invalid URL to see error handling
const errorPost = () => {
  displayJson.value = 'Loading...'
  $fetch
    .post('https://jsonplaceholder.typicode.com/wrong-path', {
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
    })
    .catch((error) => {
      displayJson.value = { error }
    })
}

// register a bridger handler name "myListener"
const registerBridge = () => {
  $bridge.registerHandler('myListener', (data, callback) => {
    console.log('data from native:', data)
    const responseData = { 'Javascript Says': 'Right back atcha!' }
    console.log('JS responding to native with', responseData)
    callback(responseData)
  })
}

// call bridge handler name "getProfile"
const callBridge = () => {
  $bridge
    .callHandler('getProfile')
    .then(() => {
      displayJson.value = 'Bridge called'
      // do other stuffs
    })
    .catch(() => {
      displayJson.value =
        'Bridge handler not found or being called outside the native app'
    })
}

onMounted(() => {})
</script>

<style lang="scss">
// importing external fonts needed to be included in whitelist
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300&family=Roboto:wght@300&display=swap');
html,
body {
  padding: 0;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}
.container {
  display: flex;
  height: 100vh;
  width: 100%;
  .action-menu {
    min-width: 200px;
    height: 100%;
    display: flex;
    flex-direction: column;

    .title {
      padding: 16px 8px;
      color: black;
      background: #004564;
      color: white;
      h3 {
        font-size: 1.5rem;
        margin: 0;
      }
    }

    ul {
      flex: 1;
      list-style: none;
      padding-left: 8px;
      li {
        padding-top: 8px;
        width: 100%;
        cursor: pointer;

        .submenu {
          color: black;
          font-weight: bold;
        }
      }

      &.sub li {
        &:hover {
          color: #004564;
        }
      }
    }

    footer {
      padding: 8px 16px 8px;
      .reset {
        cursor: pointer;
        color: #004564;
        background: white;
        &:hover {
          color: #004564;
          background: white;
        }
      }
    }
  }

  .display-result {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;
    background: #2d2d2d;
    font-family: 'Fira Code', monospace;
    position: relative;
    color: #7ec699;

    .info-text {
      position: fixed;
      bottom: 8px;
      right: 16px;
      font-size: 12px;
      color: #af956d;
    }
  }
}
* {
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px #7ec699;
  }
  &::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px #7ec699;
  }
}
</style>
