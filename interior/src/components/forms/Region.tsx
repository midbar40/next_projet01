'use client'
import React from "react"
import DaumAddressSearch from '@/services/DaumAddressSearch'
import { State } from '@/components/forms/EstimateFormReducer'


interface RegionProps {
  onChange: (type: keyof State, value: string | boolean) => void;
}

const Region: React.FC<RegionProps> = ({ onChange }) => {
  return (
    <div>
      <span style={{ fontWeight: 600 }}>지역</span>
      <DaumAddressSearch onChange={onChange}/>
    </div>
  )
}

export default Region;