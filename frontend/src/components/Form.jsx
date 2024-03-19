import React, { useState } from "react";
import Selector from "./Selector";
import makeApiCall from "../api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import Editor from "@monaco-editor/react";

const Form = () => {
  const template = {
    username: "",
    stdin: "",
    code: `print("Hello World")`,
    language: "python",
  };
  const [formData, setFormData] = useState(template);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleCode = (code) => {
    setFormData((prev) => {
      return {
        ...prev,
        code,
      };
    });
  };

  const handleDropdown = (language) => {
    setFormData((prev) => {
      return {
        ...prev,
        language,
      };
    });
  };

  const handleCompile = async (e) => {
    e.preventDefault();
    setOutput("");
    setLoading(true);
    if (!formData.language || !formData.code) {
      toast.warning("Please fill all Mandatory Details");
      setLoading(false);
      return;
    }
    try {
      const URL = "https://tuf-task-backend-iota.vercel.app/compile";
      const method = "POST";
      const response = await makeApiCall(URL, method, formData);
      console.log(response);
      if (response.status === 200) {
        if (response.data.error) {
          toast.warning(response.data.message, {
            duration: 3000,
          });
          setOutput(response.data.error);
        } else {
          toast.success(response.data.message, {
            duration: 3000,
          });
          setOutput(response.data.output);
        }
      } else {
        toast.error("Internal Server Error");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOutput("");
    setLoading(true);
    if (!formData.language || !formData.code || !formData.username) {
      toast.warning("Please fill all Mandatory Details");
      setLoading(false);
      return;
    }
    try {
      const URL = "https://tuf-task-backend-iota.vercel.app/submit";
      const method = "POST";
      const response = await makeApiCall(URL, method, formData);
      console.log(response);
      setOutput(response.data.output);
      if (response.status === 201) {
        if (response.data.error)
          toast.warning(response.data.message, {
            duration: 3000,
          });
        else
          toast.success(response.data.message, {
            duration: 3000,
          });
      } else {
        toast.error("Internal Server Error");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="bg-[#E8E8E8] flex justify-center pt-2 min-h-screen h-full">
      <div className="w-full rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row items-center gap-10 w-full p-10"
        >
          <div className="min-w-[300px] bg-white shadow-md p-4 rounded-lg lg:max-w-[50%] w-full">
            <div className="flex items-center my-3 justify-between">
              <span className="font-medium text-lg">
                Select Language<span className="text-red-500">*</span>
              </span>

              <div className="flex items-start gap-2">
                <Selector
                  displayName="Select"
                  dropdown={["java", "c++", "javaScript", "python"]}
                  handleChange={handleDropdown}
                  selectedOption={
                    formData?.language ? formData?.language : "Select"
                  }
                />
              </div>
            </div>

            <div className="max-w-full min-w-[250px] w-full">
              <Editor
                height="500px"
                width={`100%`}
                theme="vs-dark"
                defaultLanguage={formData.language}
                value={formData.code}
                defaultValue={`print("Hello World")`}
                onChange={handleCode}
              />
            </div>
          </div>

          <div className="min-w-[300px] flex justify-center flex-col gap-10 lg:max-w-[40%] w-full">
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="username" className="font-medium">
                Username
                <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="w-full rounded-lg border-gray-300 shadow hover:shadow-md focus:border-gray-400 focus:shadow-md border px-4 py-2"
                placeholder="Your username"
                onChange={handleChange}
                value={formData?.username}
                required
              />
            </div>

            <div className="flex flex-col items-start gap-2">
              <label htmlFor="stdin" className="font-medium">
                Standard Input (stdin)
              </label>
              <textarea
                id="stdin"
                name="stdin"
                type="text"
                className="w-full rounded-lg border-gray-300 shadow hover:shadow-md selection:shadow-md border px-4 py-2"
                placeholder="Input"
                onChange={handleChange}
                value={formData?.stdin}
              />
            </div>

            <div className="flex flex-col items-start gap-2">
              <label htmlFor="stdout" className="font-medium">
                Output
              </label>
              <textarea
                id="stdout"
                name="stdout"
                type="text"
                className="w-full h-[200px] rounded-lg border-gray-300 shadow hover:shadow-md selection:shadow-md border px-4 py-2"
                placeholder="Output"
                value={loading ? "Compiling..." : output}
                readOnly
              />
            </div>

            <div className="flex justify-center gap-5">
              <button
                onClick={handleCompile}
                className={`bg-green-500 font-medium w-[200px] h-10 hover:bg-green-600 px-4 py-2 rounded-md text-white flex items-center justify-center file ${
                  loading
                    ? "cursor-not-allowed bg-green-200 hover:bg-green-200"
                    : ""
                }`}
                disabled={loading}
              >
                Compile
              </button>

              <button
                type="submit"
                className={`bg-blue-500 font-medium w-[200px] h-10 hover:bg-blue-600 px-4 py-2 rounded-md text-white flex items-center justify-center file ${
                  loading
                    ? "cursor-not-allowed bg-blue-200 hover:bg-blue-200"
                    : ""
                }`}
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
