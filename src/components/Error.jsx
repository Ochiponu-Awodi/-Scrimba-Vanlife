import { useRouteError } from "react-router-dom"

function Error () {

    const error = useRouteError ()
    console.log(error)

    return (
        <h1>An error occured!</h1>
    )
}

export default Error