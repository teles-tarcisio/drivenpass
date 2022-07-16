import Joi from "joi";
import { NewWifi } from "../repositories/wifiNetsRepository.js";

export const newWifiNetSchema = Joi.object<NewWifi>({
  tag: Joi.string().trim().required(),
  ssid: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});