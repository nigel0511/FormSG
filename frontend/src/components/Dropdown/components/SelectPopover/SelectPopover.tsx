import { FC, useMemo, useRef, useState } from 'react'
import { Modifier, usePopper } from 'react-popper'
import { Box, useMergeRefs, useOutsideClick } from '@chakra-ui/react'
import get from 'lodash/get'

import { useSelectContext } from '~components/Dropdown/SelectContext'

import { SelectPopoverContext } from './SelectPopoverContext'

export const SelectPopoverProvider: FC = ({ children }): JSX.Element => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  )

  /**
   * Required so menu does not get hidden when nested in a parent container with
   * overflow hidden properties.
   * Modifier ensures popover is the same width as the reference element.
   * Must be wrapped with `useMemo` since `usePopper` will recompute the
   * instance on every render, causing infinite loop.
   */
  const popperModifiers = useMemo(
    () => [
      {
        name: 'sameWidth',
        enabled: true,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: ({ state }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`
        },
        effect({ state }) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          state.elements.popper.style.minWidth = `${state.elements.reference.offsetWidth}px`
        },
      } as Modifier<'sameWidth'>,
    ],
    [],
  )

  const {
    styles: popperStyles,
    attributes: popperAttributes,
    update,
  } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    strategy: 'fixed',
    modifiers: popperModifiers,
  })

  const { styles, setIsFocused } = useSelectContext()

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const mergedPopperRefs = useMergeRefs(setReferenceElement, wrapperRef)

  useOutsideClick({
    ref: wrapperRef,
    handler: () => setIsFocused(false),
  })

  return (
    <SelectPopoverContext.Provider
      value={{
        popperRef: setPopperElement,
        popperStyles,
        popperAttributes,
        update,
      }}
    >
      <Box ref={mergedPopperRefs} sx={styles.container}>
        {children}
      </Box>
    </SelectPopoverContext.Provider>
  )
}
