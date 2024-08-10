'use client'
import React from "react"
import DaumAddressSearch from '../../services/DaumAddressSearch'

const Region:React.FC = () => {
    return(
        <div>
        <span style={{fontWeight:600}}>지역</span>
          <DaumAddressSearch/>
      </div>
    )
}

export default Region;