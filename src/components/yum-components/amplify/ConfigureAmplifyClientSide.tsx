'use client'

import { getAmplifyConfig } from '@/lib/amplify-server-util'
import { Amplify } from 'aws-amplify'

Amplify.configure({ ...getAmplifyConfig() }, { ssr: true })

export default function ConfigureAmplifyClientSide() {
  return null
}
