import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Image from './components/Image';
import { Button } from './components/Button';

class App extends Component {

  state = {
    images: [],
    output: [],
    isloading: true,
    currentPage: 1,
    imagesPerPage: 4,
  }

  componentDidMount() {
    this.setImages();
  }

  // Images set to the state
  setImages = async () => {
    const response = await axios.get("https://picsum.photos/v2/list?page=1&limit=100");
    const allImages = response.data;
    const tempImages = allImages.map(image => {
      image.userStatus = null;
      return image;
    })

    this.setState({
      images: tempImages,
      isloading: false,
      totalImages: tempImages.length
    });
  }

  handleOutput(selectedImage) {
    let tempImage = [...this.state.output];
    tempImage = tempImage.filter(temp => temp.id !== selectedImage.id);
    tempImage.push(selectedImage);
    this.setState({
      output: tempImage
    });
  }

  // Okay Commented Image
  imageOkay = (id) => {
    const selectedImage = this.state.images.find(image => image.id === id);
    selectedImage.userStatus = true;
    this.handleOutput(selectedImage);
  }

  // Bad Commented Image
  imageBad = (id) => {
    const selectedImage = this.state.images.find(image => image.id === id);
    selectedImage.userStatus = false;
    this.handleOutput(selectedImage);
  }

  // All Liked
  setAllLiked = (currentPageImages) => {
    let tempImage = [...this.state.output];
    currentPageImages.forEach(image => {
      image.userStatus = true;
      tempImage = tempImage.filter(temp => temp.id !== image.id);
      tempImage = [...tempImage, image];
    });

    this.setState({
      output: tempImage
    });
  }

  // All disliked
  setAllDisliked = (currentPageImages) => {
    let tempImage = [...this.state.output];
    currentPageImages.forEach(image => {
      image.userStatus = false;
      tempImage = tempImage.filter(temp => temp.id !== image.id);
      tempImage = [...tempImage, image];
    });

    console.log(tempImage)
    this.setState({
      output: tempImage
    });
  }

  // Increase page current Page Number 
  nextPage = (indexOfLastImage) => {
    let pageNumber = this.state.currentPage;
    this.setState({
      currentPage: ++pageNumber,
      page: indexOfLastImage
    });
  }

  // Decrease page current Page Number 
  previousPage = () => {
    let pageNumber = this.state.currentPage;
    this.setState({
      currentPage: --pageNumber
    });
  }

  // Export CSV File
  exportCSV = () => {
    let csvRow = [];
    const A = [['id', 'name', 'Picture Url', 'User Feedback']];
    const records = this.state.output;

    for (let i = 0; i < records.length; i++) {
      A.push([records[i].id, records[i].author, records[i].download_url, (records[i].userStatus ? 'Okay' : ' Bad')]);
    }

    for (let i = 0; i < A.length; ++i) {
      csvRow.push(A[i].join(","));
    }
    let csvString = csvRow.join("%0A");

    let a = document.createElement("a");
    a.href = 'data:attachment/csv,' + csvString;
    a.target = "_blank";
    a.download = "datafile.csv";
    document.body.appendChild(a);
    a.click();
  }

  render() {
    const { images, isloading, currentPage, imagesPerPage } = this.state;

    // Get Current Page Images
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentPageImages = images.slice(indexOfFirstImage, indexOfLastImage);

    return (
      <div className="container">
        {isloading ? (<div className="image">...loading</div>) : (
          <div className="image-box">
            {currentPage !== 1 &&
              <button onClick={this.previousPage}><i className="fas fa-backward"> Previous</i></button>
            }
            <div className="image">
              {
                currentPageImages.map(image => (
                  <Image key={image.id} image={image} imageOkay={this.imageOkay} imageBad={this.imageBad} />
                ))
              }
              <Button like onClick={() => this.setAllLiked(currentPageImages)}>All Okay</Button>
              <Button onClick={() => this.setAllDisliked(currentPageImages)}>All Bad</Button>
              <button onClick={this.exportCSV}>Export CSV</button>
            </div>
            <button onClick={() => this.nextPage(indexOfLastImage)}>Next <i className="fas fa-forward"></i></button>
          </div>
        )}
      </div>
    );
  }
}

export default App;