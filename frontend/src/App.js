import React, {Component, Fragment} from 'react';
import Particles from 'react-particles-js'
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Counter from './components/Counter/Counter';
import './App.css';
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

const particlesParams = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 600
            }
        }
    }
};

const initialState = {
    imageUrl: '',
    input: '',
    box: '',
    route: 'signIn',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
};
class App extends Component{
    constructor() {
        super();
        this.state = {
            input: '',
            box: '',
            route: 'signIn',
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        };
    }
    loadUser = (data) => {
        const {name, email, id, entries, joined} = data;
        this.setState({
            user:{
                id: id,
                name: name,
                email: email,
                entries: entries,
                joined: joined
            }
        });
    };
    resetState = () => {
        this.setState(initialState)
    };
    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        return {
            topRow: clarifaiFace.top_row*100,
            rightCol: 100 - clarifaiFace.right_col*100,
            bottomRow: 100 - clarifaiFace.bottom_row*100,
            leftCol: clarifaiFace.left_col*100
        }
    };
    displayFaceBox = (box) => {
        this.setState({box: box});
    };
    onInputChange = (event) => {
        this.setState({input: event.target.value})
    };
    onButtonSubmit = () => {
        this.setState({
            imageUrl: this.state.input
        });

        fetch('https://young-reaches-86193.herokuapp.com/imageurl',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response=>response.json())
            .then(response => {
                if(response){
                    fetch('https://young-reaches-86193.herokuapp.com/image',{
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, {entries:count}))
                        })
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err))
    };
    onRouteChange = (route) => {
        if(route === 'signIn'){
            this.resetState();
        }else if (route === 'home'){
            this.setState({isSignedIn:true})
        }
        this.setState({route:route})
    };
    render() {
        const {route,isSignedIn, box, imageUrl} = this.state;
        return (
            <div className="App">
                <Particles
                    className='particles'
                    params={particlesParams}
                />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
                { route === 'signIn' ?
                    <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                : route === 'register' ?
                    <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                :
                    <Fragment>
                    <Counter name={this.state.user.name} entries={this.state.user.entries} />
                    <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                    />
                    <FaceRecognition box={box} imageUrl={imageUrl} />
                    </Fragment>
                }
            </div>
        )
    };
}

export default App;
