/* eslint-disable */
import { Link, useLocation, useLoaderData, defer, Await } from "react-router-dom"
import { Suspense } from "react"
import './VanDetail.css'

import { getVans } from "../../../api"

export function loader ({ params }) {

    return defer({vans: getVans( params.id )})

}

function VanDetail () {

    const location = useLocation ()

    const dataPromise = useLoaderData ()

    const search = location.state?.search || '';
    const type = location.state?.type || 'all';

    function renderVanEls (van) {

            return (
                <>
                <img 
                    src={van.imageUrl} />

                    <i 
                        className={`van-type ${van.type} selected`}> {van.type}
                    </i>

                    <h2>
                        {van.name}
                    </h2>

                    <p 
                        className="van-price"> <span> ${van.price} </span> /day
                    </p>

                    <p>
                        {van.description}
                    </p>

                    <button 
                        className="link-button"> Rent this van
                    </button>
                    </>
            )
        }

    return (

        <div 
            className="van-detail-container">

            <Link
                to = { `..${ search }` } relative = "path" className = "back-button" > &larr; <span> Back to { type } vans </span> 
            </Link>
            
            <div 
                className="van-detail">
            <Suspense fallback={<h2>Loading...</h2>}>
            <Await resolve={dataPromise.vans}>
                {renderVanEls}
            </Await>
            </Suspense>
            </div>
        </div>

    )
}

export default VanDetail