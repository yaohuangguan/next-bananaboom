import mongoose from "mongoose";

const HomePageSchema = mongoose.Schema({
  likes: Number,
  jumbo_name: {
    type: String
  },
  jumbo_name_cn: {
    type: String
  },
  jumbo_welcome: {
    type: String
  },
  jumbo_welcome_cn: {
    type: String
  },
  jumbo_info: {
    type: String
  },
  jumbo_info_cn: {
    type: String
  },

  jumbo_button: {
    type: String
  },
  jumbo_button_cn: {
    type: String
  },
  intro_title: { type: String },
  intro_title_cn: { type: String },
  intro_subtitle: { type: String },
  intro_subtitle_cn: { type: String },
  intro_intro: { type: String },
  intro_intro_cn: { type: String },
  subscribe_web_version: { type: String },
  subscribe_web_version_cn: { type: String },
  footer_date: { type: String },
  footer_date_cn: { type: String },
  footer_welcome: { type: String },
  footer_welcome_cn: { type: String }
});

export default mongoose.models.homepages|| mongoose.model("homepages", HomePageSchema);
