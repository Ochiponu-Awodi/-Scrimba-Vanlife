/* eslint-disable */

import createServer from "../../../Server"

import { useEffect, useState } from "react"

import './Vans.css'

import { Link, useSearchParams } from "react-router-dom"

function Vans () {

    const [searchParams, setSearchParams] = useSearchParams ()

    const [vans, setVans] = useState ([])

    const typeFilter = searchParams.get('type')

    const displayedVans = typeFilter 

        ? vans.filter(van => van.type === typeFilter) 

        : vans

    useEffect ( () => {

        fetch( '/api/vans' )

            .then( res => res.json() )

            .then( data => setVans( data.vans ) )

    }, [] )

    const vanElements = displayedVans.map( van => (

        <div 
            key = { van.id } className = "van-tile" >

            <Link 
                to = { van.id } aria-label = { `View details for ${ van.name }, priced at $${ van.price } per day` }

                state = { { search: `?${ searchParams.toString() }`, type: typeFilter } } >

                <img 
                    src = { van.imageUrl } alt = { `Image of ${ van.name }` } 
                />

                <div 
                    className = "van-info" >

                    <p 
                        className = "van-name" > { van.name }
                    </p>

                    <p>
                        ${ van.price } <span>/day</span>
                    </p>

                </div>

                <i 
                    className = { `van-type ${ van.type } selected` } >    
                    { van.type }
                </i>

            </Link>

        </div>

    ))

    return (
        <div 
            className = "van-list-container" >

            <h1>
                Explore our van options
            </h1>

            <div 
                className = "van-list-filter-buttons" >
                <button

                    onClick = { () => setSearchParams( { type: 'simple' } ) }

                    className = { `van-type simple ${ typeFilter === 'simple' ? 'selected' : '' }` } >Simple

                </button>

                <button

                    onClick = { () => setSearchParams( { type: 'luxury' } ) } 
                    
                    className = { `van-type luxury ${ typeFilter === 'luxury' ? 'selected' : '' }` } >Luxury

                </button>

                <button

                    onClick = { () => setSearchParams( { type: 'rugged' } ) } 
                    
                    className = { `van-type rugged ${ typeFilter === 'rugged' ? 'selected' : '' }` } >Rugged

                </button>
                
                { typeFilter ? (

                    <button
                        onClick = { () => setSearchParams( {} ) } className="van-type clear-filters" >Clear Filters
                    </button>

                ) : null }

            </div>

            <div 
                className = "van-list" >   
                { vanElements }
            </div>

        </div>
    )
}

export default Vans