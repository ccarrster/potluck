'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  return (
    <>
      <Potluck />
    </>
  )
}

let startSupplies = ['Oven', 'Oven Mitt', 'Cupcake Tin', 'Liners'];
let startBringingSupplies = [[0, 0], [0, 2], [2, 1]];

function Potluck(){
  const [visible, setVisible] = useState(null);
  const [supplies, setSupplies] = useState(startSupplies);
  const [bringingSupplies, setBringingSupplies] = useState(startBringingSupplies);

  let name = 'Frozen Cupcakes :)';
  let date = 'Dec 18, 2023';
  let time = '6:00 PM';
  let invited = ['Daddy', 'Mommy', 'Ellott', 'Jasper', 'Sydney', 'Ben', 'Sophia', 'Freya'];
  let needs = ['Icing - white', 'Sprinkles', 'Flour', 'Salt', 'Sugar', 'Eggs', 'Milk', 'Baking Soda', 'Chcolate Icing'];
  let jobs = ['Baker', 'Cleaner', 'Decorator'];
  let bringingJobs = [[0, 1], [0, 0], [2, 2]];
  let bringingNeeds = [[2, 1], [4, 5], [4, 4], [4, 2], [5, 3], [5, 0], [1, 6], [1, 7]];

  function onPeopleClick(){
    if(visible == 'people'){
      setVisible(null);
    } else {
      setVisible('people');
    }
  }
  function onIngredientsClick(){
    if(visible == 'ingredients'){
      setVisible(null);
    } else {
      setVisible('ingredients');
    }
  }
  function onJobsClick(){
    if(visible == 'jobs'){
      setVisible(null);
    } else {
      setVisible('jobs');
    }
  }
  function onSuppliesClick(){
    if(visible == 'supplies'){
      setVisible(null);
    } else {
      setVisible('supplies');
    }
  }

  return (
    <>
      <div>
        Event: {name}      
      </div>
      <div>
        When: {date} {time}
      </div>
      <div className='border drop-shadow p-2 m-2 w-1/2 bg-yellow-300'>
        <div onClick={onPeopleClick} className='hover:bg-blue-600'>People</div>
        <Invited people={invited} visible={visible}/>
      </div>
      <div className='border drop-shadow p-2 m-2 w-1/2 bg-red-300'>
        <div onClick={onIngredientsClick} className='hover:bg-blue-600'>Ingredients</div>
        <Ingredients ingredients={needs} bringingNeeds={bringingNeeds} visible={visible}/>
      </div>
      <div className='border drop-shadow p-2 m-2 w-1/2 bg-orange-300'>
        <div onClick={onJobsClick} className='hover:bg-blue-600'>Jobs</div>
        <Jobs jobs={jobs} bringingJobs={bringingJobs} visible={visible}/>
      </div>
      <div className='border drop-shadow p-2 m-2 w-1/2 bg-lime-300' >
        <div onClick={onSuppliesClick} className='hover:bg-blue-600'>Supplies</div>
        <Supplies supplies={supplies} bringingSupplies={bringingSupplies} visible={visible} setSupplies={setSupplies} invited={invited} setBringingSupplies={setBringingSupplies}/>
      </div>
      <div>
        <Bringing invited={invited} needs={needs} supplies={supplies} jobs={jobs} bs={bringingSupplies} bj={bringingJobs} bn={bringingNeeds}/>
      </div>
    </>
  )
}

function Invited({people, visible}){
  let out = people.map((person, index) => {
    return <li>{person}</li>
  });
  let newClass = 'hidden';
  if(visible == 'people'){
    newClass = 'block';
  }
  return (
    <>
    <ul className={newClass}>
    {out}
    </ul>
    </>
  )
}

