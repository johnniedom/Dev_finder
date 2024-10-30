"use client";
import Image from "next/image";
import React from "react";

import {
  Search,
  MapPin,
  Link as LinkIcon,
  Twitter as X,
  Building,
  BluetoothConnected,
  Moon,
} from "lucide-react";

export default function Home() {
  const [name, setName] = React.useState("");
  const [data, setData] = React.useState({});

  const handleSearch = async function fetcher(e) {
    e.preventDefault();
    try {
      const res = await fetch(`https://api.github.com/users/${name}`);
      const rep = res.json();
      console.log(rep);
      rep.then((userData) => setData(userData));

      setName("");
      console.log(data);
    } catch (err) {
      throw new Error("User not found");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#FEFEFE] p-8">
      {/* Logo and Dark Mode */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-8">
        <h1 className="text-2xl font-mono font-bold">Devfinder</h1>
        <button className="text-slate-600 flex items-center gap-2">
          DARK{" "}
          <span>
            <Moon />
          </span>
        </button>
      </div>

      {/* Search Bar */}
      <form className="w-full max-w-3xl relative mb-8" onSubmit={handleSearch}>
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search className="text-blue-500" />
        </div>
        <input
          type="text"
          placeholder="Search GitHub username..."
          className="w-full p-4 pl-12 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF] focus:ring-opacity-50"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="text-red-500 absolute right-36 top-1/2 -translate-y-1/2">
          {" "}
          {data.message}{" "}
        </p>
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0079FF] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-sky-500"
        >
          {" "}
          Search{" "}
        </button>
      </form>

      {/*  /* Profile Card */}
      {data.login && (
        <div className="w-full max-w-3xl bg-[#FEFEFE] rounded-lg flex-col shadow-lg p-8 flex gap-8 md:flex-row items-start relative">
          <div className="flex justify-center md:gap-12 gap-0 md:space-x-0 space-x-3">
            <Image
              src={data.avatar_url}
              width={150}
              height={150}
              alt="Profile Picture"
              sizes="(min-width: 768px) 250px, 250px"
              className="rounded-full"
            />
            <div className="flex items-baseline w-full flex-col md:hidden ">
              <div className="flex gap-2 items-start flex-col jut">
                <h2 className="text-2xl font-bold">{data.name}</h2>
                <p className="text-blue-500">@{data.login}</p>
              </div>

              <p className=" ">
                Joined{" "}
                {new Date(data.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full ">
            <div className=" items-baseline w-full md:flex hidden flex-col md:flex-row md:gap-10 md:justify-between ">
              <div className="flex gap-2 items-start flex-col jut">
                <h2 className="text-2xl font-bold">{data.name}</h2>
                <p className="text-blue-500">@{data.login}</p>
              </div>

              <p className=" ">
                Joined{" "}
                {new Date(data.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            <p className="text-gray-500"> {data.bio} </p>

            <div className="flex justify-around items-center my-8 p-8 bg-[#F6F8FF] rounded-lg max-[30rem]: ">
              {/* The Dev Repo, Followers and following */}
              <div className="flex gap-2 items-center flex-col">
                <p className="text-xs shrink-0">Repos</p>
                <p className="text-2xl text-[#2B3442] font-mono font-bold shrink-0">
                  {data.public_repos}
                </p>
              </div>
              <div className="flex gap-2 items-center flex-col">
                <p className="text-xs shrink-0">Followers</p>
                <p className="text-2xl text-[#2B3442] font-mono font-bold shrink-0">
                  {data.followers}
                </p>
              </div>
              <div className="flex gap-2 items-center flex-col">
                <p className="text-xs shrink-0">Following</p>
                <p className="text-2xl text-[#2B3442] font-mono font-bold shrink-0">
                  {data.following}
                </p>
              </div>
            </div>
            {/* Location, Twitter, Company */}
            <div className="flex gap-12 items-center justify-between flex-wrap w-full ">
              <div className="flex sm:w-[45%] gap-4 items-center">
                <MapPin size={18} className=" text-blue-500" />
                <p>{data.location || "Not Avalible"}</p>
              </div>
              <div className="flex md:w-[45%] gap-4 items-center">
                <X size={18} className=" text-blue-500" />
                <p>{data.twitter_username || "Not Avalible"} </p>
              </div>
              <div className="flex md:w-[45%] gap-4 items-center">
                <LinkIcon size={18} className=" text-blue-500" />
                <p>{data.blog || "Not Avalible"}</p>
              </div>
              <div className="flex md:w-[45%] gap-4 items-center">
                <Building size={18} className=" text-blue-500" />
                <p>{data.company || "Not Avalible"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
