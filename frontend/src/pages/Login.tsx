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
} from "@/components/index";
import { useNavigate } from "react-router-dom";

import "../components/css/login.css";
import { useAppSelector } from "@/hooks/store";

import { initializeGoogleLogin } from "@/utils/loginWithGoogle";
import auth from "@/backend/Auth";
import { useToast } from "@/hooks/use-toast";
import { FormValues } from "@/typings/global";
import { useForm, SubmitHandler } from "react-hook-form";

function Login() {
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);
  const userData = useAppSelector((state) => state.userData);
  const isUserLoggedIn = userData ? true : false;
  type typeOfDetail = "email" | "username";
  let type: typeOfDetail;

  const navigate = useNavigate();
  const googleButtonRef = React.useRef<HTMLDivElement | null>(null);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: "onChange" });

  React.useEffect(() => {
    if (userData) {
      navigate("/");
    }
      initializeGoogleLogin(isUserLoggedIn, googleButtonRef.current,toast);

  }, []);

  const handleLogin: SubmitHandler<FormValues> = async (data) => {
    try {
      const { emailOrUsername, password } = data;

      if ((type = "email")) {
        await auth.logIn({ email: emailOrUsername, password });
      } else {
        await auth.logIn({ username: emailOrUsername, password });
      }
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
  };

  const checkIfEmailOrPassword = (
    emailOrUsername: string | undefined
  ): string | boolean => {
    if (emailOrUsername === undefined) return "Email or Username is Required";

    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      emailOrUsername
    );

    type = isEmail ? "email" : "username";

    return true;
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
            <form onSubmit={handleSubmit(handleLogin)}>
              <CardContent className="space-y-4">
                <div className="space-y-2 relative">
                  <Label
                    htmlFor="emailOrUsername"
                    className="text-sm absolute top-[-10px] bg-light-theme dark:bg-dark-theme left-2"
                  >
                    Email or username
                  </Label>
                  <Input
                    {...register("emailOrUsername", {
                      required: {
                        value: true,
                        message: "Email or Username is Required",
                      },
                      validate: checkIfEmailOrPassword,
                    })}
                    id="emailOrUsername"
                    type="text"
                    placeholder="Email or username"
                    className="rounded"
                  />
                  {errors.emailOrUsername && (
                    <p className="text-red-600">
                      {errors.emailOrUsername.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2 relative">
                  <Label
                    htmlFor="password"
                    className="text-sm absolute top-[-10px] bg-light-theme dark:bg-dark-theme left-2"
                  >
                    Password
                  </Label>
                  <Input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required.",
                      },
                      maxLength: {
                        value: 30,
                        message: "Password should not exceed 30 characters",
                      },
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long.",
                      },
                    })}
                    id="password"
                    type={passwordVisibility ? "text" : "password"}
                    className="rounded"
                    required
                    placeholder="••••••••"
                    autoComplete="on"
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
                  {errors.password && (
                    <p className="text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <Button
                  className={`w-full hover:bg-black text-light-theme dark:text-dark-theme ${
                    isValid
                      ? " bg-dark-theme dark:bg-light-theme "
                      : "bg-[#0000008f] dark:bg-[#ffffff9e] cursor-not-allowed"
                  } rounded `}
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
