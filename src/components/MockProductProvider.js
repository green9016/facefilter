import { Product, ProductCategories, ProductData } from './Products'

var productCount = 0;

function id() {
    return productCount++
}

function MakeProduct(...vars) {
    return Product(id(), ...vars)
}

const ProductList = [

// EYEWEAR


MakeProduct(ProductCategories.EYEWEAR, 'Janie', [   'products/eyewear/janie/preview_tortoise.jpg',
                                                    'products/eyewear/janie/preview_black.jpg',
                                                    'products/eyewear/janie/preview_red.jpg', ],
        ProductData([0, 0, 0], [0, 0, 0, 0], [1, 1, 1], 'products/eyewear/janie/model.obj',
            [
            
                {
                    maps: [ 'products/eyewear/janie/texture_tortoise.jpg',
                            'products/eyewear/janie/texture_black.jpg',
                            'products/eyewear/janie/texture_red.jpg'
                ],
                    normalMap: null,
                    envMap: 'products/envmap.jpg',
                    opacity: .8,
                    metalness: .3,
                    roughness: .2,
                    transparent: true
                },
                {
                    maps: [],
                    normalMap: null,
                    envMap: 'products/envmap.jpg',
                    opacity: .3,
                    metalness: 1,
                    roughness: 0,
                    transparent: true
                }
                
            ]
        )),

        MakeProduct(ProductCategories.EYEWEAR, 'Kinsey', [  'products/eyewear/kinsey/preview_gold.jpg',
                                                            'products/eyewear/kinsey/preview_silver.jpg',
                                                            'products/eyewear/kinsey/preview_rosegold.jpg'],
        ProductData([0, 0, 0], [0, 0, 0, 0], [1, 1, 1], 'products/eyewear/kinsey/model.obj', [   
            {
                maps: [],
                normalMap: null,
                envMap: 'products/envmap.jpg',
                opacity: .3,
                metalness: 1,
                roughness: 0,
                transparent: true

            }, 
            {
                maps: [ 'products/eyewear/kinsey/texture_gold.jpg',
                        'products/eyewear/kinsey/texture_silver.jpg',
                        'products/eyewear/kinsey/texture_rosegold.jpg'],
                normalMap: null,
                envMap: 'products/envmap.jpg',
                opacity: 1,
                metalness: 1,
                roughness: .05,
                transparent: true
            }
        ])),

        MakeProduct(ProductCategories.EYEWEAR, 'Lovely', [  'products/eyewear/lovely/preview_silver.jpg'],
        ProductData([0, 0, 0], [0, 0, 0, 0], [1, 1, 1], 'products/eyewear/lovely/model.obj',
            [
                {
                    maps: [],
                    normalMap: null,
                    envMap: 'products/envmap.jpg',
                    opacity: .3,
                    metalness: 1,
                    roughness: 0,
                    transparent: true

                },
                {
                    maps: [ 'products/eyewear/lovely/texture_silver.jpg'],
                    normalMap: null,
                    envMap: 'products/envmap.jpg',
                    opacity: 1,
                    metalness: 1,
                    roughness: 0,
                    transparent: true
                }
            ]
        )),

            // LIPSTICK
   
    MakeProduct(ProductCategories.LIPSTICK, 'Charm', [
        'products/lipstick/charm/preview1.jpg',
        'products/lipstick/charm/preview2.jpg',
        'products/lipstick/charm/preview3.jpg'
    ],
        ProductData([0, 0, 0], [0, 0, 0, 0], [1, 1, 1], '',
            [
                {
                    maps: [
                        'products/lipstick/charm/texture1.png',
                        'products/lipstick/charm/texture2.png',
                        'products/lipstick/charm/texture3.png'
                    ],
                    normalMap: null,
                    opacity: .3,
                    metalness: 0,
                    roughness: 1,
                    transparent: true


                }
            ]
        )),
        MakeProduct(ProductCategories.LIPSTICK, 'Glam', [   'products/lipstick/glam/preview1.jpg',
                                                            'products/lipstick/glam/preview2.jpg',
                                                            'products/lipstick/glam/preview3.jpg'],
        ProductData([0, 0, 0], [0, 0, 0, 0], [1, 1, 1], 'products/lipstick/glam/model.obj', [
            {
                maps: [ 'products/lipstick/glam/texture1.png',
                        'products/lipstick/glam/texture2.png',
                        'products/lipstick/glam/texture3.png'],
                normalMap: null,
                envMap: null,
                opacity: .3,
                metalness: .1,
                roughness: 1,
                transparent: true


            }
        ])),
    MakeProduct(ProductCategories.LIPSTICK, 'Pinup', [  'products/lipstick/pinup/preview1.jpg',
                                                        'products/lipstick/pinup/preview2.jpg',
                                                        'products/lipstick/pinup/preview3.jpg'],
        ProductData([0, 0, 0], [0, 0, 0, 0], [1, 1, 1], 'products/lipstick/pinup/model.obj',
            [
                {
                    maps: [ 'products/lipstick/pinup/texture1.png',
                            'products/lipstick/pinup/texture2.png',
                            'products/lipstick/pinup/texture3.png'],
                    normalMap: null,
                    envMap: null,
                    opacity: .3,
                    metalness: .1,
                    roughness: 1,
                    transparent: true


                }
            ]
        )),


        // HEADPHONES

    MakeProduct(ProductCategories.HEADPHONES, 'Jenkins', ['products/headphones/jenkins/preview_white.jpg', 'products/headphones/jenkins/preview_black.jpg'],
        ProductData([0, 0, 0], [0, 0, 0, 0], [1, 1, 1], 'products/headphones/jenkins/model.obj', [
            {
                maps: [
                    'products/headphones/jenkins/texture_white.jpg',
                    'products/headphones/jenkins/texture_black.jpg'
                ],
                normalMap: null,
                envMap: 'products/envmap.jpg',
                opacity: 1,
                metalness: 0,
                roughness: .4,
                transparent: true

            }, {
                maps: [
                    'products/headphones/jenkins/texture_black.jpg',
                    'products/headphones/jenkins/texture_black.jpg'
                ],
                normalMap: null,
                envMap: 'products/envmap.jpg',
                opacity: 1,
                metalness: 0,
                roughness: .4,
                transparent: true

            }
        ])),

        MakeProduct(ProductCategories.HEADPHONES, 'Maxwell', [  'products/headphones/maxwell/preview_white.jpg',
                                                                'products/headphones/maxwell/preview_black.jpg'],
        ProductData([0, 0, 0], [0, 0, 0, 0], [1, 1, 1], 'products/headphones/maxwell/model.obj', [
            {
                maps: [
                    'products/headphones/maxwell/texture_white.jpg',
                    'products/headphones/maxwell/texture_black.jpg'
                ],
                normalMap: null,
                envMap: 'products/envmap.jpg',
                opacity: 1,
                metalness: 0,
                roughness: .4,
                transparent: true
            }, {
                maps: [
                    'products/headphones/maxwell/texture_white.jpg',
                    'products/headphones/maxwell/texture_black.jpg'
                ],
                normalMap: null,
                envMap: 'products/envmap.jpg',
                opacity: 1,
                metalness: 0,
                roughness: .4,
                transparent: true
            },
            {
                maps: [
                    'products/headphones/maxwell/texture_white.jpg',
                    'products/headphones/maxwell/texture_black.jpg'
                ],
                normalMap: null,
                envMap: 'products/envmap.jpg',
                opacity: 1,
                metalness: 0,
                roughness: .4,
                transparent: true
            }
        ])),

        MakeProduct(ProductCategories.HEADPHONES, 'Arena', ['products/headphones/arena/preview_black.jpg'],
        ProductData([0, 0, 0], [0, 0, 0, 0], [1, 1, 1], 'products/headphones/arena/model.obj', [
            {
                maps: [
                    'products/headphones/arena/texture_black.jpg'
                ],
                normalMap: null,
                envMap: 'products/envmap.jpg',
                opacity: 1,
                metalness: 0,
                roughness: .4,
                transparent: true

            } , {
                maps: [
                ],
                normalMap: null,
                envMap: 'products/envmap.jpg',
                opacity: 1,
                metalness: 1,
                roughness: .0,
                transparent: true

            }
        ]))

    


        // MASCARA
        

//     MakeProduct(ProductCategories.MASCARA, 'Charm', [],
//         ProductData([0, 0, 0], [0, 0, 0, 0], [1, 1, 1], '',
//             [
//                 {
//                     maps: ['products/mascara/texture.png'],
//                     normalMap: null,
//                     opacity: 1,
//                     metalness: 0,
//                     roughness: 1,
//                     transparent: true


//                 }
//             ]
//         )),

// // EYEBROW


//     MakeProduct(ProductCategories.EYEBROW, 'Glam', [],
//         ProductData([0, 0, 0], [0, 0, 0, 0], [1, 1, 1], '',
//             [
//                 {
//                     maps: ['products/eyebrows/texture.png'],
//                     normalMap: null,
//                     opacity: 1,
//                     metalness: 0,
//                     roughness: 1,
//                     transparent: true


//                 }
//             ]
//         ))
]

export default ProductList
