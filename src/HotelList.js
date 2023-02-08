import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, ButtonGroup } from '@mui/material';
import Hotel from "./Hotel";
import { priceSort } from "./function";

export default ({ hotels }) => {
    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState("asc");

    useEffect(() => {
        const sortArray = type => {
            const sorted = priceSort(hotels, type);
            setData(sorted);
            setSortType(type);
        };

        sortArray(sortType);
      }, [sortType]); 
    return (
            <div>
              <Typography variant="body1">Click buttons below to sort by price:</Typography>
              <ButtonGroup variant="contained" aria-label="sort button group">
                <Button id="btnLowHigh" onClick={() => setSortType("asc")} >Low-High</Button>
                <Button id="btnHighLow" onClick={() => setSortType("desc")} > High-Low</Button>
              </ButtonGroup>
              <br /><br />
              <Typography className="sort-text">Sort by price: {sortType === "asc" ? "Low-High" : "High-Low"}</Typography>
              <br />
              <Grid
                container
                spacing={10}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                >
                {data.map((h) => {
                    return(
                        <Grid item xs={12} md={6} lg={4} key={h.id}>
                            <Hotel hotel={h} />
                        </Grid>
                    );
                })}
              </Grid>
            </div>
    );
}