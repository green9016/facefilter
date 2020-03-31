import React, { Component } from 'react';
import Header from './Header'
import CameraPermissionOverlay from './CameraPermissionOverlay'
import SharingModal from './SharingModal'
import { ProductCategories } from './Products'
import ProductList from './MockProductProvider'
import ProductMenu from './ProductMenu'
import { FaceFilter } from './FaceFilter'
import ReactResizeDetector from 'react-resize-detector'
import { addProduct } from './render';
import { CameraButton } from './CameraButton';

export default class App extends Component {

  state = {
    displayOverlay: true,
    displaySharingModal: false,
    currentProductCategory: ProductCategories.EYEWEAR,
    currentProduct: 0,
    products: ProductList,
    SnapUrl: ''
  }

  camImage = 'img/camera.png'

  initApp = (e) => {
    e.preventDefault()
    this.setState({ displayOverlay: false })

    console.log("App init happens here");
  }

  openSharingModal = (e) => {
    this.setState({
      displaySharingModal: true
    })
  }

  closeSharingModal = (e) => {
    e.preventDefault()
    this.setState({ displaySharingModal: false })
  }

  onProductSelected = (payload) => {
    this.setState({ currentProduct: payload });
    addProduct(payload);

  }

  onCategorySelected = (e) => {
    this.setState({ currentProductCategory: e.value });
  }

  takePhoto = (e) => {
    var canvas = document.getElementById('facef-canvas');
    var dataURL = canvas.toDataURL('image/jpg');

    //SAVE IMAGE TEMPORARY TO SERVER AND GET BACK URL TO SHARE IN SOCIAL PLATFORM

// var x = this;
//     storageRef.putString(dataURL, 'base64').then(function (snapshot) {
//       console.log('Uploaded a base64 string!');
//       x.setState({SnapUrl:snapshot});
//     });

    this.setState({ SnapUrl: dataURL });
    this.openSharingModal(e);
  }

  render() {
    return (
      <div className="App">
        <CameraPermissionOverlay display={this.state.displayOverlay} onClose={this.initApp} />
        <Header currentProductCategory={this.state.currentProductCategory} onCategorySelected={this.onCategorySelected} />
        <ProductMenu productCategory={this.state.currentProductCategory} products={this.state.products} currentProduct={this.state.currentProduct} onProductSelected={this.onProductSelected} />
        <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
        <FaceFilter />
        <CameraButton onPhoto={this.takePhoto} image={this.camImage} />
        <SharingModal showModal={this.state.displaySharingModal} SnapUrl={this.state.SnapUrl} onClose={this.closeSharingModal} />
      </div>

    );
  }
}
