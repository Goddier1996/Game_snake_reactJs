import React from 'react';

export default (props) => {

  const style = {  // מקבל את הנקודות מהדף של ה"משחק" ולפי זה מעלה נקודות של הנחש
    left: `${props.dot[0]}%`, 
    top: `${props.dot[1]}%`
  }

  return (
    <div className="snake-food" style={style}></div>
  )
}