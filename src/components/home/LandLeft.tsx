import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { CardDescription, CardTitle } from "../ui/card";
const LandLeft = () => {
  return (
    <div className="flex-1 m-2">
      <div className=" space-y-8 mt-7">
        <div>
          <CardTitle className="w-4/6 text-3xl sm:text-4xl leading-loose">
            Let Contact With Your Friends in Real Time
          </CardTitle>
        </div>
        <div>
          <CardDescription className="w-5/6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
            magni! Quia sapiente, maiores ipsa, non doloremque possimus officiis
            sint, eos laudantium ut itaque voluptatum sequi deleniti!
          </CardDescription>
        </div>
        <div>
          <Link to={"/chat"}>
            <Button>Start Chatting Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandLeft;
