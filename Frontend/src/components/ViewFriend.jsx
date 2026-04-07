import axios from 'axios'
import React, { useState, useEffect } from 'react'
import AddFriend from './AddFriend'

export default function ViewFriend() {
  const [friendList, setFriendList] = useState({ name: '', email: '', address: '' })
  const [friendData, setFriendData] = useState([])
  const [editId, setEditId] = useState(null)
  const [open, setOpen] = useState(false)

  const fetchFriendList = () => {
    axios.get('http://localhost:3000/api/friends')
      .then((res) => setFriendData(res.data.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => { fetchFriendList() }, [])

  const handleEdit = (f) => {
    setFriendList({ name: f.name, email: f.email, address: f.address })
    setEditId(f._id)
    setOpen(true)
  }


  return (
    <>
      
      <AddFriend
        fetchFriendList={fetchFriendList}
        editId={editId}
        setEditId={setEditId}
        open={open}
        setOpen={setOpen}
        friendList={friendList}
        setFriendList={setFriendList}
        showAddButton={false}
      />

      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {friendData.map((f, i) => (
            <tr key={i}>
              <td>{f.name}</td>
              <td>{f.email}</td>
              <td>{f.address}</td>
              <td><button onClick={() => handleEdit(f)}>Update</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}