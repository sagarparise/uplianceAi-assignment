import React from 'react'
import Counter from '../Counter/Counter';
import { Outlet } from 'react-router-dom';
 import TextEditor from '../RichTextEditor/TextEditor';
function Layout() {
  return (
    <div>
      <Outlet />
      <Counter/>
      <TextEditor/>
    </div>
  )
}

export default Layout