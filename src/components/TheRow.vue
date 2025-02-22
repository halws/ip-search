<script lang="ts" setup>
import { ErrorMessage, Field, useFieldValue } from 'vee-validate'
import { useHandleIpBinding } from '~/composables/useHandleIpBinding'

const { index, now } = defineProps<{
  index: number
  now: Date
}>()

const { handleIpBinding, isPerformingBinding, lastSeekedIp, ipAddresses }
  = useHandleIpBinding()

const item = useFieldValue<string>(`ips[${index}]`)

const trimmedIp = computed(() => item.value.trim())

const ipData = computed(() => ipAddresses.value.get(trimmedIp.value))

const time = computed(() => {
  if (!ipData.value)
    return []

  return ipData.value.map((item) => {
    return now.toLocaleTimeString('en-US', {
      timeZone: item.timezone,
      hour12: false, // Use 24-hour format
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  })
})
</script>

<template>
  <fieldset class="mb-2 flex p-2">
    <div class="w-70% flex">
      <label
        class="mr-2 h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
        :for="`ips[${index}]`"
      >
        {{ index + 1 }}
      </label>
      <div class="w-full pr-3">
        <Field
          :id="`ips[${index}]`" :name="`ips[${index}]`" as="input" type="text"
          class="w-full flex-grow border rounded-sm p-2 dark:border-gray-700 dark:bg-gray-800 disabled:bg-gray-100 focus:outline-none"
          placeholder="Enter IP address" :disabled="isPerformingBinding" @blur="handleIpBinding($event.target.value)"
        />
        <ErrorMessage :name="`ips[${index}]`" class="block text-sm text-red-500" />
      </div>
    </div>

    <div v-if="isPerformingBinding && lastSeekedIp === trimmedIp" class="w-30% flex items-center">
      ...loading
    </div>

    <div class="flex flex-grow flex-col justify-center">
      <div
        v-for="(item, timeIdx) in ipData || []" :key="item.countryCode" class="w-40 flex items-center" :class="{
          'mb-2': timeIdx !== (ipData || []).length - 1,
        }"
      >
        <span :class="`fi fi-${item.countryCode.toLocaleLowerCase()} text-2xl`" />
        <span class="pl-2"> {{ time[timeIdx] }}</span>
      </div>
    </div>
  </fieldset>
</template>
