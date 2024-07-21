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
</script>

<template>
  <fieldset class="mb-2 flex p-2">
    <label
      class="mr-2 h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700"
      :for="`ips[${index}]`"
    >
      {{ index + 1 }}
    </label>
    <div class="w-full">
      <Field
        :id="`ips[${index}]`"
        :name="`ips[${index}]`"
        as="input"
        type="text"
        class="w-70% flex-grow border rounded-sm p-2 disabled:bg-gray-100 focus:outline-none"
        placeholder="Enter IP address"
        :disabled="isPerformingBinding"
        @blur="handleIpBinding($event.target.value)"
      />

      <ErrorMessage
        :name="`ips[${index}]`"
        class="block text-sm text-red-500"
      />
    </div>

    <div v-if="isPerformingBinding && lastSeekedIp === trimmedIp">
      ...loading
    </div>

    <pre>
        values: {{ item }}
    </pre>

    {{ ipData }}
  </fieldset>
</template>
