import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import logo from './assets/logo.png';
import "./App.css"

const PER_PAGE=5;

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const saved=localStorage.getItem("currentPage") ?? "0";
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [data, setData] = useState([]);

  function fetchData(){
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((data) => {
      setData(data);
    });
  }
  const offset = currentPage * PER_PAGE;
  //console.log("offset", offset)
  function handlePageClick({ selected : selectedPage}:any) {
    console.log("selectedPage",selectedPage);
    setCurrentPage(selectedPage);
  }
  
  const currentPageData = data
    .slice(offset, offset + PER_PAGE)
    .map((res:any ,index) => <><div key={index} style={{ fontSize:"20px", color:"white" }}>{res.title}</div><div style={{fontSize:"18px",color: "aqua", fontStyle:"italic"}}>{res.body}</div><br /></>);
    //console.log("currentPageData", currentPageData)

  const pageCount =Math.ceil(data.length /PER_PAGE);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  return (
    <body>
      <h1 style={{color: "aqua"}}>Page no: {currentPage+1}</h1>
      <img src={logo} style={{height:"100px", width:"100px"}}/>
      {currentPageData} 
      <ReactPaginate
        previousLabel="< previous"
        breakLabel="..."
        nextLabel="next >"
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
        pageRangeDisplayed={5}        
      />
    </body>
  )
}

export default App;
