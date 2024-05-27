// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Store & Actions Imports
import { useDispatch } from 'react-redux'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useTranslation } from 'react-i18next'

const DeleteDialog = props => {
  // ** Props
  const { open, setOpen, deelete, rowId } = props
  const dispatch = useDispatch()

  // ** States
  const [userInput, setUserInput] = useState('yes')
  const [secondDialogOpen, setSecondDialogOpen] = useState(false)
  const [secondDialogState, setSecondDialogState] = useState('success')
  const handleClose = () => setOpen(false)
  const { t } = useTranslation()
  const handleSecondDialogClose = () => setSecondDialogOpen(false)

  const handleConfirmation = value => {
    handleClose()
    setUserInput(value)
    if (value === 'yes') {
      deelete(rowId)
        .then(res => {
          console.log('Delete response:', res)
          setSecondDialogOpen(true)
          setSecondDialogState('success')
        })
        .catch(err => {
          setSecondDialogOpen(true)
          setSecondDialogState('error')
        })
    } else {
      setSecondDialogOpen(true)
    }
  }

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Box sx={{ mb: 4, maxWidth: '85%', textAlign: 'center', '& svg': { mb: 12.25, color: 'warning.main' } }}>
              <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
              <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                {t('Are you sure?')}
              </Typography>
            </Box>
            <Typography>{t("You won't be able to revert this!")}</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' onClick={() => handleConfirmation('yes')}>
            {t('Yes, delete it!')}
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => handleConfirmation('cancel')}>
            {t('Cancel')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        open={secondDialogOpen}
        onClose={handleSecondDialogClose}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}
      >
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& svg': {
                mb: 14,
                color: userInput === 'yes' && secondDialogState === 'success' ? 'success.main' : 'error.main'
              }
            }}
          >
            <Icon
              fontSize='5.5rem'
              icon={
                userInput === 'yes' && secondDialogState === 'success'
                  ? 'mdi:check-circle-outline'
                  : 'mdi:close-circle-outline'
              }
            />
            <Typography variant='h4' sx={{ mb: 8 }}>
              {userInput === 'yes'
                ? secondDialogState === 'success'
                  ? t('Deleted')
                  : t('Error deleting')
                : t('Canceled')}
            </Typography>
            {/* <Typography>{userInput === 'yes' ? (active ? 'User has been desactivated.': 'User has been activated.') : 'Cancelled :)'}</Typography> */}
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteDialog
