
const FormFeild = (props) => {

    switch (props.type) {
        case 'list': // לקיחת עיר ספציפית מרשימת ערים כללית
            return (
                <div className="field">
                    <label>{props.name}</label>
                    <datalist id={props.listId}> 
                        {props.data.map(item => <option value={item.name}> {item.name} </option>)}
                    </datalist>
                    <input type="text" list={props.listId} onInput={(event) => { props.action(event.target.value) }} />
                </div>
            )
            
        case 'file': // אחראי על העלת תמונה מקובץ
            return (
                <div className="field">
                    <label>{props.name}</label>
                    <input type={props.type} onChange={(event) => { props.action(event.target) }}></input>
                    <img width="300px" src={props.targetImg} />
                </div>
            )
        default:
            return (
                <div className="field">
                    <label>{props.name}</label>
                    <input type={props.type} onInput={(event) => { props.action(event.target.value) }} />
                </div>
            )
    }
}

export default FormFeild;


// const FormField = (props) => {

//     switch (props.type) {
//         case 'list':
//             return (
//                 <div className="field">
//                     <label>{props.name}</label>
//                     <datalist id={props.listId}>
//                         {props.data.map(item => <option value={item.name}> {item.name} </option>)}
//                     </datalist>
//                     <input type="text" list={props.listId} onInput={(event) => { props.action(event.target.value) }} />
//                 </div>
//             )
            
//         case 'file':
//             return (
//                 <div className="field">
//                     <label>{props.name}</label>
//                     <input type={props.type} onChange={(event) => { props.action(event.target) }}></input>
//                     <img width="300px" src={props.targetImg} />
//                 </div>
//             )
//         default:
//             return (
//                 <div className="field">
//                     <label>{props.name}</label>
//                     <input type={props.type} onInput={(event) => { props.action(event.target.value) }} />
//                 </div>
//             )
//     }
// }

// export default FormField;