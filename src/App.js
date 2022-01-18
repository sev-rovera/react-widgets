import React, { useState } from 'react'
import Route from './components/Route'
import Header from './components/Header'
import Accordion from './components/Accordion'
import Dropdown from './components/Dropdown'
import Translate from './components/Translate'
// import Wikipedia from './components/Wikipedia'
import WikipediaImproved from './components/WikipediaImproved'

const items = [
  {
    title: 'What is React?',
    content: 'React is a front end library based on JavaScript'
  },
  {
    title: 'Why use React?',
    content: 'React is increasingly popular and will get you a job!'
  },
  {
    title: 'How do you use React?',
    content: 'We use React by creating components and updating their state'
  }
]

const options = [
  {
    label: "Red",
    value: 'red'
  },
  {
    label: "Green",
    value: 'green'
  },
  {
    label: "Blue",
    value: 'blue'
  },

]

const App = () => {

  const [selectedColor, setSelectedColor] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    
    <div>

      <Header />

      <Route path='/'>
        <Accordion items={items} />
      </Route>

      <Route path='/wiki'>
        <WikipediaImproved />
      </Route>

      <Route path='/translate'>
        <Translate />
      </Route>

      <Route path='/dropdown'>
        <button onClick={() => setShowDropdown(!showDropdown)}>Toggle Drowdown</button>
        {showDropdown ?
          <div>
            <Dropdown
              dropdownLabel='Select a Color'
              selected={selectedColor}
              onSelected={setSelectedColor}
              options={options}
            />
            <p style={{ color: `${selectedColor.value}` }}>This text is {selectedColor.value}.</p>
          </div>
          : null
        }
      </Route>

    </div>
  )
}

export default App
