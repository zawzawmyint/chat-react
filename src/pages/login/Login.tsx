import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="mx-auto grid place-items-center min-h-[600px] max-w-md p-2">
      <Card className=" w-full text-center sm:text-start">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Welcome back!</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
