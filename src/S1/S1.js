import React, { Component } from 'react'
import Map from '../Map/Map'
import RouteStore from '../RouteStore'
import "./S1.css"
import "../Map/Map.css"
import PinStore from '../PinStore'

class S1 extends Component {

    s1Mounted = false
    markers = []
    constructor() {
        super();
        this.state = {
            db: false,
            lat: 46.8721,
            lng: -113.9940,
            zoom: 11,
            nag: true
        }
    }

    componentDidMount() {
        this.s1Mounted = true
        this.markers.push(RouteStore)
        this.centerInterval = setInterval(this.setCenter, 100)
        this.dbInterval = setInterval(this.listen4db, 100)
    }

    listen4db = () => {
        if (PinStore[0]) {
            this.setState({ db: true })
            clearInterval(this.dbInterval)
        }
    }

    componentWillUnmount() {
        this.s1Mounted = false
        clearInterval(this.centerInterval)
    }

    setCenter = () => {
        if (window.pinLat) {
            this.setState({ lat: window.pinLat, lng: window.pinLng, zoom: window.mapZoom })
        }
    }

    toggleNag = () => {
        if (this.state.nag) {
            this.setState({ nag: false })
        } else {
            this.setState({ nag: true })
        }
    }

    next = () => {
        this.props.callback(2)
    }

    render() {

        return (
            <div className="S1">
                {this.state.nag && !this.props.nag && <div className="Nag">
                    <h1>
                        Move the map over where you took the picture
                    </h1>
                    <h2>
                        When the green pin is over the location click the NEXT button at the bottom of the screen.
                    </h2>
                    <div className="Toggle_Nag" onClick={this.toggleNag}>
                        <img src="./res/ok.png" alt="" ></img>
                        <p>Got it!</p>
                    </div>
                </div>}
                {this.state.db && <div className="Map_Container">
                    <Map
                        id="Map"
                        options={{
                            center: { lat: this.state.lat, lng: this.state.lng },
                            zoom: this.state.zoom,
                            fullscreenControl: false,
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            mapTypeId: 'hybrid',
                            gestureHandling: 'greedy'
                        }}

                        onMapLoad={map => {

                            map.addListener("drag", () => {
                                if (this.markers.length > 0) {
                                    this.markers[0].visible = false
                                }
                            });

                            map.addListener("dragend", () => {
                                window.pinLat = map.center.lat()
                                window.pinLng = map.center.lng()
                                window.mapZoom = map.getZoom()
                                let markerImg = new window.google.maps.MarkerImage(
                                    './res/location.png',
                                    null,
                                    null,
                                    null,
                                    new window.google.maps.Size(30, 30)
                                )
                                let marker = new window.google.maps.Marker({
                                    position: { lat: window.pinLat, lng: window.pinLng },
                                    icon: markerImg,
                                    map: map,
                                });
                                this.markers.unshift(marker)
                            });
                                for (let i = 0; i < PinStore[0].length; i++) {
                                    let markerImg = new window.google.maps.MarkerImage(
                                        './res/marker.png',
                                        null,
                                        null,
                                        null,
                                        new window.google.maps.Size(30, 30)
                                    )
                                    let marker = new window.google.maps.Marker({
                                        position: { lat: Number(PinStore[0][i].lat), lng: Number(PinStore[0][i].lng) },
                                        icon: markerImg,
                                        map: map,
                                    });
                                    this.markers.push(marker)
                                }
                            
                            const flightPlanCoordinates = RouteStore
                            const flightPath = new window.google.maps.Polyline({
                                path: flightPlanCoordinates,
                                geodesic: true,
                                strokeColor: "#FFFFFF",
                                strokeOpacity: 1.0,
                                strokeWeight: 2,
                            });
                            flightPath.setMap(map);
                        }}
                    />
                </div>}
                {!this.state.dropPin && !this.state.nag && window.pinLat && <div className="Drop_Btn" onClick={this.next}>
                    <div className="Drop">
                        <img src="./res/pin.png" alt=""></img>
                        <p>Next</p>
                    </div>
                </div>}
                <div className="Target">
                    <img src="../res/target.png" alt=""></img>
                </div>
            </div>
        )
    }
}

export default S1

//build please