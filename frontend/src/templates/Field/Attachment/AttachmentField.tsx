import { useCallback, useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { MB } from '~shared/constants/file'
import { VALID_EXTENSIONS } from '~shared/utils/file-validation'

import { createAttachmentValidationRules } from '~utils/fieldValidation'
import Attachment from '~components/Field/Attachment'

import { BaseFieldProps, FieldContainer } from '../FieldContainer'
import { AttachmentFieldInput, AttachmentFieldSchema } from '../types'

export interface AttachmentFieldProps extends BaseFieldProps {
  schema: AttachmentFieldSchema
}

/**
 * @precondition Must have a parent `react-hook-form#FormProvider` component.
 */
export const AttachmentField = ({
  schema,
  questionNumber,
}: AttachmentFieldProps): JSX.Element => {
  const fieldName = schema._id
  const validationRules = useMemo(
    () => createAttachmentValidationRules(schema),
    [schema],
  )

  const { clearErrors, setError, control } =
    useFormContext<AttachmentFieldInput>()

  const maxSizeInBytes = useMemo(() => {
    return parseInt(schema.attachmentSize) * MB
  }, [schema.attachmentSize])

  const setErrorMessage = useCallback(
    (errorMessage: string) => {
      setError(fieldName, { message: errorMessage })
    },
    [fieldName, setError],
  )

  return (
    <FieldContainer schema={schema} questionNumber={questionNumber}>
      <Controller
        control={control}
        render={({ field: { onChange, ...rest } }) => (
          <Attachment
            {...rest}
            maxSize={maxSizeInBytes}
            accept={VALID_EXTENSIONS}
            showFileSize
            onChange={(file) => {
              clearErrors(fieldName)
              onChange(file)
            }}
            onError={setErrorMessage}
          />
        )}
        name={fieldName}
        rules={validationRules}
      />
    </FieldContainer>
  )
}
