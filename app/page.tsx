import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Potluck />
    </>
  )
}

function Potluck(){
  let name = 'Frozen Cupcakes :)';
  let date = 'Dec 18, 2023';
  let time = '6:00 PM';
  let invited = ['Daddy', 'Mommy', 'Ellott', 'Jasper', 'Sydney', 'Ben', 'Sophia', 'Freya'];
  let needs = ['Icing - white', 'Sprinkles', 'Flour', 'Salt', 'Sugar', 'Eggs', 'Milk', 'Baking Soda', 'Chcolate Icing'];
  let supplies = ['Oven', 'Oven Mitt', 'Cupcake Tin', 'Liners'];
  let jobs = ['Baker', 'Cleaner', 'Decorator'];
  let bringingSupplies = [[0, 0], [0, 2], [2, 1]];
  let bringingJobs = [[0, 1], [0, 0], [2, 2]];
  let bringingNeeds = [[2, 1], [4, 5], [4, 4], [4, 2], [5, 3], [5, 0], [1, 6], [1, 7]];
  return (
    <>
      <div>
        Event: {name}      
      </div>
      <div>
        When: {date} {time}
      </div>
      <div>
        Who: <Invited people={invited}/>
      </div>
      <div>
        <Ingredients ingredients={needs} bringingNeeds={bringingNeeds}/>
      </div>
      <div>
        <Jobs jobs={jobs} bringingJobs={bringingJobs}/>
      </div>
      <div>
        <Supplies supplies={supplies} bringingSupplies={bringingSupplies}/>
      </div>
      <div>
        <Bringing invited={invited} needs={needs} supplies={supplies} jobs={jobs} bs={bringingSupplies} bj={bringingJobs} bn={bringingNeeds}/>
      </div>
    </>
  )
}

function Invited({people}){
  let out = people.map((person, index) => {
    return <div>{person}</div>
  });
  return (
    <>
    {out}
    </>
  )
}

function Ingredients({ingredients, bringingNeeds}){
  let out = ingredients.map((ingredient, index) => {
    let stillNeeded = true;
    bringingNeeds.forEach((personNeeds, bnIndex) => {
      if(personNeeds[1] == index){
        stillNeeded = false;
      }
    });
    return <div className={stillNeeded ? "ingredients" : "ingredients got"}>{ingredient}</div>
  });
  return (
    <>
    <div>Ingredients</div>
    {out}
    </>
  )
}

function Jobs({jobs, bringingJobs}){
  let stillNeeded = true;
  let out = jobs.map((job, index) => {
    bringingJobs.forEach((personJobs, bjIndex) => {
      if(personJobs[1] == index){
        stillNeeded = false;
      }
    });
    return <div className={stillNeeded ? "ingredients" : "ingredients got"}>{job}</div>
  });
  return (
    <>
    <div>Jobs</div>
    {out}
    </>
  )
}

function Supplies({supplies, bringingSupplies}){
  let stillNeeded= true;
  let out = supplies.map((supply, index) => {
    bringingSupplies.forEach((personSupplies, bsIndex) => {
      if(personSupplies[1] == index){
        stillNeeded = false;
      }
    });
    return <div className={stillNeeded ? "ingredients" : "ingredients got"}>{supply}</div>
  });
  return (
    <>
    <div>Supplies</div>
    {out}
    </>
  )
}

function Bringing({invited, needs, supplies, jobs, bs, bj, bn}){
  let people = [];
  invited.forEach((person, personIndex) => {
    let bringing = [];
    bs.forEach((personSupplies, bsIndex) => {
      if(personSupplies[0] == personIndex){
        bringing.push(<div>{supplies[personSupplies[1]]}</div>);
      }
    });
    bj.forEach((personJobs, bjIndex) => {
      if(personJobs[0] == personIndex){
        bringing.push(<div>{jobs[personJobs[1]]}</div>);
      }
    });
    bn.forEach((personNeeds, bnIndex) => {
      if(personNeeds[0] == personIndex){
        bringing.push(<div>{needs[personNeeds[1]]}</div>);
      }
    });
    people.push(<div>{person} {personIndex} {bringing}</div>);
  });
  return (
    <>
    <div>Bringing</div>
    {people}
    </>
  )
}