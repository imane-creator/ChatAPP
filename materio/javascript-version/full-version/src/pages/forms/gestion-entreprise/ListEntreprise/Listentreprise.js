import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid, frFR } from '@mui/x-data-grid'
import { fetchData, deleteEntreprise } from 'src/store/apps/entreprise/index' // adjust the import path as necessary
import { useTranslation } from 'react-i18next'
import { AuthProvider } from 'src/context/AuthContext'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import Tooltip from '@mui/material/Tooltip'
import Link from 'next/link'
import DeleteDialog from 'src/views/apps/DeleteDialog'
import Box from '@mui/material/Box'

const ListEntreprise = () => {
  const dispatch = useDispatch()
  const { entreprises } = useSelector(state => state.entreprises)
  const { t, i18n } = useTranslation()
  const [pageSize, setPageSize] = useState(10)
  const [selectedRow, setSelectedRow] = useState(null)
  const [deleteDialog, setDeleteDialog] = useState(false)

  useEffect(() => {
    dispatch(fetchData({ q: '' }))
  }, [dispatch])

  const handleDelete = async id => {
    setSelectedRow(id)
    setDeleteDialog(true)
  }

  const confirmDelete = async id => {
    setDeleteDialog(false)
    await dispatch(deleteEntreprise(id))
  }

  const columns = [
    {
      flex: 0.2,
      minWidth: 250,
      field: 'name',
      headerName: 'name',
      renderCell: ({ row }) => (
        <Typography noWrap variant='body2'>
          {row.name}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'email',
      headerName: 'email',
      renderCell: ({ row }) => (
        <Typography noWrap variant='body2'>
          {row.email}
        </Typography>
      )
    },

    {
      flex: 0.2,
      minWidth: 250,
      field: 'ICE',
      headerName: 'ICE',
      renderCell: ({ row }) => (
        <Typography noWrap variant='body2'>
          {row.ICE}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'RC',
      headerName: 'RC',
      renderCell: ({ row }) => (
        <Typography noWrap variant='body2'>
          {row.RC}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'LegalStatus',
      headerName: 'Legal status',
      renderCell: ({ row }) => (
        <Typography noWrap variant='body2'>
          {row.LegalStatus}
        </Typography>
      )
    },

    {
      flex: 0.2,
      minWidth: 250,
      field: 'Sector',
      headerName: 'Sector ',
      renderCell: ({ row }) => (
        <Typography noWrap variant='body2'>
          {row.LegalStatus}
        </Typography>
      )
    },

    {
      flex: 0.2,
      minWidth: 250,
      field: 'Goals',
      headerName: 'Goals',
      renderCell: ({ row }) => (
        <Typography noWrap variant='body2'>
          {row.LegalStatus}
        </Typography>
      )
    },

    {
      flex: 0.2,
      minWidth: 250,
      field: 'adresse',
      headerName: 'Adresse',
      renderCell: ({ row }) => (
        <Typography noWrap variant='body2'>
          {row.adresse}
        </Typography>
      )
    },

    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='View'>
            <IconButton size='small' component={Link} href={`/apps/Contrat/preview/${row.id}`}>
              <Icon icon='mdi:eye-outline' fontSize={20} />
            </IconButton>
          </Tooltip>

          <Tooltip title='Delete'>
            <IconButton size='small' onClick={() => handleDelete(row.id)}>
              <Icon icon='mdi:delete-outline' fontSize={20} />
            </IconButton>
          </Tooltip>

          <Tooltip title='Edit'>
            <IconButton size='small' component={Link} href={`/apps/Contrat/edit/${row.id}`}>
              <Icon icon='mdi:pencil-outline' fontSize={20} />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  const updatedColumns = columns.map(column => ({
    ...column,
    headerName: t(`${column.headerName}`)
  }))

  return (
    <AuthProvider>
      <DeleteDialog open={deleteDialog} setOpen={setDeleteDialog} deelete={confirmDelete} rowId={selectedRow} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={t('List des entreprise')} />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item sm={4} xs={12}></Grid>
              </Grid>
            </CardContent>
            <Divider />
            <DataGrid
              key={i18n.language}
              autoHeight
              rows={entreprises}
              columns={updatedColumns}
              checkboxSelection
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              localeText={i18n.language === 'fr' ? frFR.components.MuiDataGrid.defaultProps.localeText : {}}
            />
          </Card>
        </Grid>
      </Grid>
    </AuthProvider>
  )
}

export default ListEntreprise
