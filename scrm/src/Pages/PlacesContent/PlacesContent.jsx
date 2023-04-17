import React, { useState, useCallback, useEffect } from "react";
import Api from "../../Helpers/Api";
import "./PlacesContent.css";
import japan from "../../Assets/japan2.jpg";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";

function PlacesContent() {
    const { placeId } = useParams();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");

    const reloadData = useCallback(() => {
        Api.getPlace(placeId)
            .then((res) => res.json())
            .then((place) => {
                const { name, address, description, country, city } = place;
                setName(name);
                setAddress(address);
                setDescription(description);
                setCountry(country);
                setCity(city);
            });
    }, []);

    useEffect(() => {
        reloadData();
        console.log(placeId);
    }, [reloadData]);

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <section className="places-header">
                        <div className="banner">
                            <img src={japan} alt="japan" className="banner-img" />
                            <div className="banner-details">
                                <h2>{name}</h2>
                                <div className="banner-details-2">
                                    <p className="country-details">{country}</p>
                                    <p className="add-line">|</p>
                                    <p>{city}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Grid>
                <Grid item xs>
                    <div className="places-main-content">
                        <section
                            className="places-main-content-item"
                            title="Address"
                            id="address"
                        >
                            <h2>Address</h2>
                            <p>{address}</p>
                        </section>
                        <span className="line"></span>
                        <section
                            className="places-main-content-item"
                            title="Description"
                            id="description"
                        >
                            <h2>Description</h2>
                            <p>{description}</p>
                        </section>
                    </div>
                </Grid>
            </Grid>
        </>
    );

}

export default PlacesContent;
