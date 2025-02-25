import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import loader from "@/assets/loader.gif";

const Loading = () => {
    return (
        <div className="grid min-h-screen place-items-center">
            <Image
                src={loader}
                alt={`${APP_NAME} Logo`}
                width={48}
                height={48}
            />
        </div>
    );
};

export default Loading;
