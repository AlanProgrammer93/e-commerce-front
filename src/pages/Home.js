import React from 'react'
import Jumbotron from '../components/cards/Jumbotron';
import CategoryList from '../components/category/CategoryList';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';
import SubList from '../components/sub/SubList';

const Home = () => {
    
    return (
        <>
            <div className="jumbotron text-danger h1 font-weight-bold text-center">
                <Jumbotron text={['Ultimos Productos', 'Nuevas Adquisiciones', 'Los más vendidos']} />
            </div>
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron" >
                Nuevas Adquisiciones
            </h4>
            <NewArrivals />

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron" >
                Los Mas Vendidos
            </h4>
            <BestSellers />

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron" >
                CATEGORIAS
            </h4>
            <CategoryList />

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron" >
                SUB CATEGORIAS
            </h4>
            <SubList />

            <br />
        </>
    )
}

export default Home