function Ingredients({ingredients, bringingNeeds, visible}){
  let out = ingredients.map((ingredient, index) => {
    let stillNeeded = true;
    bringingNeeds.forEach((personNeeds, bnIndex) => {
      if(personNeeds[1] == index){
        stillNeeded = false;
      }
    });
    return <li className={stillNeeded ? "ingredients" : "ingredients got"}>{ingredient}</li>
  });
  let newClass = 'hidden';
  if(visible == 'ingredients'){
    newClass = 'block';
  }
  return (
    <>
    <ul className={newClass}>
    {out}
    </ul>
    </>
  )
}

function Jobs({jobs, bringingJobs, visible}){
  let stillNeeded = true;
  let out = jobs.map((job, index) => {
    bringingJobs.forEach((personJobs, bjIndex) => {
      if(personJobs[1] == index){
        stillNeeded = false;
      }
    });
    return <li className={stillNeeded ? "ingredients" : "ingredients got"}>{job}</li>
  });
  let newClass = 'hidden';
  if(visible == 'jobs'){
    newClass = 'block';
  }
  return (
    <>
    <ul className={newClass}>
    {out}
    </ul>
    </>
  )
}

function Choose({ options, handleChoice }){
  console.log(options);
  let optionFields = options.map((option, index) => {
    return(
     <option value={index}>{option}</option>
    );
  });
  return(
    <select onChange={handleChoice}>
      <option value=''></option>
      {optionFields}
    </select>
  );
}

function Supplies({supplies, bringingSupplies, visible, setSupplies, invited, setBringingSupplies}){
  const [newSupplies, setNewSupplies] = useState('');
  let out = supplies.map((supply, index) => {
    let stillNeeded= true;
    bringingSupplies.forEach((personSupplies, bsIndex) => {
      if(personSupplies[1] == index){
        stillNeeded = false;
      }
    });

    function updateBringingSupplies(personIndex, supplyIndex){
      console.log(personIndex);
      console.log(supplyIndex);
      let clone = bringingSupplies.splice(0);
      clone.push([personIndex, supplyIndex]);
      setBringingSupplies(clone);
    }

    let selectOut;
    let localSupply = supply;
    if(stillNeeded){
      selectOut = <Choose options={invited} handleChoice={(e) => updateBringingSupplies(e.target.value, index)}></Choose>
    } else {
      selectOut = '';
    }

    return <li className={stillNeeded ? "ingredients" : "ingredients got"}>{supply}{selectOut}</li>
  });
  let newClass = 'hidden';
  if(visible == 'supplies'){
    newClass = 'block';
  }
  function handleAddSupplies(){
    let clone = supplies.slice(0);
    clone.push(newSupplies);
    setSupplies(clone);
    setNewSupplies('');
  }
  function handleNewSupplies(e){
    setNewSupplies(e.target.value);
  }
  return (
    <>
    <div><input value={newSupplies} onChange={handleNewSupplies}></input><button onClick={handleAddSupplies}>Add Supplies</button></div>
    <ul className={newClass}>      
    {out}
    </ul>
    </>
  )
}

function Bringing({invited, needs, supplies, jobs, bs, bj, bn}){
  let people = [];
  invited.forEach((person, personIndex) => {
    let bringing = [];
    bn.forEach((personNeeds, bnIndex) => {
      if(personNeeds[0] == personIndex){
        bringing.push(<li className='bg-red-300'>{needs[personNeeds[1]]}</li>);
      }
    });
    bj.forEach((personJobs, bjIndex) => {
      if(personJobs[0] == personIndex){
        bringing.push(<li className='bg-orange-300'>{jobs[personJobs[1]]}</li>);
      }
    });
    bs.forEach((personSupplies, bsIndex) => {
      if(personSupplies[0] == personIndex){
        bringing.push(<li className='bg-lime-300'>{supplies[personSupplies[1]]}</li>);
      }
    });
    
    
    people.push(<div className='border m-2 rounded-lg p-2 border-4'><ul>{person} {personIndex} {bringing}</ul></div>);
  });
  return (
    <>
    <div>Bringing</div>
    <div className='flex'>
    {people}
    </div>
    </>
  )
}