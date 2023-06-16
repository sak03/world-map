import React, { useState } from 'react'
import axios from 'axios';
import { Menubar } from 'primereact/menubar';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";




const LandingPage = () => {

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCountryData, setSelectedCountryData] = useState(null);

    // =========== url for geographical data of all countries ==============
    const geoUrl =
        "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";


    // === get country list =====
    const countryList = async (countryName) => {
        await axios
            .get(`https://restcountries.com/v3.1/name/${countryName}`, {
                headers: {
                    // "Content-Type": "application/json",
                },
            })
            .then(
                (res) => {
                    const dt = res.data;
                    setSelectedCountryData(dt[0]);
                },
                (err) => {
                    console.log(err);
                }
            );
    }


    // ===== handlecoutry click =============
    const handleCountryClick = (geo) => {
        setSelectedCountry(geo);
        countryList(geo.properties.name)
        setSelectedCountryData(null);
    };


    // =========== nav bar item ========
    const items = [
        {
            label: 'World Map',
            icon: 'pi pi-globe',
        },
    ];

    // ======= company logo ===================
    const start = <img alt="logo" src="logo1.jpeg" height="40" className="mr-2"></img>;


    return (
        <div className=''>
            <div className="" style={{ width: "100%", position: "fixed", top: "0", zIndex: "5" }}>
                <Menubar
                    model={items}
                    start={start}
                />
            </div>
            <div className='row'>
                <div className='col-lg-9'>
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{ scale: 75 }}
                    >
                        <Geographies
                            geography={geoUrl}
                        >
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onClick={() => handleCountryClick(geo)}
                                        style={{
                                            default: {
                                                fill: selectedCountry === geo ? '#F53' : '#a4dae7c2',
                                                outline: 'none',
                                            },
                                            hover: {
                                                fill: '#F53',
                                                outline: 'none',
                                            },
                                            pressed: {
                                                fill: '#E42',
                                                outline: 'none',
                                            },
                                        }}
                                    />
                                ))
                            }
                        </Geographies>
                    </ComposableMap>
                </div>
                <div
                    className='col-lg-3'
                    style={{ position: "relative", top: "5rem" }}
                >
                    {selectedCountryData !== null ?
                        <div>
                            <h3>{selectedCountryData?.name?.common}</h3>
                            <div><i className='text-muted'>{selectedCountryData?.name?.official}</i></div>
                            <img src={selectedCountryData?.flags?.png} alt="countryImg" width={100} className='border' />
                            <div className='mt-2'><strong>Capital</strong>: {selectedCountryData?.capital && selectedCountryData?.capital[0]}</div>
                            <div><strong>Population</strong>: {selectedCountryData?.population}</div>
                            <div><strong>Area</strong>: {selectedCountryData?.area}</div>
                            <div><strong>Time Zones</strong>: {selectedCountryData?.timezones[0]}</div>
                            <div><strong>Continent</strong>: {selectedCountryData?.continents[0]}</div>
                        </div> :
                        <p>Select country to see the their information.</p>
                    }
                </div>

            </div>
            <div>

            </div>
        </div>
    )
}

export default LandingPage;