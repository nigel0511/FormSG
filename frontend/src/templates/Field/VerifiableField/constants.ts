import { BasicField } from '~shared/types/field'

import { MobileOtpIcon } from './components/MobileOtpIcon'
import { VerificationBoxProps } from './components/VerificationBox'

type RenderableFields = BasicField.Email | BasicField.Mobile

export const VFN_RENDER_DATA: Record<
  RenderableFields,
  Pick<VerificationBoxProps, 'logo' | 'header' | 'subheader'>
> = {
  [BasicField.Mobile]: {
    logo: MobileOtpIcon,
    header: 'Verify your mobile number',
    subheader:
      'An SMS with a 6-digit verification code was sent to you. It will be valid for 10 minutes.',
  },
  [BasicField.Email]: {
    // TODO: Update to EmailOtpIcon
    logo: MobileOtpIcon,
    header: 'Verify your email',
    subheader:
      'An email with a 6-digit verification code was sent to you. It will be valid for 10 minutes.',
  },
}
