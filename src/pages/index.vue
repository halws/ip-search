<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div>
    <div class="w-96 border rounded-lg bg-white p-4 shadow-lg">
      <!-- Header -->
      <div class="mb-4 flex items-center justify-between border-b pb-2">
        <h1 class="text-lg font-bold">
          IP Lookup
        </h1>
        <button class="text-xl">
          &times;
        </button>
      </div>

      <!-- Description -->
      <p class="mb-4">
        Enter one or more IP addresses and get their country
      </p>

      <!-- Add Button -->
      <div class="mb-4">
        <button
          class="flex items-center rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          <span class="mr-2 text-xl">+</span> Add
        </button>
      </div>

      <!-- Input Fields -->
      <div class="mb-2 flex items-center border rounded-lg p-2">
        <div
          class="mr-2 h-6 w-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-700"
        >
          1
        </div>
        <input
          type="text"
          class="flex-grow border-none focus:outline-none"
          placeholder="Enter IP address"
        >
      </div>
    </div>
    <!-- <div i-carbon-campsite inline-block text-4xl />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Vitesse Lite
      </a>
    </p>
    <p>
      <em text-sm op75>Opinionated Vite Starter Template</em>
    </p>

    <div py-4 />

    <TheInput
      v-model="name"
      placeholder="What's your name?"
      autocomplete="false"
      @keydown.enter="go"
    />

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div> -->
  </div>
</template>
