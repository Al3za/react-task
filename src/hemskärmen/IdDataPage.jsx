import React from 'react'
import { useParams } from 'react-router-dom'
import RendIdDataPage from './RendIdDataPage'

export default function IdDataPage() {
    let params=useParams()
    return (
        <div>
          <RendIdDataPage id={params.id}
          />
        </div>
    )
}
