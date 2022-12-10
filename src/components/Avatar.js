import React, { useState } from 'react';
import { Image, Button } from 'antd';
const Avatar = () => {
  const [preview, setPreview] = useState(false);
  const onClick = () => {
    setPreview(!preview);
  };
  // preview{visible:preview,onVisibleChange:(value)=>{
  //   setPreview(value)
  // }}
  return (
    <>
      <Image
        style={{ cursor: 'pointer' }}
        onClick={onClick}
        width={200}
        // preview ={()=> {
        //   return preview ? {visible:preview,onVisibleChange:(value)=>{
        //     setPreview(value)
        //   }} : false
        // }}
        preview={
          preview
            ? {
                visible: preview,
                onVisibleChange: (value) => {
                  setPreview(value);
                },
              }
            : false
        }
        // preview={prev}
        src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      />
      <Button onClick={onClick}> clickme</Button>
    </>
  );
};
export default Avatar;
