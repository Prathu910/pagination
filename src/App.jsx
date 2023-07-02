import { useState } from "react";
import { useEffect } from "react";
import paginate from "./utils";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  let [page, setPage] = useState(0);

  const btnText = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  async function fetchUsers() {
    try {
      const response = await fetch("https://api.github.com/users?per_page=100");
      const data = await response.json();
      setLoading(false);
      console.log(paginate(data));
      // setUsers(data);
      setUsers(paginate(data));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function handlePrevClick() {
    if (page === 1) {
      setPage(users.length - 1);
    } else {
      setPage((prevPage) => prevPage - 1);
    }
    console.log(page);
  }

  function handleNextClick() {
    if (page === users.length - 1) {
      setPage(0);
    } else {
      setPage((prevPage) => prevPage + 1);
    }
    console.log(page);
  }

  if (users.length < 1) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container">
      <h1>Github Users - Pagination</h1>
      <div className="users">
        {users[page].map((user) => {
          return (
            <div className="user" key={user.id}>
              <img src={user.avatar_url} alt={user.login} />
              <h3 className="name">{user.login}</h3>
              <button>
                <a href={user.html_url} target="_blank">
                  View Profile
                </a>
              </button>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <button className="btn" onClick={handlePrevClick}>
          Prev
        </button>
        {btnText.map((value, index) => {
          return (
            <button
              className={`btn ${page == value - 1 ? "active" : ""}`}
              key={index}
              onClick={() => setPage(value - 1)}
            >
              {value}
            </button>
          );
        })}
        <button className="btn" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
