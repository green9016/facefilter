import React from 'react'
import Dropdown from 'react-dropdown'
import '../style/Header.style.css';
import { ProductCategories } from './Products'


const Header = ({ currentProductCategory, onCategorySelected }) => {


    return (
        <nav className="menu">
            <h1 className="logo">aura</h1>
            <div className="right">
                <Dropdown className="Dropdown" options={Object.values(ProductCategories)} onChange={onCategorySelected} value={currentProductCategory} placeholder={ProductCategories.EYEWEAR} />
            </div>
        </nav>
    )
}

export default Header