import { Paper } from "@mui/material";
import React, { useState } from "react";
import "./main.css";

function MainPage({ currentUser }) {
  const [biggestCollections, setBiggestCollections] = useState([]);
  const [lastItems, setLastItems] = useState([]);
  const [tags, setTags] = useState([]);

  return (
    <>
      <section className="biggest-collections">
        <h2>Top 5 biggest collections</h2>
        <Paper elevation={2}>
          { biggestCollections.length ? (
            <ul><li>item</li><li>item</li></ul>
          ) : (
            <p style={{ padding: '0 20px' }}>There are no items.</p>
          )}
        </Paper>
      </section>

      <section className="last-items">
        <h2>Last added items</h2>
        <Paper elevation={2}>
          { lastItems.length ? (
            <ul><li>item</li><li>item</li></ul>
          ) : (
            <p style={{ padding: '0 20px' }}>There are no items.</p>
          )}
        </Paper>
      </section>

      <section className="tags">
        <h2>Tags</h2>
        <div>
          { tags.length ? (
            <ul><li>item</li><li>item</li></ul>
          ) : (
            <p>There are no items.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default MainPage;
