import { useAxios } from '@vueuse/integrations/useAxios'
import type { IpApiResponse } from '~/pages/index.vue'

const ipApiBatchUrl = 'http://ip-api.com/batch'

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function joinIPs(rawIPs: string) {
  return rawIPs
    .replace(/ /g, '')
    .split(',')
    .map(ip => ip.replace(/ /g, ''))
}

function useHandleIpBinding(): {
  handleIpBinding: (rawIpString: string) => Promise<void>
  isPerformingBinding: Ref<boolean>
  lastSeekedIp: Ref<string>
  ipAddresses: Ref<Map<string, IpApiResponse[]>>
} {
  const ipAddresses = ref(new Map<string, IpApiResponse[]>())
  const lastSeekedIp = ref('')

  const [isPerformingBinding, toggleBindingLoadingState] = useToggle()
  const isFormValid = useIsFormValid()

  const { execute: performIpSeeking } = useAxios<IpApiResponse[]>(
    ipApiBatchUrl,
    { method: 'POST' },
    { immediate: false },
  )

  async function handleIpBinding(rawIpString: string) {
    // Skip if the form is invalid
    if (!isFormValid.value)
      return

    try {
      toggleBindingLoadingState()
      // Update the current loading IP to show the user which IP is being loaded
      lastSeekedIp.value = rawIpString.trim()

      // cache: Skip if the IP address is already in the map

      if (ipAddresses.value.has(rawIpString.trim()))
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

  return { handleIpBinding, isPerformingBinding, lastSeekedIp, ipAddresses }
}
// to omit global state we can use shared composable
const sharedComposable = createSharedComposable(useHandleIpBinding)
export { sharedComposable as useHandleIpBinding }
