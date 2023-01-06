import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtn, MDBBtnGroup } from 'mdb-react-ui-kit';

function App() {

  let [data, setData] = useState([]) // Here we call useState() that takes an empty array and it will return an array with two items-data,setData(data contain the intial value and setData is an updater function which is responsible for update the data value whenever someone call it)
  let [value, setValue] = useState("")
  let [sortValue, setSortvalue] = useState("")
  let [country, setCountry] = useState("");


  const sortOptions = ["Ave", "Runs", "BF", "100", "50"]

  useEffect(() => {
    loadUserData();
  }, [])



  const loadUserData = async () => {
    return await axios.get("http://localhost:5500/get").then((response) => {
      setData(response.data)
      // console.log(response.data)
    }).catch(error => {
      console.log(error)
    })
  }


  const handleReset = () => {
    loadUserData();
  }




  const handleSearch = async (e) => {
    e.preventDefault();
    console.log()

    return await axios.get(`http://localhost:5500/search/${value}`).then((response) => {
      setData(response.data);
      console.log(response.data)
      setValue("")
    }).catch((err) => console.log(err))

  }

  const searchCountry = async (e) => {
    e.preventDefault();

    return await axios.get(`http://localhost:5500/search/${country}`).then((response) => {
      setData(response.data);
      setValue("")
    }).catch((err) => console.log(err))

  }


  const handleSort = async (e) => {
    let value = e.target.value;
    console.log(value)

    setSortvalue(value);
    return await axios.get(`http://localhost:5500/sort/${value}`).then((response) => {
      setData(response.data);
      console.log(response.data)
      // console.log(response)

    }).catch((err) => console.log(err))

  }
  return (
    <MDBContainer>
      <h2 className='text-center ' style={{ marginTop: "50px", font: "200px", color: "lightgreen" }}>ODI RANKING</h2>
      <form style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: "center",
        paddingTop: "100px"
      }} className='d-flex  input-group w-auto' onSubmit={handleSearch}>

        <input type="text" className='form-control' placeholder='Search Player..' value={value} onChange={(e) => setValue(e.target.value)} />

        <MDBBtn type='submit' color='dark'>Search</MDBBtn>
        <MDBBtn className='mx-2' color='info' onClick={() => handleReset()}>Reset</MDBBtn>

      </form>




      <div style={{ margin: "100px" }}>



        <MDBRow>
          <MDBCol size="7"><h5>Sort By:</h5>
            <select style={{ width: "50%", borderRadius: "2px", height: "35px" }} onChange={handleSort} value={sortValue}>

              <option>Please Select Value</option>
              {sortOptions.map((item, index) => (
                <option value={item} key={index}>{item}</option>
              ))}

            </select>
          </MDBCol>
          <MDBCol size="5" style={{ marginBottom: "120px" }}><h5>Filter By Country</h5>

            <form style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "400px",
              alignContent: "center"
            }} className='d-flex  input-group w-auto' onSubmit={searchCountry}>

              <input type="text" className='form-control' placeholder='Country..' value={country} onChange={(e) => setCountry(e.target.value)} />

              <MDBBtn type='submit' color='dark'>Search</MDBBtn>


            </form>

          </MDBCol>



        </MDBRow>


        <MDBRow>
          <MDBCol size="12">

            <MDBTable>
              <MDBTableHead dark>

                <tr>
                  <th scope='col'>Player</th>
                  <th scope='col'>Span</th>
                  <th scope='col'>Mat</th>
                  <th scope='col'>Inns</th>

                  <th scope='col'>No</th>
                  <th scope='col'>Runs</th>

                  <th scope='col'>HS</th>
                  <th scope='col'>Ave</th>
                  <th scope='col'>BF</th>
                  <th scope='col'>SR</th>

                  <th scope='col'>100</th>
                  <th scope='col'>50</th>

                  <th scope='col'>0</th>




                </tr>

              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className='align-center mb-0'>
                  <tr>
                    <td colSpan={5} className='text-center mb-0'> NO</td>
                  </tr>

                </MDBTableBody>
              ) : (
                data.map((item, index) => (
                  <MDBTableBody key={index}>
                    <tr>
                      {/* <th scope="row">{index+1}</th> */}

                      <td>{item.Player}</td>
                      <td>{item.Span}</td>
                      <td>{item.Mat}</td>
                      <td>{item.Inns}</td>
                      <td>{item.NO}</td>
                      <td>{item.Runs}</td>
                      <td>{item.HS}</td>
                      <td>{item.Ave}</td>
                      <td>{item.BF}</td>
                      <td>{item.SR}</td>
                      <td>{item[100]}</td>
                      <td>{item[50]}</td>
                      <td>{item[0]}</td>





                    </tr>

                  </MDBTableBody>
                ))
              )}





            </MDBTable>

          </MDBCol>
        </MDBRow>



      </div>


    </MDBContainer>

  );
}

export default App;
