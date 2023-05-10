import { NavigateToResource } from '@refinedev/nextjs-router'
import React, { useState } from 'react'
import { BACKOFFICE_PAGES } from 'src/constants'

export const Admin = () => {
  const [isLogged, setIsLogged] = useState(false)

  return (
    <>
      {!isLogged && (
        <button onClick={() => setIsLogged(true)}>
          This is Authorization Step Click to log in
        </button>
      )}
      {isLogged && <NavigateToResource resource={`${BACKOFFICE_PAGES.BLOG_POSTS_EP}`} />}
    </>
  )
}

export default Admin
Admin.noLayout = true
