// ** Next Import
import { useRouter } from 'next/router'

// ** Third Party Imports
import axios from 'axios'

import Preview from 'src/views/apps/Contrat/preview/preview'

import { AuthProvider } from 'src/context/AuthContext'

const EntreprisePreview = ({ data }) => {
  return (
    <AuthProvider>
      <Preview data={data} />
    </AuthProvider>
  )
}

export async function getServerSideProps(context) {
  //get id from query
  const id = context.params?.id

  if (!id) {
    return {
      notFound: true
    }
  }

  // Fetch data from external API
  const res = await axios.get(process.env.NEXT_PRIVATE_SERVER_URL + '/v1/entrepriseId' + `/${id}`).catch(err => {
    //return empty array if error
    return {
      data: null
    }
  })

  const data = await res.data
  console.log('datacontrat', res.data)

  if (!data) {
    return {
      notFound: true
    }
  }

  // Pass data to the page via props
  return { props: { data } }
}

export default EntreprisePreview
