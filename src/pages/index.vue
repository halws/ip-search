<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div>
    <div class="w-2xl border rounded-sm bg-white pb-4 shadow-lg">
      <!-- Header -->
      <div class="mb-4 flex items-center justify-between border-b px-4 py-1">
        <h1 class="text-lg font-extrabold">
          IP Lookup
        </h1>
        <button class="text-4xl">
          &times;
        </button>
      </div>

      <!-- Content -->
      <div class="px-4 text-left">
        <!-- Description -->
        <p class="mb-4">
          Enter one or more IP addresses and get their country
        </p>
        <!-- Add Button -->
        <div class="mb-4">
          <button class="text-sm btn">
            <span class="mr-2 text-xl">+</span> Add
          </button>
        </div>

        <!-- Divider -->
        <hr class="my-4 h-px border-0 bg-gray-200 dark:bg-gray-700">

        <!-- Input Fields -->
        <div class="mb-2 flex items-center p-2">
          <div class="mr-2 h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700">
            1
          </div>
          <input type="text" class="flex-grow border rounded-sm p-2 focus:outline-none" placeholder="Enter IP address">
        </div>
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

<style></style>
