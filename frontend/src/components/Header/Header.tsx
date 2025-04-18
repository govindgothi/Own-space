// import React from 'react'

const Header = () => {
  return (
    <header className="w-screen h-[50px] bg-gray-100 flex justify-around items-center">
      <h2 className="text-2xl ">Storage</h2>
      <div className="flex justify-around items-center w-[60%]">
      <h4>blogs</h4>
      <h4>directories</h4>
      <h4>resume</h4>
      <h4>bin</h4>
      <h4>login</h4>
      </div>
    </header>
  )
}

export default Header
