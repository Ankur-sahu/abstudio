import React, { useEffect, useState } from 'react';
import './SelectedBreed.css';
import fetchData from '../../services/apiCalling';

const SelectedBreed = ({ name }) => {

  const [data, setData] = useState([]);
  const [moreImg, setMoreImg] = useState([])

  const fetchDogsList = async () => {
    try {
      const allData = await fetchData(`https://dog.ceo/api/breed/${name}/list`);
      console.log(allData.length === 0)
      const listOfDogsWithImages = await Promise.all(
        allData.map(async (item) => {
          const breedImage = await fetchData(`https://dog.ceo/api/breed/${name}/images/random`);
          return { name: item, image: breedImage };
        })
      );
      setData(listOfDogsWithImages);
    } catch (error) {
      console.error("Error fetching dog data:", error);
    }
  };

  const getMoreImages = async () => {
    try {
      const resp = await fetchData(`https://dog.ceo/api/breed/${name}/images/random/3`);
      setMoreImg(resp)
    } catch (error) {

    }
  }

  useEffect(() => {
    if (data.length < 1) {
      console.log("useEffect")
      fetchDogsList()
      getMoreImages()
    }
  }, [])

  return (
    <>
      <h2>Sub Breed</h2>
      <div className='sub-breed'>
        {data.length > 0 ? data.map((item, index) => (
          <div className='dog-breed-card' key={item.name + index}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        )) : <div>No Sub Breed Found!</div>}
      </div>
      <h2>More Images</h2>
      <div className='dog-breed-more-images'>
        {moreImg.length > 0 && moreImg.map((item) => (
          <div className='dog-breed-card' key={item}>
            <img src={item} alt={name} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectedBreed;
