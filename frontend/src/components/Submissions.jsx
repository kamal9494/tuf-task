import React, { useEffect, useState } from "react";
import Table from "./Table";
import makeApiCall from "../api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const URL = "https://tuf-task-backend-iota.vercel.app/submissions";
        const method = "GET";
        const response = await makeApiCall(URL, method, null);
        const formattedData = response.data.map((item) => {
          return {
            username: item.username,
            language: item.language,
            stdin: item.stdin ? item.stdin : "-",
            code: item.code,
            output: item.error ? item.error : item.output,
            timestamp: new Date(item.timestamp).toLocaleTimeString(),
          };
        });
        console.log(formattedData);
        setSubmissions(formattedData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchSubmissions();
  }, []);
  if (loading)
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <AiOutlineLoading3Quarters size={40} className="animate-spin" />
      </div>
    );
  return (
    <div className="px-10 bg-[#E8E8E8]">
      <h2 className="text-3xl text-center font-bold p-2">Submissions</h2>
      <Table data={submissions} />
    </div>
  );
};

export default Submissions;
