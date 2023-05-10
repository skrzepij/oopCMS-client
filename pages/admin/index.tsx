import { NavigateToResource } from '@refinedev/nextjs-router'
import React, { useState } from 'react'

export const Admin = () => {
  const [isLogged, setIsLogged] = useState(false)

  return (
    <>
      {!isLogged && (
        <button onClick={() => setIsLogged(true)}>
          This is Authorization Step Click to log in
        </button>
      )}
      {isLogged && <NavigateToResource resource="blog_posts" />}
    </>
  )
}

export default Admin
Admin.noLayout = true
