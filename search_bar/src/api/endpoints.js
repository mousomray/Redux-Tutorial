export const endpoints = {
    cms: {
        allproduct: 'products?skip=0&limit=100',
        search: 'products/search?q='
    }
}

export const myendpoints = [
    endpoints.cms.allproduct, // Index number 0
    endpoints.cms.search // Index number 1
]