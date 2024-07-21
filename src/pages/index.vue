<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { ErrorMessage, Field } from 'vee-validate'

defineOptions({
  name: 'IndexPage',
})
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
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

const ipAddresses = ref(new Map<string, IpApiResponse[]>())

const ipStringSchema = zod.string().refine(
  (value) => {
    const ips = value.split(',').map(ip => ip.trim())
    return ips.every(ip => zod.string().ip().safeParse(ip).success)
  },
  {
    message:
      'Invalid IP address format. Ensure all IPs are valid and separated by commas.',
  },
)

const validationSchema = toTypedSchema(
  zod.object({
    ips: zod.array(ipStringSchema),
  }),
)

// Default values
configure({
  validateOnBlur: false, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
})

useForm({
  validationSchema,
  initialValues: {
    ips: [''],
  },
})

const { remove: _, push, fields } = useFieldArray<string>('ips')

const { execute: performIpSeeking } = useAxios<IpApiResponse[]>(
  url,
  { method: 'POST' },
  { immediate: false },
)

function joinIPs(rawIPs: string) {
  return rawIPs
    .replace(/ /g, '')
    .split(',')
    .map(ip => ip.replace(/ /g, ''))
}

const isFormValid = useIsFormValid()

const lastSeekedIp = ref('')

const [isPerformingBinding, toggleBindingLoadingState] = useToggle()

async function handleIpBinding(rawIpString: string) {
  try {
    toggleBindingLoadingState()
    // Update the current loading IP to show the user which IP is being loaded
    lastSeekedIp.value = rawIpString.trim()

    // Skip if the form is invalid
    if (!isFormValid)
      return

    // Skip if the IP address is already in the map
    if (ipAddresses.value.has(rawIpString))
      return

    // Fetch the batch IP information
    const result = await performIpSeeking({
      data: joinIPs(rawIpString),
    })

    // Delay for 1 second to simulate a real-world scenario
    await delay(1000)

    // Update the map with the IP address and its result
    if (result?.data.value)
      ipAddresses.value.set(rawIpString, result.data.value)
      // TODO remove unused IPs
  }
  catch (err) {
    console.error(err)
  }
  finally {
    toggleBindingLoadingState()
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
        <fieldset v-for="(item, i) in fields" :key="i" class="mb-2 p-2">
          <div flex>
            <label
              class="mr-2 h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700"
              :for="`ip-${i}`"
            >
              {{ i + 1 }}
            </label>
            <div class="w-full">
              <Field
                :name="`ips[${i}]`"
                as="input"
                type="text"
                class="w-70% flex-grow border rounded-sm p-2 disabled:bg-gray-100 focus:outline-none"
                placeholder="Enter IP address"
                :disabled="isPerformingBinding"
                @blur="handleIpBinding($event.target.value)"
              />

              <ErrorMessage
                :name="`ips[${i}]`"
                class="block text-sm text-red-500"
              />
            </div>

            <div
              v-if="isPerformingBinding && lastSeekedIp === item.value.trim()"
            >
              ...loading
            </div>

            <!-- {{ ipAddresses.get(item.value) }} -->
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<style></style>
