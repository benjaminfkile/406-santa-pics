import React, { Component } from 'react'
import SponsorStore from '../SponsorStore'
import '../S3/S3.css'

class S3 extends Component {

    endshowMounted = false
    sponsorDex = 0
    constructor(props) {
        super(props);
        this.state = {
            sponsor: 0
        }
    }

    componentDidMount() {
        this.endshowMounted = true;
        setInterval(this.switchSponsor, 8000)
    }

    componentWillUnmount() {
        this.endshowMounted = false;
        clearInterval(this.updateInterval)
    }

    switchSponsor = () => {
        this.sponsorDex += 1
        if (this.sponsorDex > SponsorStore.length - 1) {
            this.sponsorDex = 0
        }
        this.setState({ sponsor: this.sponsorDex })
    }

    openSponsorSite = (args) => {
        if(args){
            window.open(SponsorStore[args].url, '_blank')
        }
    }

    render() {
        return (
            <div className="S3">
                <h1>Thank You!</h1>
                <h2>We will use this information to help find the best viewing locations for the 2021 flight.</h2>
                <h3>Thank you to all our sponsors and donors.</h3>
                <div className="Sonsors">
                    <img src={SponsorStore[this.state.sponsor].img} alt={SponsorStore[this.state.sponsor].name} onClick={() => this.openSponsorSite(this.state.sponsor)}></img>
                </div>
                <div className="Contact">
                <a href="https://www.facebook.com/groups/374773957140495/" target="_blank" rel="noopener noreferrer"><img id="fb" src="./res/fb.png" alt="Facebook"/> &nbsp;</a>
                <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=santaflyover@gmail.com" target="_blank" rel="noopener noreferrer"><img id="mail" src="./res/mail.png" alt="email"/> &nbsp;</a>
                <h2>Western Montana Santa Fly Over</h2>
                </div>
            </div>
        )
    }
}

export default S3