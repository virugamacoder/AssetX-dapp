import React from 'react'

function LoaderComponent() {
    return (
        <div className="relative z-[12]" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div style={{
                backdropFilter: `blur(1px)`
            }} className="fixed inset-0 bg-black-600_06 bg-opacity-75 transition-opacity" aria-hidden="true">
                <div className="loader absolute top-[50%] left-[50%] flex justify-center rounded-[14px]">
                    <span className="spinner"></span>
                </div>
            </div>
        </div>
    )
}

export default LoaderComponent
