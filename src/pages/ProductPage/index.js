import { useEffect, useState } from "react";
import ProductItem from "../../component/ProductItem";

function ProductPage() {
    const [products, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchProductList = async () => {
        const response = await fetch(`https://dummyjson.com/products?limit=10`)
        const data = await response.json();
        setProduct(data.products);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchProductList();
    }, [])

    function handleDeleteProduct(productId) {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProduct(updatedProducts);
    }
    if (isLoading) {
        return <div>...Loading</div>
    }
    const productList = products.map(product => {
        return <ProductItem
            key={product.id} id={product.id} name={product.title} price={product.price} handleDeleteProduct={handleDeleteProduct}
        />
    })
    return (
        <div> {productList} </div>

    )
}
export default ProductPage;