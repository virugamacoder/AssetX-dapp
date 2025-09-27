import { img_close_md_svgrepo_com, img_image_10, img_image_14, img_search, img_vector_40x40 } from 'assets/images';
import { Button, Heading, Img, Input, ModelComponent, MySTOLists } from 'components'
import { CloseSVG } from 'components/Input/close';
import UserProfile4 from 'components/UserProfile4';
import React, { Suspense, useState } from 'react'
import { STOS_KEYS } from 'services/STO';

function SelectToken(props) {
    const [searchBarValue4, setSearchBarValue4] = useState("");
    const {
        onClose,
        onManageTokenList,
        listOfTokens = [],
        onSelectToken,
        loading = false,
        modelTitle = "Select a token to swap",
        listType
    } = props

    console.log("listOfTokens", listOfTokens)

    return (
        <ModelComponent
            closeModal={() => onClose()}
        >
            <div className="min-w-[600px] self-center border border-solid border-gray-900_02 bg-gray-900_01 px-[0.63rem] py-[1.50rem] md:w-full sm:py-[1.25rem]">
                <div className="mx-[1.25rem] mt-[0.38rem] flex flex-col items-center gap-[1.50rem] md:ml-0">
                    <div className="mr-[1.25rem] flex items-center justify-between gap-[1.25rem] self-stretch md:mr-0">
                        <Heading
                            size="heading4xl"
                            as="h4"
                            className="text-[1.50rem] font-bold text-white-a700 md:text-[1.38rem]"
                        >
                            {modelTitle}
                        </Heading>
                        <Button
                            style={{ padding: "0" }}
                            onClick={() => onClose()}
                        >
                            <Img
                                src={img_close_md_svgrepo_com}
                                alt="Close Image"
                                className="h-[1.50rem] w-[1.50rem]"
                            />
                        </Button>
                    </div>
                    <Input
                        color="gray_900"
                        size="xs"
                        shape="square"
                        name="Search View"
                        placeholder={`Search or paste address`}
                        value={searchBarValue4}
                        onChange={(e) => setSearchBarValue4(e.target.value)}
                        prefix={
                            <Img src={img_search} alt="Search" className="my-[0.13rem] h-[20px] w-[20px]" />
                        }
                        suffix={
                            searchBarValue4?.length > 0 ? (
                                <CloseSVG onClick={() => setSearchBarValue4("")} height={12} fillColor="#828282ff" />
                            ) : null
                        }
                        className="gap-[0.50rem] self-stretch border px-[0.75rem] tracking-[0.00rem] md:mr-0"
                        inputClassNames={`bg-transparent border-none text-[14px] focus:ring-0 text-white-a700`}
                    />
                    <div className="flex items-start justify-center gap-[1.00rem] self-stretch sm:flex-col">
                        {!loading ?
                            <div className="flex flex-1 flex-col gap-[0.63rem] self-center sm:self-stretch">
                                <Suspense fallback={<div className='text-white-a700'>Loading feed...</div>}>
                                    {listOfTokens.map((d, index) => {
                                        return (
                                            <UserProfile4
                                                listType
                                                name={d.name}
                                                symbol={d.symbol}
                                                // userImage
                                                selectedObject={d}
                                                onSelectToken={onSelectToken}
                                                key={"listWckgpOne" + index}
                                            />
                                        )
                                    })}
                                </Suspense>
                            </div>
                            :
                            <div className="flex flex-1 text-center text-white-a700 flex-col gap-[0.63rem] self-center sm:self-stretch text-[1.2rem]">
                                Loading...
                            </div>
                        }
                    </div>
                </div>
            </div>
        </ModelComponent>
    )
}

export default SelectToken
