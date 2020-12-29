import React, { Component } from 'react'
import Map from '../Map/Map'
import RouteStore from '../RouteStore'
import "./S1.css"
import "../Map/Map.css"


class S1 extends Component {

    s1Mounted = false
    constructor() {
        super();
        this.state = {
            lat: 46.8721,
            lng: -113.9940,
            zoom: 11,
            dropPin: false,
            nag: true
        }
    }

    componentDidMount() {
        this.s1Mounted = true
        this.centerInterval = setInterval(this.setCenter, 150)
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

    dropPin = () => {
        if (this.state.dropPin && this.s1Mounted) {
            this.setState({ dropPin: false })
        } else {
            this.setState({ dropPin: true })
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
                        When the crosshairs are over the location click the Drop Pin button at the bottom of the screen
                    </h2>
                    <div className="Toggle_Nag" onClick={this.toggleNag}>
                        <img src="./res/ok.png" alt="" ></img>
                        <p>Got it!</p>
                    </div>
                </div>}
                <div className="Map_Container">
                    {this.state.dropPin && <Map
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
                                if (this.s1Mounted) {
                                    window.pinLat = map.center.lat()
                                    window.pinLng = map.center.lng()
                                    window.mapZoom = map.getZoom()
                                }
                            });
                            // eslint-disable-next-line
                            const marker = new window.google.maps.Marker(
                                {
                                    position: { lat: this.state.lat, lng: this.state.lng },
                                    map: map,
                                    label: '',
                                });

                            const flightPlanCoordinates = RouteStore
                            const flightPath = new window.google.maps.Polyline({
                                path: flightPlanCoordinates,
                                geodesic: true,
                                strokeColor: "#00ff2e",
                                strokeOpacity: 1.0,
                                strokeWeight: 2,
                            });
                            flightPath.setMap(map);
                        }}
                    />}
                    {!this.state.dropPin && <Map
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
                                window.pinLat = map.center.lat()
                                window.pinLng = map.center.lng()
                                window.mapZoom = map.getZoom()
                            });

                            const flightPlanCoordinates = RouteStore
                            const flightPath = new window.google.maps.Polyline({
                                path: flightPlanCoordinates,
                                geodesic: true,
                                strokeColor: "#00ff2e",
                                strokeOpacity: 1.0,
                                strokeWeight: 2,
                            });
                            flightPath.setMap(map);
                        }}
                    />}
                </div>
                {this.state.dropPin && !this.state.nag && <div className="Clear_Btn">
                    <div id="clear" onClick={this.dropPin}>
                        <img src="./res/back.png" alt=""></img>
                        <p>Back</p>
                    </div>
                    <div id="next" onClick={this.next}>
                        <p>Next</p>
                        <img src="./res/back.png" alt=""></img>
                    </div>
                </div>}
                {!this.state.dropPin && !this.state.nag && window.pinLat && <div className="Drop_Btn" onClick={this.dropPin}>
                    <div className="Drop">
                        <img src="./res/pin.png" alt=""></img>
                        <p>Drop Pin</p>
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