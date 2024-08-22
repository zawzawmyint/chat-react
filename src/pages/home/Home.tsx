import LandLeft from "@/components/home/LandLeft";
import LandRight from "@/components/home/LandRight";

const Home = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-2 max-w-7xl mx-auto my-10">
      <LandLeft />
      <LandRight />
    </div>
  );
};

export default Home;
