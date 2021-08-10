import Image from "next/image";
import {API_URL, fromImageToUrl} from "../../utils/urls";
import Head from "next/head";




const Product = ({product}) => {
    return (
        <div>
            <Head>
                {product.meta_title && <title>{product.meta_title}</title>}
                {product.meta_description && <meta name={'description'} content={product.meta_description}/>}
            </Head>
           <h3>{product.name}</h3>
            <Image src={fromImageToUrl(product.image)} width={400} height={400}/>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.content}</p>
        </div>
    )
}
export async function getStaticProps({params: {slug}}) {
    const result = await fetch(`${API_URL}/products/?slug=${slug}`)
    const found = await result.json()
    return {
        props: {
            product: found[0]
        }
    }
}
export default Product
export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/products`)
    const products = await res.json()
    return {
        paths: products.map(product => ({
            params: {slug: String(product.slug)}
        })),
        fallback: false
    }
}