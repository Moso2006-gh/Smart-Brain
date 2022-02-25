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

const Capp = new Clarifai.App({
 apiKey: '9a3a2c9671b44e47975fe0776e83fafc'
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log("face", face);
    const image = document.getElementById("InputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    
    const coord = {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
    console.log(coord);
    return (coord)
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    Capp.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='App'>
        <Particles className='particles'
          options={ParticleOptionsData()}/>
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkform onButtonSubmit={this.onButtonSubmit} 
        onInputChange={this.onInputChange}/>
        <FaceRecognition box={this.state.box} imgUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
