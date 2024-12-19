import auth from "@/backend/Auth";

const loginWithGoogle = async (
  response?: {
    credential: String;
  },
): Promise<void> => {
   if(response?.credential){
     try {
       const decodeJwt = () => {
         const base64Url = response.credential.split(".")[1];
         const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
         const jsonPayload = decodeURIComponent(
           atob(base64)
             .split("")
             .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
             .join("")
         );
         return JSON.parse(jsonPayload);
       };

       const userData = decodeJwt();

       await auth.loginWithGoogle({
         googleId: userData.sub,
         display_name: userData.name,
         email: userData.email,
         verified: userData.email_verified,
         profileImage: userData.picture,
       });

       window.location.assign("/");
     } catch (error) {
       console.error("Error decoding the ID token:", error);
     }
   }
};
const initializeGoogleLogin = (
  isUserLoggedIn: boolean,
  googleButtonRef: HTMLDivElement | null
) => {
  if (!(window as any).google || !(window as any).google.accounts) {
    console.error("Google accounts API not loaded");
    return;
  }

  const handleCredentialResponse = async (response: any) => {
    try {
      console.log("Google Login Response:", response);
      if (!isUserLoggedIn) {
        await loginWithGoogle(response);
      }
    } catch (error) {
      console.error("Error in Google login:", error);
    }
  };

  (window as any).google.accounts.id.initialize({
    client_id: import.meta.env.VITE_API_SECRET,
    callback: handleCredentialResponse,
    auto_select: true,
    cancel_on_tap_outside: true,
  });

  if (!isUserLoggedIn) {
    (window as any).google.accounts.id.prompt();

    if (googleButtonRef) {
      (window as any).google.accounts.id.renderButton(
        googleButtonRef,
        { theme: "outline", size: "large" }
      );
    }
  }
};



export { initializeGoogleLogin, loginWithGoogle };