// import { Button } from "@/components/ui/button";
// import React, { useEffect, useState } from "react";
// import APIKey from "./ApiKey";
// import { useSelector } from "react-redux";
// import { email, getapiKey } from "@/redux/userSlice";

// const Profile = () => {

  
//   const [apiKey, setApiKey] = useState('');
//   const [copied, setCopied] = useState(false);
//   const [password, setPassword] = useState('********');
//   const [email2, setEmail] = useState('')

//   const savedemail = useSelector(email);
//   const apikey = useSelector(getapiKey);
//   useEffect(() => {
//     setEmail(savedemail);
//     setApiKey(apikey);
//   }, [savedemail]);
    


//   return (
//     <div className="text-black w-3/4 px-4">
//       <h1 className="text-3xl font-semibold   mt-4 "> Profile</h1>
//       <form className="flex flex-col space-y-4 mt-4">
//       <div className=" flex gap-2 items-center">
//           <label className="text-lg font-serif font-semibold">Email : </label>
//           <input
//             className="border-2 border-gray-400 rounded-md p-1 w-1/2 md:w-fit"
//             type="email"
//             value={email2}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col md:flex gap-2 items-center">
         
//           <div className=" flex gap-2 items-center w-full">
//             <label className="text-lg font-serif font-semibold">
//               Password :{" "}
//             </label>
//             <input
//               className="border-2 border-gray-400 rounded-md p-1 w-1/2 md:w-1/4"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//         </div>
        

//         <Button
//           variant="outline"
//           className=" font-serif font-semibold rounded-xl bg-black text-white px-4 w-fit "
//         >
//           Save
//         </Button>
//       </form>
//       <APIKey />
//     </div>
//   );
// };

// export default Profile;


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Eye, EyeOff, Loader, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { email, getapiKey, getId } from "@/redux/userSlice"
import toast from "react-hot-toast"
import { editpassword } from "@/redux/AsyncThunk"
import { useToast } from "@/hooks/use-toast"

export default function Component() {
  const [apiKey, setApiKey] = useState('')
  const [copied, setCopied] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [email2, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const savedemail = useSelector(email)
  const apikey = useSelector(getapiKey)
  const userId = useSelector(getId)
  const dispatch = useDispatch()
  const {toast} = useToast();

  useEffect(() => {
    setEmail(savedemail)
    setApiKey(apikey)
  }, [savedemail])

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  const editPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    
    if(password === ''){
      toast.error('Password cannot be empty')
      return
    }

    await dispatch(editpassword({password , userId , apiKey})).then((data)=>{
      toast({title:'Password changed successfully',type:'success'})
    }).catch(err=>{
      toast.error('Failed to change password')
    }
    ).finally(()=>{
      setLoading(false)
    })
    ;



  }


  return (
    <div className="flex flex-col items-center min-h-screen p-4 pt-8 bg-white space-y-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-6" onSubmit={editPassword}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email2}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  placeholder="Enter your email"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-lg font-medium">
                  Change Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10"
                    placeholder="Enter your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 w-11"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" onClick={editPassword}>
              {loading ?  <Loader className="mr-2 h-4 w-4 animate-spin" />
              :<>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
              
              </>}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold">API Key</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Input
                readOnly
                value={apiKey}
                className="h-11 pr-10 font-mono text-sm"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-11 w-11"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {copied && (
              <p className="text-sm text-muted-foreground">
                API key copied to clipboard!
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              Use this key to authenticate your API requests. Keep it secure and never share it publicly.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}