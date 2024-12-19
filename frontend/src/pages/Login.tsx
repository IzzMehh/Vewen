import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
  Label,
  Container,
  Separator,
  Toaster,
  Toast,
} from "@/components/index";
import { useNavigate } from "react-router-dom";

import "../components/css/login.css";
import { useAppSelector } from "@/hooks/store";

import { initializeGoogleLogin } from "@/utils/loginWithGoogle";
import auth from "@/backend/Auth";
import { useToast } from "@/hooks/use-toast";
import { authValidation } from "@/utils/authValidation";

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);
  const userData = useAppSelector((state) => state.userData);
  const isUserLoggedIn = userData ? true : false;

  const navigate = useNavigate();
  const googleButtonRef = React.useRef<HTMLDivElement | null>(null);

  const passwordInputRef = React.useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    initializeGoogleLogin(isUserLoggedIn, googleButtonRef.current);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      usernameOrEmail
    );

    const payload = isEmail
      ? { email: usernameOrEmail, password }
      : { username: usernameOrEmail, password };

    const { error } = authValidation.validate(payload);

    if (error) {
      toast({
        title: "Validation Error",
        description: error.message,
        variant: "destructive",
        className: "bg-red-600",
      });
      return;
    }

    try {
      await auth.logIn(payload);
      const d= await auth.getSession()
      console.log(d)
      toast({
        title: "Success",
        description: "Logged in successfully!",
        className: "bg-green-600",
      });
    } catch (loginError: any) {
      toast({
        title: "Login Failed",
        description:
          loginError.response?.data || "An error occurred during login.",
        variant: "destructive",
        className: "bg-red-600",
      });
    }
  };

  const togglePasswordVisibility = (): void => {
    setPasswordVisibility((prevVal) => !prevVal);
    if (passwordVisibility) {
      if (passwordInputRef.current) {
        passwordInputRef.current.type = "password";
      }
    } else {
      if (passwordInputRef.current) {
        passwordInputRef.current.type = "text";
      }
    }
  };

  return (
    <Container>
      <Toaster />
      <div className="min-h-screen flex items-center justify-center font-text">
        <div className="p-8 w-full max-w-md">
          <Card className="w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-center text-3xl font-[900] text-[#5459ed]">
                <div className="w-36 m-auto">
                  <img src="VeWen-noBg.png" alt="dd" />
                </div>
              </CardTitle>
              <CardDescription className="text-center text-base">
                Log in to your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2 relative">
                  <Label
                    htmlFor="email"
                    className="text-sm absolute top-[-10px] bg-light-theme dark:bg-dark-theme left-2"
                  >
                    Email or username
                  </Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="Email or username"
                    required
                    value={usernameOrEmail}
                    className="rounded"
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2 relative">
                  <Label
                    htmlFor="password"
                    className="text-sm absolute top-[-10px] bg-light-theme dark:bg-dark-theme left-2"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className="rounded"
                    required
                    placeholder="••••••••"
                    ref={passwordInputRef}
                    value={password}
                    autoComplete="on"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordVisibility ? (
                    <span
                      className="absolute right-2 top-0 text-lg cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      <ion-icon name="eye"></ion-icon>
                    </span>
                  ) : (
                    <span
                      className="absolute right-2 top-0 text-lg cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      <ion-icon name="eye-off"></ion-icon>
                    </span>
                  )}
                </div>

                <Button
                  className="w-full bg-dark-theme text-light-theme hover:bg-black dark:bg-light-theme dark:text-dark-theme rounded "
                  type="submit"
                >
                  Login
                </Button>
              </CardContent>
            </form>

            <CardFooter className="flex flex-col space-y-2">
              <Button
                variant="link"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Button>

              <Separator />

              <div id="buttonDiv" ref={googleButtonRef}></div>

              <div className="text-sm text-center">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="text-primary hover:underline"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </div>
            </CardFooter>
          </Card>
          {/* <div className="mt-8 text-center">
            <div className="w-24 m-auto">
              <img src="VeWen-noBg.png" alt="dd" />
            </div>
            <p className="text-sm text-muted-foreground">
              Connect with friends and the world around you on VeWen
            </p>
          </div> */}
        </div>
      </div>
    </Container>
  );
}

export default Login;
