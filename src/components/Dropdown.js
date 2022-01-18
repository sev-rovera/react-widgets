import React, { useState, useEffect, useRef } from 'react'

const Dropdown = ({ dropdownLabel, options, selected, onSelected }) => {

    // Used to open or close dropdown on click
    const [open, setOpen] = useState(false);
    // Used to determine whether we clicked a React element or not
    // (we set the ref on the most parent element we're returning) 
    const ref = useRef();

    // Closes the dropdown when we click anywhere on the page outside the dropdown component
    useEffect(() => {

        // We identify what element was clicked with event.target and check if that element is contained in a React element.
        // To identify a React element, we set a ref on the top parent element returned by the Dropdown component
        // and use ref.current (which refers to the element on which we set the ref attribute)
        // If we click on a React element, we don't want the open piece of state to be changed by this event listener.
        // Instead we want the React event listeners to update it later on
        const onBodyClick = (event) => {
            if (ref.current.contains(event.target)) {
                return;
            }
            // If we click on the body outside the dropdown, we close the dropdown
            setOpen(false);
        }

        // We need to set a manual event listener because the body wasn't created by the dropdown component
        // This event listener will get called first (before React event listeners)!
        // So we want this event to change the value of open ONLY when we've clicked outside the dropdown
        // Otherwise the dropdown will never close after we select an option
        // We also need to add the capture phase otherwise we can't select any option in the dropdown 
        document.body.addEventListener('click', onBodyClick, { capture: true });

        // clean-up function aiming to remove the manual event listener when we remove the dropdown component from the DOM 
        return () => {
            document.body.removeEventListener('click', onBodyClick, { capture: true });
        }

    }, []);

    const renderedOptions = options.map((option) => {

        // Removes the selected option from the dropdown
        if (option.value === selected.value) {
            return null;
        }

        return (
            <div
                key={option.value}
                className='item'
                // Updates selected color at the top of the list
                onClick={() => onSelected(option)}
            >
                {option.label}
            </div>
        );
    });

    return (
        <div className='ui form' ref={ref}>
            <div className='field'>
                <label className='label'>{dropdownLabel}</label>
                <div
                    onClick={() => setOpen(!open)}
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`}
                >
                    <i className='dropdown icon'></i>
                    <div className='text'>{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>{renderedOptions}</div>
                </div>
            </div>
        </div>
    );
}

export default Dropdown
