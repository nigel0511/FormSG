import { createContext, useContext } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

type VerifiableFieldContextProps = {
  handleInputChange: (
    onChange: ControllerRenderProps['onChange'],
  ) => (val?: string | undefined) => void
  fieldValueName: string
  hasSavedSignature: boolean
}

const VerifiableFieldContext = createContext<
  VerifiableFieldContextProps | undefined
>(undefined)

interface VerifiableFieldProviderProps {
  value: VerifiableFieldContextProps
  children: React.ReactNode
}

export const VerifiableFieldProvider = (
  props: VerifiableFieldProviderProps,
): JSX.Element => {
  return <VerifiableFieldContext.Provider {...props} />
}

export const useVerifiableField = (): VerifiableFieldContextProps => {
  const context = useContext(VerifiableFieldContext)
  if (!context) {
    throw new Error(
      `useVerifiableField must be used within a VerifiableFieldProvider component`,
    )
  }
  return context
}
