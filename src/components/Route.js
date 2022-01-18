import { useEffect, useState } from "react"

const Route = ({ path, children }) => {

    // Piece of state to get Route component to re-render
    const [currentPath, setCurrentPath] = useState(window.location.pathname)

    // Detects url changes and updates page content accordingly
    // This function will only run when the Route component is first rendered
    useEffect(() => {

        const onLocationChange = () => {
            setCurrentPath(window.location.pathname)
        }
        // We set up an event listener to detect url updates
        window.addEventListener('popstate', onLocationChange)

        return () => {
            // cleanup
            window.removeEventListener('popstate', onLocationChange)
        }
    }, [])

    return currentPath === path ? children : null
}

export default Route

