import React, { useState, useCallback, useEffect } from "react";
import Api from "../../Helpers/Api";
import "./PlacesContent.css";
import marina from "../../Assets/marina.png";
import merlion from "../../Assets/merlion.png";
import botanic from "../../Assets/botanic.png";
import gardens from "../../Assets/gardens.png";
import louvre from "../../Assets/louvre.png";
import eiffel from "../../Assets/eiffel.png";
import bigben from "../../Assets/bigben.png";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";

function PlacesContent() {
    const { placeId } = useParams();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState("");
    const [img, setImg] = useState('');
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
                if (name === "Marina Bay Sands") {
                    setImg(marina);
                } else if (name === "Merlion Park") {
                    setImg(merlion);
                } else if (name === "Singapore Botanic Gardens") {
                    setImg(botanic);
                } else if (name === "Gardens by the Bay") {
                    setImg(gardens);
                } else if (name === "Louvre Museum") {
                    setImg(louvre);
                } else if (name === "Eiffel Tower") {
                    setImg(eiffel);
                } else if (name === "Big Ben") {
                    setImg(bigben);
                };
            });
    }, []);

    // const reloadImg = useCallback(() => {
    //     if (name === "Marina Bay Sands") {
    //         setImg(marina);
    //     } else if (name === "Merlion Park") {
    //         setImg(merlion);
    //     } else if (name === "Singapore Botanic Gardens") {
    //         setImg(botanic);
    //     } else if (name === "Gardens by the Bay") {
    //         setImg(gardens);
    //     };
    // }, []);

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
                            <img src={img} alt="japan" className="banner-img" />
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
