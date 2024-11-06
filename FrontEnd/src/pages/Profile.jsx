import { Button } from "@/components/ui/button";
import React from "react";
import APIKey from "./ApiKey";

const Profile = () => {
  return (
    <div className="text-black w-3/4 px-4">
      <h1 className="text-3xl font-semibold   mt-4 "> Profile</h1>
      <form className="flex flex-col space-y-4 mt-4">
        <div className="flex flex-col md:flex gap-2 items-center">
          <div className=" w-full">
            <label className="text-lg font-serif font-semibold text-nowrap">
              Name :{" "}
            </label>
            <input
              disabled
              className="border-2 border-gray-400 rounded-md p-1 w-1/2 md:w-1/4"
              type="text"
              placeholder="John Doe"
            />
          </div>

          <div className=" flex gap-2 items-center w-full">
            <label className="text-lg font-serif font-semibold">
              Password :{" "}
            </label>
            <input
              className="border-2 border-gray-400 rounded-md p-1 w-1/2 md:w-1/4"
              type="email"
            />
          </div>
        </div>
        <div className=" flex gap-2 items-center">
          <label className="text-lg font-serif font-semibold">Email : </label>
          <input
            className="border-2 border-gray-400 rounded-md p-1 w-1/2 md:w-1/4"
            type="email"
          />
        </div>

        <Button
          variant="outline"
          className=" font-serif font-semibold rounded-md p-5 w-fit "
        >
          Save
        </Button>
      </form>
      <APIKey />
    </div>
  );
};

export default Profile;
