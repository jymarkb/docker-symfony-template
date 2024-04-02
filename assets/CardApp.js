import React, { useState, useEffect, Suspense } from "react";
import { createRoot } from "react-dom/client";
import Card from "./Card.js";
import "./styles/card.scss";

function CardApp() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch API data
        const response = await fetch(
          "https://random-data-api.com/api/v3/projects/593a3aa5-9da3-4dcf-a35a-9b55a70dbad4?api_key=1eVBkn9NzMU7l8TI5mkwpQ"
        );
        const data = await response.json();

        // map data to array
        const newPersons = data.json_array.map((person) => ({
          id: crypto.randomUUID(),
          fname: person.first_name,
          lname: person.last_name,
          avatar: person.contact_info.avatar,
          title: person.work_info.job_title,
          description: person.lorem_sentence,
          skills: person.skills.specialities,
        }));

        // updating the state
        setPersons((prevPersons) => [...prevPersons, ...newPersons]);
      } catch (e) {
        console.log("Error: " + e);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="card">
      {persons.map((data, index) => (
        <Card key={index} data={data} />
      ))}
    </section>
  );
}

const root = createRoot(document.getElementById("container"));
root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <CardApp />
  </Suspense>
);
