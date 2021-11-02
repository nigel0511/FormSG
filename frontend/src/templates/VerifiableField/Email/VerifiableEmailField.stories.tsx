import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Text } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'
import { merge } from 'lodash'

import { BasicField } from '~shared/types/field'

import Button from '~components/Button'

import {
  VerifiableEmailField as VerifiableEmailFieldComponent,
  VerifiableEmailFieldProps,
  VerifiableEmailFieldSchema,
} from './VerifiableEmailField'

export default {
  title: 'Templates/Field/VerifiableEmailField',
  component: VerifiableEmailFieldComponent,
  decorators: [],
  parameters: {
    docs: {
      // Required in this story due to react-hook-form conflicting with
      // Storybook somehow.
      // See https://github.com/storybookjs/storybook/issues/12747.
      source: {
        type: 'code',
      },
    },
  },
} as Meta

const baseSchema: VerifiableEmailFieldSchema = {
  title: 'Invoice email',
  description: 'Please enter it correctly. We will not resend the invoice.',
  autoReplyOptions: {
    hasAutoReply: false,
    autoReplySubject: '',
    autoReplySender: '',
    autoReplyMessage: '',
    includeFormSummary: false,
  },
  isVerifiable: true,
  hasAllowedEmailDomains: false,
  allowedEmailDomains: [],
  _id: '617a262d4fa0850013d1568f',
  required: true,
  disabled: false,
  fieldType: BasicField.Email,
}

interface StoryVerifiableEmailFieldProps extends VerifiableEmailFieldProps {
  defaultValue?: string
}

const Template: Story<StoryVerifiableEmailFieldProps> = ({
  defaultValue,
  ...args
}) => {
  const formMethods = useForm({
    defaultValues: {
      [args.schema._id]: defaultValue,
    },
  })

  const [submitValues, setSubmitValues] = useState<string>()

  const onSubmit = (values: Record<string, string>) => {
    setSubmitValues(
      JSON.stringify(values[args.schema._id]) || 'Nothing was selected',
    )
  }

  useEffect(() => {
    formMethods.trigger()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} noValidate>
        <VerifiableEmailFieldComponent {...args} />
        <Button
          mt="1rem"
          type="submit"
          isLoading={formMethods.formState.isSubmitting}
          loadingText="Submitting"
        >
          Submit
        </Button>
        {submitValues && <Text>You have submitted: {submitValues}</Text>}
      </form>
    </FormProvider>
  )
}

export const ValidationRequired = Template.bind({})
ValidationRequired.args = {
  schema: baseSchema,
}

export const ValidationOptional = Template.bind({})
ValidationOptional.args = {
  schema: { ...baseSchema, required: false },
}

export const ValidationAllowedDomain = Template.bind({})
ValidationAllowedDomain.args = {
  schema: merge({}, baseSchema, {
    title: 'Only allows .gov.sg domains',
    hasAllowedEmailDomains: true,
    allowedEmailDomains: ['@gov.sg'],
    isVerifiable: true,
  }),
  defaultValue: 'test@example.com',
}

export const ValidationInvalidEmail = Template.bind({})
ValidationInvalidEmail.args = {
  schema: baseSchema,
  defaultValue: 'not an email',
}
