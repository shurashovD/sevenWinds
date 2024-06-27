import { FC } from 'react'
import { Box, Button, styled } from '@mui/material'

import MenuItemIcon from '../../assets/menu-item-icon.svg'

const SButton = styled(Button)(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  color: theme.palette.text.primary,
  borderRadius: 0,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
  '&.selected': {
    backgroundColor: theme.palette.text.disabled,
  },
}))

const SBox = styled(Box)({
  width: '100%',
  padding: '5px 20px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

export const MenuItem: FC<{ title: string }> = ({ title }) => {
  const className = title === 'СМР' ? 'selected' : ''
  return (
    <SButton className={className}>
      <SBox>
        <Box marginRight={'15px'} display="flex" justifyContent="center">
          <img src={MenuItemIcon} />
        </Box>
        <span>{title}</span>
      </SBox>
    </SButton>
  )
}
