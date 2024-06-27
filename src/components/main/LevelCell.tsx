import { FC, useContext, useEffect, useRef, useState } from 'react'
import { Box, IconButton, Paper, Stack, styled } from '@mui/material'

import EntityIcon from '../../assets/entityIcon.svg'
import CartIcon from '../../assets/cart.svg'
import { EntityContext } from './contexts/EntityContext'

type Props = {
  level: number
  onEntityClick(): void
  onRemoveClick(): void
  setDotElement(element: HTMLElement): void
  setPaperElement(element: HTMLElement): void
}

const SPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.divider,
  boxShadow: 'none',
  display: 'flex',
  width: 'min-content',
  padding: '9px',
  zIndex: 1,
}))

export const LevelCell: FC<Props> = ({
  level,
  onEntityClick,
  onRemoveClick,
  setDotElement,
  setPaperElement,
}) => {
  const context = useContext(EntityContext)
  const dotRef = useRef<HTMLElement | null>(null)
  const paperRef = useRef<HTMLDivElement | null>(null)
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    if (dotRef.current) {
      setDotElement(dotRef.current)
    }
  }, [setDotElement])

  useEffect(() => {
    if (paperRef.current) {
      setPaperElement(paperRef.current)
    }
  }, [setPaperElement])

  return (
    <Stack direction={'row'} alignItems={'center'}>
      {level > 0 && (
        <Box
          ref={dotRef}
          width="6px"
          height="1px"
          bgcolor={({ palette }) => palette.text.primary}
          ml={`${level * 18 + (level - 1) * 6}px`}
        />
      )}
      <SPaper
        ref={paperRef}
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
      >
        <IconButton
          onClick={onEntityClick}
          disabled={!!context?.disableCreateEdit}
          style={{ padding: 0 }}
        >
          <img src={EntityIcon} />
        </IconButton>
        {showButtons && (
          <IconButton
            onClick={onRemoveClick}
            disabled={!!context?.disableCreateEdit}
            style={{ padding: 0, paddingLeft: 8 }}
          >
            <img src={CartIcon} />
          </IconButton>
        )}
      </SPaper>
    </Stack>
  )
}
