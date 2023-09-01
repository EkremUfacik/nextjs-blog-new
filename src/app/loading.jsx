import moon from "@/assets/white.png";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="mt-28 ">
      <Image
        className="animate-spin mx-auto"
        src={moon}
        width={100}
        alt="loading"
      />
    </div>
  );
};

export default Loading;
