import React, { useState, useEffect } from 'react'
import axios from 'axios';


function YandexMapsApi() {
    const [endpoint, setEndpoint] = useState();
    useEffect(() => {
        // let url =
        //     axios({
        //         method: "post",
        //         url: endpoint,
        //         data: data,
        //         headers: {
        //             "Content-Type": "application/json"
        //         }
        //     })
        //         .then(response => {

        //         }).catch(error => {
        //             console.log(error)
        //         })
        {/* <script type="text/javascript" src="https://api-maps.yandex.ru/2.1/?lang=en_RU&apikey=60445215-6d3a-4f88-87fe-8d52b72e5bc9"></script>
<div id="map"></div> */}
        function cr() {
            const script = document.createElement("script");

            script.src = "https://api-maps.yandex.ru/2.1/?lang=en_RU&apikey=c0d6844b-8a33-4439-8415-ab67e4fb84a8";
            script.async = true;

            document.body.appendChild(script);
        }
        cr();
        setTimeout(() => {
            ymaps.ready(init);
        }, 2000);


        function init() {
            var myMap = new ymaps.Map("map", {
                center: [54.83, 37.11],
                zoom: 5
            }, {
                searchControlProvider: 'yandex#search'
            }),

                // .add(new ymaps.Placemark([55.694843, 37.435023], {
                //     balloonContent: '<strong>crocodile\'s nose</strong> color',
                //     iconCaption: 'Really, really long but super interesting text'
                // }

                // Creating a geo object with the "Point" geometry type.
                myGeoObject = new ymaps.Placemark({
                    // The geometry description.
                    geometry: {
                        type: "Point",
                        coordinates: [55.8, 37.8]
                    },
                    // Properties.
                    properties: {
                        // The placemark content.
                        iconContent: 'I\'m draggable',
                        hintContent: 'Come on, drag already!'
                    }
                }, {
                    /**
                     * Options.
                     * The placemark's icon will stretch to fit its contents.
                     */
                    preset: 'islands#blackStretchyIcon',
                    // The placemark can be dragged.
                    draggable: true
                });

            myMap.geoObjects
                .add(myGeoObject).add(new ymaps.Placemark([55.694843, 37.435023], {
                    balloonContent: '<strong>crocodile\'s nose</strong> color',
                    iconCaption: 'Really, really long but super interesting text'
                }))


            // A placemark with balloon contents loaded using AJAX.
            placemark = new ymaps.Placemark([55.8, 37.72], {
                iconContent: "Get the address",
                hintContent: "Drag the placemark and click to see the address"
            }, {
                // Disabling the replacement of the conventional balloon with the balloon panel.
                balloonPanelMaxMapArea: 0,
                draggable: "true",
                preset: "islands#blueStretchyIcon",
                // Making the balloon open even if there is no content.
                openEmptyBalloon: true
            });

            /**
             * Handling the event of opening the balloon on the geo object:
             * begin loading data, then updating its contents.
             */
            placemark.events.add('balloonopen', function (e) {
                placemark.properties.set('balloonContent', "Loading data...");

                // Imitating a delay when loading data (for demonstration purposes).
                setTimeout(function () {
                    ymaps.geocode(placemark.geometry.getCoordinates(), {
                        results: 1
                    }).then(function (res) {
                        console.log(res.geoObjects.get(0));
                        var newContent = res.geoObjects.get(0) ?
                            res.geoObjects.get(0).properties.get('text') :
                            'Couldn\'t detect address.';

                        // Setting the new content of the balloon in the corresponding placemark property.
                        placemark.properties.set('balloonContent', newContent);
                    });
                }, 1500);
            });

            myMap.geoObjects.add(placemark);
        }
    }, [])
    return (
        <div id="map" style={{ height: "400px" }}>

        </div>
    )
}

export default YandexMapsApi
