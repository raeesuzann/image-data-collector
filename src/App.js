import React, { Component, Fragment } from 'react';

import './App.css';

import axios from 'axios';
import Image from './components/Image';

class App extends Component {

  state = {
    images: [],
    output: [],
    isloading: true,
    currentPage: 1,
    imagesPerPage: 4
  }

  handleOutput(selectedImage) {
    let tempImage = [...this.state.output];
    tempImage = [selectedImage, ...tempImage];
    this.setState({
      output: tempImage
    }, () => {
      console.log(this.state.output);
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

  // Increase page current Page Number 
  nextPage = () => {
    let pageNumber = this.state.currentPage;
    this.setState({
      currentPage: ++pageNumber
    });
    console.log(this.state.currentPage);
  }

  componentDidMount() {
    axios.get("https://picsum.photos/v2/list?limit=100")
      .then(res => this.setState({
        images: res.data,
        isloading: false
      },() => {
        console.log(this.state.images)
      }));
  }

  render() {

    const { images, isloading, currentPage, imagesPerPage } = this.state;

    // Get Current Page Images
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentPageImages = images.slice(indexOfFirstImage, indexOfLastImage);

    return (
      <Fragment>
        {isloading ? (<div className="image">...loading</div>) : (
          <div className="image">
            {
              currentPageImages.map(image => (
                <Image key={image.id} image={image} imageOkay={this.imageOkay} imageBad={this.imageBad} />
              ))
            }
            <button onClick={this.nextPage}>Next</button>
            <button onClick={this.exportCSV}>Export CSV</button>
          </div>
        )
        }
      </Fragment>
    );
  }
}

export default App;