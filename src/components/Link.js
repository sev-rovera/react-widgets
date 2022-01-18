import React from 'react'

const Link = ({ className, href, children }) => {
    
    const onClick = (event) => {

        // allows user to open new tab when clicking on a link and holding meta/ctrl key
        if (event.metaKey || event.ctrlKey) {
            return;
        }

        // prevents full page reload
        event.preventDefault();
        // updates url
        window.history.pushState({}, '', href);
        // tell Route components that url just changed
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent)
    }

    return (
        <a onClick={onClick} className={className} href={href}>
            {children}
        </a>
    )

}

export default Link
