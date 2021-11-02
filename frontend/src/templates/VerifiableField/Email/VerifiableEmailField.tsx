/**
 * @precondition Must have a parent `react-hook-form#FormProvider` component.
 */
import { useMemo } from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'
import { VisuallyHidden } from '@chakra-ui/react'

import { EmailFieldBase } from '~shared/types/field'

import { createEmailValidationRules } from '~utils/fieldValidation'
import Input from '~components/Input'

import VerifiableFieldContainer, {
  BaseVerifiableFieldProps,
  KnownVerifiableField,
} from '../VerifiableFieldContainer'
import { useVerifiableField } from '../VerifiableFieldContainer/VerifiableFieldContext'

export type VerifiableEmailFieldSchema = KnownVerifiableField<EmailFieldBase>
export interface VerifiableEmailFieldProps extends BaseVerifiableFieldProps {
  schema: VerifiableEmailFieldSchema
}

export const VerifiableEmailField = ({
  schema,
  questionNumber,
}: VerifiableEmailFieldProps): JSX.Element => {
  const validationRules = useMemo(
    () => createEmailValidationRules(schema),
    [schema],
  )

  return (
    <VerifiableFieldContainer schema={schema} questionNumber={questionNumber}>
      <VerifiableEmailInput rules={validationRules} />
    </VerifiableFieldContainer>
  )
}

const VerifiableEmailInput = ({
  rules,
}: {
  rules: UseControllerProps['rules']
}) => {
  const { fieldValueName, handleInputChange, hasSavedSignature } =
    useVerifiableField()

  return (
    <>
      <Controller
        rules={rules}
        name={fieldValueName}
        // Value required to be initialized so it doesn't turn into an uncontrolled component.
        render={({ field: { onChange, value = '', ...rest } }) => {
          return (
            <Input
              isSuccess={hasSavedSignature}
              value={value}
              {...rest}
              onChange={(e) => handleInputChange(onChange)(e.target.value)}
            />
          )
        }}
      />
      <VisuallyHidden aria-live="assertive">
        {hasSavedSignature
          ? 'This field has been successfully verified'
          : 'This field requires verification. Please click the verify button next to this field to verify the field'}
      </VisuallyHidden>
    </>
  )
}
