import React, { Component } from 'react'
import axios from 'axios'
import '../S2/S2.css'

class S1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            response: null,
            image: false,
            progress: null,
            finished: false,
            images: null,
        }
    }

    selectImg = (event) => {
        this.setState({ selectedFile: event.target.files[0] })

        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({ image: URL.createObjectURL(img), finished: false });
        }
    }

    uploadImg = () => {
        const formData = new FormData()
        formData.append('image', this.state.selectedFile)
        const apiKey = "0bb30033f87b386364fc4b3ae4edfd99"
        axios.post("https://api.imgbb.com/1/upload?key=" + apiKey + "&name=" + Math.random() + "&image=", formData, {

            onUploadProgress: ProgressEvent => {

                this.setState({ progress: Math.round(ProgressEvent.loaded / ProgressEvent.total * 100), finished: false })
            }
        })
            .then(res => {
                this.setState({ response: res, finished: true, progress: null, update: true })
                // this.storeUrl(this.state.response.data.data.display_url)
                this.next()
            });
    }

    next = () => {
        this.props.callback(3)
    }

    // storeUrl = (args) => {
    //     if (this.state.response) {
    //         fetch('http://localhost:8000/api/images', {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 id: uuid.v4(),
    //                 url: args
    //             })
    //         })
    //     }
    // }

    render() {
        return (
            <div className="Container">
                <div className="Upload_Container">
                    <label className="File_Upload">
                        <img src = "./res/choose-file.png" alt=""></img>
                        <input id="choose-file" type="file" onChange={this.selectImg} />
                Choose Image
                </label>
                    {!this.state.image && <img id="upload-img" src='./res/no-img.jpeg' alt="./res/no-img.jpeg" onLoad={this.checkDimensions} />}
                    {this.state.image && <img id="upload-img" src={this.state.image} alt="./res/no-img.png" onLoad={this.checkDimensions} />}
                    {this.state.progress > 0 && <p id="progress">Progress {this.state.progress}%</p>}
                    {this.state.finished && <p id="success">Success!</p>}
                    {this.state.image && !this.state.finished && <div id="upload-btn" onClick={this.uploadImg}>
                        <img src="./res/upload.png" alt=""></img>
                        <p>Upload</p>
                    </div>}

                </div>
            </div>

        );
    }
}

export default S1