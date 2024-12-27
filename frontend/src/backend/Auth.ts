import axios from "axios";
import { UserData } from "../typings/global";

import { userCredentials } from "@/typings/global";

class Auth {
  backendUrl = import.meta.env.VITE_BACKEND_URL;

  constructor() {}

  async getSession(): Promise<UserData | null> {
    try {
      const res = await axios.get(`${this.backendUrl}/api/user/auth`, {
        withCredentials: true,
      });

      console.log(res);

      if (res && res.data) {
        const {
          _id,
          display_name,
          username,
          email,
          profileImage,
          bannerImage,
          verified,
          createdAt,
          updatedAt,
          googleId,
          lastLoggedIn,
        } = res.data;

        const userData: UserData = {
          _id,
          display_name,
          username,
          email,
          profileImage,
          bannerImage,
          verified,
          createdAt,
          updatedAt,
          googleId,
          lastLoggedIn,
        };

        return userData;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching user session:", error);
      return null;
    }
  }

  async logout() {
    await axios.get(`${this.backendUrl}/api/user/logout`, {
      withCredentials: true,
    });
    window.location.assign("/login");
  }

  async loginWithGoogle({
    googleId,
    email,
    display_name,
    verified,
    profileImage,
  }: userCredentials) {
    try {
      await axios.post(
        `${this.backendUrl}/api/user/loginWithGoogle`,
        {
          googleId,
          email,
          display_name,
          verified,
          profileImage,
        },
        { withCredentials: true }
      );
    } catch (error: any) {
      throw error
    }
  }

  async signUp({ email, username, password }: userCredentials) {
    try {
      await axios.post(
        `${this.backendUrl}/api/user/signup`,
        {
          email,
          username,
          password,
        },
        { withCredentials: true }
      );
      window.location.assign("/");
    } catch (error: any) {
      throw error;
    }
  }

  async logIn({ username, email, password }: userCredentials) {
    try {
      console.log(username, email, password);
      await axios.post(
        `${this.backendUrl}/api/user/login`,
        {
          email,
          username,
          password,
        },
        { withCredentials: true }
      );
      window.location.assign("/");
    } catch (error: any) {
      throw error;
    }
  }

  async checkUsernameAvailability(username: string) {
    try {
      await axios.get(
        `${this.backendUrl}/api/user/checkUsernameAvailability?username=${username}`
      );
    } catch (error) {
      throw error;
    }
  }

  async checkEmailAvailability(email: string) {
    try {
      await axios.get(
        `${this.backendUrl}/api/user/checkEmailAvailability?email=${email}`
      );
    } catch (error) {
      throw error;
    }
  }

  async verifyAccountEmail(otp: number,_id:string) {
    try {
       await axios.patch(`${this.backendUrl}/api/user/verifyAccountEmail`, {
         code: otp,
         _id,
       });
    } catch (error) {
      throw error
    }
  }
}

const auth = new Auth();
export default auth;
