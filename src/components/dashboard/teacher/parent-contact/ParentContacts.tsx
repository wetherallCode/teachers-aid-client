import React, { FC } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { useNavSync } from '../../../../hooks/useNavSync'
import { AllContacts } from './all-contacts/AllContacts'
import { CreateContact } from './create-contacts/CreateContact'
import { CreateContactContextProvider } from './create-contacts/state-style/CreateContactContext'

export type ParentContactsProps = {}

export const ParentContacts: FC<ParentContactsProps> = () => {
  const location = useLocation()
  useNavSync(location, 'PARENT_CONTACTS')
  return (
    <>
      <Routes>
        <Route path='contacts' element={<AllContacts />} />
      </Routes>
      <Routes>
        <Route
          path='create-contact'
          element={
            <CreateContactContextProvider>
              <CreateContact />
            </CreateContactContextProvider>
          }
        />
      </Routes>
    </>
  )
}
