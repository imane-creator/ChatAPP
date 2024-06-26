import { forwardRef, useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const defaultValues = {
  name: '', // Correspond au champ 'name'
  adresse: '', // Correspond au champ 'adresse'
  email: '', // Correspond au champ 'email'
  ICE: '', // Correspond au champ 'ICE'
  RC: '', // Correspond au champ 'RC'
  IF: '', // Correspond au champ 'IF'
  LegalStatus: '', // Correspond au champ 'LegalStatus'
  Sector: '', // Correspond au champ 'Sector'
  Goals: '', // Correspond au champ 'textarea'
  checkbox: false
}

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const PreviewCard = () => {
  // ** States

  // ** Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })
  const [formData, setFormData] = useState(defaultValues)
  const [savedInfo, setSavedInfo] = useState(null)
  const [showSavedCard, setShowSavedCard] = useState(false)

  useEffect(() => {
    const fetchEntrepriseData = async () => {
      try {
        const userId = localStorage.getItem('userId')
        const response = await fetch(`http://localhost:5000/api/v1/entrepriseId?userId=${userId}`)

        if (!response.ok) {
          throw new Error('Failed to fetch entreprise data')
        }

        const responseData = await response.json()
        if (responseData.entreprise) {
          setFormData(responseData.entreprise) // Set the form data with fetched values
          setSavedInfo(responseData.entreprise)
          setShowSavedCard(true)
        }
      } catch (error) {
        console.error('Error fetching entreprise data:', error)
        toast.error('Error fetching entreprise data')
      }
    }

    fetchEntrepriseData()
  }, [])

  return (
    <Card>
      <CardHeader title='Please enter company information here:' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value.name}
                      label='name'
                      onChange={onChange}
                      error={Boolean(errors.name)}
                      aria-describedby='validation-basic-name'
                    />
                  )}
                />
                {errors.name && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='adresse'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value.adresse}
                      label='adresse'
                      onChange={onChange}
                      error={Boolean(errors.adresse)}
                      aria-describedby='validation-basic-adresse'
                    />
                  )}
                />
                {errors.adresse && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-adresse'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type='email'
                      value={value}
                      label='Email'
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      aria-describedby='validation-basic-email'
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-email'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='ICE'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type='ICE'
                      value={value}
                      label='ICE'
                      onChange={onChange}
                      error={Boolean(errors.goals)}
                      aria-describedby='validation-basic-ICE'
                    />
                  )}
                />
                {errors.ICE && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-ICE'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='RC'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type='RC'
                      value={value}
                      label='RC'
                      onChange={onChange}
                      error={Boolean(errors.goals)}
                      aria-describedby='validation-basic-RC'
                    />
                  )}
                />
                {errors.RC && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-RC'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='IF'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type='IF'
                      value={value}
                      label='IF'
                      onChange={onChange}
                      error={Boolean(errors.goals)}
                      aria-describedby='validation-basic-IF'
                    />
                  )}
                />
                {errors.IF && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-IF'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='LegalStatus'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type='Legal status'
                      value={value}
                      label='Legal status'
                      onChange={onChange}
                      error={Boolean(errors.goals)}
                      aria-describedby='validation-basic-Legal status'
                    />
                  )}
                />
                {errors.LegalStatus && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-Legal status'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='Sector'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type='Sector'
                      value={value}
                      label='Sector'
                      onChange={onChange}
                      error={Boolean(errors.goals)}
                      aria-describedby='validation-basic-Sector'
                    />
                  )}
                />
                {errors.Sector && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-Sector'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='Goals'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      rows={4}
                      multiline
                      {...field}
                      label='Goals'
                      error={Boolean(errors.textarea)}
                      aria-describedby='validation-basic-textarea'
                    />
                  )}
                />
                {errors.Goals && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-Goals'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button size='large' type='submit' variant='contained'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default PreviewCard
