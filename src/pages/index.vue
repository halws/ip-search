<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios'

defineOptions({
  name: 'IndexPage',
})

const url = 'http://ip-api.com/batch'
interface IpApiResponse {
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

const ipAddresses = reactive([
  { raw: '', results: ref<IpApiResponse[] | undefined>(undefined) },
])

function joinIPs(rawIPs: string) {
  return rawIPs
    .replace(/ /g, '')
    .split(',')
    .map(ip => ip.replace(/ /g, ''))
}

const { execute } = useAxios<IpApiResponse[]>(
  url,
  { method: 'POST' },
  { immediate: false },
)
// execute({ params: { key: 1 } });
// execute({ params: { key: 2 } });

// execute()
async function getIpInfo(ip: string, index: number) {
  try {
    const result = await execute({
      data: joinIPs(ip),
    })

    ipAddresses[index].results = result.data.value
  }
  catch (err) {
    console.error('err: ', err)
  }
}
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
          <button class="text-sm btn" @click="getIpInfo(ipAddresses[0].raw, 0)">
            <span class="mr-2 text-xl">+</span> Add
          </button>
        </div>

        <!-- Divider -->
        <hr class="my-4 h-px border-0 bg-gray-200 dark:bg-gray-700">

        <!-- Input Fields -->
        <div
          v-for="(item, i) in ipAddresses"
          :key="i"
          class="mb-2 flex items-center p-2"
        >
          <div
            class="mr-2 h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700"
          >
            1
          </div>
          <input
            v-model="item.raw"
            type="text"
            class="flex-grow border rounded-sm p-2 focus:outline-none"
            placeholder="Enter IP address"
            @blur="getIpInfo(item.raw, i)"
          >
          {{ JSON.stringify(item.results) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
