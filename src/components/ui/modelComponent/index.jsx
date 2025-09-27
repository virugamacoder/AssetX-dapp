import { LoaderComponent } from 'components';
import React, { useEffect, useRef } from 'react'

function ModelComponent(props) {

    const { closeModal, children, isLoader = false } = props;
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!isLoader && modalRef.current && !modalRef.current.contains(event.target) /* && outSideClose */) {
                closeModal()
            }
        };

        /*  const handleEscKey = (event) => {
             if (event.key === 'Escape') {
                 closeModal(false);
             }
         }; */

        document.addEventListener('mousedown', handleClickOutside);
        // window.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            // window.removeEventListener('keydown', handleEscKey);
        };
    }, [isLoader, closeModal]);

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div style={{
                backdropFilter: `blur(6px)`
            }} className="fixed inset-0 bg-black-600_06 bg-opacity-75 transition-opacity" aria-hidden="true"></div>


            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    {isLoader && <LoaderComponent />}

                    <div className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" ref={modalRef}>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModelComponent
