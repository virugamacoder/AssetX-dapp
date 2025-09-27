import { correct_icon_edges } from 'assets/images'
import { Button, Heading, Img } from 'components'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTE_PATH from 'routes/ROUTE_PATH'

function KycSubmitted(props) {
    const { successMessage } = props

    const navigate = useNavigate()

    return (
        <div className='w-full flex items-center flex-col gap-[2rem] border border-gray-900_02 p-[1.5rem] !pr-[1rem]'>
            <div>
                <Img
                    src={correct_icon_edges}
                    alt="Albert Pinkney Image"
                    className="w-[16.25rem] rounded-[24px] mx-auto object-cover"
                />
            </div>
            <Heading
                size="textxs"
                as="p"
                className="mb-[0.25rem] text-[1.5rem] font-bold capitalize tracking-[0.00rem] !text-white-a700"
                style={{ color: `var(--brand_color_1)` }}
            >
                {successMessage}
            </Heading>
            <Button
                shape="square"
                color="brand_color_0_green_800"
                className="mt-[0.5rem] px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] !text-[1rem]"
                type="button"
                onClick={() => navigate(ROUTE_PATH.SECTURITY_TOKENS)}
            >
                Go to Dashboard
            </Button>
        </div>
    )
}

export default KycSubmitted
