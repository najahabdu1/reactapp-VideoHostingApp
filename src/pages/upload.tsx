import React,{useState, useEffect} from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import useAuthStore from "../../store/authStore";
import { client } from "@component/utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "@component/utils/constants";
import { URL } from "@component/utils";

export const upload = () => {
  const [isLoading, setisLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
  const [wrongFileType, setwrongFileType] = useState(false);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState(topics[0].name);
  const [savingpost, setSavingpost] = useState(false);
  const {userProfile}:{userProfile:any} = useAuthStore();
  const router = useRouter();


  const uploadVideo = async(e:any) => {
    const selectedFile = e.target.files[0];
    const filesTypes = ['video/mkv', 'video/mp4', 'video/webm'];
    if(filesTypes.includes(selectedFile.type)){
      client.assets.upload('file',selectedFile,{
        contentType: selectedFile.type,
        filename: selectedFile.name
      })
      .then((data)=> {
        setVideoAsset(data);
        setisLoading(false);
      })
    } else {
      setisLoading(false);
      setwrongFileType(true);
    }
  }
  const handlePost = async () => {
    if (caption && videoAsset?._id && category){
      setSavingpost(true);
      const document ={
        _type: 'post',
        caption, video:{
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id
          }
        },
        userId: userProfile?._id,
        postedBy:{
          _type: 'postedBy',
          _ref:userProfile?._id
        },
        topic:category
      }
      await axios.post(`${URL}/api/post`,document);
      router.push('/');
    }
  } 
  return (
    <div className="flex w-full h-full absolute left-0 top-[60-px] mb-10 pt-20 bg-[#F8F8F8] justify-center">
      <div className="bg-white rounded-lg xl:h-[80vh] w-[60%] flex gap-6 flex-wrap justify-between items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">UPLOAD VIDEO</p>
            <p className="text-md text-gray-400 mt-1">Post a video to your account</p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-between items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-red-50">
           {isLoading ? (
              <p className="'text-center text-3xl text-red-400 font-semibold">Uploading</p>
           ) : (
            <div>
              {videoAsset ? (
                <div className=" rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center">
                    <video className="rounded-xl h-[450px] w-[250px] mt-[-21%] bg-black" src={videoAsset.url} loop controls></video>
                </div>
              ):(
                <label className='cursor-pointer'>
                  <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-bold text-xl">
                      <FaCloudUploadAlt className="text-gray-300 text-6xl cursor-pointer hover:bg-blue hover:text-red-300"/>
                    </p>
                    <p className=" font-normal text-gray-400">Select video to upload</p>
                  </div>
                  <br/>
                  <p className="text-gray-300 text-center text-sm">
                    MP4 or MKV or WebM <br/>
                    720x1280 or higher <br/>
                    Up to 120 seconds <br/>
                    Less than 2GB 
                  </p>
                  <p className="bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                    Select File
                  </p>
                  </div>
                  <input  className="w-0 h-0"
                           type="file"
                           name="upload-video"
                           onChange={uploadVideo} />
                </label>
              )} 
            </div>
           )}
           {wrongFileType &&(
            <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]"> Please select a valid video</p>
           )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
              <label className="text-md font-medium">Caption</label>
              <input className="rounded outline-none text-md border-2 border-gray-200 p-2 hover:border-gray-500" 
                type="text" value={caption} onChange={(e)=>setCaption(e.target.value) } >
              </input>
              <label className="text-md font-medium">Choose a category</label>
              <select className="outline-none capitalize bg-white text-gray-700 text-md border-2 border-gray-200 lg:p-4 p-2 rounded cursor-pointer hover:bg-slate-300" 
              onChange={(e)=>setCategory(e.target.value)}>
                {topics.map((topic)=>(
                    <option className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300 " key={topic.name} value={topic.name}>
                      {topic.name}
                    </option>
                ))}
              </select>
              <div className="flex gap-4 mt-10">
                <button className=" border-gray-300 border-2 text-md font-medium p-2 rounded w-24 lg:w-44 outline-none"
                onClick={()=>{}} type="button">Discard</button>
                 <button className="bg-[#F51997] border-2 text-cyan-50 font-medium p-2 rounded w-24 lg:w-44 outline-none"
                onClick={handlePost} type="button">Post</button>
              </div>
               
            </div>
        
      </div>
    </div>
    
  )
}
export default upload;