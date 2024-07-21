import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { configure, useForm } from 'vee-validate'

function useGetForm() {
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

  // Configure the form validation
  configure({
    validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
    validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
    validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
    validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
  })

  const form = useForm({
    validationSchema,
    initialValues: {
      ips: [''],
    },
  })

  return { ...form }
}

export { useGetForm }
