import React, { useEffect, useState } from 'react'
import fetchData from './services/apiCalling';
import './App.css';
import CreateModal from './components/modal/CreateModal';
import filterData from './utils/filterData';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [openModal, setOpenModal] = useState(false)
  const [modalTitle,setModalTitle] = useState("Custom Search")
  const [loader,setLoader] =useState("Loading Please Wait..........")

  const fetchDogsList = async () => {
    try {
      const allData = await fetchData('https://dog.ceo/api/breeds/list/all');
      const listOfDogsWithImages = [];
      for (const item of Object.keys(allData)) {
        const breedImage = await fetchData(`https://dog.ceo/api/breed/${item}/images/random`);
        listOfDogsWithImages.push({ name: item, image: breedImage });
      }
      setData(listOfDogsWithImages);
      setFilteredData(listOfDogsWithImages);
      setLoader("No Data Found!")
    } catch (error) {
      console.error("Error fetching dog data:", error);
    }
  };

  const hadleModal = (name)=>{
    setModalTitle(name)
    setOpenModal(!openModal)
  }

  const handleFilter =(e)=>{
    const filteredData = filterData(data,e.target.value)
    setFilteredData(filteredData)

  }
  useEffect(() => {
    if(data.length<1){
      console.log("useEffect")
      fetchDogsList()
    }
  }, [])
  return (
    <div className="App">
      <header>
        <div className="title">
          Dog Gallary
        </div>
        <div>
          <button onClick={()=>hadleModal("Custom Search")}>
            Custom Search
          </button>
        </div>
      </header>
      <div className="container">
        <div>
          <input type="text" placeholder="Type here to filter by breed" onChange={handleFilter}/>
        </div>
        <div className="dog-list-container">
          {openModal && <CreateModal title={modalTitle} data={data} setOpenModal={setOpenModal}/>}
          {filteredData.length > 0 ? filteredData.map((item,index) => (
            <div className='dog-card' onClick={()=>hadleModal(item.name)} key={item.name+index}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
            </div>
          )):<div>{loader}</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
