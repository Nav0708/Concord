import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

const RenameUserComponent = () => {
 const { getAccessTokenSilently } = useAuth0()
 const [newName, setNewName] = useState('')
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(null)

 const renameUser = async () => {
    try {
      setLoading(true)
      setError(null)
      const accessToken = await getAccessTokenSilently()
      const apiUrl = '/'
      const response = await axios.put(apiUrl, { newName }, { headers: { Authorization: `Bearer ${accessToken}` } })

      if (response.status === 200) {
        setNewName('')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
 }
 return (
    <div>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={renameUser} disabled={loading}>
        Rename
      </button>
      {error && <div>{error}</div>}
    </div>
 )
}

export default RenameUserComponent