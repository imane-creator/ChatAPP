// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import GestionEntrepriseBasic from 'src/views/forms/gestion-entreprise/GestionEntrepriseBasic'
import GestionEntrepriseAsync from 'src/views/forms/gestion-entreprise/GestionEntrepriseAsync'
import GestionEntrepriseSchema from 'src/views/forms/gestion-entreprise/GestionEntrepriseSchema'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const GestionEntreprise = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={
            <Typography variant='h5'>
              <Link href='https://github.com/react-hook-form/react-hook-form' target='_blank'>
                React Hook Form
              </Link>
            </Typography>
          }
          subtitle={<Typography variant='body2'>React Hooks for forms validation (Web + React Native)</Typography>}
        />
        <Grid item xs={12}>
          <GestionEntrepriseBasic />
        </Grid>
        <Grid item xs={12} md={6}>
          <GestionEntrepriseSchema />
        </Grid>
        <Grid item xs={12} md={6}>
          <GestionEntrepriseAsync />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default GestionEntreprise
