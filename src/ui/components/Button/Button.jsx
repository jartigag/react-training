import React from 'react'

export function Button(props) {
    return <button
    style={{backgroundColor: "darkblue", color: "white"}}>
        {props.children}
    </button>
}
