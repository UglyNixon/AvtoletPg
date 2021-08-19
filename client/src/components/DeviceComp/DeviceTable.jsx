import React from 'react';

const DeviceTable = ({device}) => {
    return (
      <div>
          {device.map(d=><div key={d.id}>{d.series}</div>)}
      </div>
    );
};

export default DeviceTable;