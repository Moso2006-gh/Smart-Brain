import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo'
import ImageLinkform from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from "react-tsparticles";
import ParticleOptionsData from './Components/Particles/Particles';
import React from 'react';
import Clarifai from 'clarifai'
import FaceRecognition  from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      boxes: [],
      route: "signIn",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        entries: 0,
        joined: ""
      }
    }
  }

  loadUser = (data) => {
    console.log(data)
    this.setState({user: data})
  }

  calculateFaceLocation = (data) => {
    const faces = data.outputs[0].data.regions;
    console.log("porfinnnn", faces);
    const image = document.getElementById("InputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    const coords = [];
    console.log("Vamosss", coords)
    faces.forEach(face => {
      console.log(face)
      const info = face.region_info.bounding_box;
      coords.push({
        leftCol: info.left_col * width,
        topRow: info.top_row * height,
        rightCol: width - (info.right_col * width),
        bottomRow: height - (info.bottom_row * height)
      })
    });
    console.log("cords", coords);
    return (coords)
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes})
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch("https://secure-springs-34871.herokuapp.com/imageurl", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response){
        fetch("https://secure-springs-34871.herokuapp.com/image", {
          method: "put",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(response => {
          this.setState(Object.assign(this.state.user, {entries: response}))
        }).catch(console.log);
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({
      route: route,
      imageUrl: "",
      input: ""
    });
  }

  render() {
    return (
      <div className='App'>
        <Particles className='particles'
          options={ParticleOptionsData()}/>
        {
          this.state.route === "home" 
          ? <>
            <Navigation onRouteChange={this.onRouteChange}/>
            <Logo/>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkform onButtonSubmit={this.onButtonSubmit} 
            onInputChange={this.onInputChange}/>
            <FaceRecognition boxes={this.state.boxes} imgUrl={this.state.imageUrl}/>
          </> 
          : (
            this.state.route === "signIn" 
            ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
        }
      </div>
    );
  }
}

export default App;
