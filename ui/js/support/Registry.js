import React from 'react'
import { render } from 'react-dom'

class Registry {

    items = [];

    register(components) {
        Object.keys(components).forEach(name => {
            const component = components[name]

            this.items[name] = component

            Array.from(document.querySelectorAll(`[data-component="${name}"]`)).forEach(element => {
                const $el = element.cloneNode(true)

                render(
                    React.createElement(component, { ...element.dataset, $el }),
                    element
                )
            })
        })
    }

    resolve(name) {
        const component = this.items[name]

        if (!component) {
            console.error(`Component: '${name}' cannot be found.`)
        }

        return component
    }
}

const registry = new Registry()

export default registry
