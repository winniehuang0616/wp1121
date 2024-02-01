import diaryModel from "../models/diaryModel.js";

export const getDiarys = async (req, res) => {
  try {
    const diarys = await diaryModel.find({});
    return res.status(200).json(diarys);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createDiarys = async (req, res) => {
  const { time, topic, mood, content } = req.body;

  // check title and description
  if (!time || !topic || !mood || !content) {
    return res.status(400).json({ message: "something got lost!" });
  }

  console.log(time, topic, mood, content);

  try {
    const newdiary = await diaryModel.create({
      time,
      topic,
      mood,
      content,
    });
    console.log("creating newdiary");
    return res.status(201).json(newdiary);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editDiarys = async (req, res) => {
  const { id } = req.params;
  const { time_e, topic_e, mood_e, content_e } = req.body;

  try {
    // Check if the id is valid
    const existdiary = await diaryModel.findById(id);
    if (!existdiary) {
      return res.status(404).json({ message: "Diary not found!" });
    }

    // Update the diary
    if (time_e !== undefined) existdiary.time = time_e;
    if (topic_e !== undefined) existdiary.topic = topic_e;
    if (mood_e !== undefined) existdiary.mood = mood_e;
    if (content_e !== undefined) existdiary.content = content_e;

    // Save the updated todo
    await existdiary.save();

    // Rename _id to id
    existdiary.id = existdiary._id;
    delete existdiary._id;

    return res.status(200).json(existdiary);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const filterDiarys = async (req, res) => {
  const { topic, mood } = req.query;
  // 解析查询参数，这里你可以使用 querystring 或其他方式来解析查询参数
  let matchingDiaries = [];

  try {
    if (!topic && !mood) {
      matchingDiaries = await diaryModel.find({}); // 返回所有日记
    } else if (!topic) {
      matchingDiaries = await diaryModel.find({ mood });
    } else if (!mood) {
      matchingDiaries = await diaryModel.find({ topic });
    } else {
      matchingDiaries = await diaryModel.find({ topic, mood });
    }
    return res.status(200).json(matchingDiaries);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
