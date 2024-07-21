<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { ErrorMessage, Field, FieldArray } from 'vee-validate'

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

// const ipAddresses = reactive([
//   { raw: '', results: ref<IpApiResponse[] | undefined>(undefined) },
// ]);

const { execute } = useAxios<IpApiResponse[]>(
  url,
  { method: 'POST' },
  { immediate: false },
)
// execute({ params: { key: 1 } });
// execute({ params: { key: 2 } });

// execute()
// async function getIpInfo(ip: string, index: number) {
//   try {
//     const result = await execute({
//       data: joinIPs(ip),
//     });

//     ipAddresses[index].results = result.data.value;
//   } catch (err) {
//     console.error('err: ', err);
//   }
// }

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
  validateOnMount: false,
})

const { remove: _, push } = useFieldArray<string>('ips')
</script>

<template>
  <div>
    <div class="w-2xl border rounded-sm bg-white pb-4 shadow-lg">
      <!-- Header -->
      <div class="mb-4 flex items-center justify-between border-b px-4 py-1">
        <h1 class="text-lg font-extrabold">
          IP Lookup
        </h1>
        <button class="text-4xl" @click="execute({})">
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
        <FieldArray v-slot="{ fields }" name="ips">
          <fieldset v-for="(_, i) in fields" :key="i" class="mb-2 p-2">
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
                  class="w-70% flex-grow border rounded-sm p-2 focus:outline-none"
                  placeholder="Enter IP address"
                />

                <ErrorMessage
                  :name="`ips[${i}]`"
                  class="block text-sm text-red-500"
                />
              </div>
            </div>
          </fieldset>
        </FieldArray>
      </div>
    </div>
  </div>
</template>

<style></style>
