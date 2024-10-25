import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";

const AuthPage = () => {
  return (
    <Tabs defaultValue="sign-in" className="w-full max-w-[600px]">
      <TabsList className="mb-6 grid grid-cols-2">
        <TabsTrigger value="sign-in">Sign in</TabsTrigger>
        <TabsTrigger value="sign-up">Sign up</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <SignInForm />
      </TabsContent>
      <TabsContent value="sign-up">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  );
};

export default AuthPage;
