import React, { useEffect, useState } from 'react';
import './SelectedBreed.css';
import fetchData from '../../services/apiCalling';

const CustomSearch = ({ data }) => {

  const [breed, setBreed] = useState("") 
  const [number, setNumber] = useState(0)
  const [breedImages, setBreedImages] = useState([])
  const [btnState,setBtnState] = useState(true)

  const getImages =async()=>{
    
    try {
      const images = await fetchData(`https://dog.ceo/api/breed/${breed}/images/random/${number}`);
      setBreedImages(images);

    } catch (error) {
      console.error("Error fetching dog data:", error);
    }
  }
  useEffect(()=>{
    if(!breed || !number){
      setBtnState(true)
    }else{
      setBtnState(false)
    }
  },[breed,number])
  return (
    <>
      <div className='input-container'>
        <select onChange={(e) => setBreed(e.target.value)}>
          <option>Select a Breed</option>
          {data.length > 0 && data.map((item) => (
            <option value={item.name} key={item.name}>{(item.name).toUpperCase()}</option>
          ))}
        </select>
        <input type='number' placeholder='Number if Images' onChange={(e) => setNumber(e.target.value)} />
      </div>
      <div className='input-container'>
        <button onClick={getImages} disabled={btnState}>Get Images</button>
      </div>
      {breedImages.length > 0 && <>
        <h2>Showing {number} images of {breed}</h2>
        <div className='dog-breed-more-images'>
          {breedImages.length > 0 && breedImages.map((item) => (
            <div className='dog-breed-card' key={item}>
              <img src={item} alt={breed} />
            </div>
          ))}
        </div>
      </>}
    </>
  );
};

export default CustomSearch;
