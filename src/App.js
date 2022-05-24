import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import Button from "./components/Button";
import CandidateCard from "./components/CandidateCard";



const url = "https://json-server-mocker-masai.herokuapp.com/candidates";
const fetchCandidates = (page = 1, order = "ASC", lim = 5) => {
  return axios.get(url, {
    params: {
      _page: page,
      _lim: lim,
      _sort: "salary",
      _order: order,
    },
  });
};
export default function App() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [ascending, setAscending] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);

  const [lim, setLim] = useState(5);
  useEffect(() => {
    setLoad(true);
    const order = ascending ? "ASC" : "DESC";
    fetchCandidates(page, order)
      .then((res) => {
       
        setLoad(false);
        setError(false);
        setData([...res.data]);
      })
      .catch((error) => {
        setLoad(false);
        setError(true);
        console.log(error);
      });
  }, [page, ascending]);
  const handlePrev = () => setPage(page - 1);
  const handleNext = () => setPage(page + 1);
  const handleOrderChange = () => setAscending(!ascending);
  return (
    <div className="App">
      <div>
        <div id="load-container">{load ? "...Load" : null} </div>
        <div> {error ? "Something went wrong!" : null}</div>
        <Button
          id="SORT_BUTTON"
          title={`Sort by ${!ascending ? "Ascending" : "Descending"} Salary`}
          onClick={handleOrderChange}
        />
        <Button
          title="PREV"
          id="PREV"
          disabled={page === 1}
          onClick={handlePrev}
        />
        <Button
          id="NEXT"
          title="NEXT"
          onClick={handleNext}
          disabled={data.length < lim}
        />
      </div>
      {data.map((item) => (
        <CandidateCard candidate={item} key={item.id} />
      ))}
    </div>
  );
}
