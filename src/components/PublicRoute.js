//login and registration are the public routes plus im having home page also the public routes..
import React from 'react'

//i will receive the pages ie (children) as props
function PublicRoute({children}) {
  return (
    <div>{children}</div>
  )
}

export default PublicRoute