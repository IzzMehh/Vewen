import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Button,
} from "@/components/index";
import { useAppSelector } from "@/hooks/store";
import { useToast } from "@/hooks/use-toast"; 
import auth from "@/backend/Auth";
import moment from "moment";

function VerifyAccountEmail() {
  const userData = useAppSelector((state) => state?.userData);
  const [otp, setOtp] = React.useState("");
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(true);
    console.log(userData);
  }, []);

  const verifyOtp = async () => {
    try {
      if (userData?._id) {
        await auth.verifyAccountEmail(Number(otp), userData._id);
        toast({
          title: "Verified",
          description: "Email verified!",
          className: "bg-green-600",
          variant: "success",
        });
        setIsOpen(false);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `${
          error?.response?.data || "An error occurred during verification."
        }`,
        className: "bg-red-600",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      {userData?.verified ? (
        <></>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent
            className={`bg-light-theme dark:bg-dark-theme text-light-theme-text dark:text-dark-theme-text`}
          >
            <DialogHeader>
              <DialogTitle className={"text-center text-2xl font-bold"}>
                Verify Your Email
              </DialogTitle>
              <DialogDescription className={"text-center text-base"}> 
                We've sent a 6-digit OTP to your email. Please enter it below to
                verify your email address.
                <div className="flex justify-center mt-5">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                    pattern={/^\d+$/}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <Button
                  onClick={verifyOtp}
                  className={`w-[50%] hover:bg-black text-light-theme dark:text-dark-theme mt-5 ${
                    otp.length === 6
                      ? " bg-dark-theme dark:bg-light-theme "
                      : "bg-[#0000008f] dark:bg-[#ffffff9e] cursor-not-allowed"
                  } rounded `}
                  type="submit"
                >
                  Verify OTP
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default VerifyAccountEmail;
