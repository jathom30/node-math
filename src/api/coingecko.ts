import axios, { AxiosResponse } from "axios";
import { Token } from "types";

const baseURL = 'https://api.coingecko.com/api/v3'

export const searchToken = (query: string) => axios.get(`${baseURL}/search?query=${query}`)

export const getToken = (id: string): Promise<AxiosResponse<Token, any>> => axios.get(`${baseURL}/coins/${id}`)