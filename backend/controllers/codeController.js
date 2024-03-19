const db = require("../config/dbConfig");
const redis = require("../config/redisConfig");
const axios = require("axios");
require("dotenv").config();
const util = require("util");
const getAsync = util.promisify(redis.get).bind(redis);
const setAsync = util.promisify(redis.set).bind(redis);

const getLangCode = (language) => {
  const ids = {
    java: 62,
    python: 71,
    "c++": 52,
    javascript: 63,
  };
  return ids[language.toLowerCase()];
};

// Code Submission (POST)

exports.submitCode = async (req, res) => {
  try {
    const { username, language, stdin, code } = req.body;
    code.replace(/[\r\n]/g, "");
    const response = await codeSubmission(username, language, code, stdin);
    const { stderr, stdout } = response;

    if (response.stderr)
      res.status(201).json({
        error: atob(stderr),
        message: "Code Execution Failed",
      });
    else
      res.status(201).json({
        output: atob(stdout),
        message: "Code Executed and Submitted Successfully",
      });
  } catch (error) {
    console.error("Error submitting code snippet:", error);
    res.status(500).send("Internal server error.");
  }
};

const codeSubmission = async (username, language, code, stdin) => {
  try {
    const response = await compileCode(language, code, stdin);
    const { stdout, stderr, token } = response;
    const connection = await db.getConnection();
    const stdError = atob(stderr ? stderr : "");
    const stdOutput = atob(stdout ? stdout : "");
    await connection.query(
      "INSERT INTO codes (username, language, stdin, output, code, token) VALUES (?, ?, ?, ?, ?, ?)",
      [
        username,
        language,
        stdin,
        stdOutput ? stdOutput : stdError ? stdError : "",
        code,
        token,
      ]
    );
    connection.release();
    redis.del("submissions");
    return { stderr, stdout };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Code Compilation (POST)

exports.compile = async (req, res) => {
  try {
    const { language, stdin, code } = req.body;
    code.replace(/[\r\n]/g, "");
    const response = await compileCode(language, code, stdin);
    const { stderr, stdout } = response;

    if (response.stderr)
      res.status(200).json({
        error: atob(stderr),
        message: "Code Execution Failed",
      });
    else
      res.status(200).json({
        output: atob(stdout),
        message: "Code Executed Successfully",
      });
  } catch (error) {
    console.error("Error submitting code snippet:", error);
    res.status(500).send("Internal server error.");
  }
};

const compileCode = async (language, code, stdin) => {
  const base64_code = btoa(code);
  const base64_stdin = btoa(stdin);
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      wait: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": process.env.API_HOST,
    },
    data: {
      language_id: getLangCode(language),
      source_code: base64_code,
      stdin: base64_stdin,
    },
  };
  try {
    const response = await axios.request(options);
    const { stdout, stderr, token } = response.data;
    return {
      stderr,
      stdout,
      token,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Submissions (GET)

exports.getSubmissions = async (req, res) => {
  try {
    const data = await getDataFromRedis("submissions");
    if (data) {
      // fetched from Redis cache
      console.log("fetched from Redis cache");
      res.status(200).send(JSON.parse(data));
    } else {
      // fetching from mysql db
      console.warn("fetching from mysql db");
      const [rows] = await db.query(
        "select * FROM codes ORDER BY timestamp DESC"
      );
      const limitedRows = rows.map((row) => {
        const { code, ...rest } = row;
        const modifiedCode = {
          code: code.substring(0, 100),
          fullcode: code === code.substring(0, 100),
        };
        return {
          ...rest,
          code: modifiedCode,
        };
      });
      await storeDataInRedis("submissions", JSON.stringify(limitedRows));
      res.status(200).json(limitedRows);
    }
  } catch (error) {
    console.error("Error getting codes ", error);
    res.status(500).send("Internal server error.");
  }
};

const getDataFromRedis = async (key) => {
  try {
    const data = await getAsync(key);
    return data;
  } catch (error) {
    console.log("Error while fetching from redis");
    throw error;
  }
};

const storeDataInRedis = async (key, value) => {
  try {
    await setAsync(key, value);
    console.log("Data stored successfully in Redis.");
  } catch (error) {
    console.error("Error storing data in Redis:", error);
    throw error;
  }
};
