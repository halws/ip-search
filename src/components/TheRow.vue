<script lang="ts" setup>
import { ErrorMessage, Field, useFieldValue } from 'vee-validate'
import { useHandleIpBinding } from '~/composables/useHandleIpBinding'

const { index } = defineProps<{
  index: number
}>()

const { handleIpBinding, isPerformingBinding, lastSeekedIp, ipAddresses }
  = useHandleIpBinding()

const item = useFieldValue<string>(`ips[${index}]`)

const trimmedIp = computed(() => item.value.trim())

const ipData = computed(() => ipAddresses.value.get(trimmedIp.value))

const time = ref<string[]>([])
const now = useNow()
watchEffect((onCleanup) => {
  const timer = setInterval(() => {
    if (!ipData.value)
      return

    time.value = ipData.value.map((item) => {
      return now.value.toLocaleTimeString('en-US', {
        timeZone: item.timezone,
        hour12: false, // Use 24-hour format
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    })
  }, 1000)

  onCleanup(() => {
    clearInterval(timer)
  })
})
</script>

<template>
  <fieldset class="mb-2 flex p-2">
    <div class="w-70% flex">
      <label
        class="mr-2 h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700"
        :for="`ips[${index}]`"
      >
        {{ index + 1 }}
      </label>
      <div class="w-full pr-3">
        <Field
          :id="`ips[${index}]`"
          :name="`ips[${index}]`"
          as="input"
          type="text"
          class="w-full flex-grow border rounded-sm p-2 disabled:bg-gray-100 focus:outline-none"
          placeholder="Enter IP address"
          :disabled="isPerformingBinding"
          @blur="handleIpBinding($event.target.value)"
        />
        <ErrorMessage
          :name="`ips[${index}]`"
          class="block text-sm text-red-500"
        />
      </div>
    </div>

    <div v-if="isPerformingBinding && lastSeekedIp === trimmedIp">
      ...loading
    </div>

    <div class="flex-grow">
      <div
        v-for="(item, timeIdx) in ipData || []"
        :key="item.countryCode"
        class="w-40 flex items-center"
        :class="{
          'mb-2': timeIdx !== (ipData || []).length - 1,
        }"
      >
        <span
          :class="`fi fi-${item.countryCode.toLocaleLowerCase()} text-2xl`"
        />
        <span class="pl-2"> {{ time[timeIdx] }}</span>
      </div>
    </div>
  </fieldset>
</template>
