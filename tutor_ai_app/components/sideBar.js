import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';

function SideBar() {
  const [width, setWidth] = useState(250); // Initial width of the sidebar

  const onResize = (event, { size }) => {
    setWidth(size.width);
  };

  return (
      <Resizable
        width={width}
        height={Infinity}
        onResize={onResize}
        handle={<div className="drag-handle">Drag Here</div>}
      >
        <div className="bg-slate-600 p-4" style={{ width: `${width}px` }}>
          {/* Content of the sidebar */}
          Sidebar Content
        </div>
      </Resizable>

  );
}

export default SideBar;
