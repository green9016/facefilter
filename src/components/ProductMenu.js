import React, { Component } from 'react';
import '../style/ProductMenu.style.css';
import { ChangeVariantTexTure } from './render';

export default class ProductMenu extends Component {
    state = {
        currentVariantUrl: '',
        triedProducts: []
    }

    handleClick = (data, e) => {
        console.log(data);
        this.props.onProductSelected(data);
        this.currentProduct = null;
        this.setState({ currentVariantUrl: data.previewImageUrls[0] })

    }
    currentProduct;
    componentDidMount() {

        this.currentProduct = this.props.products[0];
        setTimeout(() => {
            this.handleClick(this.currentProduct, null);
        }, 3000);
    }



    componentDidUpdate(props) {

        if (props.productCategory !== this.props.productCategory && this.currentProduct == null) {
            this.setState({ triedProducts: [...this.state.triedProducts, this.props.currentProduct] });
            console.error(this.props.currentProduct);
            for (let index = this.state.triedProducts.length-1; index >= 0; index--) {
                const element = this.state.triedProducts[index];
                if (element.category === this.props.productCategory) {
                    console.error('Prevs Tried Product Found')

                    return this.handleClick(element, null);

                }

            }

            for (let index = 0; index < this.props.products.length; index++) {
                const element = this.props.products[index];
                if (this.props.productCategory === element.category) {
                    this.handleClick(element, null);

                    console.error('Category Changed')

                    return;
                }


            }

        }


    }


    productDisplayList = () => {
        return this.props.products.map(product => {

            if (product.category === this.props.productCategory) {

                return (
                    <span key={product.id} className="productMenuItem" style={this.props.currentProduct != null && this.props.currentProduct.id === product.id ? { fontWeight: 'bold' } : { fontWeight: 'normal' }} onClick={this.handleClick.bind(this, product)}>{product.name}</span>
                )
            }
        })
    }


    ChangeVariant = (index, url) => {
        this.setState({ currentVariantUrl: url });
        ChangeVariantTexTure(index);
    }




    render() {

        return (
            <div>
                <div className="productMenu" >
                    {this.productDisplayList()}
                </div>
                <div className="productVariants">
                    {
                        (this.props.currentProduct && this.props.currentProduct.previewImageUrls.length > 1) && this.props.currentProduct.previewImageUrls.map((url, index) => {
                            return (<img onClick={() => {
                                this.ChangeVariant(index, url);
                            }} src={url} alt="" key={url} style={this.state.currentVariantUrl === url ? { transform: 'scale(1.2)' } : {}} />)
                        })}
                </div>
            </div>

        )
    }
}