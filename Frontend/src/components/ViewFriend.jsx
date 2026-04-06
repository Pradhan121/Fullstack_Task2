import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export const fetchFriendList = ()=>{
    axios.get('http://localhost:3000/friends')
     .then((res)=>{
       setFriendData(res.data.data)
     })
      .catch((err)=>{console.log(err)})
  }

export default function ViewFriend() {
  const [friendList, setFriendList] = useState({
      name: '', email: '', address: ''
    })
  const[friendData, setFriendData] = useState([])
  const[editId,setEditId] = useState(null)


  useEffect(()=>{
    fetchFriendList();
  },[])

  const handleEdit=(f)=>{
    setFriendList({
    name: f.name,
    email: f.email,
    address: f.address
  })
   setEditId(que._id)
   setOpen(true)
  }
  return (
    <>
       <table border={1}>
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th colSpan={2}>Action</th>
        </thead>
        <tbody>
          {friendData.map((f,i)=>{
            return(
              <tr key={i}>
                <td>{f.name}</td>
                <td>{f.email}</td>
                <td>{f.address}</td>
                <td><button onClick={()=>handleEdit(f)}>Update</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
