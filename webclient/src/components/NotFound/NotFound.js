import { useEffect } from 'react'

const NotFound = ({ navigate }) => {
  useEffect(() => {
    return navigate()
  }, [navigate])


  return null
}

export default NotFound