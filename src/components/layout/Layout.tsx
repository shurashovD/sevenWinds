import { FC, ReactNode } from 'react'
import { Box, IconButton, Stack, Tab, Tabs, Typography, styled } from '@mui/material'

import ArrowDownIcon from '../../assets/arrow-down.svg'
import BackIcon from '../../assets/back.svg'
import MenuIcon from '../../assets/menu.svg'
import { MENU_ITEMS } from '../../constants'
import { MenuItem } from './MenuItem'

const HeaderRow = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: '10px 20px',
  paddingBottom: 0,
}))

const HeaderRowIconButton = styled(IconButton)({ padding: '8px' })

const Title = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
}))

const TitleSelectContainer = styled(Box)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 20px',
  width: '20%',
  maxWidth: '234px',
}))

const TitleLabelContainer = styled(Box)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 20px',
}))

const ItemsContainer = styled(Box)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  width: '20%',
  maxWidth: '234px',
}))

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <HeaderRow>
        <Stack direction="row" spacing={'20px'}>
          <HeaderRowIconButton>
            <img src={MenuIcon} />
          </HeaderRowIconButton>
          <HeaderRowIconButton>
            <img src={BackIcon} />
          </HeaderRowIconButton>
          <Tabs value={0}>
            <Tab label="Просмотр" />
            <Tab label="Управление" />
          </Tabs>
        </Stack>
      </HeaderRow>
      <Title>
        <TitleSelectContainer>
          <Box>
            <Typography color={({ palette }) => palette.text.disabled}>Название проекта</Typography>
            <Typography color={({ palette }) => palette.text.disabled}>
              <small>Аббревиатура</small>
            </Typography>
          </Box>
          <IconButton>
            <img src={ArrowDownIcon} />
          </IconButton>
        </TitleSelectContainer>
        <TitleLabelContainer>
          <Typography variant="h6">Строительно-монтажные работы</Typography>
        </TitleLabelContainer>
      </Title>
      <Box flexGrow={1} display="flex" flexDirection="row" alignItems="stretch">
        <ItemsContainer>
          {MENU_ITEMS.map((item) => (
            <MenuItem key={item} title={item} />
          ))}
        </ItemsContainer>
        <Box width="100%" bgcolor={({ palette }) => palette.background.paper}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
