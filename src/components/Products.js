
const Struct = (...keys) => ((...v) => keys.reduce((o, k, i) => { o[k] = v[i]; return o }, {}))

const ProductCategories = {
    EYEWEAR: 'Eyewear',
    LIPSTICK: 'Lipstick',
    HEADPHONES:'Headphones',
    MASCARA:'Mascara',
    EYEBROW:'Eyebrows'
}


const Product = Struct('id', 'category', 'name', 'previewImageUrls', 'data');
const ProductData = Struct('position', 'rotation', 'scale', 'modelUrl', 'materials');


module.exports = {
    ProductCategories,
    Product,
    ProductData,
    Struct
}