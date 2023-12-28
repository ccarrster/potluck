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

function Potluck(){
  const [visible, setVisible] = useState(null);
  const [supplies, setSupplies] = useState(startSupplies);

  let name = 'Frozen Cupcakes :)';
  let date = 'Dec 18, 2023';
  let time = '6:00 PM';
  let invited = ['Daddy', 'Mommy', 'Ellott', 'Jasper', 'Sydney', 'Ben', 'Sophia', 'Freya'];
  let needs = ['Icing - white', 'Sprinkles', 'Flour', 'Salt', 'Sugar', 'Eggs', 'Milk', 'Baking Soda', 'Chcolate Icing'];
  let jobs = ['Baker', 'Cleaner', 'Decorator'];
  let bringingSupplies = [[0, 0], [0, 2], [2, 1]];
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
      <div className='border drop-shadow p-2 m-2 w-1/2' onClick={onPeopleClick}>
        <Invited people={invited} visible={visible}/>
      </div>
      <div className='border drop-shadow p-2 m-2 w-1/2' onClick={onIngredientsClick}>
        <Ingredients ingredients={needs} bringingNeeds={bringingNeeds} visible={visible}/>
      </div>
      <div className='border drop-shadow p-2 m-2 w-1/2' onClick={onJobsClick}>
        <Jobs jobs={jobs} bringingJobs={bringingJobs} visible={visible}/>
      </div>
      <div className='border drop-shadow p-2 m-2 w-1/2' onClick={onSuppliesClick}>
        <Supplies supplies={supplies} bringingSupplies={bringingSupplies} visible={visible} setSupplies={setSupplies}/>
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
    <div>People</div>
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
    <div>Ingredients</div>
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
    <div>Jobs</div>
    <ul className={newClass}>
    {out}
    </ul>
    </>
  )
}

function Supplies({supplies, bringingSupplies, visible, setSupplies}){
  const [newSupplies, setNewSupplies] = useState('');

  
  console.log(bringingSupplies);
  let out = supplies.map((supply, index) => {
    let stillNeeded= true;
    bringingSupplies.forEach((personSupplies, bsIndex) => {
      if(personSupplies[1] == index){
        stillNeeded = false;
      }
    });
    return <li className={stillNeeded ? "ingredients" : "ingredients got"}>{supply}</li>
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
    <div>Supplies</div>
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
    bs.forEach((personSupplies, bsIndex) => {
      if(personSupplies[0] == personIndex){
        bringing.push(<li>{supplies[personSupplies[1]]}</li>);
      }
    });
    bj.forEach((personJobs, bjIndex) => {
      if(personJobs[0] == personIndex){
        bringing.push(<li>{jobs[personJobs[1]]}</li>);
      }
    });
    bn.forEach((personNeeds, bnIndex) => {
      if(personNeeds[0] == personIndex){
        bringing.push(<li>{needs[personNeeds[1]]}</li>);
      }
    });
    people.push(<div className='border'><ul>{person} {personIndex} {bringing}</ul></div>);
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