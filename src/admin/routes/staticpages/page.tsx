import {RouteConfig} from "@medusajs/admin";
import {QueryKey, useQuery} from "@tanstack/react-query"
import {useAdminCustomQuery} from "medusa-react"
import { useNavigate } from "react-router-dom";
import PageTable from "../../components/tables/pages";
import {Badge, Button, Drawer, DropdownMenu} from "@medusajs/ui";
import React from "react";
import {Plus} from "@medusajs/icons"


const PagesPage = () => {
    const navigate = useNavigate();
    const {data, isLoading} = useAdminCustomQuery(
        "/pages", ['get_pages']
    )

    function onClickCreatePage() {
        navigate("/a/staticpages/create")
    }

    return (
        <>

            <div className="large:px-xlarge py-xlarge bg-grey-5 min-h-content overflow-y-auto">
                <main
                    className="xsmall:mx-base small:mx-xlarge medium:mx-4xlarge large:mx-auto large:max-w-7xl large:w-full h-full">
                    <div className="flex h-full flex-col">
                        <div className="gap-y-xsmall flex w-full grow flex-col">
                            <div
                                className="rounded-rounded bg-grey-0 border-grey-20 flex h-full w-full flex-col overflow-hidden border min-h-[350px] h-fit">
                                <div className="relative"></div>
                                <div className="flex grow flex-col">
                                    <div className="px-xlarge py-large">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div>
                                                    <div className="inter-large-semibold gap-x-base text-grey-40 flex">
                                                        <div className="cursor-pointer text-grey-90">Static Pages</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div>
                                                    <div className="flex space-x-2">
                                                        <Button className={'p-2'} size={"sm"} variant="secondary" onClick={onClickCreatePage}><Plus />Create Page</Button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-xlarge">
                                        {/*<PageTable pages={data}></PageTable>*/}
                                    </div>
                                </div>
                                <div className="min-h-[24px]">
                                </div>
                            </div>
                            <div className="h-xlarge w-full">


                            </div>
                        </div>
                        <div className="z-50 transition-all duration-100 scale-[0.98] opacity-0">
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export const config: RouteConfig = {
    link: {
        label: "Static Pages",
    },
};


export default PagesPage;
