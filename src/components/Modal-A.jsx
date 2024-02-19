/********************** 
I tried Infinity Scroll and it worked but after deploying, it was not working properly.
***********************/

/*
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';

const ModalA = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [showOnlyEven, setShowOnlyEven] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchContacts();
  }, [page]);

  const fetchContacts = () => {
    fetch(`https://contact.mediusware.com/api/contacts/?page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }
        return response.json();
      })
      .then((data) => {
        setContacts((prevContacts) => [...prevContacts, ...data.results]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
        setLoading(false);
      });
  };

  const filterContacts = (contacts) => {
    return contacts.filter((contact) => {
      return (
        contact.phone.includes(searchQuery) ||
        contact.country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchQuery(event.target.value);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center border-bottom">Modal-A</h2>
      <div className="d-flex justify-content-center gap-3">
        <NavLink
          to="/modal-a"
          className="btn"
          style={{ backgroundColor: "#46139f", color: "#fff" }}
          type="button"
        >
          All Contacts
        </NavLink>
        <NavLink
          to="/modal-b"
          className="btn"
          style={{ backgroundColor: "#ff7f50", color: "#fff" }}
          type="button"
        >
          US Contacts
        </NavLink>
        <NavLink
          to="/problem-2"
          className="btn"
          style={{ backgroundColor: "#fff", color: "#46139f", border: "1px solid #46139f" }}
          type="button"
        >
          Close
        </NavLink>
      </div>
      <div className="container row justify-content-center mt-4">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by phone number or country"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <InfiniteScroll
          dataLength={contacts.length}
          next={fetchContacts}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          refreshFunction={fetchContacts}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8593; Release to refresh
            </h3>
          }
        >
          {loading ? (
            <div className="d-flex text-primary justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            filterContacts(contacts).map((contact) => {
              if (showOnlyEven && contact.id % 2 !== 0) {
                return null;
              }
              return (
                <button
                  data-bs-toggle="modal"
                  data-bs-target={`#modal-${contact.id}`}
                  key={contact.id}
                  className="btn my-2 mx-2 col-md-3"
                  style={{ backgroundColor: "#139f98", color: "#fff" }}
                  type="button"
                >
                  {contact.phone}
                </button>
              );
            })
          )}
        </InfiniteScroll>
      </div>
      <div>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          onChange={(e) => setShowOnlyEven(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Only even
        </label>
      </div>
    </div>
  );
};

export default ModalA;
*/

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const ModalA = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [showOnlyEven, setShowOnlyEven] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchContacts();
  }, [page]);

  const fetchContacts = () => {
    fetch(`https://contact.mediusware.com/api/contacts/?page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }
        return response.json();
      })
      .then((data) => {
        setContacts(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
        setLoading(false);
      });
  };

  const filterContacts = (contacts) => {
    return contacts.filter((contact) => {
      return (
        contact.phone.includes(searchQuery) || 
        contact.country.name.toLowerCase().includes(searchQuery.toLowerCase()) 
      );
    });
  };

  let typingTimeout;
  const handleSearchChange = (event) => {
    const { value } = event.target;
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setSearchQuery(value);
    }, 100);
  };


  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchQuery(event.target.value);
    }
  };

  const modalButtonA = {
    backgroundColor: "#46139f",
    color: "#fff",
  };
  const modalButtonB = {
    backgroundColor: "#ff7f50",
    color: "#fff",
  };
  const modalButtonC = {
    backgroundColor: "#fff",
    color: "#46139f",
    border: "1px solid #46139f",
  };

  return (
    <div className="container">
      <h2 className="text-center border-bottom">Modal-A (All Contacts)</h2>
      <div className="d-flex justify-content-center gap-3">
        <NavLink
          to="/modal-a"
          className="btn"
          style={modalButtonA}
          type="button"
        >
          All Contacts
        </NavLink>
        <NavLink
          to="/modal-b"
          className="btn"
          style={modalButtonB}
          type="button"
        >
          US Contacts
        </NavLink>
        <NavLink
          to="/problem-2"
          className="btn"
          style={modalButtonC}
          type="button"
        >
          Close
        </NavLink>
      </div>
      <div className="container row justify-content-center mt-4">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by phone number or country"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        {loading ? (
          <div className="d-flex text-primary justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
            filterContacts(contacts).map((contact) => {
            if (showOnlyEven && contact.id % 2 !== 0) {
              return null;
            }

            return (
              <>
                <button
                  data-bs-toggle="modal"
                  data-bs-target={`#modal-${contact.id}`}
                  key={contact.id}
                  className="btn my-2 mx-2 col-md-3"
                  style={{ backgroundColor: "#139f98", color: "#fff" }}
                  type="button"
                >
                  {contact.phone}
                </button>
                <div
                  className="modal fade"
                  id={`modal-${contact.id}`}
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby={`modal-${contact.id}-label`}
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1
                          class="modal-title fs-5"
                          id={`modal-${contact.id}-label`}
                        >
                          Phone: {contact.phone}
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <h4>Country: {contact.country.name}</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Obcaecati, placeat deleniti. Doloribus amet
                          sapiente eius, modi id vero ipsa necessitatibus,
                          tempore velit veritatis possimus. Consectetur harum
                          adipisci eligendi vitae id? Dignissimos veritatis
                          magni nesciunt doloremque explicabo eveniet voluptatum
                          molestiae! Consequuntur.
                        </p>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-dismiss="modal"
                        >
                          Okay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        )}
      </div>
      <div className="d-flex justify-content-center mt-4 gap-2">
        <button
          className="btn btn-primary"
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button className="btn btn-success rounded-circle">{page}</button>
        <button
          className="btn btn-primary"
          disabled={page === 30}
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          Next
        </button>
      </div>
      <div>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          onChange={(e) => setShowOnlyEven(e.target.checked)}
        />
        <label className="form-check-label" for="flexCheckDefault">
          Only even
        </label>
      </div>
    </div>
  );
};

export default ModalA;