import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import APIKey from "./ApiKey";
import { useSelector } from "react-redux";
import { email, getapiKey } from "@/redux/userSlice";

const Profile = () => {

  
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);
  const [password, setPassword] = useState('********');
  const [email2, setEmail] = useState('')

  const savedemail = useSelector(email);
  const apikey = useSelector(getapiKey);
  useEffect(() => {
    setEmail(savedemail);
    setApiKey(apikey);
  }, [savedemail]);
    


  return (
    <div className="text-black w-3/4 px-4">
      <h1 className="text-3xl font-semibold   mt-4 "> Profile</h1>
      <form className="flex flex-col space-y-4 mt-4">
      <div className=" flex gap-2 items-center">
          <label className="text-lg font-serif font-semibold">Email : </label>
          <input
            className="border-2 border-gray-400 rounded-md p-1 w-1/2 md:w-fit"
            type="email"
            value={email2}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex gap-2 items-center">
         
          <div className=" flex gap-2 items-center w-full">
            <label className="text-lg font-serif font-semibold">
              Password :{" "}
            </label>
            <input
              className="border-2 border-gray-400 rounded-md p-1 w-1/2 md:w-1/4"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        

        <Button
          variant="outline"
          className=" font-serif font-semibold rounded-xl bg-black text-white px-4 w-fit "
        >
          Save
        </Button>
      </form>
      <APIKey />
    </div>
  );
};

export default Profile;
