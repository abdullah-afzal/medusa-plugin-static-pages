import {RouteConfig} from "@medusajs/admin";
import {QueryKey, useQuery} from "@tanstack/react-query"
import {useAdminCustomQuery} from "medusa-react"

import PageTable from "../../components/tables/pages";

const PagesPage = () => {

    const {data, isLoading} = useAdminCustomQuery(
        "/pages", ['get_pages']
    )


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
                                                    <a type="button" href={"/a/staticpages/create"}
                                                            className="btn btn-secondary btn-small flex items-center">
                            <span className="mr-xsmall last:mr-0"><div className="gap-x-2xsmall flex items-center">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 4.16667V15.8333">
                                </path>
                                <path d="M4.16699 10H15.8337"></path>
                              </svg>Add Static Page</div>
                            </span>
                                                    </a>
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
