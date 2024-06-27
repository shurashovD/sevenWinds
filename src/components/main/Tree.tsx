import { FC, useCallback, useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Box } from '@mui/material'

import { EntityContext } from './contexts/EntityContext'
import { useGetEnityRowListQuery } from '../../entityApi'

type Props = {
  lastDot: HTMLElement | null
  paper: HTMLElement | null
}

export const Tree: FC<Props> = ({ lastDot, paper }) => {
  const context = useContext(EntityContext)
  const { data } = useGetEnityRowListQuery(context!.entityId.toString())
  const [top, setTop] = useState(paper?.getBoundingClientRect().bottom)
  const [bottom, setBottom] = useState(lastDot?.getBoundingClientRect().bottom)
  const [left, setLeft] = useState(lastDot?.getBoundingClientRect().left)

  const handler = useCallback(() => {
    setTop(paper?.getBoundingClientRect().bottom)
    setBottom(lastDot?.getBoundingClientRect().bottom)
    setLeft(lastDot?.getBoundingClientRect().left)
  }, [paper, lastDot])

  useEffect(() => {
    addEventListener('scroll', handler)
    addEventListener('resize', handler)

    return () => {
      removeEventListener('scroll', handler)
      removeEventListener('scroll', handler)
    }
  }, [handler])

  useEffect(() => {
    handler()
  }, [data, handler, context?.disableCreateEdit])

  if (!lastDot || !paper) {
    return null
  }

  return createPortal(
    <Box
      position="fixed"
      top={`${top}px`}
      width="1px"
      height={`${bottom! - top!}px`}
      left={`${left}px`}
      bgcolor={({ palette }) => palette.text.primary}
      zIndex={0}
    />,
    document.querySelector('body')!,
  )
}
