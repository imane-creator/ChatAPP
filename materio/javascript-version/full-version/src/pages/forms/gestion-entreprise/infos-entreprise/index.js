// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import GestionEntrepriseBasic from 'src/views/forms/gestion-entreprise/infos-entreprise/GestionEntrepriseBasic'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const GestionEntreprise = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6} className='match-height'>
        
        <Grid item xs={12}>
          <GestionEntrepriseBasic />
        </Grid>


      </Grid>
    </DatePickerWrapper>
  )
}

export default GestionEntreprise
