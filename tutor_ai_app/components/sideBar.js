import React from 'react'
import {useState} from 'react';

function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className="row-span-4 col-span-1">
      {isCollapsed ? null : (
        <div className="flex flex-col h-screen overflow-y-auto bg-gray-800">
          <div className="p-4">
              <h1 className="text-white">HELLO</h1>
              <h1 className="text-white">HELLO FU</h1>
              <h1 className="text-white">HELLO CK</h1>
              <h1 className="text-white">HELLO ER</h1>
          </div>
          <button onClick={toggleCollapse}>
            {isCollapsed? 'Expand' : 'Collapse'}
          </button>
      </div>
      )}
    </aside>
    
  )

}

export default SideBar