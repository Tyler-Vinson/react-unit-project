import { Component } from "react";
import "./old-photos.css";

class oldPhotos extends Component {
constructor() {
super();
this.state = {
photos: []
};}
componentDidMount() {
    fetch("https://api.si.edu/openaccess/api/v1.0/content/:id")
}
render() {
return (
<section className="app">
<p>Is this working?</p>
</section>);}}


export default oldPhotos;
