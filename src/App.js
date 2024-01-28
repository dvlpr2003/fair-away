
import { useState } from "react"
import "./App.css"
export default function App(){
    const [fValue,setfValue] = useState([])
    const [sortBy,setSortBy] = useState("input")

    let itemsname ;
    if (sortBy === "input")
     itemsname=fValue.slice()
    .sort((a,b)=>a.Input.localeCompare(b.Input));
    if (sortBy === "normal") itemsname = fValue;
   
    
    function updateValue(item){
        setfValue((fValue)=>[...fValue,item])
        console.log(fValue)
    }
    function removeItem(item){
        setfValue(()=>fValue.filter(items=>items.id !== item))
    }
    function clr(){
        setfValue([])
    }
    function Linethrough(id){
        setfValue(fValue => fValue.map(
            item => item.id === id ? {...item,Packed:!item.Packed}
            : item
        ))

    }


    return (
        <>
        <Header />
        <Form updateValue={updateValue} key={fValue.id}/>
        <Updates fValue={fValue} removeItem={removeItem} clr  = {clr} Linethrough={Linethrough} setSortBy={setSortBy}  itemsname={itemsname}/>
        <Footer />
        </>

    )
}
function Header(){
    return(
        <div id="headline">
            <h1>FAIR AWAY</h1>
        </div>
    )
}
function Form({updateValue}){

    return(
        <form>
            <span>What do you need for your 😍 trip?</span>
            <FormElement  updateValue={updateValue} />

        </form>
    )
}
function FormElement({updateValue}){
    const [Input,setInput] =useState("")
    const[Number,setNumber] = useState(1)
    


    function inputOnchange(e){
        setInput(e.target.value)
        
    }
    function optionOnchange(e){
        setNumber(e.target.value)
    }


    function clickEvent(e){
        e.preventDefault()
        if(!Input) return;
        const newItem = {
            Number,Input,Packed:false,id:Date.now()
        }


        updateValue(newItem);
        setInput("");
        setNumber(1);
    }
    return(
        <>
        <select onChange={(e)=>optionOnchange(e) } value={Number } >
            {Array.from({length:20},(_,i)=>i+1).map((e)=><option value={e} >{e}</option>)}
        </select>
        <input type="text" placeholder="type..." value={Input} onChange={(e)=>inputOnchange(e)}/>
        <button onClick={clickEvent}>ADD</button>
        </>
    )
}
function Updates({fValue,removeItem,clr,Linethrough,setSortBy,itemsname}){
    return(
        <div id="fair-update">
            <ul>
                {itemsname.map((e)=><li style={e.Packed ? {textDecoration:"line-through"} : {}} onClick={()=> Linethrough(e.id)}>
            <input type="checkbox" value={e.Packed} style={{marginRight:"0.5rem"}}/>
                
                {e.Number}.{e.Input}
                <button onClick={()=>removeItem(e.id)}>❌</button>
                </li>)
                }
                
            </ul>
            <div id="clr-btn">
                <select onChange={(e)=>setSortBy(e.target.value)}>
                    <option value="normal">Sort by input</option>
                    <option value="input">Sort by name</option>
                </select>
                <button onClick={clr}>Clear Items</button>
            </div>
        </div>
    )
}
function Footer(){
    return(
        <footer>
            <span>You have X items on your list</span>
        </footer>
    )
}