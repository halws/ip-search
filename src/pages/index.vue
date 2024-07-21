<script setup lang="ts">
import { useGetForm } from '~/composables/useGetForm'

defineOptions({
  name: 'IndexPage',
})

export interface IpApiResponse {
  status: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
  query: string
}

// initialize the form
useGetForm()

const { push, fields } = useFieldArray<string>('ips')
</script>

<template>
  <div>
    <div class="w-2xl border rounded-sm bg-white pb-4 shadow-lg">
      <!-- Header -->
      <div class="mb-4 flex items-center justify-between border-b px-4 py-1">
        <h1 class="text-lg font-extrabold">
          IP Lookup
        </h1>
        <button class="text-4xl" @click="null">
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
          <button class="text-sm btn" @click="push('')">
            <span class="mr-2 text-xl">+</span> Add
          </button>
        </div>

        <!-- Divider -->
        <hr class="my-4 h-px border-0 bg-gray-200 dark:bg-gray-700">

        <!-- Input Fields -->
        <TheRow v-for="(_, i) in fields" :key="i" :index="i" />
      </div>
    </div>
  </div>
</template>

<style></style>
