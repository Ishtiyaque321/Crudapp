import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import "./App.css";
import { Data } from "./components/Data"


function App() {

const [ data,setData ] = useState([]);
const [ firstName,setFirstName ]=useState('');
const [ lastName,setLastName ]=useState('');
const [ age,setAge ]=useState(0);
const [ id,setId ]=useState(0);
const [ update,setUpdate ]=useState(false);



useEffect(()=>{
	setData(Data)
},[]);

const handleEdit=(id)=>{
	const dt=data.filter(item=>item.id===id);
	if(dt!==undefined){
		setUpdate(true);
		setId(id);
		setFirstName(dt[0].firstName);
		setLastName(dt[0].lastName);
		setAge(dt[0].Age);

	}

}
const handleDelete=(id)=>{
	if(id>0){
		const dt=data.filter((item)=>item.id!==id);
		setData(dt);
	}
}

const handleSave=(e)=>{
	let error='';
	if(firstName===''){
		error+='firstName is required, ';
	}
	if(lastName===''){
		error+='lastName is required, ';
	}
	if(age<=0){
		error+='age is required, ';
	}
	if(error===''){

e.preventDefault();
const dt=[...data];
const newObject={
	id:data.length+1,
	firstName:firstName,
	lastName:lastName,
	age :age

}
dt.push(newObject);
setData(dt);
}
else{
	alert(error);
}
}

const handleUpdate=(id)=>{
const index=data.map((item)=>{
	return item.id;
}).indexOf(id);

const dt=[...data];
console.log(dt);
dt[index].firstName=firstName;
dt[index].lastName=lastName;
dt[index].age=age;
setData(dt);

handleClear();
}

const handleClear=(id)=>{
	setId('');
	setFirstName('');
	setLastName('');
	setAge('');
	setUpdate(false);
}

	return (
		<div className="App">
			<div style={{display:'flex', justifyContent:'center' , padding:"10px"}}>
				<div>
					<label>firstName:
                    <input type="text" placeholder="Enter firstNane" onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
					</label>
				</div>
				<div>
					<label>lastName:
                    <input type="text" placeholder="Enter lastNane" onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
					</label>
				</div>
				<div>
					<label>Age:
                    <input type="number" placeholder="Age" onChange={(e)=>setAge(e.target.value)} value={age}/>
					</label>
				</div>
				<div>
					{
						!update?<button className="btn" onClick={(e)=>handleSave(e)}>Save</button>:<button className="btn" onClick={(e)=>handleUpdate(e)}>Update</button>


					}

				<button className="btn1" onClick={(e)=>handleClear(e)}>Clear</button>
	
				</div>


			</div>
			<table className="table table-hover">
				<thead>
					<tr>
						<td>Id</td>
						<td>firstName</td>
						<td>lastname</td>
						<td>Age</td>
						<td>Action</td>
					</tr>
				</thead>
				<tbody>
					{
						data.map((item,index)=>{
							return (
								<tr key={index}>
                                 <td>{item.id}</td>
								 <td>{item.firstName}</td>
								 <td>{item.lastName}</td>
								 <td>{item.age}</td>
								 <td>
								 <button className="btn" onClick={()=>handleEdit(item.id)}>Edit</button>
								 <button className="btn1" onClick={()=>handleDelete(item.id)}>Delete</button>

								 </td>



								</tr>
							);
						})
					}
				</tbody>
			</table>
		</div>
 	);
}

export default App;
