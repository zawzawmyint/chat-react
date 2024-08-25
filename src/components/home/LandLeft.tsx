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
            Stay connected with your friends in real time! Our platform lets you
            chat, share updates, and keep up with each other instantly, no
            matter where you are. Whether it's a quick message or a detailed
            conversation, our service ensures you're always in touch,
            effortlessly and seamlessly.
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
