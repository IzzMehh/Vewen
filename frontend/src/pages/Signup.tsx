import React from "react";

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
import { useAppSelector } from "@/hooks/store";
import { initializeGoogleLogin } from "@/utils/loginWithGoogle";
import auth from "@/backend/Auth";
import { useToast } from "@/hooks/use-toast";
import { FormValues } from "@/typings/global";
import { useForm, SubmitHandler } from "react-hook-form";

function SignUp() {
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);
  const [isUsernameAvailabile, setIsUsernameAvailable] = React.useState(false);
  const [isEmailAvailabile, setIsEmailAvailable] = React.useState(false);
  const [checkingUsername, setCheckingUsername] = React.useState(false);
  const [checkingEmail, setCheckingEmail] = React.useState(false);

  const userData = useAppSelector((state) => state.userData);
  const isUserLoggedIn = userData ? true : false;
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: "onChange" });

  const navigate = useNavigate();

  const googleButtonRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (userData) {
      navigate("/");
    }
    initializeGoogleLogin(isUserLoggedIn, googleButtonRef.current);
  }, []);

  const handleSignup: SubmitHandler<FormValues> = async (data) => {
    const { username, email, password } = data;

    try {
      await auth.signUp({ username, email, password });
    } catch (loginError: any) {
      toast({
        title: "Signup Failed",
        description:
          loginError.response?.data || "An error occurred during Signup.",
        variant: "destructive",
        className: "bg-red-600",
      });
    }
  };

  const togglePasswordVisibility = (): void => {
    setPasswordVisibility((prevVal) => !prevVal);
  };

  let debounceUsernameTimeout: NodeJS.Timeout | null;

  const checkUsernameAvailability = async (
    username: string | undefined
  ): Promise<string | boolean> => {
    if (!username) {
      return "Username is required";
    }

    if (debounceUsernameTimeout) {
      clearTimeout(debounceUsernameTimeout);
    }

    return new Promise((resolve) => {
      debounceUsernameTimeout = setTimeout(async () => {
        try {
          setCheckingUsername(true);
          await auth.checkUsernameAvailability(username);
          setIsUsernameAvailable(true);
          resolve(true);
          setCheckingUsername(false);
        } catch (error: any) {
          setIsUsernameAvailable(false);
          setCheckingUsername(false);
          resolve("Username already exists");
        }
      }, 300);
    });
  };

  let debounceEmailTimeout: NodeJS.Timeout | null;

  const checkEmailAvailability = async (
    email: string | undefined
  ): Promise<string | boolean> => {
    if (!email) {
      return "Email is required";
    }

    if (debounceEmailTimeout) {
      clearTimeout(debounceEmailTimeout);
    }

    return new Promise((resolve) => {
      debounceEmailTimeout = setTimeout(async () => {
        try {
          setCheckingEmail(true);
          await auth.checkEmailAvailability(email);
          setIsEmailAvailable(true);
          resolve(true);
          setCheckingEmail(false);
        } catch (error: any) {
          setIsEmailAvailable(false);
          setCheckingEmail(false);
          resolve("Email already exists");
        }
      }, 300);
    });
  };

  return (
    <Container>
      <Toaster />
      <div className="min-h-screen flex items-center justify-center font-text">
        <div className="p-4 w-full max-w-md">
          <Card className="w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-center text-3xl font-[900] text-[#5459ed]">
                <div className="w-36 m-auto">
                  <img src="VeWen-noBg.png" alt="dd" />
                </div>
              </CardTitle>
              <CardDescription className="text-center text-base">
                Join our VeWen
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(handleSignup)}>
              <CardContent className="space-y-4">
                <div className="space-y-2 relative">
                  <Label
                    htmlFor="username"
                    className="text-sm absolute top-[-10px] bg-light-theme dark:bg-dark-theme left-2"
                  >
                    Username
                  </Label>
                  <Input
                    {...register("username", {
                      required: {
                        value: true,
                        message: "Username is required.",
                      },
                      minLength: {
                        value: 3,
                        message:
                          "Username should be at least 3 characters long.",
                      },
                      maxLength: {
                        value: 15,
                        message: "Username should not exceed 15 characters.",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message:
                          "Username can only contain letters, numbers, and underscores.",
                      },
                      validate: checkUsernameAvailability,
                    })}
                    id="username"
                    type="text"
                    placeholder="John Doe"
                    className="rounded"
                    autoComplete="on"
                  />

                  {checkingUsername ? (
                    <span className="absolute right-2 top-0">
                      <div className="w-5 h-5 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                    </span>
                  ) : (
                    <span
                      className={`absolute right-2 top-0 ${
                        isUsernameAvailabile ? "text-green-600" : "text-red-600"
                      } `}
                    >
                      <ion-icon
                        name={`${
                          isUsernameAvailabile
                            ? "checkmark-circle"
                            : "close-circle"
                        }`}
                      ></ion-icon>
                    </span>
                  )}
                  {errors.username && (
                    <p className="text-red-600">{errors.username.message}</p>
                  )}
                </div>
                <div className="space-y-2 relative">
                  <Label
                    htmlFor="email"
                    className="text-sm absolute top-[-10px] bg-light-theme dark:bg-dark-theme left-2"
                  >
                    Email
                  </Label>
                  <Input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is required.",
                      },
                      pattern: {
                        value:
                          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                        message: "Invalid email address",
                      },
                      validate: checkEmailAvailability,
                    })}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="rounded"
                    autoComplete="on"
                  />

                  {checkingEmail ? (
                    <span className="absolute right-2 top-0">
                      <div className="w-5 h-5 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                    </span>
                  ) : (
                    <span
                      className={`absolute right-2 top-0 ${
                        isEmailAvailabile ? "text-green-600" : "text-red-600"
                      } `}
                    >
                      <ion-icon
                        name={`${
                          isEmailAvailabile
                            ? "checkmark-circle"
                            : "close-circle"
                        }`}
                      ></ion-icon>
                    </span>
                  )}
                  {errors.email && (
                    <p className="text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2 relative ">
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
                  Signup
                </Button>
              </CardContent>
            </form>
            <CardFooter className="flex flex-col space-y-1">
              <Separator />

              <div ref={googleButtonRef}></div>

              <div className="text-sm text-center">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="text-primary hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </div>
            </CardFooter>
          </Card>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Connect with friends and the world around you on VeWen
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SignUp;
