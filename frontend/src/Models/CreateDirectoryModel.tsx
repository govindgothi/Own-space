import React, { useState } from 'react'
import { createPortal } from 'react-dom'

interface data{
  dirName:string,
  _id:string,
  parentDirId:string,
  isDirAddOpen:boolean
}

const CreateDirectoryModel:React.FC<data> = ({dirName,_id,parentDirId,isDirAddOpen}) => {
  const [newDirName,setNewDirName] = useState('new folder')
  const handleDirInput =(e:any)=>{
    setNewDirName(e.target.value)
  }
  if(!isDirAddOpen){
  
  }
  return createPortal(
    <div>
      <div className='border p-2 w-[80px] text-center' >close</div>
     <input type="text" value={newDirName} onChange={(e)=>handleDirInput(e)}/>
    </div>,
    document.getElementById('login') as Element
  )
}

export default CreateDirectoryModel
