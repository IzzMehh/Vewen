import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Textarea,
  Container,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  Separator,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../index";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "@/hooks/store";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface Props {
  placeholder?: string;
  className?: string;
  avatarUrl?: string;
}

interface MyFile extends File {
  url: string;
  id: string;
  file: File;
}

enum Visibility {
  public = "public",
  followers = "followers",
}

const Post = ({
  placeholder = "Whats on your mind?",
  avatarUrl = "https://www.w3schools.com/howto/img_avatar.png",
}: Props) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const imageInputRef = React.useRef<HTMLInputElement | null>(null);

  const [letterCount, setLetterCount] = React.useState<number>(0);
  const [content, setContent] = React.useState<string>("");
  const [visibilityType, setvisibilityType] = React.useState<string>("public");
  const [selectedFiles, setSelectedFile] = React.useState<MyFile[]>([]);
  const [isEmojiBoxOpen, setIsEmojiBoxOpen] = React.useState<boolean>(false);

  const userPrefs = useAppSelector((state) => state.userPref);
  const userData = useAppSelector((state) => state.userData);

  const handleInputText = (): void => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      setLetterCount(textarea.value.length);
      setContent(textarea.value);
    }
  };

  const handleEmoji = (e: any): void => {
    const textarea = textareaRef.current;
    if (textarea && letterCount <= 300) {
      textarea.value = `${textarea.value} ${e.native}`;
      setLetterCount(textarea.value.length);
      setContent(textarea.value);
    }
  };

  const toggleEmojiBox = (): void => {
    isEmojiBoxOpen === true
      ? setIsEmojiBoxOpen(false)
      : setIsEmojiBoxOpen(true);
  };

  const triggerImageInput = (): void => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleInputImages = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      let tempFilesFormat: MyFile[] = [];

      filesArray.forEach((file: File) => {
        if (file.type.startsWith("image") || file.type.startsWith("video")) {
          tempFilesFormat.push({
            file,
            url: URL.createObjectURL(file),
            id: uuidv4(),
          } as MyFile);
        }
      });

      setSelectedFile((prevSelectedFiles) => [
        ...prevSelectedFiles,
        ...tempFilesFormat,
      ]);

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  };

  const deleteInputImage = (id: string) => {
    setSelectedFile(
      selectedFiles.filter((file) => {
        if (file.id === id) {
          URL.revokeObjectURL(file.url);
          return false;
        }
        return true;
      })
    );
  };

  const changeVisibility = (visibilityType: Visibility): void => {
    setvisibilityType(visibilityType);
  };

  return (
    <Container className="p-3">
      <div className="flex">
        <div className="w-[50px]">
          <Avatar>
            <AvatarImage
              src={userData?.profileImage?.url || avatarUrl}
            ></AvatarImage>
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full flex">
          <div className="w-full">
            <Textarea
              ref={textareaRef}
              onChange={handleInputText}
              value={content}
              maxLength={300}
              placeholder={placeholder}
              className="resize-none text-lg border-none dark:bg-dark-theme bg-light-theme overflow-hidden dark:shadow dark:shadow-[#ffffff4a] mb-5"
            />
            <div className="flex mt-1">
              <div className="flex text-2xl">
                <span
                  className="flex items-center cursor-pointer mr-2"
                  onClick={triggerImageInput}
                >
                  <ion-icon name="images"></ion-icon>
                </span>
                <div className="flex relative">
                  <span
                    className="flex items-center cursor-pointer"
                    onClick={toggleEmojiBox}
                  >
                    <ion-icon name="happy"></ion-icon>
                  </span>
                  <div
                    className={`absolute top-10 ${
                      isEmojiBoxOpen ? "block" : "hidden"
                    }`}
                  >
                    <div className="z-10 absolute scale-[.65] sm:scale-75 md:scale-90 overflow-hidden inline-block origin-top-left">
                      <Picker
                        data={data}
                        onEmojiSelect={handleEmoji}
                        theme={userPrefs.theme}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end w-full">
                <div className="mt-2 mr-2">{letterCount}</div>
                <Button className="border-dark-theme dark:border-light-theme border rounded-xl default-hover">
                  Post
                </Button>
              </div>
            </div>
          </div>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <DropdownMenuLabel>
                  <Button className="border w-full h-full default-hover border-none">
                    <ion-icon
                      name={
                        visibilityType === "public"
                          ? "earth"
                          : "people-circle-outline"
                      }
                    ></ion-icon>
                  </Button>
                </DropdownMenuLabel>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:bg-dark-theme bg-light-theme ">
                <DropdownMenuCheckboxItem
                  checked={visibilityType === "public" ? true : false}
                  onCheckedChange={() => changeVisibility(Visibility.public)}
                  className="dark:text-dark-theme-text cursor-pointer default-hover"
                >
                  <span className="relative top-[2px] mr-1">
                    <ion-icon name="earth"></ion-icon>
                  </span>{" "}
                  Public
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibilityType === "followers" ? true : false}
                  onCheckedChange={() => changeVisibility(Visibility.followers)}
                  className="dark:text-dark-theme-text cursor-pointer default-hover"
                >
                  <span className="relative top-[2px] mr-1">
                    <ion-icon name="people-circle-outline"></ion-icon>
                  </span>{" "}
                  Followers
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="z-0 mt-5">
        {selectedFiles.length > 0 ? (
          <div className="flex justify-center">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-[300px] max-w-sm lg:w-full"
            >
              <CarouselContent>
                {selectedFiles.map((file, index) => (
                  <CarouselItem key={index}>
                    {file.file.type.startsWith("image") ? (
                      <div className="bg-re flex justify-center relative">
                        <img
                          src={file.url}
                          alt={`Carousel item ${index + 1}`}
                          className="h-[300px]"
                        />
                        <span
                          onClick={() => deleteInputImage(file.id)}
                          className="absolute right-0 text-red-600 text-3xl cursor-pointer"
                        >
                          <ion-icon name="trash"></ion-icon>
                        </span>
                      </div>
                    ) : (
                      <div className="bg-re flex justify-center relative">
                        <video src={file.url} controls className="h-[300px]" />
                        <span
                          onClick={() => deleteInputImage(file.id)}
                          className="absolute right-0 text-red-600 text-3xl cursor-pointer"
                        >
                          <ion-icon name="trash"></ion-icon>
                        </span>
                      </div>
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              {selectedFiles.length > 1 ? (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              ) : null}
            </Carousel>
          </div>
        ) : null}
      </div>

      <input
        className="hidden"
        ref={imageInputRef}
        type="file"
        accept="image/*,video/*"
        name=""
        multiple
        id=""
        max={10}
        onChange={handleInputImages}
      />
    </Container>
  );
};

export default Post;
