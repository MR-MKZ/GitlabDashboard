import {Spinner} from "flowbite-react";

export default function ComponentLoaderSkeleton() {
    return (
        <div className={"bg-gray-primary items-center border border-gray-borders rounded-lg p-5 flex justify-center w-full"}>
            <div className="text-center flex gap-3 text-white items-center justify-center text-xl p-6 rounded-lg">
                <Spinner color={"purple"} size={"xl"} aria-label="Center-aligned spinner example"/>
                Loading
            </div>
        </div>
    )
}
