const filterData =(array,input)=>{
    const filteredData = array.filter((item)=>{
        return (item.name).toLowerCase().includes(input.toLowerCase())
    })
    return filteredData
}
export default filterData