import { Heading } from 'components'
import React from 'react'

function StepComponentTitleComponent(props) {
    const { title } = props
    return (
        <Heading
            size="headingmd"
            as="p"
            className="text-[0.88rem] font-semibold capitalize tracking-[0.00rem] text-white-a700"
        >
            {title}
        </Heading>
    )
}

export default StepComponentTitleComponent
